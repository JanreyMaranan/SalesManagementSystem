import { supabase } from "./supabase";

export async function getUsers() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function activateUser(userId) {
  const { data, error } = await supabase
    .from("users")
    .update({ is_active: true })
    .eq("id", userId)
    .select();

  if (error) throw error;
  return data;
}

export async function deactivateUser(userId) {
  const { data, error } = await supabase
    .from("users")
    .update({ is_active: false })
    .eq("id", userId)
    .select();

  if (error) throw error;
  return data;
}