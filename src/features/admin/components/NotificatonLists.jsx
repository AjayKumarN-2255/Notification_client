import useNotification from '../hooks/useNotification';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';

function NotificatonLists() {

  const { data: notifications, loading, error, setDeleteModal,
    handleSnooze, handleStop, deleteModal, handleModal, handleDelete
  } = useNotification();


  if (loading) {
    <div className="w-full h-full">
      <Loader />
    </div>
    return
  }

  return error ? (
    <div className="text-red-500 text-center mt-4">{error}</div>
  ) : (
    <div className="p-4 w-full h-full">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {
        notifications?.length > 0 ?
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {notifications?.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold 
                ${item.is_active ? 'bg-green-200 text-green-700' : 'bg-red-300 text-red-700'}
              `}>
                    {item.is_active ? "Active" : "Stopped"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>{item.category_name}</span>
                  <span>Next: {item.next_notification_date}</span>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    className={`flex-1 py-2 text-sm text-white rounded-lg
                ${item.is_snoozed ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-600 hover:bg-blue-700"}`}
                    onClick={() => { handleSnooze(item._id) }}>
                    {item.is_snoozed ? "Unsnooze" : "Snooze"}
                  </button>


                  <button className={`flex-1 py-2 text-sm text-white rounded-lg 
              ${item.is_active ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                    onClick={() => { handleStop(item._id) }}>
                    {item.is_active ? "Stop" : "Resume"}
                  </button>

                  <button className="flex-1 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    onClick={() => { handleModal(item._id, item.title) }}>
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
          :
          <div>
            <h1>No notification added yet</h1>
          </div>
      }
      {deleteModal.show && (
        <Modal
          show={deleteModal.show}
          title={deleteModal.title}
          onCancel={() => setDeleteModal({ show: false, nId: null, title: "" })}
          onDelete={() => {
            handleDelete(deleteModal.nId);
            setDeleteModal({ show: false, nId: null, title: "" });
          }}
        />
      )}
    </div>
  )
}

export default NotificatonLists;