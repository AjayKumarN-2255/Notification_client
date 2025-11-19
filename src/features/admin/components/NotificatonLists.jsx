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
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  }

  return error ? (
    <div className="text-red-500 text-center mt-4">{error}</div>
  ) : (
    <Fragment>
      <div className='px-4'>
        <div className='w-full p-4 gap-4 flex flex-col 2xl:flex-row justify-between bg-gray-50 rounded-lg shadow-sm'>

          <div className='flex flex-col w-full lg:flex-row gap-4  xl:justify-between 2xl:max-w-lg lg:gap-8'>

            <div className="flex flex-col sm:flex-row w-full md:items-center xl:max-w-lg gap-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search..."
                className="flex-1 py-1 px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-1 bg-blue-800 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>

            <div className='flex 2xl:hidden'>
              <Select
                isMulti
                value={selectedCat}
                options={categories?.map((cat) => ({ value: cat.name, label: cat.name }))}
                onChange={handleCategoryChange}
                className=' lg:min-w-44 xl:min-w-60  w-fit flex-1'
              />
            </div>

          </div>
          <div className='hidden 2xl:flex'>
            <Select
              isMulti
              value={selectedCat}
              options={categories?.map((cat) => ({ value: cat.name, label: cat.name }))}
              onChange={handleCategoryChange}
              className=' lg:min-w-44 xl:min-w-56  w-fit flex-1'
            />
          </div>

          <div className='flex flex-col md:flex-row gap-3 w-full xl:max-w-lg justify-between'>
            <div className="flex gap-2 items-center md:flex-1">
              <label className="text-gray-700 font-medium w-full max-w-12">From:</label>
              <input
                type="date"
                className="flex-1 px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 items-center md:flex-1">
              <label className="text-gray-700 font-medium w-full max-w-12">To:</label>
              <input
                type="date"
                className="flex-1 px-4 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              className="px-4 py-0.5 bg-blue-800 text-white rounded hover:bg-blue-700 transition-colors"
            >
              clear
            </button>
          </div>

        </div>
      </div>
      <h2 className="text-xl font-semibold mx-4 mt-4">Notifications</h2>
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