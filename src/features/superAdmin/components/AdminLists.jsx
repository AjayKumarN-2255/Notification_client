import Loader from "../../../components/Loader";
import useFetch from "../../../hooks/useFetch";
import useManageAdmin from "../hooks/useManageAdmin";
import Modal from "../../../components/Modal";

function AdminLists() {

  const { data: admins, setData: setAdmin, loading, error } = useFetch('/admin');
  const { show, setShow, handleEdit, deleteModal,
    handleModal, setDeleteModal, handleDeleteAdmin } = useManageAdmin();

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return error ? (
    <div className="text-red-500 text-center mt-4">{error}</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {admins?.map((admin, ind) => (
        <div
          key={admin._id}
          className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition"
        >
          <div className="flex justify-between relative">
            <h2 className="text-xl font-semibold mb-2">{admin.username}</h2>
            <div className="space-y-1 cursor-pointer w-1"
              onClick={() => { setShow(prev => prev == ind ? null : ind) }}>
              <div className="h-1 bg-black rounded-full"></div>
              <div className="h-1 bg-black rounded-full"></div>
              <div className="h-1 bg-black rounded-full"></div>
            </div>
            {show === ind && (
              <div className="flex gap-2 border absolute top-6 right-0 rounded-md p-2 w-fit bg-white shadow-sm">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-100 rounded"
                  onClick={() => { handleEdit(admin._id) }}>
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded"
                  onClick={() => handleModal(admin._id, admin.username)}>
                  Delete
                </button>
              </div>
            )}
          </div>
          <p>
            <span className="font-medium">Email:</span> {admin.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {admin.phone}
          </p>
        </div>
      ))}
      {deleteModal.show && (
        <Modal
          show={deleteModal.show}
          title={deleteModal.title}
          onCancel={() => setDeleteModal({ show: false, aId: null, title: "" })}
          onDelete={() => {
            handleDeleteAdmin(deleteModal.aId, setAdmin);
            setDeleteModal({ show: false, aId: null, title: "" });
          }}
        />
      )}
    </div>
  );

}

export default AdminLists