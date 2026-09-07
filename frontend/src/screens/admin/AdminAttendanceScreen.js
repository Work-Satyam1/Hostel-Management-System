import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const AdminAttendanceScreen = () => {
  return (
    <PendingFeatureScreen
      title="Attendance & Security Audit"
      subtitle="Campus-wide Attendance"
      role="admin"
      description="Administrative monitoring of student curfew adherence, GPS geofencing radius configuration, and automated attendance metrics across all hostels."
      plannedFeatures={[
        {
          name: 'Campus-wide Attendance Analytics',
          description: 'Percentage rates, defaulter summaries, and daily trends.',
        },
        {
          name: 'Geofence Perimeter Setup',
          description: 'Configure latitude/longitude boundaries and tolerance radius per hostel block.',
        },
        {
          name: 'Export Attendance Reports',
          description: 'Generate monthly CSV and PDF logs for university compliance.',
        },
      ]}
    />
  );
};

export default AdminAttendanceScreen;
