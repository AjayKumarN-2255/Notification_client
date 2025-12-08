import { useState, useEffect } from "react";
import {
    getAllNotification, toggleSnooze,
    toggleStop, deleteNotification,
    addNotification
} from "../../../services/notificationService";
import { addCategory, deleteCategory } from "../../../services/adminService";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { NOTIFY_BEFORE_OPTIONS } from "../../../utils/constants";

export default function useNotification(options) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ show: false, nId: null, title: "" });

    const [shouldNavigate, setShouldNavigate] = useState(false);
    const [newCat, setNewCat] = useState("");


    const navigate = useNavigate();
    const location = useLocation();

    const autoFetch = options?.autoFetch ?? true;

    const getQueryParam = (paramName, isArray = true) => {
        const params = new URLSearchParams(location.search);
        const value = params.get(paramName);

        if (!value) return isArray ? [] : "";

        if (isArray) {
            return value.split(",").map((v) => v.trim()).filter(Boolean);
        } else {
            return value;
        }
    };

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const Querycat = getQueryParam("categories");
            const Querysearch = getQueryParam("searchTerm", false);
            const QueryFrom = getQueryParam("from", false);
            const QueryTo = getQueryParam("to", false);
            const { data } = await getAllNotification(Querycat, Querysearch, QueryFrom, QueryTo);
            setData(data);
            await delay(500);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch notifications");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchNotifications();
        }
    }, [autoFetch, location]);


    useEffect(() => {
        if (shouldNavigate) {
            navigate('/admin/dashboard');
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
        payLoad.notify_user_list = (payLoad.notify_user_list?.map(cat => cat.value)) || [];
        const selectedOption = NOTIFY_BEFORE_OPTIONS.find(opt => opt.value === payLoad.notify_before.unit);
        payLoad.notify_before_unit = selectedOption?.label;
        const selectedNotificGap = NOTIFY_BEFORE_OPTIONS.find(opt => opt.value === payLoad.notification_frequency.unit);
        payLoad.notific_gap_unit = selectedNotificGap?.label;
        payLoad.notify_before = payLoad.notify_before.number;
        payLoad.notification_frequency = payLoad.notification_frequency.number;

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

    const handleDeleteCategory = async (catName, setCategory) => {
        try {
            const res = await deleteCategory(catName);
            if (res.success) {
                setCategory((prev) => {
                    return prev.filter((each) => each.name != catName)
                });
                toast.success('category deleted successfully');
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Failed to delete category")
        }
    }


    return {
        data, loading, error, deleteModal,
        handleSnooze, handleStop, handleModal,
        setDeleteModal, handleDelete, handleAddNotification,
        handleAddCategory, newCat, setNewCat, handleDeleteCategory
    };
}