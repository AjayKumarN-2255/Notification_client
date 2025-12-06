/* eslint-disable no-unused-vars */
import { useState } from "react";
import { editAccount } from "../services/authService";
import toast from "react-hot-toast";

function useManageAccount() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleAccount = async (payLoad) => {
        try {
            setError(null);
            setLoading(true);
            const { userId, email, username, ...reqBody } = payLoad
            const res = await editAccount(userId, reqBody);
            if (res.success) {
                console.log(res)
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
        loading, error, handleAccount
    }
}

export default useManageAccount;