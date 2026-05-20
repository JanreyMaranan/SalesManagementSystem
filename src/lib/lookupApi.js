import { supabase } from "./supabase";

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customer")
    .select("custno, custname, address, payterm")
    .order("custname", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getEmployees() {
  const { data, error } = await supabase
    .from("employee")
    .select("empno, lastname, firstname, gender, birthdate, hiredate")
    .order("lastname", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("product")
    .select("prodcode, description, unit")
    .order("description", { ascending: true });
  if (error) throw error;
  return data;
}

export async function getCurrentPrice(prodCode) {
  const { data, error } = await supabase
    .from("pricehist")
    .select("prodcode, effdate, unitprice")
    .eq("prodcode", prodCode)
    .order("effdate", { ascending: false })
    .limit(1)
    .single();
  if (error) throw error;
  return data;
}

export async function getPriceHistory() {
  const { data, error } = await supabase
    .from("pricehist")
    .select("prodcode, effdate, unitprice, product(description)")
    .order("effdate", { ascending: false });
  if (error) throw error;
  return data;
}