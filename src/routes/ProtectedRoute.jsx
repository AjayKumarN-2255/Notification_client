import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
function ProtectedRoute({ allowedRoles }) {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);

    if (loading) {
        return <Loader />;
    }

    if (!isAuthenticated || !allowedRoles.includes(user?.role)) {
        return <Navigate to={'/'} />
    }

    return <Outlet />;

}

export default ProtectedRoute;