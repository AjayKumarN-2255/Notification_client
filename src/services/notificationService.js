import api from "./api";


export const getAllNotification = async () => {
    const response = await api.get('/notification');
    return response.data;
}

export const toggleSnooze = async (nId) => {
    const response = await api.patch(`/notification/snooze/${nId}`);
    return response.data;
}

export const toggleStop = async (nId) => {
    const response = await api.patch(`/notification/stop/${nId}`);
    return response.data;
}