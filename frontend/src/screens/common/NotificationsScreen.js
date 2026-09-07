import React from 'react';
import PendingFeatureScreen from './PendingFeatureScreen';

export const NotificationsScreen = ({ route }) => {
  const role = route?.params?.role || 'student';

  return (
    <PendingFeatureScreen
      title="Notifications"
      subtitle="Alerts & System Messages"
      role={role}
      description="Real-time hostel alerts, leave approval statuses, emergency broadcasts, and complaint tracking notifications."
      plannedFeatures={[
        {
          name: 'Hostel Announcements',
          description: 'Instant alerts from wardens and administrative staff.',
        },
        {
          name: 'Status Updates',
          description: 'Automated push notifications for leave approvals and room status changes.',
        },
        {
          name: 'Emergency Broadcasts',
          description: 'High-priority alerts sent across all registered hostel residents.',
        },
      ]}
    />
  );
};

export default NotificationsScreen;
