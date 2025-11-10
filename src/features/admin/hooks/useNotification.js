import { useState, useEffect } from "react";
import { getAllNotification, toggleSnooze, toggleStop, deleteNotification } from "../../../services/notificationService";
import toast from "react-hot-toast";

export default function useNotification() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, nId: null, title: "" });

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
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Failed to snooze notifications")
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
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Failed to stop notifications")
        }
    }

    const handleModal = (nId, title) => {
        setDeleteModal({ show: true, nId, title });
    }

    const handleDelete = async (nId) => {
        try {
            const { data } = await deleteNotification(nId);
            setData((prev) => {
                return prev.filter((notific) => {
                    return notific._id !== data.nId;
                })
            });
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Failed to delete notifications")
        }
    }


    return {
        data, loading, error, deleteModal,
        handleSnooze, handleStop, handleModal,
        setDeleteModal, handleDelete
    };
}