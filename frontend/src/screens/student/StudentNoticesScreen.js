import React from 'react';
import PendingFeatureScreen from '../common/PendingFeatureScreen';

export const StudentNoticesScreen = () => {
  return (
    <PendingFeatureScreen
      title="Hostel Notices"
      subtitle="Announcements & Circulars"
      role="student"
      description="Stay updated with official notices regarding mess timings, inspection schedules, fee deadlines, and hostel rules."
      plannedFeatures={[
        {
          name: 'Official Notice Board',
          description: 'Categorized bulletins for administrative, mess, and sports events.',
        },
        {
          name: 'Important Documents',
          description: 'Downloadable rules, curfew guidelines, and fee circulars.',
        },
        {
          name: 'Priority Banners',
          description: 'Urgent notices pinned directly to student overview.',
        },
      ]}
    />
  );
};

export default StudentNoticesScreen;
