"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase is not configured");
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("You must be signed in");
  return { supabase, user };
}

export async function toggleWishlistAction(productId: string) {
  const { supabase, user } = await requireUser();
  const { data: row } = await supabase
    .from("wishlist_items")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();
  if (row) {
    await supabase.from("wishlist_items").delete().eq("id", row.id);
  } else {
    const { error } = await supabase.from("wishlist_items").insert({
      user_id: user.id,
      product_id: productId,
    });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/", "layout");
  revalidatePath("/wishlist");
}
