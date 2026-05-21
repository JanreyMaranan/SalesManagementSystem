import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("Session:", session)

      if (!session) {
        navigate("/login?error=no_session")
        return
      }

      const { data, error } = await supabase
        .from("user")
        .select("userid, record_status")
        .eq("userid", session.user.id)
        .single()

      console.log("User:", data, error)

      if (error || !data) {
        navigate("/login?error=user_not_found")
      } else if (data.record_status !== "ACTIVE") {
        navigate("/login?error=not_activated")
      } else {
        navigate("/sales")
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Logging you in...</p>
    </div>
  )
}
