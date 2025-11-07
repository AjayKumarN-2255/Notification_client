import { useState } from "react";
import { addAdmin } from "../../../services/adminService"
import { useNavigate } from "react-router-dom";


function useAddAdmin() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleAddAdmin(payLoad) {
        try {
            setError(null);
            setLoading(true);
            const res = await addAdmin(payLoad)
            if (res.success) {
                navigate('/superadmin/dashboard');
            }
        } catch (err) {
            console.log("error from add admin", (err?.response?.data?.message || "Failed to add admin"));
            const status = err?.response?.status;

            if (status === 401) return null;

            const message = err?.response?.data?.message || "Failed to add admin";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return { handleAddAdmin, error, loading }
}


export default useAddAdmin;