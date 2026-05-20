import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
  }`

function Sidebar() {
  // Simulating user type — will come from context later
  const userType = 'ADMIN'

  return (
    <div className="w-full md:w-56 bg-white border-b md:border-b-0 md:border-r border-gray-200 py-4 md:py-6 px-3 flex flex-row md:flex-col gap-4 md:gap-6 overflow-x-auto">

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase px-4 mb-2">Sales</p>
        <NavLink to="/sales" className={linkClass}>Transactions</NavLink>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase px-4 mb-2">Lookups</p>
        <NavLink to="/lookups/customers" className={linkClass}>Customers</NavLink>
        <NavLink to="/lookups/employees" className={linkClass}>Employees</NavLink>
        <NavLink to="/lookups/products" className={linkClass}>Products</NavLink>
        <NavLink to="/lookups/prices" className={linkClass}>Price History</NavLink>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase px-4 mb-2">Other</p>
        <NavLink to="/reports" className={linkClass}>Reports</NavLink>
        {userType !== 'USER' && (
          <NavLink to="/admin" className={linkClass}>Admin</NavLink>
        )}
        {userType !== 'USER' && (
          <NavLink to="/deleted-items" className={linkClass}>Deleted Items</NavLink>
        )}
      </div>

    </div>
  )
}

export default Sidebar