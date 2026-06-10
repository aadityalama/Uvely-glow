import { adminUpdateOrderFromFormAction } from "@/app/actions/admin";
import { listAllOrdersForAdmin } from "@/lib/services/orders";
import { PAYMENT_METHOD_LABELS } from "@/lib/services/payments";
import { SHIPPING_METHOD_LABELS } from "@/lib/services/nepal-shipping";
import { formatNPR } from "@/lib/utils";
import { isSupabaseConfigured } from "@/lib/env";
import type { OrderStatus } from "@/types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default async function AdminOrdersPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-background/70">
        Set NEXT_PUBLIC_SUPABASE_URL and anon key to load orders.
      </p>
    );
  }

  const orders = await listAllOrdersForAdmin();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Order management</h1>
      <p className="text-sm text-background/70">
        Manage payment review, fulfillment workflow, tracking, and customer-visible order status.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Placed</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Payment</th>
              <th className="p-4 font-medium">Delivery</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-background/60">
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id} className="border-b border-white/5 last:border-0">
                  <td className="p-4 font-mono text-xs">{o.id.slice(0, 8)}…</td>
                  <td className="p-4">{o.email}</td>
                  <td className="p-4 text-background/70">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">{formatNPR(o.totalKrw)}</td>
                  <td className="p-4 text-xs">
                    <span className="block">{PAYMENT_METHOD_LABELS[o.paymentMethod]}</span>
                    <span className="text-background/60">{o.paymentStatus}</span>
                  </td>
                  <td className="p-4 text-xs">
                    <span className="block">
                      {o.deliveryDistrict || "District"}, {o.deliveryProvince || "Province"}
                    </span>
                    <span className="text-background/60">
                      {SHIPPING_METHOD_LABELS[o.shippingMethod]}
                    </span>
                  </td>
                  <td className="p-4">
                    <form action={adminUpdateOrderFromFormAction} className="grid gap-2">
                      <input type="hidden" name="order_id" value={o.id} />
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          name="status"
                          defaultValue={o.status}
                          className="rounded-lg border border-white/10 bg-deep px-2 py-1.5 text-xs text-background"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <input
                          name="tracking_number"
                          defaultValue={o.trackingNumber}
                          placeholder="Tracking #"
                          className="w-32 rounded-lg border border-white/10 bg-deep px-2 py-1.5 text-xs text-background placeholder:text-background/40"
                        />
                        <button
                          type="submit"
                          className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest hover:bg-white/10"
                        >
                          Update
                        </button>
                      </div>
                      <input
                        name="note"
                        placeholder="Fulfillment note"
                        className="rounded-lg border border-white/10 bg-deep px-2 py-1.5 text-xs text-background placeholder:text-background/40"
                      />
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
