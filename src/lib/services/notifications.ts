import type { Database } from "@/lib/supabase/database.types";

type SupabaseClient = Awaited<
  ReturnType<typeof import("@/lib/supabase/server").createServerSupabaseClient>
>;

export type NotificationType =
  | "order_placed"
  | "payment_success"
  | "order_shipped"
  | "order_delivered";

const COPY: Record<NotificationType, { title: string; message: string }> = {
  order_placed: {
    title: "Order placed",
    message: "We received your order and will start preparing it shortly.",
  },
  payment_success: {
    title: "Payment successful",
    message: "Your payment was confirmed successfully.",
  },
  order_shipped: {
    title: "Order shipped",
    message: "Your order is on the way. Tracking details are available now.",
  },
  order_delivered: {
    title: "Order delivered",
    message: "Your order has been marked as delivered. Thank you for shopping.",
  },
};

export async function createOrderNotification({
  supabase,
  orderId,
  userId,
  type,
}: {
  supabase: NonNullable<SupabaseClient>;
  orderId: string;
  userId: string | null;
  type: NotificationType;
}) {
  const copy = COPY[type];
  const payload: Database["public"]["Tables"]["order_notifications"]["Insert"] = {
    order_id: orderId,
    user_id: userId,
    type,
    title: copy.title,
    message: copy.message,
  };
  await supabase.from("order_notifications").insert(payload);
}
