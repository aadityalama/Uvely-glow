import { getSecuritySnapshot } from "@/lib/services/enterprise";

export default async function AdminSecurityPage() {
  const security = await getSecuritySnapshot();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">Security hardening</h1>
        <p className="mt-2 text-sm text-background/70">
          Audit logs, rate limiting, admin activity tracking, and production readiness controls.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Audit events" value={String(security.auditEventsToday)} />
        <Metric label="Rate blocks" value={String(security.blockedRateLimitEvents)} />
        <Metric label="Admin actions" value={String(security.adminActionsToday)} />
      </div>
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-xl">Production readiness audit</h2>
        <ul className="mt-4 space-y-2 text-sm text-background/70">
          {security.hardeningChecklist.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-background/60">{label}</p>
      <p className="mt-2 font-display text-2xl">{value}</p>
    </div>
  );
}
