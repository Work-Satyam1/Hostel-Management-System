import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Header from '../../components/Header';
import StatusBadge from '../../components/StatusBadge';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const functionalModules = [
    {
      title: 'Hostels Management',
      subtitle: 'View, register, and manage hostel blocks',
      route: 'AdminHostels',
      icon: '🏢',
    },
    {
      title: 'Rooms Management',
      subtitle: 'Create rooms, configure floor, capacity & status',
      route: 'AdminRooms',
      icon: '🚪',
    },
    {
      title: 'Room Allocations',
      subtitle: 'Assign rooms to students & review bed occupancy',
      route: 'AdminAllocations',
      icon: '🛏️',
    },
    {
      title: 'Create Student Account',
      subtitle: 'Register student user with verified credentials',
      route: 'AdminCreateStudent',
      icon: '🎓',
    },
    {
      title: 'Create Warden Account',
      subtitle: 'Register warden with employee ID & assigned block',
      route: 'AdminCreateWarden',
      icon: '🛡️',
    },
  ];

  const pendingModules = [
    {
      title: 'Attendance Overview',
      subtitle: 'Campus-wide attendance logs & curfew reports',
      route: 'AdminAttendance',
      icon: '📋',
    },
    {
      title: 'Leave Administration',
      subtitle: 'Institution-wide leave records & gate statistics',
      route: 'AdminLeave',
      icon: '🎫',
    },
    {
      title: 'Complaints System',
      subtitle: 'Grievance escalation and maintenance audit',
      route: 'AdminComplaints',
      icon: '🛠️',
    },
    {
      title: 'Circulars & Notices',
      subtitle: 'Broadcast official campus-wide announcements',
      route: 'AdminNotices',
      icon: '📢',
    },
    {
      title: 'Notifications',
      subtitle: 'System-wide push alerts and logs',
      route: 'AdminNotifications',
      icon: '🔔',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Admin Console"
        subtitle={`Logged in as ${user?.name || 'Administrator'}`}
        role="admin"
        rightActionLabel="Logout"
        onRightAction={logout}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Admin Identity Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.name || 'System Admin'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'N/A'}</Text>
              <View style={styles.badgeRow}>
                <StatusBadge status="admin" label="Super Administrator" />
              </View>
            </View>
          </View>
        </Card>

        {/* Live Functional Modules */}
        <Text style={styles.sectionHeader}>Live Backend Modules</Text>
        {functionalModules.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.route)}
          >
            <Card style={styles.menuCard}>
              <View style={styles.menuRow}>
                <View style={styles.iconBox}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                </View>
                <View style={styles.menuTextCol}>
                  <View style={styles.titleLine}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <StatusBadge status="active" label="Live API" />
                  </View>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        {/* Planned / Pending Modules */}
        <Text style={[styles.sectionHeader, { marginTop: 18 }]}>
          Planned Modules (Integration Pending)
        </Text>
        {pendingModules.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.route)}
          >
            <Card style={[styles.menuCard, styles.pendingCard]}>
              <View style={styles.menuRow}>
                <View style={[styles.iconBox, styles.pendingIconBox]}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                </View>
                <View style={styles.menuTextCol}>
                  <View style={styles.titleLine}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <StatusBadge status="pending" label="Pending API" />
                  </View>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badgeRow: {
    marginTop: 6,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginVertical: 10,
  },
  menuCard: {
    marginBottom: 10,
    padding: 14,
  },
  pendingCard: {
    backgroundColor: colors.card,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  pendingIconBox: {
    backgroundColor: colors.pendingBg,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuTextCol: {
    flex: 1,
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  arrowText: {
    fontSize: 22,
    color: colors.textMuted,
    fontWeight: '300',
  },
});

export default AdminDashboardScreen;
