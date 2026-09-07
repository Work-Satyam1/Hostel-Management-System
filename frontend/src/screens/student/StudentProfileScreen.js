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
import studentApi from '../../api/studentApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const StudentProfileScreen = () => {
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [semester, setSemester] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () => {
    if (!studentId.trim() || !phone.trim() || !course.trim() || !semester.trim()) {
      setError('Please fill in all required fields (Student ID, Phone, Course, Semester).');
      return;
    }

    const semNumber = parseInt(semester.trim(), 10);
    if (isNaN(semNumber) || semNumber < 1) {
      setError('Semester must be a valid positive number.');
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const payload = {
        studentId: studentId.trim(),
        phone: phone.trim(),
        course: course.trim(),
        semester: semNumber,
      };

      if (emergencyName.trim() || emergencyPhone.trim()) {
        payload.emergencyContact = {
          name: emergencyName.trim(),
          phone: emergencyPhone.trim(),
        };
      }

      const res = await studentApi.createProfile(payload);
      setSuccess(res?.message || 'Student profile created successfully!');
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
        title="Student Profile"
        subtitle="Complete your official registration"
        role="student"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Card>
          <Text style={styles.sectionHeading}>Academic & Contact Details</Text>
          <Text style={styles.sectionSubtitle}>
            These fields are verified by the hostel administration.
          </Text>

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {success && (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>{success}</Text>
            </View>
          )}

          <Input
            label="Student ID / Roll No. *"
            placeholder="e.g. STU2026001"
            value={studentId}
            onChangeText={setStudentId}
            autoCapitalize="characters"
          />

          <Input
            label="Phone Number *"
            placeholder="e.g. +91 9876543210"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Input
            label="Course / Program *"
            placeholder="e.g. B.Tech Computer Science"
            value={course}
            onChangeText={setCourse}
          />

          <Input
            label="Current Semester *"
            placeholder="e.g. 4"
            value={semester}
            onChangeText={setSemester}
            keyboardType="numeric"
          />

          <Text style={[styles.sectionHeading, { marginTop: 14 }]}>
            Emergency Contact (Optional)
          </Text>

          <Input
            label="Contact Person Name"
            placeholder="e.g. Parent / Guardian Name"
            value={emergencyName}
            onChangeText={setEmergencyName}
          />

          <Input
            label="Emergency Contact Phone"
            placeholder="e.g. +91 9876500000"
            value={emergencyPhone}
            onChangeText={setEmergencyPhone}
            keyboardType="phone-pad"
          />

          <Button
            title="Submit Profile"
            onPress={handleSubmit}
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
  successBanner: {
    backgroundColor: colors.successBg,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#86efac',
  },
  successText: {
    color: colors.success,
    fontSize: 13,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: 10,
  },
});

export default StudentProfileScreen;
