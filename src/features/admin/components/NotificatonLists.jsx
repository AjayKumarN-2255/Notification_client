import { Fragment } from 'react';
import useFetch from '../../../hooks/useFetch';
import useNotification from '../hooks/useNotification';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';
import Card from './Card';
import Select from "react-select";

import { useNavigate } from "react-router-dom";


function NotificatonLists() {

  const { data: notifications, loading, error, setDeleteModal,
    handleSnooze, handleStop, deleteModal, handleModal, handleDelete, selectedCat
  } = useNotification();

  const navigate = useNavigate();
  const { data: categories } = useFetch('/category');

  const handleCategoryChange = (selectedOptions) => {
    const values = selectedOptions?.map(o => o.value) || [];
    if (values.length > 0) {
      const query = values.join(",");
      navigate(`/admin/dashboard?categories=${query}`);
    } else {
      navigate(`/admin/dashboard`);
    }
  };

  if (loading) {
    <div className="w-full h-full">
      <Loader />
    </div>
    return
  }

  return error ? (
    <div className="text-red-500 text-center mt-4">{error}</div>
  ) : (
    <Fragment>
      <div className='w-full p-4 flex justify-between items-center'>
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div>
          <Select
            isMulti
            value={selectedCat}
            options={categories?.map((cat) => ({ value: cat.name, label: cat.name }))}
            onChange={handleCategoryChange}
            className='min-w-56 w-fit'
          />
        </div>
      </div>
      <div className="p-4 w-full h-full">
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
    </Fragment>
  )
}

export default NotificatonLists;