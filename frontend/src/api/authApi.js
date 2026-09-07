import client from './client';

export const authApi = {
  login: async (email, password) => {
    const response = await client.post('/api/auth/login', { email, password });
    return response.data;
  },

  getMe: async () => {
    const response = await client.get('/api/auth/me');
    return response.data;
  },
};

export default authApi;
