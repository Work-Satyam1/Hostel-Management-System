import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const WardenLeaveScreen = () => {
  return (
    <PendingFeatureScreen
      title="Leave & Gate Pass Approvals"
      subtitle="Outstation Management"
      role="warden"
      description="Review student leave applications, verify parent authorization, and approve or reject gate pass requests."
      plannedFeatures={[
        {
          name: 'Pending Requests Queue',
          description: 'Chronological queue of incoming leave applications awaiting warden decision.',
        },
        {
          name: 'One-Tap Approval / Rejection',
          description: 'Grant or deny leave requests with optional feedback remarks.',
        },
        {
          name: 'Active Outstation Roster',
          description: 'Current list of students away from hostel with expected return timestamps.',
        },
      ]}
    />
  );
};

export default WardenLeaveScreen;
