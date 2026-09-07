import client from './client';

export const hostelApi = {
  getHostels: async () => {
    const response = await client.get('/api/hostels');
    return response.data;
  },

  createHostel: async ({ name, location, totalRooms }) => {
    const response = await client.post('/api/hostels', {
      name,
      location,
      totalRooms: Number(totalRooms),
    });
    return response.data;
  },
};

export default hostelApi;
