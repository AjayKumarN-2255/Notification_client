import { createBrowserRouter, RouterProvider } from "react-router-dom"
import useAuthRefresh from "./hooks/useAuthRefresh";
import { Toaster } from "react-hot-toast";

import LoginPage from './features/auth/pages/LoginPage';

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import AddNotificationPage from "./features/admin/pages/AddNotificationPage";


import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperDashboard from "./features/superAdmin/pages/SuperDashboard";
import AddAdminPage from "./features/superAdmin/pages/AddAdminPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import EditAdminPage from "./features/superAdmin/pages/EditAdminPage";


function App() {

  useAuthRefresh();

  const router = createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    {
      path: '/admin',
      element: <ProtectedRoute allowedRoles={['admin']} />, // checks auth
      children: [
        {
          element: <AdminLayout />,   // layout wraps all admin pages
          children: [
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'add-notification', element: <AddNotificationPage /> },
          ]
        }
      ]
    },
    {
      path: '/superadmin',
      element: <ProtectedRoute allowedRoles={["super-admin"]} />, // checks auth
      children: [
        {
          element: <SuperAdminLayout />, // layout wraps all superadmin pages
          children: [
            { path: 'dashboard', element: <SuperDashboard /> },
            { path: 'add-admin', element: <AddAdminPage /> },
            { path: 'edit-admin/:id', element: <EditAdminPage /> },
          ]
        }
      ]
    }

  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { fontSize: '14px' },
        }}
      />
    </>
  );

}

export default App
