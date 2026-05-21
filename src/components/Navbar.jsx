import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="h-16 bg-blue-600 text-white flex items-center justify-between px-6 shadow-md">
      <h1 className="text-lg font-bold">Hope, Inc. SMS</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Welcome, {currentUser?.username || 'User'}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-lg hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
