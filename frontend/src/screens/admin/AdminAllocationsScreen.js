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
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import StatusBadge from '../../components/StatusBadge';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import allocationApi from '../../api/allocationApi';
import roomApi from '../../api/roomApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const AdminAllocationsScreen = () => {
  const [allocations, setAllocations] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Modal / Form state
  const [modalVisible, setModalVisible] = useState(false);
  const [studentIdInput, setStudentIdInput] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [allocating, setAllocating] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const fetchData = async () => {
    setError(null);
    try {
      const [allocRes, roomRes] = await Promise.all([
        allocationApi.getAllocations(),
        roomApi.getRooms(),
      ]);
      setAllocations(allocRes?.allocations || []);
      const rList = roomRes?.rooms || [];
      // Filter rooms that have capacity left and not under maintenance
      const avail = rList.filter(
        (r) => r.status !== 'maintenance' && r.occupied < r.capacity
      );
      setAvailableRooms(avail);
      if (avail.length > 0 && !selectedRoomId) {
        setSelectedRoomId(avail[0]._id);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleAllocate = async () => {
    if (!studentIdInput.trim()) {
      setFormError('Please enter the Student MongoDB Object ID or Profile ID.');
      return;
    }
    if (!selectedRoomId) {
      setFormError('Please select a target room with available capacity.');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    setAllocating(true);

    try {
      const res = await allocationApi.allocateRoom({
        student: studentIdInput.trim(),
        room: selectedRoomId,
      });

      setFormSuccess(res?.message || 'Room allocated successfully!');
      setStudentIdInput('');
      fetchData();
      setTimeout(() => {
        setModalVisible(false);
        setFormSuccess(null);
      }, 1000);
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setAllocating(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading room allocations..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Allocations" subtitle="Admin Management" role="admin" />
        <ErrorState message={error} onRetry={fetchData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Room Allocations"
        subtitle={`${allocations.length} Active Allocations`}
        role="admin"
        rightActionLabel="+ Allocate Room"
        onRightAction={() => {
          setFormError(null);
          setFormSuccess(null);
          setModalVisible(true);
        }}
      />

      <FlatList
        data={allocations}
        keyExtractor={(item) => item._id || item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No Active Allocations"
            message="No students have been allocated to rooms yet. Tap '+ Allocate Room' above to assign a room."
            actionTitle="+ Allocate Room"
            onAction={() => setModalVisible(true)}
          />
        }
        renderItem={({ item }) => {
          const student = item.student || {};
          const room = item.room || {};
          const allocatedBy = item.allocatedBy || {};

          return (
            <Card style={styles.allocCard}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.roomBadge}>
                    ROOM {room.roomNumber || 'N/A'} (Floor {room.floor ?? '?'})
                  </Text>
                  <Text style={styles.studentTitle}>
                    Student: {student.studentId || 'ID Pending'}
                  </Text>
                  <Text style={styles.courseSub}>
                    {student.course} • Sem {student.semester}
                  </Text>
                </View>
                <StatusBadge status={item.status || 'active'} />
              </View>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>
                  📞 {student.phone || 'No phone recorded'}
                </Text>
                {allocatedBy.name && (
                  <Text style={styles.metaText}>
                    By: {allocatedBy.name}
                  </Text>
                )}
              </View>

              {item.allocationDate && (
                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>
                    Assigned on {new Date(item.allocationDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
            </Card>
          );
        }}
      />

      {/* Modal: Allocate Room */}
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
                <Text style={styles.modalTitle}>Allocate Room</Text>
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
                label="Student Record ID (MongoDB ObjectId) *"
                placeholder="e.g. 660f... from student profile"
                value={studentIdInput}
                onChangeText={setStudentIdInput}
                helper="Enter the Student profile ObjectId created via /api/students/profile."
              />

              <Text style={styles.selectorLabel}>Select Room with Vacancy *</Text>
              {availableRooms.length === 0 ? (
                <Text style={styles.noVacancyNotice}>
                  No rooms with vacancy found. Please create a room or free up capacity.
                </Text>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.roomScroll}
                >
                  {availableRooms.map((r) => {
                    const isSelected = selectedRoomId === r._id;
                    return (
                      <TouchableOpacity
                        key={r._id}
                        onPress={() => setSelectedRoomId(r._id)}
                        style={[
                          styles.roomChip,
                          isSelected && styles.roomChipSelected,
                        ]}
                      >
                        <Text
                          style={[
                            styles.roomChipNumber,
                            isSelected && styles.roomChipTextSelected,
                          ]}
                        >
                          Room {r.roomNumber}
                        </Text>
                        <Text
                          style={[
                            styles.roomChipSub,
                            isSelected && styles.roomChipTextSelected,
                          ]}
                        >
                          Floor {r.floor} ({r.occupied}/{r.capacity} beds)
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              )}

              <Button
                title="Assign Room"
                onPress={handleAllocate}
                loading={allocating}
                disabled={availableRooms.length === 0}
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
  allocCard: {
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  roomBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  studentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  courseSub: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 8,
    marginTop: 6,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dateRow: {
    marginTop: 6,
  },
  dateText: {
    fontSize: 11,
    color: colors.textMuted,
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
  selectorLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  noVacancyNotice: {
    fontSize: 12,
    color: colors.danger,
    marginBottom: 14,
  },
  roomScroll: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  roomChip: {
    backgroundColor: colors.borderLight,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roomChipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  roomChipNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  roomChipSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  roomChipTextSelected: {
    color: colors.primaryDark,
  },
  submitBtn: {
    marginTop: 12,
    marginBottom: 20,
  },
});

export default AdminAllocationsScreen;
