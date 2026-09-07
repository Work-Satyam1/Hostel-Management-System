import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const WardenNoticesScreen = () => {
  return (
    <PendingFeatureScreen
      title="Hostel Notices"
      subtitle="Hostel Bulletins"
      role="warden"
      description="Publish block circulars, notify residents of inspection dates, mess routine changes, and maintenance schedules."
      plannedFeatures={[
        {
          name: 'Create Block Notice',
          description: 'Draft announcements targeted specifically to residents of assigned hostel.',
        },
        {
          name: 'Emergency Broadcast',
          description: 'Send high-urgency notifications directly to resident devices.',
        },
        {
          name: 'Notice Archive',
          description: 'Review historical bulletins and inspection advisories.',
        },
      ]}
    />
  );
};

export default WardenNoticesScreen;
