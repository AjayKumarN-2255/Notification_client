import useFetch from '../../../hooks/useFetch';
import useNotification from '../hooks/useNotification'
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { FREQUENCY_PERIODS, NOTIFY_BEFORE_OPTIONS, NOTIFICATION_GAPS, findMinDate } from "../../../utils/constants"
import { titleValidation, descriptionValidation, notification_date } from "../../../utils/notificationValidation"

function NotificationForm() {

    const { data: categories, setData: setCategories } = useFetch('/category');
    const { data: admins } = useFetch('/admin');

    const { handleAddNotification, handleAddCategory, newCat, setNewCat } = useNotification({ autoFetch: false });

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        mode: "onSubmit",
        defaultValues: {
            frequency: 3,
            notification_frequency: 1
        },
    });


    return (
        <div className='border-2 border-gray-100  rounded-lg w-full max-w-xl p-6 bg-white'>
            <form className='flex flex-col gap-6'
                onSubmit={handleSubmit(handleAddNotification)}>
                <h1 className='text-center text-xl font-semibold'>Add Notification</h1>

                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">Title:</label>
                        <input
                            type="text"
                            {...register("title", titleValidation)}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter title"
                        />
                    </div>
                    {errors?.title && <p className="text-red-500 text-end text-sm me-4 mt-2">{errors?.title?.message}</p>}
                </div>

                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">Description:</label>
                        <textarea
                            {...register("description", descriptionValidation)}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter description"
                        />
                    </div>
                    {errors?.description && <p className="text-red-500 text-end text-sm me-4 mt-2">{errors?.description?.message}</p>}
                </div>

                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">Category:</label>
                        <div className="w-full flex flex-col gap-2 p-3 border rounded-md">
                            <Controller
                                name="category_names"
                                control={control}
                                rules={{
                                    required: "Please select at least one category"
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={categories?.map((cat) => ({ value: cat.name, label: cat.name }))}
                                        isMulti
                                        placeholder="Select categories"
                                        onChange={(selected) => field.onChange(selected)}
                                    />
                                )}
                            />
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newCat}
                                    onChange={(e) => { setNewCat(e.target.value) }}
                                    placeholder="Add new category"
                                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    key={'cat-btn'}
                                    type="button"
                                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                                    onClick={() => { handleAddCategory(newCat, setCategories) }}>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    {errors?.category_names && <p className="text-red-500 text-end text-sm me-4 mt-2">{errors?.category_names?.message}</p>}
                </div>

                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">User List:</label>
                        <div className="w-full flex flex-col gap-2 p-3 border rounded-md">
                            <Controller
                                name="notify_user_list"
                                rules={{
                                    required: "Please select at least one user"
                                }}
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={admins?.map((admin) => ({ value: admin._id, label: admin.username }))}
                                        isMulti
                                        placeholder="Select users"
                                        onChange={(selected) => field.onChange(selected)}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {errors?.notify_user_list && <p className="text-red-500 text-end text-sm me-4 mt-2">{errors?.notify_user_list?.message}</p>}
                </div>

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full ">Frequency:</label>
                    <select
                        className="border flex-1 bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1
                        focus:ring-blue-500 focus:border-blue-500"
                        name="frequency"
                        {...register("frequency")}

                    >
                        {FREQUENCY_PERIODS.map((period) => (
                            <option key={period.value} value={period.value}>{period.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">Notification date:</label>
                        <input
                            type="date"
                            name="notification_date"
                            {...register("notification_date", notification_date)}
                            min={findMinDate()}
                            className="border flex-1 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter title"
                        />
                    </div>
                    {errors?.notification_date && <p className="text-red-500 text-end text-sm me-4 mt-2">{errors?.notification_date?.message}</p>}
                </div>

                <div>
                    <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                        <label className="text-gray-700 font-medium max-w-28 w-full">Notify before:</label>
                        <Controller
                            name="notify_before"
                            control={control}
                            defaultValue={{ number: "", unit: 1 }} // keep number as string
                            rules={{
                                validate: value => Number(value.number) > 0 || "Number must be > 0"
                            }}
                            render={({ field }) => (
                                <div className='flex gap-2 w-full'>
                                    <input
                                        type="number"
                                        value={field.value.number}
                                        onChange={(e) =>
                                            field.onChange({ ...field.value, number: e.target.value })
                                        }
                                        className="border w-40 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter number"
                                    />
                                    <select
                                        value={field.value.unit}
                                        onChange={(e) =>
                                            field.onChange({ ...field.value, unit: Number(e.target.value) })
                                        }
                                        className="border flex-1 bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {NOTIFY_BEFORE_OPTIONS.map((period) => (
                                            <option key={period.value} value={period.value}>{period.label}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        />
                    </div>
                    {errors?.notify_before && <p className="text-red-500 text-end text-sm me-4 mt-2">{errors?.notify_before.message}</p>}
                </div>

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Notification Frequency:</label>
                    <div className='flex gap-2 w-full'>
                        <select
                            className="flex-1 border bg-white border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            name="notification_frequency"
                            {...register("notification_frequency")}
                        >
                            {NOTIFICATION_GAPS.map((period) => (
                                <option key={period.value} value={period.value}>{period.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='flex justify-start'>
                    <button
                        type="submit"
                        className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                        Add notification
                    </button>
                </div>

            </form>
        </div>
    )
}

export default NotificationForm