import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>
  return currentUser ? children : <Navigate to="/login" />
}
