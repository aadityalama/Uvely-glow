import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { OrderStatus, OrderLineSnapshot } from "@/types";

export type OrderRowView = {
  id: string;
  createdAt: string;
  email: string;
  status: OrderStatus;
  subtotalKrw: number;
  shippingKrw: number;
  taxKrw: number;
  totalKrw: number;
  items: OrderLineSnapshot[];
};

export async function listOrdersForUser(userId: string): Promise<OrderRowView[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, created_at, email, status, subtotal_krw, shipping_krw, tax_krw, total_krw",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error || !orders?.length) return [];

  const ids = orders.map((o) => o.id);
  const { data: items, error: ie } = await supabase
    .from("order_items")
    .select("order_id, product_id, name_snapshot, unit_price_krw, quantity")
    .in("order_id", ids);
  if (ie || !items) return [];

  const byOrder = new Map<string, OrderLineSnapshot[]>();
  for (const it of items) {
    const list = byOrder.get(it.order_id) ?? [];
    list.push({
      productId: it.product_id ?? "",
      name: it.name_snapshot,
      unitPriceKrw: it.unit_price_krw,
      quantity: it.quantity,
    });
    byOrder.set(it.order_id, list);
  }

  return orders.map((o) => ({
    id: o.id,
    createdAt: o.created_at,
    email: o.email,
    status: o.status as OrderStatus,
    subtotalKrw: o.subtotal_krw,
    shippingKrw: o.shipping_krw,
    taxKrw: o.tax_krw,
    totalKrw: o.total_krw,
    items: byOrder.get(o.id) ?? [],
  }));
}

export async function listAllOrdersForAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("orders")
    .select("id, created_at, email, status, total_krw, user_id")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    email: row.email,
    status: row.status as OrderStatus,
    totalKrw: row.total_krw,
    userId: row.user_id,
    customerName: row.email,
  }));
}

export async function getAdminOrderTotalsKrw(): Promise<number> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return 0;
  const { data, error } = await supabase.from("orders").select("total_krw");
  if (error || !data) return 0;
  return data.reduce((sum, row) => sum + row.total_krw, 0);
}

export async function getAdminOrderCount(): Promise<number> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return 0;
  const { count, error } = await supabase.from("orders").select("*", { count: "exact", head: true });
  if (error) return 0;
  return count ?? 0;
}
