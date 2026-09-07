import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import StatusBadge from '../../components/StatusBadge';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import Button from '../../components/Button';
import studentApi from '../../api/studentApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const MyRoomScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [needsProfile, setNeedsProfile] = useState(false);

  const fetchRoom = async () => {
    setError(null);
    setNeedsProfile(false);
    try {
      const res = await studentApi.getMyRoom();
      setData(res);
    } catch (err) {
      const msg = getErrorMessage(err);
      if (msg.toLowerCase().includes('profile not found')) {
        setNeedsProfile(true);
      } else if (msg.toLowerCase().includes('no room has been allocated')) {
        setData(null);
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRoom();
  };

  if (loading) {
    return <LoadingState message="Fetching room assignment details..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="My Room" subtitle="Room Allocation" role="student" />
        <ErrorState message={error} onRetry={fetchRoom} />
      </View>
    );
  }

  if (needsProfile) {
    return (
      <View style={styles.container}>
        <Header title="My Room" subtitle="Room Allocation" role="student" />
        <EmptyState
          title="Student Profile Required"
          message="You have not created your student profile yet. Please complete your profile to view your room allocation."
          actionTitle="Create Profile Now"
          onAction={() => navigation.navigate('StudentProfile')}
        />
      </View>
    );
  }

  if (!data || !data.room) {
    return (
      <View style={styles.container}>
        <Header title="My Room" subtitle="Room Allocation" role="student" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <EmptyState
            title="No Room Allocated"
            message="You do not have an active room allocation yet. The hostel warden or administrator will assign a room soon."
            actionTitle="Refresh Status"
            onAction={onRefresh}
          />
        </ScrollView>
      </View>
    );
  }

  const { room, student, allocatedBy, allocationDate } = data;

  return (
    <View style={styles.container}>
      <Header title="My Room" subtitle="Active Room Allocation" role="student" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Room Header Card */}
        <Card style={styles.roomHeaderCard}>
          <View style={styles.roomNumberRow}>
            <View>
              <Text style={styles.roomLabel}>ROOM NUMBER</Text>
              <Text style={styles.roomNumberText}>{room.roomNumber}</Text>
            </View>
            <StatusBadge status={room.status} />
          </View>
          <Text style={styles.floorText}>Floor {room.floor}</Text>
        </Card>

        {/* Capacity & Occupancy Card */}
        <Card>
          <Text style={styles.cardSectionTitle}>Capacity & Occupancy</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{room.capacity}</Text>
              <Text style={styles.statLabel}>Total Capacity</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{room.occupied}</Text>
              <Text style={styles.statLabel}>Occupied Beds</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {Math.max(0, room.capacity - room.occupied)}
              </Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
          </View>
        </Card>

        {/* Allocation Info Card */}
        <Card>
          <Text style={styles.cardSectionTitle}>Allocation Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Student ID</Text>
            <Text style={styles.infoVal}>{student?.studentId || 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Course</Text>
            <Text style={styles.infoVal}>{student?.course || 'N/A'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoKey}>Semester</Text>
            <Text style={styles.infoVal}>{student?.semester || 'N/A'}</Text>
          </View>

          {allocatedBy && (
            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Allocated By</Text>
              <Text style={styles.infoVal}>
                {allocatedBy.name} ({allocatedBy.email})
              </Text>
            </View>
          )}

          {allocationDate && (
            <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.infoKey}>Date Allocated</Text>
              <Text style={styles.infoVal}>
                {new Date(allocationDate).toLocaleDateString()}
              </Text>
            </View>
          )}
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  roomHeaderCard: {
    backgroundColor: colors.card,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  roomNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roomLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.8,
  },
  roomNumberText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  floorText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
  },
  cardSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.borderLight,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  infoKey: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoVal: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
});

export default MyRoomScreen;
