import api from "./api";


export const getAllNotification = async () => {
    const response = await api.get('/notification');
    return response.data;
}