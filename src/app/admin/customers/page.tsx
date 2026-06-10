import { formatKRW } from "@/lib/utils";
import { listCustomersWithOrderStats } from "@/lib/services/admin-users";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AdminCustomersPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-background/70">
        Set NEXT_PUBLIC_SUPABASE_URL and anon key to load customer profiles.
      </p>
    );
  }

  const rows = await listCustomersWithOrderStats();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Customer management</h1>
      <p className="text-sm text-background/70">
        Profiles with order counts and lifetime order value from Supabase.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-widest text-background/60">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Orders</th>
              <th className="p-4 font-medium">LTV</th>
              <th className="p-4 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-background/60">
                  No profiles yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0">
                  <td className="p-4 font-medium">{r.full_name || "—"}</td>
                  <td className="p-4 text-background/70">{r.email ?? "—"}</td>
                  <td className="p-4">{r.orderCount}</td>
                  <td className="p-4">{formatKRW(r.ltvKrw)}</td>
                  <td className="p-4 text-background/70">{r.is_admin ? "Admin" : "Customer"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
