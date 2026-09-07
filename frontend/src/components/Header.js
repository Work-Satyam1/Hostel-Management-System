import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';
import StatusBadge from './StatusBadge';

export const Header = ({ title, subtitle, role, rightAction, rightActionLabel, onRightAction }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.rightContainer}>
          {role && <StatusBadge status={role} />}
          {rightAction}
          {rightActionLabel && onRightAction && (
            <TouchableOpacity onPress={onRightAction} style={styles.actionBtn}>
              <Text style={styles.actionText}>{rightActionLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: colors.borderLight,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default Header;
