"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getPersonalizedRecommendations } from "@/lib/services/recommendations";
import { listProducts } from "@/lib/services/catalog";
import { getSessionUser } from "@/lib/supabase/session";

export async function subscribeNewsletterAction(
  _prev: { ok?: boolean; error?: string } | null,
  formData: FormData,
) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const skinConcern = String(formData.get("skin_concern") ?? "").trim() || null;
  const source = String(formData.get("source") ?? "site");
  if (!email || !email.includes("@")) return { error: "Enter a valid email" };

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("newsletter_subscribers").upsert({
      email,
      source,
      skin_concern: skinConcern,
      coupon_code: "GLOW10",
    });
    if (error) return { error: error.message };
  }
  revalidatePath("/");
  return { ok: true };
}

export async function saveQuizResultAction(formData: FormData) {
  const products = await listProducts({ activeOnly: true });
  const skinType = String(formData.get("skin_type") ?? "combination");
  const routineGoal = String(formData.get("routine_goal") ?? "glow");
  const email = String(formData.get("email") ?? "").trim() || null;
  const concerns = formData.getAll("concerns").map(String);
  const budgetKrw = Number(formData.get("budget_krw") ?? 50000);
  const recommendations = getPersonalizedRecommendations(products, {
    skinType,
    routineGoal,
    concerns,
    budgetKrw,
  });
  const user = await getSessionUser();
  const ids = recommendations.map(({ product }) => product.id);

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.from("skincare_quiz_results").insert({
      user_id: user?.id ?? null,
      email,
      skin_type: skinType,
      concerns,
      budget_krw: budgetKrw,
      routine_goal: routineGoal,
      recommended_product_ids: ids,
    });
  }

  return {
    recommendations: recommendations.map(({ product, score }) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      reason: score >= 30 ? "Strong match for your concerns" : "Good routine fit",
    })),
  };
}
