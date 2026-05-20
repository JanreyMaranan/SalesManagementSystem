import { supabase } from "./supabase";

export async function getDetailByTrans(transNo, userType) {
  let query = supabase
    .from("salesdetail")
    .select("*, product(description, unit)")
    .eq("transno", transNo);

  if (userType === "USER") {
    query = query.eq("record_status", "ACTIVE");
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function addDetailLine(detail) {
  const { data, error } = await supabase
    .from("salesdetail")
    .insert([{ ...detail, record_status: "ACTIVE" }])
    .select();
  if (error) throw error;
  return data;
}

export async function updateDetailLine(transNo, prodCode, updates) {
  const { data, error } = await supabase
    .from("salesdetail")
    .update(updates)
    .eq("transno", transNo)
    .eq("prodcode", prodCode)
    .select();
  if (error) throw error;
  return data;
}

export async function softDeleteDetailLine(transNo, prodCode, stamp) {
  const { data, error } = await supabase
    .from("salesdetail")
    .update({ record_status: "INACTIVE", stamp })
    .eq("transno", transNo)
    .eq("prodcode", prodCode)
    .select();
  if (error) throw error;
  return data;
}

export async function recoverDetailLine(transNo, prodCode, stamp) {
  const { data, error } = await supabase
    .from("salesdetail")
    .update({ record_status: "ACTIVE", stamp })
    .eq("transno", transNo)
    .eq("prodcode", prodCode)
    .select();
  if (error) throw error;
  return data;
}