import React from 'react'
import { Link } from 'react-router-dom';

function Card({ item, handleModal, handleStop, handleSnooze }) {

    const truncateText = (text, maxLength = 120) => {
        if (!text) return '';
        return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
    };

    return (
        <div
            key={item._id}
            className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-xl transition flex flex-col md:h-72"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold truncate">{item.title}</h3>
                <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${item.is_active
                        ? 'bg-green-200 text-green-700'
                        : 'bg-red-300 text-red-700'
                        }`}
                >
                    {item.is_active ? 'Active' : 'Stopped'}
                </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-2 flex-1 break-words">
                {truncateText(item.description, 150)} {/* 120 chars max */}
            </p>

            {/* Categories and next notification */}
            <div className="flex justify-between gap-1 mt-2 text-xs text-gray-500 mb-2">
                <div className="flex flex-wrap gap-1">
                    {item?.category_names?.map((name, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
                        >
                            {name}
                        </span>
                    ))}
                </div>
                <span>Next: {item?.next_notification_date}</span>
            </div>

            {/* Timing / Gap Info */}
            <div className="flex flex-col gap-2 text-xs text-gray-500">
                <div className="flex justify-between w-full">
                    <span>
                        Notify Before: {item.notify_before} {item.notify_before_unit}
                    </span>
                    <span>Frequency: every {item.frequency} month</span>
                </div>
                <span>
                    Reminds in <span className="font-semibold">{item.notification_frequency} {item.notific_gap_unit}</span> gap between notify before and next notification date.
                </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-2">
                <button
                    className={`flex-1 py-2 text-sm text-white rounded-lg ${item?.is_snoozed
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    onClick={() => handleSnooze(item._id)}
                >
                    {item.is_snoozed ? 'Unsnooze' : 'Snooze'}
                </button>

                <button
                    className={`flex-1 py-2 text-sm text-white rounded-lg ${item.is_active
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-green-600 hover:bg-green-700'
                        }`}
                    onClick={() => handleStop(item._id)}
                >
                    {item.is_active ? 'Stop' : 'Resume'}
                </button>

                <button
                    className="flex-1 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    onClick={() => handleModal(item._id, item.title)}
                >
                    Delete
                </button>

                <Link
                    to={`/admin/edit-notification/${item._id}`}
                    className="flex-1 flex justify-center items-center py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                >
                    Edit
                </Link>
            </div>
        </div>

    )
}

export default Card