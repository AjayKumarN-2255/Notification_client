import { useForm } from "react-hook-form";
import { emailValidation, passwordValidation } from '../../../utils/loginValidation';
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { handleLogin } = useAuth();
    const { error, user, loading, isAuthenticated } = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            switch (user?.role) {
                case 'admin': navigate('/admin/dashboard');
                    return;
                case 'super-admin': navigate('/superadmin/dashboard');
                    return;
                default: navigate('/admin/dashboard');
                    return;
            }
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <div className='border-2 border-gray-100 rounded-lg w-full max-w-xl p-6'>
            <form className='flex flex-col gap-6'
                onSubmit={handleSubmit(handleLogin)}>
                <h1 className='text-center text-xl font-semibold'>Login</h1>
                <div className="flex gap-2 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-20 w-full">Email:</label>
                    <input
                        type="email"
                        {...register("email", emailValidation)}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                {errors?.email && <p className="text-red-500 space-y-2">{errors?.email?.message}</p>}
                <div className="flex gap-2 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium w-full max-w-20">Password:</label>
                    <input
                        type="password"
                        {...register("password", passwordValidation)}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                    />
                </div>
                {errors?.password && <p className="text-red-500 space-y-2">{errors?.password?.message}</p>}
                <div className='flex justify-start'>
                    <button
                        type="submit"
                        className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </div>
                {error && <p className="text-red-500 space-y-2">{error}</p>}
            </form>
        </div>
    )
}

export default LoginForm
