import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handle = async () => {
      // Wait for Supabase to process the auth tokens from URL hash
      const { data: { session }, error: sessionError } = 
        await supabase.auth.getSession()

      console.log("Session:", session, "Error:", sessionError)

      if (!session) {
        // Give it one more second and retry
        await new Promise(r => setTimeout(r, 1500))
        const { data: { session: retrySession } } = 
          await supabase.auth.getSession()
        
        console.log("Retry session:", retrySession)
        if (!retrySession) { navigate("/login?error=no_session"); return }
        
        return checkUser(retrySession)
      }

      return checkUser(session)
    }

    const checkUser = async (session) => {
      const { data, error } = await supabase
        .from("user")
        .select("userid, record_status")
        .eq("userid", session.user.id)
        .single()

      console.log("User row:", data, "Error:", error)

      if (error || !data) {
        navigate("/login?error=user_not_found")
      } else if (data.record_status !== "ACTIVE") {
        navigate("/login?error=not_activated")
      } else {
        navigate("/sales")
      }
    }

    handle()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Logging you in...</p>
    </div>
  )
}
