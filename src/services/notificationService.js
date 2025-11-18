import api from "./api";


export const getAllNotification = async (selectedCat, searchTerm) => {

    const response = await api.get("/notification", {
        params: { categories: selectedCat, searchTerm }
    });
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

export const deleteNotification = async (nId) => {
    const response = await api.delete(`/notification/${nId}`);
    return response.data;
}

export const addNotification = async (payLoad) => {
    const response = await api.post('/notification', payLoad);
    return response.data;
}
