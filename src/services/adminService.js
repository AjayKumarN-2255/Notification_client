import api from './api';

export const getAllAdmins = async () => {
    const response = await api.get('/admin');
    return response.data;
};