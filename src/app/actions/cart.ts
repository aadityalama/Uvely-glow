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

export async function addToCartAction(productId: string, quantity = 1) {
  const { supabase, user } = await requireUser();
  const { data: product, error: pe } = await supabase
    .from("products")
    .select("id, stock")
    .eq("id", productId)
    .maybeSingle();
  if (pe || !product) throw new Error("Product not found");
  if (product.stock < quantity) throw new Error("Not enough stock");

  const { data: existing } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing) {
    const nextQty = existing.quantity + quantity;
    if (nextQty > product.stock) throw new Error("Not enough stock");
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: nextQty })
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      quantity,
    });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/", "layout");
  revalidatePath("/cart");
}

export async function setCartQtyAction(productId: string, quantity: number) {
  const { supabase, user } = await requireUser();
  const q = Math.max(0, Math.floor(quantity));
  if (q === 0) {
    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);
  } else {
    const { data: product } = await supabase
      .from("products")
      .select("stock")
      .eq("id", productId)
      .maybeSingle();
    if (!product || product.stock < q) throw new Error("Not enough stock");
    const { data: existing } = await supabase
      .from("cart_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle();
    if (existing) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: q })
        .eq("id", existing.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: productId,
        quantity: q,
      });
      if (error) throw new Error(error.message);
    }
  }
  revalidatePath("/", "layout");
  revalidatePath("/cart");
}

export async function removeFromCartAction(productId: string) {
  const { supabase, user } = await requireUser();
  await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);
  revalidatePath("/", "layout");
  revalidatePath("/cart");
}

export async function clearCartAction() {
  const { supabase, user } = await requireUser();
  await supabase.from("cart_items").delete().eq("user_id", user.id);
  revalidatePath("/", "layout");
  revalidatePath("/cart");
}

export async function mergeGuestCartAction(
  lines: { productId: string; quantity: number }[],
) {
  const { supabase, user } = await requireUser();
  for (const line of lines) {
    if (line.quantity <= 0) continue;
    const { data: product } = await supabase
      .from("products")
      .select("id, stock")
      .eq("id", line.productId)
      .maybeSingle();
    if (!product || product.stock < 1) continue;
    const qty = Math.min(line.quantity, product.stock);
    const { data: existing } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", line.productId)
      .maybeSingle();
    if (existing) {
      const next = Math.min(existing.quantity + qty, product.stock);
      await supabase
        .from("cart_items")
        .update({ quantity: next })
        .eq("id", existing.id);
    } else {
      await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: line.productId,
        quantity: qty,
      });
    }
  }
  revalidatePath("/", "layout");
  revalidatePath("/cart");
}
