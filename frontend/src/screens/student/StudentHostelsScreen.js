import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import hostelApi from '../../api/hostelApi';
import { getErrorMessage } from '../../utils/errorHandler';

export const StudentHostelsScreen = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <LoadingState message="Loading hostel list..." />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Hostels" subtitle="Campus Hostels" role="student" />
        <ErrorState message={error} onRetry={fetchHostels} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Hostels"
        subtitle={`${hostels.length} Registered Hostel${hostels.length === 1 ? '' : 's'}`}
        role="student"
      />

      <FlatList
        data={hostels}
        keyExtractor={(item) => item._id || item.id || item.name}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <EmptyState
            title="No Hostels Listed"
            message="There are currently no hostels listed in the system."
            actionTitle="Refresh"
            onAction={onRefresh}
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
            </View>

            <View style={styles.detailRow}>
              <View style={styles.pill}>
                <Text style={styles.pillLabel}>Total Rooms</Text>
                <Text style={styles.pillValue}>{item.totalRooms}</Text>
              </View>
            </View>
          </Card>
        )}
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
});

export default StudentHostelsScreen;
