import { useState, useEffect } from "react";
import { getAllNotification, toggleSnooze, toggleStop } from "../../../services/notificationService";


export default function useNotification() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const { data } = await getAllNotification();
            setData(data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleSnooze = async (nId) => {
        try {
            const { data } = await toggleSnooze(nId);
            setData((prev) => {
                return prev.map((notific) => {
                    return notific._id === data._id ? data : notific
                })
            });
        } catch (error) {
            console.log(error)
        }
    }

    const handleStop = async (nId) => {
        try {
            const { data } = await toggleStop(nId);
            setData((prev) => {
                return prev.map((notific) => {
                    return notific._id === data._id ? data : notific
                })
            });
        } catch (error) {
            console.log(error)
        }
    }


    return { data, loading, error, handleSnooze, handleStop }
}