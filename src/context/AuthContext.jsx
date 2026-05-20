import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) handleSession(session);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) await handleSession(session);
        else { setCurrentUser(null); setLoading(false); }
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  async function handleSession(session) {
    try {
      const { data: userRow, error: userError } = await supabase
        .from("user")
        .select("userid, username, user_type, record_status")
        .eq("userid", session.user.id)
        .single();

      if (userError || !userRow) {
        await supabase.auth.signOut();
        setError("Account not found.");
        setCurrentUser(null);
      } else if (userRow.record_status !== "ACTIVE") {
        await supabase.auth.signOut();
        setError("Your account is pending activation by a Sales Manager.");
        setCurrentUser(null);
      } else {
        setCurrentUser({ ...session.user, ...userRow });
        setError(null);
      }
    } catch (e) {
      setError("Login error.");
      setCurrentUser(null);
    }
    setLoading(false);
  }

  async function signInWithEmail(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUpWithEmail(email, password) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  }

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) throw error;
  }

  async function signOut() {
    await supabase.auth.signOut();
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{
      currentUser, loading, error,
      signInWithEmail, signUpWithEmail, signInWithGoogle, signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);