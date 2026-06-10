"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function updateProfileAction(
  formData: FormData,
): Promise<{ error?: string; ok?: true }> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { error: "Supabase is not configured" };
    const {
      data: { user },
      error: ue,
    } = await supabase.auth.getUser();
    if (ue || !user) return { error: "You must be signed in" };

    const fullName = String(formData.get("full_name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName || null, phone: phone || null, email: email || null })
      .eq("id", user.id);
    if (error) return { error: error.message };

    if (email && email !== user.email) {
      const { error: e2 } = await supabase.auth.updateUser({ email });
      if (e2) return { error: e2.message };
    }

    revalidatePath("/account");
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not save profile" };
  }
}
