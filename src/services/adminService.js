import api from './api';

export const getAllAdmins = async () => {
    const response = await api.get('/admin');
    return response.data;
};

export const addAdmin = async (payLoad) => {
    const response = await api.post('/admin', payLoad)
    return response.data;
}

export const editAdmin = async (payLoad, adminId) => {
    const response = await api.patch(`/admin/${adminId}`, payLoad)
    return response.data;
}

export const deleteAdmin = async (adminId) => {
    const response = await api.delete(`/admin/${adminId}`)
    return response.data;
}

export const addCategory = async (payLoad) => {
    const response = await api.post('/category', payLoad);
    return response.data;
}

export const deleteCategory = async (payLoad) => {
    const response = await api.delete(`/category?category=${payLoad}`);
    return response.data;
}