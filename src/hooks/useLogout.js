import { useDispatch } from "react-redux";
import { logout, setError } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Logout } from '../services/authService'

export default function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await Logout();
            if(res && res.success){
                dispatch(logout()); 
                navigate('/');
            }
        } catch (error) {
            dispatch(setError(error?.response?.data?.message || error.message));
            console.log("logout error-->", (error?.response?.data?.message || error.message));
        }
    };

    return { handleLogout };
}
