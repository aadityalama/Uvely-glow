import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";
import {
  getSupabaseConfigDiagnostics,
  logSupabaseConfigDiagnostics,
} from "@/lib/supabase/diagnostics";

export function createPublicSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!getSupabaseConfigDiagnostics().isUsablePublicKey) {
    logSupabaseConfigDiagnostics("public-client-init");
  }
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
