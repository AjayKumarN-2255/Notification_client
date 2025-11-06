import Loader from "../../../components/Loader";
import useFetch from "../../../hooks/useFetch"

function AdminLists() {

  const { data: admins, loading, error } = useFetch('/admin');
  

  if (loading) {
    <Loader />
  }

  return error ? (
    <div className="text-red-500 text-center mt-4">{error}</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {admins?.map((admin) => (
        <div
          key={admin._id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">{admin.username}</h2>
          <p>
            <span className="font-medium">Email:</span> {admin.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {admin.phone}
          </p>
        </div>
      ))}
    </div>
  );

}

export default AdminLists