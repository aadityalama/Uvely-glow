import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getCartLinesForUser(userId: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("cart_items")
    .select("product_id, quantity")
    .eq("user_id", userId);
  if (error || !data) return [];
  return data.map((r) => ({ productId: r.product_id, quantity: r.quantity }));
}

export async function getCartItemCount(userId: string): Promise<number> {
  const lines = await getCartLinesForUser(userId);
  return lines.reduce((s, l) => s + l.quantity, 0);
}
