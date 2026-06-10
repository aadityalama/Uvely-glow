import { createServerSupabaseClient } from "@/lib/supabase/server";
import { makeInvoiceNumber } from "@/lib/services/invoices";
import type {
  OrderStatus,
  OrderLineSnapshot,
  PaymentMethod,
  PaymentStatus,
  ShippingMethod,
} from "@/types";

export type OrderRowView = {
  id: string;
  createdAt: string;
  email: string;
  status: OrderStatus;
  subtotalKrw: number;
  shippingKrw: number;
  taxKrw: number;
  totalKrw: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingMethod: ShippingMethod;
  deliveryProvince: string;
  deliveryDistrict: string;
  trackingNumber: string;
  estimatedDeliveryDays: number | null;
  invoiceNumber: string;
  shipping: {
    name: string;
    line1: string;
    line2: string;
    city: string;
    region: string;
    postal: string;
    country: string;
  };
  items: OrderLineSnapshot[];
  events: Array<{
    status: OrderStatus;
    fulfillmentStatus: string;
    note: string | null;
    createdAt: string;
  }>;
};

export async function listOrdersForUser(userId: string): Promise<OrderRowView[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, created_at, email, status, subtotal_krw, shipping_krw, tax_krw, total_krw, payment_method, payment_status, shipping_method, delivery_province, delivery_district, tracking_number, estimated_delivery_days, invoice_number, shipping_name, shipping_line1, shipping_line2, shipping_city, shipping_region, shipping_postal, shipping_country",
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

  const { data: events } = await supabase
    .from("order_status_events")
    .select("order_id, status, fulfillment_status, note, created_at")
    .in("order_id", ids)
    .order("created_at", { ascending: false });

  const eventsByOrder = new Map<string, OrderRowView["events"]>();
  for (const event of events ?? []) {
    const list = eventsByOrder.get(event.order_id) ?? [];
    list.push({
      status: event.status as OrderStatus,
      fulfillmentStatus: event.fulfillment_status,
      note: event.note,
      createdAt: event.created_at,
    });
    eventsByOrder.set(event.order_id, list);
  }

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
    paymentMethod: (o.payment_method ?? "cash_on_delivery") as PaymentMethod,
    paymentStatus: (o.payment_status ?? "unpaid") as PaymentStatus,
    shippingMethod: (o.shipping_method ?? "standard") as ShippingMethod,
    deliveryProvince: o.delivery_province ?? o.shipping_region ?? "",
    deliveryDistrict: o.delivery_district ?? "",
    trackingNumber: o.tracking_number ?? "",
    estimatedDeliveryDays: o.estimated_delivery_days,
    invoiceNumber: o.invoice_number ?? makeInvoiceNumber(o.id, o.created_at),
    shipping: {
      name: o.shipping_name ?? "",
      line1: o.shipping_line1 ?? "",
      line2: o.shipping_line2 ?? "",
      city: o.shipping_city ?? "",
      region: o.shipping_region ?? "",
      postal: o.shipping_postal ?? "",
      country: o.shipping_country ?? "NP",
    },
    items: byOrder.get(o.id) ?? [],
    events: eventsByOrder.get(o.id) ?? [],
  }));
}

export async function getOrderForUser(
  userId: string,
  orderId: string,
): Promise<OrderRowView | null> {
  const orders = await listOrdersForUser(userId);
  return orders.find((order) => order.id === orderId) ?? null;
}

export async function listAllOrdersForAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("orders")
    .select("id, created_at, email, status, total_krw, user_id, payment_method, payment_status, shipping_method, delivery_province, delivery_district, tracking_number")
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
    paymentMethod: (row.payment_method ?? "cash_on_delivery") as PaymentMethod,
    paymentStatus: (row.payment_status ?? "unpaid") as PaymentStatus,
    shippingMethod: (row.shipping_method ?? "standard") as ShippingMethod,
    deliveryProvince: row.delivery_province ?? "",
    deliveryDistrict: row.delivery_district ?? "",
    trackingNumber: row.tracking_number ?? "",
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
