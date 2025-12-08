import { useSelector } from "react-redux";
import { phoneValidation } from '../utils/adminFormValidation';
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useManageAccount from "../hooks/useManageAccount"

function EditAccountForm() {

    const { user } = useSelector(state => state.auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { loading, error, handleAccount } = useManageAccount();

    const onSubmit = (formData) => {
        handleAccount({ ...formData, userId: user?._id }, reset);
    };

    useEffect(() => {
        if (user) {
            reset({
                username: user.username || "",
                email: user.email || "",
                phone: user.phone || ""
            });
        }
    }, [user, reset]);

    return (
        <div className='border-2 border-gray-100  rounded-lg w-full max-w-xl p-6 bg-white'>
            <form className='flex flex-col gap-10'
                onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-center text-xl font-semibold'>Edit Account</h1>
                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">Username:</label>
                        <input
                            type="text"
                            {...register("username")}
                            disabled={true}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter username"
                        />
                    </div>
                </div>
                {errors?.username && <p className="text-red-500 space-y-2">{errors?.username?.message}</p>}
                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Email:</label>
                    <input
                        type="email"
                        {...register("email")}
                        disabled={true}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email"
                    />
                </div>
                {errors?.email && <p className="text-red-500 space-y-2">{errors?.email?.message}</p>}
                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Phone number:</label>
                    <input
                        type="number"
                        {...register("phone", phoneValidation)}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter phone number"
                    />
                </div>
                {errors?.phone && <p className="text-red-500 space-y-2">{errors?.phone?.message}</p>}
                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium w-full max-w-28">Password:</label>
                    <input
                        type="text"
                        {...register("password")}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium w-full max-w-28">New Password:</label>
                    <input
                        type="text"
                        {...register("new_password")}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter new password"
                    />
                </div>

                <div className='flex justify-start'>
                    <button
                        type="submit"
                        className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                        {loading ? 'Loading' : 'Edit Account'}
                    </button>
                </div>
                {error && <p className="text-red-500 space-y-2">{error}</p>}
            </form>
        </div>
    )
}

export default EditAccountForm