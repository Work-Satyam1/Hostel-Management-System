import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const WardenComplaintsScreen = () => {
  return (
    <PendingFeatureScreen
      title="Hostel Grievances & Maintenance"
      subtitle="Issue Resolution"
      role="warden"
      description="Manage resident complaints, assign work orders to campus maintenance contractors, and verify task completion."
      plannedFeatures={[
        {
          name: 'Complaints Inbox',
          description: 'Categorized by urgency, floor, block, and trade (electrical/plumbing/carpentry).',
        },
        {
          name: 'Assign Staff',
          description: 'Dispatch maintenance technicians and set resolution target dates.',
        },
        {
          name: 'Resolution Confirmation',
          description: 'Mark issues as resolved upon physical inspection or student sign-off.',
        },
      ]}
    />
  );
};

export default WardenComplaintsScreen;
