import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "./AuthContext"

const UserRightsContext = createContext({})

export function UserRightsProvider({ children }) {
  const { currentUser } = useAuth()
  const [rights, setRights] = useState({})
  const [loadingRights, setLoadingRights] = useState(true)

  useEffect(() => {
    if (currentUser) loadRights()
    else { setRights({}); setLoadingRights(false) }
  }, [currentUser])

  async function loadRights() {
    setLoadingRights(true)
    const { data, error } = await supabase
      .from("UserModule_Rights")
      .select("rightCode, right_value")
      .eq("userid", currentUser.userid)
    if (!error && data) {
      const map = {}
      data.forEach(r => { map[r.rightCode] = r.right_value })
      setRights(map)
    }
    setLoadingRights(false)
  }

  function hasRight(rightCode) { return rights[rightCode] === 1 }

  return (
    <UserRightsContext.Provider value={{ rights, loadingRights, hasRight }}>
      {children}
    </UserRightsContext.Provider>
  )
}

export const useRights = () => useContext(UserRightsContext)
