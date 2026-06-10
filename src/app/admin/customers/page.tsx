import { formatKRW } from "@/lib/utils";

const rows = [
  { id: "cust-01", name: "Yuna Han", email: "yuna@example.com", orders: 6, ltv: 428000 },
  { id: "cust-02", name: "Jisoo Park", email: "jisoo@example.com", orders: 3, ltv: 198500 },
  { id: "cust-03", name: "Ren Ito", email: "ren@example.com", orders: 8, ltv: 612400 },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Customer management</h1>
      <p className="text-sm text-background/70">
        Illustrative CRM rows — map to <code className="rounded bg-white/10 px-1">profiles</code> + orders in Supabase.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Orders</th>
              <th className="p-4 font-medium">Est. LTV</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-white/5 last:border-0">
                <td className="p-4 font-medium">{r.name}</td>
                <td className="p-4 text-background/70">{r.email}</td>
                <td className="p-4">{r.orders}</td>
                <td className="p-4">{formatKRW(r.ltv)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
