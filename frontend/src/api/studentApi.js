import client from './client';

export const studentApi = {
  createProfile: async ({ studentId, phone, course, semester, emergencyContact }) => {
    const payload = {
      studentId,
      phone,
      course,
      semester: Number(semester),
    };
    if (emergencyContact && (emergencyContact.name || emergencyContact.phone)) {
      payload.emergencyContact = emergencyContact;
    }
    const response = await client.post('/api/students/profile', payload);
    return response.data;
  },

  getMyRoom: async () => {
    const response = await client.get('/api/students/my-room');
    return response.data;
  },
};

export default studentApi;
