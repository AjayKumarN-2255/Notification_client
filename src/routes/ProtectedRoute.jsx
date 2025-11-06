import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
function ProtectedRoute({ allowedRoles }) {
    const { isAuthenticated, user, sessionChecked } = useSelector(state => state.auth);
    if (!sessionChecked) {
        return (
            <div className="w-full h-screen items-center justify-center">
                <Loader />
            </div>
        );
    }
    if (!isAuthenticated || !allowedRoles.includes(user?.role)) {
        return <Navigate to={'/'} />
    }
    return <Outlet />;

}

export default ProtectedRoute;