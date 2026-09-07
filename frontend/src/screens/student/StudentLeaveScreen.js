import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const StudentLeaveScreen = () => {
  return (
    <PendingFeatureScreen
      title="Leave & Gate Pass"
      subtitle="Outstation & Day Passes"
      role="student"
      description="Apply for home leave, day passes, or emergency departure with digital warden approval workflows."
      plannedFeatures={[
        {
          name: 'Leave Application Form',
          description: 'Submit departure date, return date, destination, reason, and parent consent.',
        },
        {
          name: 'Digital Gate Pass',
          description: 'QR-coded electronic pass for security guards at the hostel entry/exit gates.',
        },
        {
          name: 'Real-time Approval Status',
          description: 'Instant notification upon warden approval or rejection.',
        },
      ]}
    />
  );
};

export default StudentLeaveScreen;
