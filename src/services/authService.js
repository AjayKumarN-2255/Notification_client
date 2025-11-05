import api from './api';

export const Login = async (payload) => {
  const response = await api.post('/auth/login', payload, { requiresAuth: false });
  return response.data;
};
