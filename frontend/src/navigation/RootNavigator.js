import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../theme/colors';
import LoadingState from '../components/LoadingState';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/auth/LoginScreen';
import StudentNavigator from './StudentNavigator';
import WardenNavigator from './WardenNavigator';
import AdminNavigator from './AdminNavigator';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { user, token, role, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingState message="Initializing Hostel Management..." />
      </View>
    );
  }

  // Not authenticated: render Login screen
  if (!token || !user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  // Role-based routing: mounts ONLY the authorized navigator
  if (role === 'admin') {
    return <AdminNavigator />;
  }

  if (role === 'warden') {
    return <WardenNavigator />;
  }

  // Default to Student role
  return <StudentNavigator />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default RootNavigator;
