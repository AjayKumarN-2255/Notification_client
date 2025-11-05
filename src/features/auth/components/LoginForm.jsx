import React from 'react'

function LoginForm() {
    return (
        <div className='border-2 border-gray-100 rounded-lg w-full max-w-xl p-6'>
            <form className='flex flex-col gap-6'>
                <h1 className='text-center text-xl font-semibold'>Login</h1>
                <div className="flex gap-2 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-20 w-full">Email:</label>
                    <input
                        type="email"
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="flex gap-2 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium w-full max-w-20">Password:</label>
                    <input
                        type="password"
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                <div className='flex justify-start'>
                    <button
                        type="submit"
                        className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                        Login
                    </button>

                </div>
            </form>
        </div>
    )
}

export default LoginForm
