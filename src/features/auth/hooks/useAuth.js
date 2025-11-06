import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setCredentials, setLoading, setError } from "../../../store/slices/authSlice"
import { Login } from "../../../services/authService"

function useAuth() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error } = useSelector(state => state.auth);

    useEffect(() => {
        let timer;
        if (error) {
            timer = setTimeout(() => {
                dispatch(setError(null));
            }, 2000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [error, dispatch]);

    async function handleLogin(payload) {
        try {
            dispatch(setLoading(true));
            const res = await Login(payload);
            if (res.success) {
                const { accessToken, user } = res;
                dispatch(setCredentials({ accessToken, user }));
                switch (user?.role) {
                    case 'admin': navigate('/admin/dashboard');
                        return;
                    case 'super-admin': navigate('/superadmin/dashboard');
                        return;
                    default: navigate('/admin/dashboard');
                        return;
                }
            }
        } catch (error) {
            dispatch(setError(error.response?.data?.message || error.message));
            setTimeout(() => {
                dispatch(setError(null));
            }, 2000);
        }
    }
    return { handleLogin }
}

export default useAuth;