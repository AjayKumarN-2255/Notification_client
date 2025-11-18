import { Fragment } from 'react';
import useFetch from '../../../hooks/useFetch';
import useNotification from '../hooks/useNotification';
import Loader from '../../../components/Loader';
import Modal from '../../../components/Modal';
import Card from './Card';
import Select from "react-select";
import useFilter from '../hooks/useFilter';


function NotificatonLists() {

  const { data: notifications, loading, error, setDeleteModal,
    handleSnooze, handleStop, deleteModal, handleModal, handleDelete
  } = useNotification();

  const { data: categories } = useFetch('/category');

  const { handleCategoryChange, searchTerm, setSearchTerm,
    selectedCat, setSelectedCat, handleSearch
  } = useFilter();


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
      <div className='w-full p-4 gap-4 flex flex-col lg:flex-row justify-between lg:items-center'>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="flex-1 px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-1 bg-blue-800 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
        <div>
          <Select
            isMulti
            value={selectedCat}
            options={categories?.map((cat) => ({ value: cat.name, label: cat.name }))}
            onChange={handleCategoryChange}
            className='min-w-full lg:min-w-56 w-fit'
          />
        </div>
      </div>
      <h2 className="text-xl font-semibold mx-4">Notifications</h2>
      <div className="p-4 w-full h-full">
        {
          notifications?.length > 0 ?
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              {notifications?.map((item) => (
                <Card key={item._id} item={item} handleModal={handleModal}
                  handleStop={handleStop} handleSnooze={handleSnooze}
                  setSelectedCat={setSelectedCat}
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