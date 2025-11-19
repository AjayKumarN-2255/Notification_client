import React from 'react'

function DateFilter({ From, To, handleFromDate, clearDateFilter, handleToDate }) {
    return (
        <div className='flex flex-col md:flex-row gap-3 w-full xl:max-w-lg justify-between'>
            <div className="flex gap-2 items-center md:flex-1">
                <label className="text-gray-700 font-medium w-full max-w-12">From:</label>
                <input
                    type="date"
                    value={From}
                    onChange={handleFromDate}
                    className="flex-1 px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex gap-2 items-center md:flex-1">
                <label className="text-gray-700 font-medium w-full max-w-12">To:</label>
                <input
                    type="date"
                    value={To}
                    onChange={handleToDate}
                    className="flex-1 px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                className="px-4 py-0.5 bg-blue-800 text-white rounded hover:bg-blue-700 transition-colors"
                onClick={clearDateFilter}
            >
                clear
            </button>
        </div>
    )
}

export default DateFilter