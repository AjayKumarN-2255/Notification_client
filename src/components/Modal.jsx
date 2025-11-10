import React from "react";

function Modal({ show, onCancel, onDelete, title }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
                <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                {title && (
                    <p className="mb-6 text-gray-700">
                        Are you sure you want to delete <span className="font-medium">{title}</span>?
                    </p>
                )}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}


export default Modal;