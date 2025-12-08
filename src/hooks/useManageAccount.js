/* eslint-disable no-unused-vars */
import { useState } from "react";
import { editAccount } from "../services/authService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from '../store/slices/authSlice'

function useManageAccount() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleAccount = async (payLoad, reset) => {
        try {
            setError(null);
            setLoading(true);
            const { userId, email, username, ...reqBody } = payLoad
            const res = await editAccount(userId, reqBody);
            if (res.success) {
                const { __v, ...user } = res.data;
                reset({
                    username: user.username || "",
                    email: user.email || "",
                    phone: user.phone || "",
                    password: "",
                    new_password: ""
                });
                dispatch(setUser(user));
                toast.success("user details updated");
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