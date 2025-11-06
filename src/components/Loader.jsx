import React from 'react';

function Loader() {
    return (
        <div className="flex items-center justify-center h-full w-full min-h-[200px]">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
    );
}

export default Loader;
