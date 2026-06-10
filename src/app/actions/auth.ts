"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { logSupabaseConfigDiagnostics } from "@/lib/supabase/diagnostics";
import { env } from "@/lib/env";

export async function signInWithPasswordAction(
  formData: FormData,
): Promise<{ error?: string; ok?: true; next?: string }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured" };
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/account");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    if (error.message.toLowerCase().includes("api key")) {
      logSupabaseConfigDiagnostics("signin-invalid-api-key");
    }
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  return { ok: true, next: next.startsWith("/") ? next : "/account" };
}

export async function signUpAction(
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured" };
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${env.siteUrl}/auth/callback?next=/account`,
      data: { full_name: fullName },
    },
  });
  if (error) {
    if (error.message.toLowerCase().includes("api key")) {
      logSupabaseConfigDiagnostics("signup-invalid-api-key");
    }
    return { error: error.message };
  }
  return { success: true };
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordResetAction(
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured" };
  const email = String(formData.get("email") ?? "").trim();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${env.siteUrl}/auth/callback?next=/update-password`,
  });
  if (error) {
    if (error.message.toLowerCase().includes("api key")) {
      logSupabaseConfigDiagnostics("password-reset-invalid-api-key");
    }
    return { error: error.message };
  }
  return { success: true };
}

export async function updatePasswordAction(
  formData: FormData,
): Promise<{ error?: string; ok?: true }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured" };
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { ok: true };
}
