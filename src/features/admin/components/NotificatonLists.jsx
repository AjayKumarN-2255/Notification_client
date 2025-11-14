import useNotification from '../hooks/useNotification';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';
import Card from './Card';

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
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            {notifications?.map((item) => (
              <Card key={item._id} item={item} handleModal={handleModal}
                handleStop={handleStop} handleSnooze={handleSnooze}
              />
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