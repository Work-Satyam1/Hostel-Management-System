import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';
import StatusBadge from '../../components/StatusBadge';
import adminApi from '../../api/adminApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const AdminCreateStudentScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdStudent, setCreatedStudent] = useState(null);

  const handleCreate = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please provide name, email, and password.');
      return;
    }

    setError(null);
    setCreatedStudent(null);
    setLoading(true);

    try {
      const res = await adminApi.createStudent({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setCreatedStudent(res?.student || null);
      setName('');
      setEmail('');
      setPassword('');
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
        title="Register Student"
        subtitle="Create student user account"
        role="admin"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Card>
          <Text style={styles.sectionHeading}>Student Credentials</Text>
          <Text style={styles.sectionSubtitle}>
            Creates a resident student login. The student can subsequently log in and complete their academic profile.
          </Text>

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {createdStudent && (
            <View style={styles.successCard}>
              <View style={styles.successRow}>
                <Text style={styles.successTitle}>Student Account Created!</Text>
                <StatusBadge status="student" />
              </View>
              <Text style={styles.successDetail}>
                Name: {createdStudent.name}
              </Text>
              <Text style={styles.successDetail}>
                Email: {createdStudent.email}
              </Text>
              <Text style={styles.successDetail}>
                ID: {createdStudent.id}
              </Text>
            </View>
          )}

          <Input
            label="Student Full Name *"
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChangeText={setName}
          />

          <Input
            label="Student Email Address *"
            placeholder="e.g. rahul@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Initial Password *"
            placeholder="At least 6 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Create Student Account"
            onPress={handleCreate}
            loading={loading}
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
  submitBtn: {
    marginTop: 8,
  },
});

export default AdminCreateStudentScreen;
