import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useRights } from "../context/UserRightsContext"

export default function Sidebar() {
  const { currentUser, signOut } = useAuth()
  const { hasRight } = useRights()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate("/login")
  }

  return (
    <div className="w-48 min-h-screen bg-blue-700 text-white flex flex-col p-4 gap-2">
      <h2 className="font-bold text-lg mb-4">Hope SMS</h2>
      <Link to="/sales" className="hover:bg-blue-600 px-3 py-2 rounded text-sm">Sales</Link>
      <Link to="/lookups/customers" className="hover:bg-blue-600 px-3 py-2 rounded text-sm">Customers</Link>
      <Link to="/lookups/employees" className="hover:bg-blue-600 px-3 py-2 rounded text-sm">Employees</Link>
      <Link to="/lookups/products" className="hover:bg-blue-600 px-3 py-2 rounded text-sm">Products</Link>
      <Link to="/lookups/prices" className="hover:bg-blue-600 px-3 py-2 rounded text-sm">Prices</Link>
      <Link to="/reports" className="hover:bg-blue-600 px-3 py-2 rounded text-sm">Reports</Link>
      {hasRight("ADM_USER") && (
        <Link to="/admin" className="hover:bg-blue-600 px-3 py-2 rounded text-sm">Admin</Link>
      )}
      {currentUser?.user_type !== "USER" && (
        <Link to="/deleted-items" className="hover:bg-blue-600 px-3 py-2 rounded text-sm">Deleted Items</Link>
      )}
      <div className="mt-auto">
        <p className="text-xs text-blue-200 mb-2">{currentUser?.username}</p>
        <button onClick={handleSignOut}
          className="w-full bg-white text-blue-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
          Sign Out
        </button>
      </div>
    </div>
  )
}