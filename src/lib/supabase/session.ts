import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getSessionUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getSessionUserWithAdmin(): Promise<{
  user: User | null;
  isAdmin: boolean;
}> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { user: null, isAdmin: false };
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { user: null, isAdmin: false };
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();
  return { user, isAdmin: Boolean(profile?.is_admin) };
}
