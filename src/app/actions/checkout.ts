"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const TAX_RATE = 0.1;

export type CheckoutInput = {
  email: string;
  name: string;
  line1: string;
  city: string;
  region: string;
  postal: string;
  country: string;
};

export async function placeOrderAction(
  input: CheckoutInput,
): Promise<{ ok: true } | { error: string }> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { error: "Supabase is not configured" };
    const {
      data: { user },
      error: ue,
    } = await supabase.auth.getUser();
    if (ue || !user) return { error: "You must be signed in" };

    const { data: lines, error: le } = await supabase
      .from("cart_items")
      .select("product_id, quantity")
      .eq("user_id", user.id);
    if (le || !lines?.length) return { error: "Your cart is empty" };

    const snapshots: {
      product_id: string;
      name: string;
      unit_price_krw: number;
      quantity: number;
    }[] = [];

    for (const row of lines) {
      const { data: p, error: pe } = await supabase
        .from("products")
        .select("id, name, price_krw, stock")
        .eq("id", row.product_id)
        .maybeSingle();
      if (pe || !p) continue;
      if (p.stock < row.quantity) {
        return { error: `Not enough stock for ${p.name}` };
      }
      snapshots.push({
        product_id: p.id,
        name: p.name,
        unit_price_krw: p.price_krw,
        quantity: row.quantity,
      });
    }
    if (!snapshots.length) return { error: "Your cart is empty" };

    const subtotal = snapshots.reduce(
      (s, i) => s + i.unit_price_krw * i.quantity,
      0,
    );
    const shipping = 0;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shipping + tax;

    const { data: order, error: oe } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        email: input.email,
        status: "paid" as const,
        subtotal_krw: subtotal,
        shipping_krw: shipping,
        tax_krw: tax,
        total_krw: total,
        shipping_name: input.name,
        shipping_line1: input.line1,
        shipping_line2: "",
        shipping_city: input.city,
        shipping_region: input.region,
        shipping_postal: input.postal,
        shipping_country: input.country,
      })
      .select("id")
      .single();
    if (oe || !order) return { error: oe?.message ?? "Could not create order" };

    const items = snapshots.map((s) => ({
      order_id: order.id,
      product_id: s.product_id,
      name_snapshot: s.name,
      unit_price_krw: s.unit_price_krw,
      quantity: s.quantity,
    }));
    const { error: ie } = await supabase.from("order_items").insert(items);
    if (ie) return { error: ie.message };

    await supabase.from("cart_items").delete().eq("user_id", user.id);

    revalidatePath("/", "layout");
    revalidatePath("/cart");
    revalidatePath("/account/orders");
    return { ok: true };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Checkout failed" };
  }
}
