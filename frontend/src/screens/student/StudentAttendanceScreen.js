import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const StudentAttendanceScreen = () => {
  return (
    <PendingFeatureScreen
      title="Attendance & GPS"
      subtitle="Student Attendance Module"
      role="student"
      description="Mark daily hostel attendance with GPS geofencing and verify presence during designated curfew hours."
      plannedFeatures={[
        {
          name: 'Daily Check-in',
          description: 'One-tap attendance confirmation for resident students.',
        },
        {
          name: 'GPS Geofencing',
          description: 'Validates device coordinates against approved hostel boundary coordinates.',
        },
        {
          name: 'Attendance History',
          description: 'Calendar view showing present, absent, and on-leave logs.',
        },
      ]}
    />
  );
};

export default StudentAttendanceScreen;
