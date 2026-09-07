import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const AdminLeaveScreen = () => {
  return (
    <PendingFeatureScreen
      title="Leave & Gate Pass Oversight"
      subtitle="Administrative Control"
      role="admin"
      description="Supervise outstation leave approvals, security gate pass records, warden authorization decisions, and overnight student movements."
      plannedFeatures={[
        {
          name: 'Institution Outstation Ledger',
          description: 'Live count of active student leaves categorized by hostel block.',
        },
        {
          name: 'Warden Action Audit',
          description: 'Log of approvals and rejections made by individual wardens.',
        },
        {
          name: 'Gate Pass Security Synchronization',
          description: 'Integration with main university gate scanners and RFID readers.',
        },
      ]}
    />
  );
};

export default AdminLeaveScreen;
