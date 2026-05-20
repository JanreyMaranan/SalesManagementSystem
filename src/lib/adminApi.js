import { supabase } from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from("user")
    .select("userid, username, user_type, record_status")
    .order("user_type", { ascending: true });
  if (error) throw error;
  return data;
}

export async function activateUser(userId) {
  const { data, error } = await supabase
    .from("user")
    .update({ record_status: "ACTIVE" })
    .eq("userid", userId)
    .neq("user_type", "SUPERADMIN")
    .select();
  if (error) throw error;
  return data;
}

export async function deactivateUser(userId) {
  const { data, error } = await supabase
    .from("user")
    .update({ record_status: "INACTIVE" })
    .eq("userid", userId)
    .neq("user_type", "SUPERADMIN")
    .select();
  if (error) throw error;
  return data;
}