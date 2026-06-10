import { adminUpdateOrderFromFormAction } from "@/app/actions/admin";
import { listAllOrdersForAdmin } from "@/lib/services/orders";
import { formatKRW } from "@/lib/utils";
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
        Update fulfillment status. Customers see changes on their order history.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Placed</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-background/60">
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
                  <td className="p-4">{formatKRW(o.totalKrw)}</td>
                  <td className="p-4">
                    <form action={adminUpdateOrderFromFormAction} className="flex flex-wrap items-center gap-2">
                      <input type="hidden" name="order_id" value={o.id} />
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
                      <button
                        type="submit"
                        className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-widest hover:bg-white/10"
                      >
                        Update
                      </button>
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
