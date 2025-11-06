import { Link, useLocation } from 'react-router-dom'

import DashIcon from '/home_icon.svg'
import AddIcon from '/add_icon.svg'

function SuperSidebar() {

  const path = useLocation();

  const SidebarElements = [
    {
      name: 'Dashboard',
      path: '/superadmin/dashboard',
      icon: DashIcon
    },
    {
      name: 'Add Admin',
      path: '/superadmin/add-admin',
      icon: AddIcon
    }
  ]

  return (
    <div className='h-full w-full border border-r-slate-200 py-6'>
      <div>
        {
          SidebarElements.map((ele, ind) => (
            <Link to={ele.path} key={ind} className={`hover:bg-slate-50 h-12 flex items-center 
                        ${path.pathname == ele.path ? 'border-r-4 bg-slate-100 border-r-blue-400' : ''}`}>
              <div className='flex gap-3 px-8 text-sm items-center'>
                <img src={ele.icon} className='w-5' />
                <h1>{ele.name}</h1>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SuperSidebar;