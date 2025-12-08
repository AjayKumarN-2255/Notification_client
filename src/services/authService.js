import api from './api';

export const Login = async (payload) => {
  const response = await api.post('/auth/login', payload, { requiresAuth: false, withCredentials: true });
  return response.data;
};

export const editAccount = async (userId, payload) => {
  const response = await api.patch(`/auth/edit-details/${userId}`, payload);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post('/auth/refresh', {}, { requiresAuth: false, withCredentials: true });
  return response.data
}

export const Logout = async () => {
  const response = await api.post('/auth/logout', {}, { requiresAuth: false, withCredentials: true });
  return response.data
}