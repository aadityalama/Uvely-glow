import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function listCustomersForAdmin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, created_at, is_admin")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error || !data) return [];
  return data;
}

export type CustomerRow = Awaited<ReturnType<typeof listCustomersForAdmin>>[number] & {
  orderCount: number;
  ltvKrw: number;
};

export async function listCustomersWithOrderStats(): Promise<CustomerRow[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, created_at, is_admin")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error || !profiles?.length) return [];

  const { data: orders } = await supabase.from("orders").select("user_id, total_krw");
  const byUser = new Map<string, { count: number; ltv: number }>();
  for (const o of orders ?? []) {
    if (!o.user_id) continue;
    const cur = byUser.get(o.user_id) ?? { count: 0, ltv: 0 };
    cur.count += 1;
    cur.ltv += o.total_krw;
    byUser.set(o.user_id, cur);
  }
  return profiles.map((p) => {
    const s = byUser.get(p.id);
    return { ...p, orderCount: s?.count ?? 0, ltvKrw: s?.ltv ?? 0 };
  });
}
