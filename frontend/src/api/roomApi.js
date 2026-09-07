import client from './client';

export const roomApi = {
  getRooms: async () => {
    const response = await client.get('/api/rooms');
    return response.data;
  },

  createRoom: async ({ hostel, roomNumber, floor, capacity }) => {
    const response = await client.post('/api/rooms', {
      hostel,
      roomNumber: String(roomNumber).trim(),
      floor: Number(floor),
      capacity: Number(capacity),
    });
    return response.data;
  },
};

export default roomApi;
