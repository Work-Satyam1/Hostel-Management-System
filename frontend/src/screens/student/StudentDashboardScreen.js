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

export const StudentDashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: 'Student Profile',
      subtitle: 'Complete or update student record',
      route: 'StudentProfile',
      icon: '👤',
      isFunctional: true,
    },
    {
      title: 'My Room',
      subtitle: 'View allocated room details & status',
      route: 'MyRoom',
      icon: '🛏️',
      isFunctional: true,
    },
    {
      title: 'Hostels Directory',
      subtitle: 'Explore campus hostels and locations',
      route: 'StudentHostels',
      icon: '🏢',
      isFunctional: true,
    },
    {
      title: 'Attendance',
      subtitle: 'Daily check-in & GPS verification',
      route: 'StudentAttendance',
      icon: '📍',
      isFunctional: false,
    },
    {
      title: 'Leave / Gate Pass',
      subtitle: 'Apply for home leave & overnight pass',
      route: 'StudentLeave',
      icon: '🎫',
      isFunctional: false,
    },
    {
      title: 'Complaints',
      subtitle: 'Lodge room or facility complaints',
      route: 'StudentComplaints',
      icon: '🛠️',
      isFunctional: false,
    },
    {
      title: 'Notices',
      subtitle: 'Important announcements and circulars',
      route: 'StudentNotices',
      icon: '📢',
      isFunctional: false,
    },
    {
      title: 'Notifications',
      subtitle: 'Alerts and real-time messages',
      route: 'StudentNotifications',
      icon: '🔔',
      isFunctional: false,
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Student Portal"
        subtitle={`Welcome, ${user?.name || 'Student'}`}
        role="student"
        rightActionLabel="Logout"
        onRightAction={logout}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {/* User Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.name || 'Student'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'N/A'}</Text>
              <View style={styles.badgeRow}>
                <StatusBadge status="student" label="Resident Student" />
              </View>
            </View>
          </View>
        </Card>

        {/* Modules Grid / List */}
        <Text style={styles.sectionHeader}>Hostel Services</Text>

        {menuItems.map((item, index) => (
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
                    {item.isFunctional ? (
                      <StatusBadge status="active" label="Live API" />
                    ) : (
                      <StatusBadge status="pending" label="Pending API" />
                    )}
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
    paddingBottom: 32,
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
    fontSize: 15,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginVertical: 12,
  },
  menuCard: {
    marginBottom: 10,
    padding: 14,
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

export default StudentDashboardScreen;
