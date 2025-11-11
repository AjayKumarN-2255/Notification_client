import { useState, useEffect } from "react";
import { addAdmin } from "../../../services/adminService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useAddAdmin() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [shouldNavigate, setShouldNavigate] = useState(false);

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

    return { handleAddAdmin, error, loading }
}


export default useAddAdmin;