import { Outlet } from 'react-router-dom';
import SuperHeader from '../components/SuperHeader';
import SuperSidebar from '../components/SuperSidebar';

function SuperAdminLayout() {
    return (
        <div className="h-screen flex flex-col w-screen font-custom">
            <SuperHeader />
            <div className='w-full h-[calc(100vh-80px)] flex flex-col md:flex-row'>
                <div className='md:w-60 lg:w-72 h-fit md:h-full'>
                    <SuperSidebar />
                </div>
                <div className='flex-1 bg-gray-100 md:h-full p-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SuperAdminLayout
