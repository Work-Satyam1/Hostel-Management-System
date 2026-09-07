import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const AdminComplaintsScreen = () => {
  return (
    <PendingFeatureScreen
      title="Grievance & Maintenance Oversight"
      subtitle="Administrative Control"
      role="admin"
      description="Monitor institutional maintenance performance, average ticket resolution duration, contractor SLAs, and student satisfaction feedback."
      plannedFeatures={[
        {
          name: 'Resolution SLA Monitoring',
          description: 'Tracks open grievances exceeding 48-hour resolution guidelines.',
        },
        {
          name: 'Vendor & Contractor Allocation',
          description: 'Manage contracted repair agencies and budget allocations.',
        },
        {
          name: 'Category Analytics',
          description: 'Identifies recurring issues across infrastructure, water, and electricity.',
        },
      ]}
    />
  );
};

export default AdminComplaintsScreen;
