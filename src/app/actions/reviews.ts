"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function submitReviewAction(
  formData: FormData,
): Promise<{ error?: string; ok?: true }> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured" };
  const {
    data: { user },
    error: ue,
  } = await supabase.auth.getUser();
  if (ue || !user) return { error: "Sign in to leave a review" };

  const productId = String(formData.get("product_id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const rating = Number(formData.get("rating") ?? 0);
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!productId || rating < 1 || rating > 5) return { error: "Invalid review" };

  const { error } = await supabase.from("reviews").insert({
    product_id: productId,
    user_id: user.id,
    rating,
    title: title || null,
    body: body || null,
    is_approved: false,
  });
  if (error) return { error: error.message };
  revalidatePath(slug ? `/products/${slug}` : "/products");
  return { ok: true };
}
