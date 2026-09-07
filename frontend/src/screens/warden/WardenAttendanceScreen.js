import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const WardenAttendanceScreen = () => {
  return (
    <PendingFeatureScreen
      title="Attendance Monitoring"
      subtitle="Curfew & Night Roll-Call"
      role="warden"
      description="Monitor evening attendance, verify GPS check-ins, identify absent students, and generate attendance reports."
      plannedFeatures={[
        {
          name: 'Live Attendance Dashboard',
          description: 'Real-time head count of students checked in vs pending check-in.',
        },
        {
          name: 'Manual Override & Roll Call',
          description: 'Mark physical attendance during hostel room inspections.',
        },
        {
          name: 'Defaulter Alerts',
          description: 'Instant SMS or automated alerts to parents of students absent after curfew.',
        },
      ]}
    />
  );
};

export default WardenAttendanceScreen;
