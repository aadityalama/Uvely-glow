"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { makeInvoiceNumber } from "@/lib/services/invoices";
import { createOrderNotification } from "@/lib/services/notifications";
import { createPaymentIntent, type PaymentMethod } from "@/lib/services/payments";
import {
  calculateDeliveryFee,
  type ShippingMethod,
} from "@/lib/services/nepal-shipping";

const TAX_RATE = 0.1;

export type CheckoutInput = {
  email: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  province: string;
  district: string;
  postal: string;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  saveAddress?: boolean;
};

export async function placeOrderAction(
  input: CheckoutInput,
): Promise<{ ok: true; orderId: string; redirectUrl: string | null } | { error: string }> {
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
    const delivery = calculateDeliveryFee({
      province: input.province,
      district: input.district,
      method: input.shippingMethod,
      subtotalKrw: subtotal,
    });
    if (!delivery.supportsMethod) {
      return { error: "Selected shipping method is not available for that district" };
    }
    const shipping = delivery.feeKrw;
    const tax = Math.round(subtotal * TAX_RATE);
    const total = subtotal + shipping + tax;

    const { data: order, error: oe } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        email: input.email,
        status: input.paymentMethod === "cash_on_delivery" ? "pending" : "pending",
        subtotal_krw: subtotal,
        shipping_krw: shipping,
        tax_krw: tax,
        total_krw: total,
        shipping_name: input.name,
        shipping_line1: input.line1,
        shipping_line2: input.line2 ?? "",
        shipping_city: input.city,
        shipping_region: input.province,
        shipping_postal: input.postal,
        shipping_country: "NP",
        payment_method: input.paymentMethod,
        payment_status:
          input.paymentMethod === "cash_on_delivery" ? "unpaid" : "initiated",
        shipping_method: input.shippingMethod,
        delivery_fee_krw: shipping,
        delivery_province: input.province,
        delivery_district: input.district,
        estimated_delivery_days: delivery.estimatedDaysMax,
      })
      .select("id, created_at")
      .single();
    if (oe || !order) return { error: oe?.message ?? "Could not create order" };

    const payment = createPaymentIntent({
      method: input.paymentMethod,
      orderId: order.id,
      totalKrw: total,
    });
    const invoiceNumber = makeInvoiceNumber(order.id, order.created_at);
    await supabase
      .from("orders")
      .update({
        payment_provider_ref: payment.providerRef,
        invoice_number: invoiceNumber,
      })
      .eq("id", order.id);

    const items = snapshots.map((s) => ({
      order_id: order.id,
      product_id: s.product_id,
      name_snapshot: s.name,
      unit_price_krw: s.unit_price_krw,
      quantity: s.quantity,
    }));
    const { error: ie } = await supabase.from("order_items").insert(items);
    if (ie) return { error: ie.message };

    if (input.saveAddress) {
      await supabase.from("addresses").insert({
        user_id: user.id,
        label: "Checkout address",
        line1: input.line1,
        line2: input.line2 ?? null,
        city: input.city,
        region: input.province,
        postal: input.postal,
        country: "NP",
        is_default: false,
      });
    }

    await supabase.from("order_status_events").insert({
      order_id: order.id,
      status: "pending",
      fulfillment_status: "unfulfilled",
      note: `Checkout created with ${payment.method}. ${payment.message}`,
      created_by: user.id,
    });
    await createOrderNotification({
      supabase,
      orderId: order.id,
      userId: user.id,
      type: "order_placed",
    });
    if (payment.status === "paid") {
      await createOrderNotification({
        supabase,
        orderId: order.id,
        userId: user.id,
        type: "payment_success",
      });
    }

    await supabase.from("cart_items").delete().eq("user_id", user.id);

    revalidatePath("/", "layout");
    revalidatePath("/cart");
    revalidatePath("/account/orders");
    return { ok: true, orderId: order.id, redirectUrl: payment.redirectUrl };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Checkout failed" };
  }
}
