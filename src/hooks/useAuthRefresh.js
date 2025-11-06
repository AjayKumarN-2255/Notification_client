import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, logout, setError, setSessionChecked } from "../store/slices/authSlice";
import { refreshToken } from "../services/authService";

function useAuthRefresh() {

    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            return;
        }
        async function refreshAuth() {
            try {
                const response = await refreshToken();
                dispatch(setToken(response?.accessToken));
            } catch (error) {
                console.log("refreshToken error", error);
                if (error?.response?.status === 401) {
                    dispatch(logout())
                } else {
                    dispatch(setError(error?.message))
                }
            } finally {
                dispatch(setSessionChecked(true));
            }
        }

        refreshAuth();
    }, [dispatch, isAuthenticated])

}

export default useAuthRefresh;