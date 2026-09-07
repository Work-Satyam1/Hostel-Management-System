import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import hostelApi from '../../api/hostelApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const AdminHostelsScreen = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Modal / Form state
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const fetchHostels = async () => {
    setError(null);
    try {
      const data = await hostelApi.getHostels();
      setHostels(data?.hostels || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHostels();
  };

  const handleCreateHostel = async () => {
    if (!name.trim() || !location.trim() || !totalRooms.trim()) {
      setFormError('Please provide name, location, and totalRooms.');
      return;
    }

    const roomsNum = parseInt(totalRooms.trim(), 10);
    if (isNaN(roomsNum) || roomsNum < 1) {
      setFormError('Total rooms must be a valid positive number.');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    setCreating(true);

    try {
      const res = await hostelApi.createHostel({
        name: name.trim(),
        location: location.trim(),
        totalRooms: roomsNum,
      });

      setFormSuccess(res?.message || 'Hostel created successfully!');
      setName('');
      setLocation('');
      setTotalRooms('');
      // Refresh list
      fetchHostels();
      setTimeout(() => {
        setModalVisible(false);
        setFormSuccess(null);
      }, 1000);
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading hostel list..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Hostels" subtitle="Admin Management" role="admin" />
        <ErrorState message={error} onRetry={fetchHostels} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Hostels"
        subtitle={`${hostels.length} Registered Hostels`}
        role="admin"
        rightActionLabel="+ Add Hostel"
        onRightAction={() => {
          setFormError(null);
          setFormSuccess(null);
          setModalVisible(true);
        }}
      />

      <FlatList
        data={hostels}
        keyExtractor={(item) => item._id || item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No Hostels Created"
            message="No hostel blocks exist yet. Tap '+ Add Hostel' above to create one."
            actionTitle="+ Add First Hostel"
            onAction={() => setModalVisible(true)}
          />
        }
        renderItem={({ item }) => (
          <Card style={styles.hostelCard}>
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>🏢</Text>
              </View>
              <View style={styles.titleArea}>
                <Text style={styles.hostelName}>{item.name}</Text>
                <Text style={styles.hostelLocation}>📍 {item.location}</Text>
              </View>
              <View style={styles.idBadge}>
                <Text style={styles.idText}>
                  ID: ...{item._id ? item._id.slice(-6) : ''}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.pill}>
                <Text style={styles.pillLabel}>Total Capacity</Text>
                <Text style={styles.pillValue}>{item.totalRooms} Rooms</Text>
              </View>
            </View>
          </Card>
        )}
      />

      {/* Modal: Create Hostel */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Hostel</Text>
                <Button
                  title="✕"
                  variant="outline"
                  onPress={() => setModalVisible(false)}
                  style={styles.closeBtn}
                />
              </View>

              {formError && (
                <View style={styles.errorBanner}>
                  <Text style={styles.errorText}>{formError}</Text>
                </View>
              )}

              {formSuccess && (
                <View style={styles.successBanner}>
                  <Text style={styles.successText}>{formSuccess}</Text>
                </View>
              )}

              <Input
                label="Hostel Name *"
                placeholder="e.g. Ganga Hostel Block A"
                value={name}
                onChangeText={setName}
              />

              <Input
                label="Location / Campus Wing *"
                placeholder="e.g. North Campus, Gate 2"
                value={location}
                onChangeText={setLocation}
              />

              <Input
                label="Total Rooms *"
                placeholder="e.g. 50"
                value={totalRooms}
                onChangeText={setTotalRooms}
                keyboardType="numeric"
              />

              <Button
                title="Create Hostel"
                onPress={handleCreateHostel}
                loading={creating}
                style={styles.submitBtn}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  hostelCard: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 22,
  },
  titleArea: {
    flex: 1,
  },
  hostelName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  hostelLocation: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  idBadge: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  idText: {
    fontSize: 10,
    color: colors.textMuted,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  detailRow: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  pillLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  pillValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderColor: colors.border,
  },
  errorBanner: {
    backgroundColor: colors.dangerBg,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
  },
  successBanner: {
    backgroundColor: colors.successBg,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  successText: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: 12,
    marginBottom: 20,
  },
});

export default AdminHostelsScreen;
