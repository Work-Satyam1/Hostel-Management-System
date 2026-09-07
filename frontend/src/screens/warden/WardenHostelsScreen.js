import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import StatusBadge from '../../components/StatusBadge';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import hostelApi from '../../api/hostelApi';
import roomApi from '../../api/roomApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const WardenHostelsScreen = () => {
  const [hostels, setHostels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);
    try {
      const [hostelRes, roomRes] = await Promise.all([
        hostelApi.getHostels(),
        roomApi.getRooms(),
      ]);
      setHostels(hostelRes?.hostels || []);
      setRooms(roomRes?.rooms || []);
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

  if (loading) {
    return <LoadingState message="Loading hostel & room overview..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Hostel Overview" subtitle="Rooms & Capacity" role="warden" />
        <ErrorState message={error} onRetry={fetchData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Hostel Overview"
        subtitle={`${hostels.length} Hostels • ${rooms.length} Rooms`}
        role="warden"
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
            title="No Hostels Configured"
            message="No hostels found in the system. The administrator can create hostels."
            actionTitle="Refresh"
            onAction={onRefresh}
          />
        }
        renderItem={({ item: hostel }) => {
          const hostelRooms = rooms.filter((r) => {
            const hid = typeof r.hostel === 'object' ? r.hostel?._id : r.hostel;
            return hid === hostel._id;
          });

          const totalCapacity = hostelRooms.reduce((sum, r) => sum + (r.capacity || 0), 0);
          const totalOccupied = hostelRooms.reduce((sum, r) => sum + (r.occupied || 0), 0);
          const availableBeds = Math.max(0, totalCapacity - totalOccupied);

          return (
            <Card style={styles.hostelCard}>
              <View style={styles.hostelHeader}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>🏢</Text>
                </View>
                <View style={styles.headerText}>
                  <Text style={styles.hostelName}>{hostel.name}</Text>
                  <Text style={styles.hostelLocation}>📍 {hostel.location}</Text>
                </View>
                <View style={styles.roomCountPill}>
                  <Text style={styles.roomCountText}>{hostelRooms.length} Rooms</Text>
                </View>
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statVal}>{totalCapacity}</Text>
                  <Text style={styles.statLbl}>Total Beds</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statVal}>{totalOccupied}</Text>
                  <Text style={styles.statLbl}>Occupied</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={[styles.statVal, { color: colors.success }]}>
                    {availableBeds}
                  </Text>
                  <Text style={styles.statLbl}>Available</Text>
                </View>
              </View>

              {hostelRooms.length > 0 && (
                <View style={styles.roomsList}>
                  <Text style={styles.roomsListTitle}>Sample Rooms:</Text>
                  <View style={styles.roomChipsWrap}>
                    {hostelRooms.slice(0, 8).map((r) => (
                      <View key={r._id} style={styles.roomChip}>
                        <Text style={styles.roomChipText}>Room {r.roomNumber}</Text>
                        <StatusBadge
                          status={r.status}
                          style={{ paddingHorizontal: 4, paddingVertical: 2 }}
                        />
                      </View>
                    ))}
                    {hostelRooms.length > 8 && (
                      <View style={styles.moreChip}>
                        <Text style={styles.moreText}>
                          +{hostelRooms.length - 8} more
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </Card>
          );
        }}
      />
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
    marginBottom: 14,
  },
  hostelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.infoBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 22,
  },
  headerText: {
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
  roomCountPill: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  roomCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginVertical: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.borderLight,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  statLbl: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  roomsList: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  roomsListTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 8,
  },
  roomChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  roomChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },
  roomChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  moreChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.borderLight,
    justifyContent: 'center',
  },
  moreText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
});

export default WardenHostelsScreen;
