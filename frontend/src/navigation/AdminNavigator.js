import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../theme/colors';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminHostelsScreen from '../screens/admin/AdminHostelsScreen';
import AdminRoomsScreen from '../screens/admin/AdminRoomsScreen';
import AdminAllocationsScreen from '../screens/admin/AdminAllocationsScreen';
import AdminCreateStudentScreen from '../screens/admin/AdminCreateStudentScreen';
import AdminCreateWardenScreen from '../screens/admin/AdminCreateWardenScreen';
import AdminAttendanceScreen from '../screens/admin/AdminAttendanceScreen';
import AdminLeaveScreen from '../screens/admin/AdminLeaveScreen';
import AdminComplaintsScreen from '../screens/admin/AdminComplaintsScreen';
import AdminNoticesScreen from '../screens/admin/AdminNoticesScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';

const Stack = createNativeStackNavigator();

export const AdminNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminDashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AdminHostels"
        component={AdminHostelsScreen}
        options={{ title: 'Hostels Management' }}
      />
      <Stack.Screen
        name="AdminRooms"
        component={AdminRoomsScreen}
        options={{ title: 'Rooms Management' }}
      />
      <Stack.Screen
        name="AdminAllocations"
        component={AdminAllocationsScreen}
        options={{ title: 'Room Allocations' }}
      />
      <Stack.Screen
        name="AdminCreateStudent"
        component={AdminCreateStudentScreen}
        options={{ title: 'Register Student' }}
      />
      <Stack.Screen
        name="AdminCreateWarden"
        component={AdminCreateWardenScreen}
        options={{ title: 'Register Warden' }}
      />
      <Stack.Screen
        name="AdminAttendance"
        component={AdminAttendanceScreen}
        options={{ title: 'Attendance Oversight' }}
      />
      <Stack.Screen
        name="AdminLeave"
        component={AdminLeaveScreen}
        options={{ title: 'Leave Administration' }}
      />
      <Stack.Screen
        name="AdminComplaints"
        component={AdminComplaintsScreen}
        options={{ title: 'Complaints System' }}
      />
      <Stack.Screen
        name="AdminNotices"
        component={AdminNoticesScreen}
        options={{ title: 'Campus Circulars' }}
      />
      <Stack.Screen
        name="AdminNotifications"
        component={NotificationsScreen}
        initialParams={{ role: 'admin' }}
        options={{ title: 'System Notifications' }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
