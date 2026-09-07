import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../theme/colors';

import WardenDashboardScreen from '../screens/warden/WardenDashboardScreen';
import WardenHostelsScreen from '../screens/warden/WardenHostelsScreen';
import WardenStudentsScreen from '../screens/warden/WardenStudentsScreen';
import WardenAttendanceScreen from '../screens/warden/WardenAttendanceScreen';
import WardenLeaveScreen from '../screens/warden/WardenLeaveScreen';
import WardenComplaintsScreen from '../screens/warden/WardenComplaintsScreen';
import WardenNoticesScreen from '../screens/warden/WardenNoticesScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';

const Stack = createNativeStackNavigator();

export const WardenNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WardenDashboard"
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
        name="WardenDashboard"
        component={WardenDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WardenHostels"
        component={WardenHostelsScreen}
        options={{ title: 'Hostel & Rooms Overview' }}
      />
      <Stack.Screen
        name="WardenStudents"
        component={WardenStudentsScreen}
        options={{ title: 'Resident Students' }}
      />
      <Stack.Screen
        name="WardenAttendance"
        component={WardenAttendanceScreen}
        options={{ title: 'Attendance Monitoring' }}
      />
      <Stack.Screen
        name="WardenLeave"
        component={WardenLeaveScreen}
        options={{ title: 'Leave & Gate Pass' }}
      />
      <Stack.Screen
        name="WardenComplaints"
        component={WardenComplaintsScreen}
        options={{ title: 'Complaints Management' }}
      />
      <Stack.Screen
        name="WardenNotices"
        component={WardenNoticesScreen}
        options={{ title: 'Hostel Notices' }}
      />
      <Stack.Screen
        name="WardenNotifications"
        component={NotificationsScreen}
        initialParams={{ role: 'warden' }}
        options={{ title: 'Notifications' }}
      />
    </Stack.Navigator>
  );
};

export default WardenNavigator;
