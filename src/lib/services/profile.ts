import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CustomerProfile } from "@/types";

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
