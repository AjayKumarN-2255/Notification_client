import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

function AdminLayout() {
    return (
        <div className="h-screen flex flex-col w-screen font-custom">
            <AdminHeader />
            <div className='w-full h-[calc(100vh-80px)] flex flex-col md:flex-row'>
                <div className='md:w-60 lg:w-72 h-fit md:h-full'>
                    <AdminSidebar />
                </div>
                <div className='flex-1 bg-gray-100 md:h-full p-2 sm:p-4 md:p-8 lg:p-10  lg:overflow-y-scroll'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
