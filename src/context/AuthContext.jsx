import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) await loadUser(session.user)
      else setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) await loadUser(session.user)
      else { setCurrentUser(null); setLoading(false) }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function loadUser(authUser) {
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("userid", authUser.id)
        .single()
      
      if (error) {
        console.error("loadUser error:", error)
        setCurrentUser(null)
      } else if (data && data.record_status === "ACTIVE") {
        setCurrentUser(data)
      } else {
        setCurrentUser(null)
      }
    } catch (err) {
      console.error("loadUser exception:", err)
      setCurrentUser(null)
    }
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
