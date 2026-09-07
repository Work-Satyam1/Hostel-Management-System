import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import StatusBadge from '../../components/StatusBadge';
import adminApi from '../../api/adminApi';
import hostelApi from '../../api/hostelApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const AdminCreateWardenScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedHostelId, setSelectedHostelId] = useState('');

  const [hostels, setHostels] = useState([]);
  const [loadingHostels, setLoadingHostels] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdWarden, setCreatedWarden] = useState(null);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const res = await hostelApi.getHostels();
        const list = res?.hostels || [];
        setHostels(list);
        if (list.length > 0) {
          setSelectedHostelId(list[0]._id);
        }
      } catch (err) {
        console.warn('Failed to load hostels for warden registration:', err);
      } finally {
        setLoadingHostels(false);
      }
    };
    fetchHostels();
  }, []);

  const handleCreate = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !employeeId.trim() ||
      !phone.trim() ||
      !selectedHostelId
    ) {
      setError(
        'Please provide all required fields (Name, Email, Password, Employee ID, Phone, and Assigned Hostel).'
      );
      return;
    }

    setError(null);
    setCreatedWarden(null);
    setLoading(true);

    try {
      const res = await adminApi.createWarden({
        name: name.trim(),
        email: email.trim(),
        password,
        employeeId: employeeId.trim(),
        phone: phone.trim(),
        hostel: selectedHostelId,
      });

      setCreatedWarden(res?.warden || null);
      setName('');
      setEmail('');
      setPassword('');
      setEmployeeId('');
      setPhone('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Header
        title="Register Warden"
        subtitle="Create hostel warden account"
        role="admin"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Card>
          <Text style={styles.sectionHeading}>Warden Information</Text>
          <Text style={styles.sectionSubtitle}>
            Creates a warden account linked to a specific hostel block with administrative oversight.
          </Text>

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {createdWarden && (
            <View style={styles.successCard}>
              <View style={styles.successRow}>
                <Text style={styles.successTitle}>Warden Account Created!</Text>
                <StatusBadge status="warden" />
              </View>
              <Text style={styles.successDetail}>
                Name: {createdWarden.user?.name || 'Warden'}
              </Text>
              <Text style={styles.successDetail}>
                Email: {createdWarden.user?.email}
              </Text>
              <Text style={styles.successDetail}>
                Employee ID: {createdWarden.employeeId}
              </Text>
              <Text style={styles.successDetail}>
                Assigned Hostel: {createdWarden.hostel?.name || selectedHostelId}
              </Text>
            </View>
          )}

          <Input
            label="Full Name *"
            placeholder="e.g. Dr. Rajesh Kumar"
            value={name}
            onChangeText={setName}
          />

          <Input
            label="Email Address *"
            placeholder="e.g. warden.rajesh@hostel.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password *"
            placeholder="At least 6 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Input
            label="Employee ID *"
            placeholder="e.g. EMP-WRD-004"
            value={employeeId}
            onChangeText={setEmployeeId}
            autoCapitalize="characters"
          />

          <Input
            label="Phone Number *"
            placeholder="e.g. +91 9811223344"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.selectorLabel}>Assigned Hostel Block *</Text>
          {hostels.length === 0 ? (
            <Text style={styles.noHostelNotice}>
              No hostels found. Please create a hostel before registering a warden.
            </Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.hostelScroll}
            >
              {hostels.map((h) => {
                const isSelected = selectedHostelId === h._id;
                return (
                  <TouchableOpacity
                    key={h._id}
                    onPress={() => setSelectedHostelId(h._id)}
                    style={[
                      styles.hostelChip,
                      isSelected && styles.hostelChipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.hostelChipText,
                        isSelected && styles.hostelChipTextSelected,
                      ]}
                    >
                      {h.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          <Button
            title="Create Warden Account"
            onPress={handleCreate}
            loading={loading}
            disabled={hostels.length === 0}
            style={styles.submitBtn}
          />
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  errorBanner: {
    backgroundColor: colors.dangerBg,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
  },
  successCard: {
    backgroundColor: colors.successBg,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  successRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.success,
  },
  successDetail: {
    fontSize: 13,
    color: colors.textPrimary,
    marginTop: 2,
  },
  selectorLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  noHostelNotice: {
    fontSize: 12,
    color: colors.danger,
    marginBottom: 14,
  },
  hostelScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  hostelChip: {
    backgroundColor: colors.borderLight,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  hostelChipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  hostelChipText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  hostelChipTextSelected: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  submitBtn: {
    marginTop: 8,
  },
});

export default AdminCreateWardenScreen;
