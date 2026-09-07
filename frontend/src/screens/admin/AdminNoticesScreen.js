import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const AdminNoticesScreen = () => {
  return (
    <PendingFeatureScreen
      title="Hostel Circulars & Bulletins"
      subtitle="Administrative Notices"
      role="admin"
      description="Create, publish, and target administrative notices, mess schedule changes, fee deadlines, and hostel rules across the entire resident body."
      plannedFeatures={[
        {
          name: 'Publish Campus Notice',
          description: 'Draft circulars with attachments, priority tags, and targeted hostel wings.',
        },
        {
          name: 'Broadcast Push Alerts',
          description: 'Deliver instant notification banners to resident mobile devices.',
        },
        {
          name: 'Notice Archival & Expiration',
          description: 'Automatically archive time-sensitive circulars once deadlines pass.',
        },
      ]}
    />
  );
};

export default AdminNoticesScreen;
