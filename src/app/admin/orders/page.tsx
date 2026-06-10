import { formatKRW } from "@/lib/utils";

const demoOrders = [
  { id: "ADM-10021", customer: "Minji K.", total: 68900, status: "Shipped", placed: "2026-06-02" },
  { id: "ADM-10020", customer: "Sora L.", total: 112400, status: "Processing", placed: "2026-06-04" },
  { id: "ADM-10019", customer: "Hana P.", total: 45800, status: "Delivered", placed: "2026-05-28" },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Order management</h1>
      <p className="text-sm text-background/70">
        Sample pipeline rows — replace with Supabase <code className="rounded bg-white/10 px-1">orders</code> queries.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">Order</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Placed</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {demoOrders.map((o) => (
              <tr key={o.id} className="border-b border-white/5 last:border-0">
                <td className="p-4 font-mono text-xs">{o.id}</td>
                <td className="p-4">{o.customer}</td>
                <td className="p-4 text-background/70">{o.placed}</td>
                <td className="p-4">{formatKRW(o.total)}</td>
                <td className="p-4">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
