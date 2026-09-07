import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { getErrorMessage } from '../../utils/errorHandler';

export const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await login(email.trim(), password);
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@hostel.com');
    setPassword('Admin@123');
    setError(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerArea}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🏨</Text>
          </View>
          <Text style={styles.appTitle}>Hostel Management</Text>
          <Text style={styles.appSubtitle}>Sign in to access your portal</Text>
        </View>

        <Card style={styles.card}>
          <Text style={styles.formTitle}>Account Login</Text>

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{error}</Text>
            </View>
          )}

          <Input
            label="Email Address"
            placeholder="e.g. admin@hostel.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError(null);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError(null);
            }}
            secureTextEntry
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.submitBtn}
          />
        </Card>

        {/* Quick Demo Fill Helper */}
        <Card style={styles.demoCard}>
          <Text style={styles.demoTitle}>Quick Access</Text>
          <Text style={styles.demoText}>
            Default seed admin credentials from backend setup:
          </Text>
          <Button
            title="Fill Default Admin (admin@hostel.com)"
            onPress={fillDemoAdmin}
            variant="outline"
            style={styles.demoBtn}
          />
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Hostel Management System • Role-Based Portal
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 32,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.secondary,
  },
  appSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  card: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  errorBanner: {
    backgroundColor: colors.dangerBg,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  errorBannerText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  submitBtn: {
    marginTop: 8,
  },
  demoCard: {
    marginTop: 12,
    padding: 16,
    backgroundColor: colors.borderLight,
    borderColor: colors.border,
  },
  demoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  demoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  demoBtn: {
    paddingVertical: 10,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});

export default LoginScreen;
