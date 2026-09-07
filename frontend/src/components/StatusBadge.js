import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export const StatusBadge = ({ status = 'active', label, style }) => {
  const normalized = String(status).toLowerCase();

  let bg = colors.borderLight;
  let text = colors.textSecondary;

  switch (normalized) {
    case 'active':
    case 'available':
      bg = colors.successBg;
      text = colors.success;
      break;
    case 'full':
    case 'danger':
      bg = colors.dangerBg;
      text = colors.danger;
      break;
    case 'maintenance':
    case 'warning':
      bg = colors.warningBg;
      text = colors.warning;
      break;
    case 'pending':
    case 'coming soon':
      bg = colors.pendingBg;
      text = colors.pending;
      break;
    case 'admin':
      bg = colors.primaryLight;
      text = colors.primary;
      break;
    case 'warden':
      bg = colors.infoBg;
      text = colors.info;
      break;
    case 'student':
      bg = colors.borderLight;
      text = colors.secondary;
      break;
  }

  const displayText = label || status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.text, { color: text }]}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default StatusBadge;
