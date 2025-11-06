import React from 'react';
import { Link } from 'react-router-dom';

function AdminHeader() {
    return (
        <header className="h-20 w-full bg-white flex items-center justify-between px-6 shadow-md">
            {/* Title */}
            <h1 className="text-gray-800 text-2xl font-semibold tracking-wide">
                Admin Dashboard
            </h1>

            {/* Right side: Admin info + Login button */}
            <div className="flex items-center space-x-5">
                <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Admin</span>
                    <img
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="w-10 h-10 rounded-full border-2 border-gray-300"
                    />
                </div>
                <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default AdminHeader;
