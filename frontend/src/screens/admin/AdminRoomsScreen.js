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
import roomApi from '../../api/roomApi';
import hostelApi from '../../api/hostelApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const AdminRoomsScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Modal / Form state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHostelId, setSelectedHostelId] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const fetchData = async () => {
    setError(null);
    try {
      const [roomRes, hostelRes] = await Promise.all([
        roomApi.getRooms(),
        hostelApi.getHostels(),
      ]);
      setRooms(roomRes?.rooms || []);
      const hList = hostelRes?.hostels || [];
      setHostels(hList);
      if (hList.length > 0 && !selectedHostelId) {
        setSelectedHostelId(hList[0]._id);
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

  const handleCreateRoom = async () => {
    if (!selectedHostelId) {
      setFormError('Please select a hostel block.');
      return;
    }
    if (!roomNumber.trim() || !floor.trim() || !capacity.trim()) {
      setFormError('Please provide room number, floor, and capacity.');
      return;
    }

    const floorNum = parseInt(floor.trim(), 10);
    const capNum = parseInt(capacity.trim(), 10);

    if (isNaN(floorNum)) {
      setFormError('Floor must be a valid number.');
      return;
    }
    if (isNaN(capNum) || capNum < 1) {
      setFormError('Capacity must be a positive number (minimum 1).');
      return;
    }

    setFormError(null);
    setFormSuccess(null);
    setCreating(true);

    try {
      const res = await roomApi.createRoom({
        hostel: selectedHostelId,
        roomNumber: roomNumber.trim(),
        floor: floorNum,
        capacity: capNum,
      });

      setFormSuccess(res?.message || 'Room created successfully!');
      setRoomNumber('');
      setFloor('');
      setCapacity('');
      fetchData();
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
    return <LoadingState message="Loading rooms list..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Rooms" subtitle="Admin Management" role="admin" />
        <ErrorState message={error} onRetry={fetchData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Rooms"
        subtitle={`${rooms.length} Registered Rooms`}
        role="admin"
        rightActionLabel="+ Add Room"
        onRightAction={() => {
          setFormError(null);
          setFormSuccess(null);
          setModalVisible(true);
        }}
      />

      <FlatList
        data={rooms}
        keyExtractor={(item) => item._id || item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No Rooms Created"
            message="No rooms configured yet. Tap '+ Add Room' above to create one."
            actionTitle="+ Add First Room"
            onAction={() => setModalVisible(true)}
          />
        }
        renderItem={({ item }) => {
          const hostelName =
            typeof item.hostel === 'object' && item.hostel
              ? item.hostel.name
              : 'Assigned Hostel';

          return (
            <Card style={styles.roomCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.roomNumber}>Room {item.roomNumber}</Text>
                  <Text style={styles.hostelName}>🏢 {hostelName}</Text>
                </View>
                <StatusBadge status={item.status} />
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statPill}>
                  <Text style={styles.statLabel}>Floor</Text>
                  <Text style={styles.statVal}>{item.floor}</Text>
                </View>
                <View style={styles.statPill}>
                  <Text style={styles.statLabel}>Capacity</Text>
                  <Text style={styles.statVal}>{item.capacity}</Text>
                </View>
                <View style={styles.statPill}>
                  <Text style={styles.statLabel}>Occupied</Text>
                  <Text style={styles.statVal}>{item.occupied}</Text>
                </View>
                <View style={styles.statPill}>
                  <Text style={styles.statLabel}>Available</Text>
                  <Text style={[styles.statVal, { color: colors.success }]}>
                    {Math.max(0, item.capacity - item.occupied)}
                  </Text>
                </View>
              </View>
            </Card>
          );
        }}
      />

      {/* Modal: Create Room */}
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
                <Text style={styles.modalTitle}>Add New Room</Text>
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

              {/* Hostel Selector */}
              <Text style={styles.selectorLabel}>Select Hostel Block *</Text>
              {hostels.length === 0 ? (
                <Text style={styles.noHostelNotice}>
                  No hostels found. Please create a hostel first before adding rooms.
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

              <Input
                label="Room Number *"
                placeholder="e.g. 101 or B-204"
                value={roomNumber}
                onChangeText={setRoomNumber}
              />

              <Input
                label="Floor Number *"
                placeholder="e.g. 1"
                value={floor}
                onChangeText={setFloor}
                keyboardType="numeric"
              />

              <Input
                label="Beds / Capacity *"
                placeholder="e.g. 2"
                value={capacity}
                onChangeText={setCapacity}
                keyboardType="numeric"
              />

              <Button
                title="Create Room"
                onPress={handleCreateRoom}
                loading={creating}
                disabled={hostels.length === 0}
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
  roomCard: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  roomNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  hostelName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 3,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 10,
  },
  statPill: {
    flex: 1,
    backgroundColor: colors.borderLight,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statVal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
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
  noHostelNotice: {
    fontSize: 12,
    color: colors.danger,
    marginBottom: 14,
  },
  hostelScroll: {
    flexDirection: 'row',
    marginBottom: 14,
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
    marginTop: 12,
    marginBottom: 20,
  },
});

export default AdminRoomsScreen;
