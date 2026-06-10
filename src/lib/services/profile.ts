import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CustomerProfile } from "@/types";

export type SavedAddress = {
  id: string;
  label: string;
  line1: string;
  line2: string;
  city: string;
  region: string;
  postal: string;
  country: string;
  isDefault: boolean;
};

export async function getProfileForUser(
  userId: string,
  emailFallback: string | null,
): Promise<CustomerProfile> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { fullName: "", email: emailFallback ?? "", phone: "" };
  }
  const { data } = await supabase
    .from("profiles")
    .select("full_name, phone, email")
    .eq("id", userId)
    .maybeSingle();
  return {
    fullName: data?.full_name ?? "",
    email: data?.email ?? emailFallback ?? "",
    phone: data?.phone ?? "",
  };
}

export async function listAddressesForUser(userId: string): Promise<SavedAddress[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("addresses")
    .select("id, label, line1, line2, city, region, postal, country, is_default")
    .eq("user_id", userId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((address) => ({
    id: address.id,
    label: address.label ?? "Saved address",
    line1: address.line1,
    line2: address.line2 ?? "",
    city: address.city,
    region: address.region ?? "",
    postal: address.postal,
    country: address.country,
    isDefault: address.is_default,
  }));
}
