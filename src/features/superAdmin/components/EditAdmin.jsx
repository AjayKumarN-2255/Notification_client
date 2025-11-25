import { useForm } from "react-hook-form";
import useManageAdmin from "../hooks/useManageAdmin"
import { emailValidation, usernameValidation, phoneValidation } from '../../../utils/adminFormValidation';
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useEffect } from "react";


function EditAdmin() {

    const params = useParams();

    const { data: admin } = useFetch(`/admin?adminId=${params.id}`);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: '',
            email: '',
            phone: ''
        }
    });
    useEffect(() => {
        if (admin?.[0]) {
            reset({
                username: admin[0].username,
                email: admin[0].email,
                phone: admin[0].phone
            });
        }
    }, [admin, reset])

    const { handleEditAdmin, loading, error } = useManageAdmin();
    const onSubmit = (formData) => {
        handleEditAdmin({ ...formData, adminId: params.id });
    };

    return (
        <div className='border-2 border-gray-100  rounded-lg w-full max-w-xl p-6 bg-white'>
            <form className='flex flex-col gap-10'
                onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-center text-xl font-semibold'>Edit Admin</h1>
                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Username:</label>
                    <input
                        type="text"
                        {...register("username", usernameValidation)}
                        className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter username"
                    />
                </div>
                {errors?.username && <p className="text-red-500 space-y-2">{errors?.username?.message}</p>}
                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Email:</label>
                    <input
                        type="email"
                        {...register("email", emailValidation)}
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
                <div className='flex justify-start'>
                    <button
                        type="submit"
                        className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                        {loading ? 'Loading' : 'Edit admin'}
                    </button>
                </div>
                {error && <p className="text-red-500 space-y-2">{error}</p>}
            </form>
        </div>
    )
}

export default EditAdmin