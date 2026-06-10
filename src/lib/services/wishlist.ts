import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getWishlistIdsForUser(userId: string): Promise<string[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("wishlist_items")
    .select("product_id")
    .eq("user_id", userId);
  if (error || !data) return [];
  return data.map((r) => r.product_id);
}
