import { getSupportSnapshot } from "@/lib/services/enterprise";

export default async function AdminSupportPage() {
  const support = await getSupportSnapshot();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">Support dashboard</h1>
        <p className="mt-2 text-sm text-background/70">
          AI support assistant, FAQ knowledge base, ticket queues, assignment, and SLA monitoring.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Open tickets" value={String(support.openTickets)} />
        <Metric label="Avg response" value={`${support.avgResponseHours}h`} />
        <Metric label="Assistant" value={support.aiAssistantName} />
      </div>
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-xl">FAQ categories</h2>
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {support.faqCategories.map((category) => (
            <span key={category} className="rounded-full border border-white/10 px-3 py-1">
              {category}
            </span>
          ))}
        </div>
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
