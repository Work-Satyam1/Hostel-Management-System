import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const WardenStudentsScreen = () => {
  return (
    <PendingFeatureScreen
      title="Student Directory"
      subtitle="Resident Roster & Records"
      role="warden"
      description="View and verify resident student profiles, emergency contacts, parent details, and current room assignments."
      plannedFeatures={[
        {
          name: 'Resident Search & Filter',
          description: 'Search students by roll number, room number, or hostel block.',
        },
        {
          name: 'Emergency Dossier',
          description: 'Quick-dial buttons for student phone and emergency contact numbers.',
        },
        {
          name: 'Disciplinary & Attendance Records',
          description: 'Log conduct reports and review curfew compliance history.',
        },
      ]}
    />
  );
};

export default WardenStudentsScreen;
