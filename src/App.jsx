import { createBrowserRouter, RouterProvider } from "react-router-dom"


import LoginPage from './features/auth/pages/LoginPage';

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./features/admin/pages/AdminDashboard";


import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperDashboard from "./features/superAdmin/pages/SuperDashboard";
import AddAdminPage from "./features/superAdmin/pages/AddAdminPage";
import AddNotificationPage from "./features/admin/pages/AddNotificationPage";

import ProtectedRoute from "./routes/ProtectedRoute";


function App() {

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
      element: <ProtectedRoute allowedRoles={['super-admin']} />, // checks auth
      children: [
        {
          element: <SuperAdminLayout />, // layout wraps all superadmin pages
          children: [
            { path: 'dashboard', element: <SuperDashboard /> },
            { path: 'add-admin', element: <AddAdminPage /> },
          ]
        }
      ]
    }

  ]);

  return <RouterProvider router={router} />;

}

export default App
