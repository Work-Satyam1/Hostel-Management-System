import client from './client';

export const adminApi = {
  createStudent: async ({ name, email, password }) => {
    const response = await client.post('/api/admin/students', {
      name,
      email,
      password,
    });
    return response.data;
  },

  createWarden: async ({ name, email, password, employeeId, phone, hostel }) => {
    const response = await client.post('/api/admin/wardens', {
      name,
      email,
      password,
      employeeId,
      phone,
      hostel,
    });
    return response.data;
  },
};

export default adminApi;
