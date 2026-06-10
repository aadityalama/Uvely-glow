import { getOperationsSnapshot } from "@/lib/services/enterprise";

export default async function OperationsPage() {
  const ops = await getOperationsSnapshot();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-background">Warehouse operations</h1>
        <p className="mt-2 text-sm text-background/70">
          Warehouse inventory, stock forecasting, low stock alerts, and purchase order planning.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Warehouses" value={String(ops.warehouses)} />
        <Metric label="Units on hand" value={ops.totalStock.toLocaleString()} />
        <Metric label="30d forecast" value={ops.forecast30dUnits.toLocaleString()} />
        <Metric label="Open POs" value={String(ops.purchaseOrdersOpen)} />
      </div>
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-display text-xl">Low stock alerts</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {ops.lowStockProducts.map((product) => (
            <li key={product.id} className="flex justify-between border-b border-white/5 py-2 last:border-0">
              <span>{product.name}</span>
              <span className="text-accent-soft">{product.stock} left</span>
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
