import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { OrderStatus } from "@/types";

export type RevenueSummary = {
  grossRevenueKrw: number;
  paidRevenueKrw: number;
  orderCount: number;
  averageOrderValueKrw: number;
  statusCounts: Record<OrderStatus, number>;
};

export type TopSellingProduct = {
  productId: string | null;
  name: string;
  quantity: number;
  revenueKrw: number;
};

const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export async function getRevenueSummary(): Promise<RevenueSummary> {
  const supabase = await createServerSupabaseClient();
  const emptyCounts = Object.fromEntries(
    ORDER_STATUSES.map((status) => [status, 0]),
  ) as Record<OrderStatus, number>;
  if (!supabase) {
    return {
      grossRevenueKrw: 0,
      paidRevenueKrw: 0,
      orderCount: 0,
      averageOrderValueKrw: 0,
      statusCounts: emptyCounts,
    };
  }

  const { data, error } = await supabase
    .from("orders")
    .select("status, total_krw, payment_status");
  if (error || !data) {
    return {
      grossRevenueKrw: 0,
      paidRevenueKrw: 0,
      orderCount: 0,
      averageOrderValueKrw: 0,
      statusCounts: emptyCounts,
    };
  }

  const statusCounts = { ...emptyCounts };
  let grossRevenueKrw = 0;
  let paidRevenueKrw = 0;
  for (const order of data) {
    const status = order.status as OrderStatus;
    statusCounts[status] = (statusCounts[status] ?? 0) + 1;
    grossRevenueKrw += order.total_krw;
    if (order.payment_status === "paid" || status === "paid") {
      paidRevenueKrw += order.total_krw;
    }
  }

  return {
    grossRevenueKrw,
    paidRevenueKrw,
    orderCount: data.length,
    averageOrderValueKrw: data.length ? Math.round(grossRevenueKrw / data.length) : 0,
    statusCounts,
  };
}

export async function getTopSellingProducts(limit = 5): Promise<TopSellingProduct[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("order_items")
    .select("product_id, name_snapshot, unit_price_krw, quantity");
  if (error || !data) return [];

  const byProduct = new Map<string, TopSellingProduct>();
  for (const item of data) {
    const key = item.product_id ?? item.name_snapshot;
    const current = byProduct.get(key) ?? {
      productId: item.product_id,
      name: item.name_snapshot,
      quantity: 0,
      revenueKrw: 0,
    };
    current.quantity += item.quantity;
    current.revenueKrw += item.unit_price_krw * item.quantity;
    byProduct.set(key, current);
  }

  return [...byProduct.values()]
    .sort((a, b) => b.quantity - a.quantity || b.revenueKrw - a.revenueKrw)
    .slice(0, limit);
}
