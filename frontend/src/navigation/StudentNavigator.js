import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../theme/colors';

import StudentDashboardScreen from '../screens/student/StudentDashboardScreen';
import StudentProfileScreen from '../screens/student/StudentProfileScreen';
import MyRoomScreen from '../screens/student/MyRoomScreen';
import StudentHostelsScreen from '../screens/student/StudentHostelsScreen';
import StudentAttendanceScreen from '../screens/student/StudentAttendanceScreen';
import StudentLeaveScreen from '../screens/student/StudentLeaveScreen';
import StudentComplaintsScreen from '../screens/student/StudentComplaintsScreen';
import StudentNoticesScreen from '../screens/student/StudentNoticesScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';

const Stack = createNativeStackNavigator();

export const StudentNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StudentDashboard"
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
        name="StudentDashboard"
        component={StudentDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentProfile"
        component={StudentProfileScreen}
        options={{ title: 'Student Profile' }}
      />
      <Stack.Screen
        name="MyRoom"
        component={MyRoomScreen}
        options={{ title: 'My Allocated Room' }}
      />
      <Stack.Screen
        name="StudentHostels"
        component={StudentHostelsScreen}
        options={{ title: 'Hostels Directory' }}
      />
      <Stack.Screen
        name="StudentAttendance"
        component={StudentAttendanceScreen}
        options={{ title: 'Attendance' }}
      />
      <Stack.Screen
        name="StudentLeave"
        component={StudentLeaveScreen}
        options={{ title: 'Leave & Gate Pass' }}
      />
      <Stack.Screen
        name="StudentComplaints"
        component={StudentComplaintsScreen}
        options={{ title: 'Complaints' }}
      />
      <Stack.Screen
        name="StudentNotices"
        component={StudentNoticesScreen}
        options={{ title: 'Hostel Notices' }}
      />
      <Stack.Screen
        name="StudentNotifications"
        component={NotificationsScreen}
        initialParams={{ role: 'student' }}
        options={{ title: 'Notifications' }}
      />
    </Stack.Navigator>
  );
};

export default StudentNavigator;
