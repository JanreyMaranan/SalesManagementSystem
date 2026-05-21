import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const run = async () => {
      // Exchange the code in the URL for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      )
      
      console.log("Exchange result:", data, error)

      if (error || !data.session) {
        navigate("/login?error=no_session")
        return
      }

      const session = data.session

      const { data: user, error: userError } = await supabase
        .from("user")
        .select("userid, record_status")
        .eq("userid", session.user.id)
        .single()

      console.log("User:", user, userError)

      if (userError || !user) {
        navigate("/login?error=user_not_found")
      } else if (user.record_status !== "ACTIVE") {
        navigate("/login?error=not_activated")
      } else {
        navigate("/sales")
      }
    }

    run()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Logging you in...</p>
    </div>
  )
}
