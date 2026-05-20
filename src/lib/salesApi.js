import { supabase } from "./supabase";

export async function getSales(userType) {
  let query = supabase
    .from("sales")
    .select("*, customer(custname, payterm), employee(lastname, firstname)")
    .order("salesdate", { ascending: false });

  if (userType === "USER") {
    query = query.eq("record_status", "ACTIVE");
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createSale(sale) {
  const { data, error } = await supabase
    .from("sales")
    .insert([{ ...sale, record_status: "ACTIVE" }])
    .select();
  if (error) throw error;
  return data;
}

export async function updateSale(transNo, updates) {
  const { data, error } = await supabase
    .from("sales")
    .update(updates)
    .eq("transno", transNo)
    .select();
  if (error) throw error;
  return data;
}

export async function softDeleteSale(transNo, stamp) {
  const { data, error } = await supabase
    .from("sales")
    .update({ record_status: "INACTIVE", stamp })
    .eq("transno", transNo)
    .select();
  if (error) throw error;
  return data;
}

export async function recoverSale(transNo, stamp) {
  const { data, error } = await supabase
    .from("sales")
    .update({ record_status: "ACTIVE", stamp })
    .eq("transno", transNo)
    .select();
  if (error) throw error;
  return data;
}