import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate("/login")
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="font-bold text-lg">Hope, Inc. SMS</span>
        <Link to="/sales" className="hover:underline text-sm">Sales</Link>
        <Link to="/lookups/customers" className="hover:underline text-sm">Customers</Link>
        <Link to="/lookups/employees" className="hover:underline text-sm">Employees</Link>
        <Link to="/lookups/products" className="hover:underline text-sm">Products</Link>
        <Link to="/lookups/prices" className="hover:underline text-sm">Prices</Link>
        <Link to="/reports" className="hover:underline text-sm">Reports</Link>
        <Link to="/admin" className="hover:underline text-sm">Admin</Link>
        <Link to="/deleted-items" className="hover:underline text-sm">Deleted</Link>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">{currentUser?.username}</span>
        <button
          onClick={handleSignOut}
          className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
    </nav>
  )
}