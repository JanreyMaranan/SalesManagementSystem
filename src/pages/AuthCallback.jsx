import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth event:", event, "Session:", session)

      if (event === "SIGNED_IN" && session) {
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
      } else if (event === "SIGNED_OUT") {
        navigate("/login")
      }
    })
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Logging you in...</p>
    </div>
  )
}
