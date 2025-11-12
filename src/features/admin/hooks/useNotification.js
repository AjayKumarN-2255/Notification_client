import { useState, useEffect } from "react";
import {
    getAllNotification, toggleSnooze,
    toggleStop, deleteNotification,
    addNotification
} from "../../../services/notificationService";
import { addCategory } from "../../../services/adminService"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useNotification(options) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, nId: null, title: "" });

    const [newCat, setNewCat] = useState("");
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate();

    const autoFetch = options?.autoFetch ?? true;

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
        if (autoFetch) {
            fetchNotifications();
        }
    }, [autoFetch]);


    useEffect(() => {
        if (shouldNavigate) {
            navigate('/superadmin/dashboard');
        }
    }, [shouldNavigate, navigate]);

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

    const handleAddNotification = async (payLoad) => {

        payLoad.category_names = payLoad.category_names?.map(cat => cat.value);
        payLoad.notify_user_list = payLoad.notify_user_list?.map(cat => cat.value);
        payLoad.notify_before = payLoad.notify_before.number * payLoad.notify_before.unit;
        try {
            const res = await addNotification(payLoad);
            if (res.success) {
                setShouldNavigate(true);
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Failed to add notifications")
        }
    }

    const handleAddCategory = async (catName, setCategory) => {
        try {
            const { data } = await addCategory({ name: catName });
            setCategory((prev) => {
                return [...prev, data]
            });
            toast.success('category added successfully')
            setNewCat("");
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Failed to add category")
        }
    }


    return {
        data, loading, error, deleteModal,
        handleSnooze, handleStop, handleModal,
        setDeleteModal, handleDelete, handleAddNotification,
        handleAddCategory, newCat, setNewCat
    };
}