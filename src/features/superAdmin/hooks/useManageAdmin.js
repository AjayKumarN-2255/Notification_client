import { useState, useEffect } from "react";
import { addAdmin, editAdmin } from "../../../services/adminService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useManageAdmin() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const [show, setShow] = useState(false);

    const handleEdit = (adminId) => {
        navigate(`/superadmin/edit-admin/${adminId}`)
    }

    useEffect(() => {
        if (shouldNavigate) {
            navigate('/superadmin/dashboard');
        }
    }, [shouldNavigate, navigate]);

    async function handleAddAdmin(payLoad) {
        try {
            setError(null);
            setLoading(true);
            const res = await addAdmin(payLoad);
            if (res.success) {
                setShouldNavigate(true);
            }
        } catch (err) {
            const message = err?.response?.data?.message || "Failed to add admin";
            toast.error(message);
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    async function handleEditAdmin(payLoad) {

        try {
            setError(null);
            setLoading(true);
            const { adminId, ...reqBody } = payLoad
            const res = await editAdmin(reqBody, adminId);
            if (res.success) {
                setShouldNavigate(true);
            }
        } catch (err) {
            const message = err?.response?.data?.message || "Failed to edit admin";
            toast.error(message);
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return {
        handleAddAdmin, error, loading, show,
        setShow, handleEdit, handleEditAdmin
    }
}


export default useManageAdmin;