import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const StudentComplaintsScreen = () => {
  return (
    <PendingFeatureScreen
      title="Complaints & Grievances"
      subtitle="Issue Resolution"
      role="student"
      description="Report maintenance issues, electrical problems, plumbing faults, Wi-Fi outages, or general hostel grievances."
      plannedFeatures={[
        {
          name: 'Lodge New Complaint',
          description: 'Categorize by electrical, carpentry, plumbing, hygiene, or security.',
        },
        {
          name: 'Complaint Lifecycle Tracking',
          description: 'Track progress across Open, In-Progress, and Resolved statuses.',
        },
        {
          name: 'Feedback & Ratings',
          description: 'Rate the quality of resolution after maintenance staff completes the work.',
        },
      ]}
    />
  );
};

export default StudentComplaintsScreen;
