import client from './client';

export const allocationApi = {
  getAllocations: async () => {
    const response = await client.get('/api/room-allocations');
    return response.data;
  },

  allocateRoom: async ({ student, room }) => {
    const response = await client.post('/api/room-allocations', {
      student,
      room,
    });
    return response.data;
  },
};

export default allocationApi;
