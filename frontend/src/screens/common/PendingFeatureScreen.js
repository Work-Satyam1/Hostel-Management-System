import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import colors from '../../theme/colors';
import Card from '../../components/Card';
import StatusBadge from '../../components/StatusBadge';
import Header from '../../components/Header';

export const PendingFeatureScreen = ({
  title,
  subtitle,
  description,
  plannedFeatures = [],
  role = 'student',
}) => {
  return (
    <View style={styles.container}>
      <Header
        title={title}
        subtitle={subtitle || 'Feature Module'}
        role={role}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.statusCard}>
          <View style={styles.badgeRow}>
            <StatusBadge status="pending" label="Backend Integration Pending" />
          </View>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.description}>
            {description ||
              'This module is planned as part of the complete Hostel Management System specification. The backend API for this feature is currently in active development.'}
          </Text>
        </Card>

        {plannedFeatures.length > 0 && (
          <Card>
            <Text style={styles.sectionTitle}>Planned Functionality</Text>
            <Text style={styles.sectionSubtitle}>
              According to repository design & upcoming backend roadmap:
            </Text>

            {plannedFeatures.map((item, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.bulletPoint} />
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{item.name}</Text>
                  <Text style={styles.featureDesc}>{item.description}</Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        <Card style={styles.noteCard}>
          <Text style={styles.noteTitle}>Technical Note</Text>
          <Text style={styles.noteText}>
            No mock or synthetic data is stored locally. This screen and its navigation routes are structurally ready and will be connected immediately once the corresponding Express API endpoints are added to the backend.
          </Text>
        </Card>
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
  statusCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.pending,
  },
  badgeRow: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 14,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.pending,
    marginTop: 6,
    marginRight: 10,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  featureDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  noteCard: {
    backgroundColor: colors.borderLight,
    borderWidth: 0,
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  noteText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
  },
});

export default PendingFeatureScreen;
