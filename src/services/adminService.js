import api from './api';

export const getAllAdmins = async () => {
    const response = await api.get('/admin');
    return response.data;
};

export const addAdmin = async (payLoad) => {
    const response = await api.post('/admin', payLoad)
    return response.data;
}