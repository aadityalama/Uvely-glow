import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/layout/container";
import { buildInvoiceRows } from "@/lib/services/invoices";
import { getOrderForUser } from "@/lib/services/orders";
import { getSessionUser } from "@/lib/supabase/session";
import { formatNPR } from "@/lib/utils";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account/orders");
  const { id } = await params;
  const order = await getOrderForUser(user.id, id);
  if (!order) notFound();
  const rows = buildInvoiceRows(order.items);

  return (
    <Container className="py-12 sm:py-16">
      <div className="rounded-2xl border border-line bg-card p-8">
        <div className="flex flex-wrap justify-between gap-6 border-b border-line pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Invoice
            </p>
            <h1 className="mt-2 font-display text-4xl text-deep">
              {order.invoiceNumber}
            </h1>
            <p className="mt-2 text-sm text-muted">
              Issued {new Date(order.createdAt).toLocaleDateString("en-NP")}
            </p>
          </div>
          <div className="text-sm text-muted">
            <p className="font-semibold text-foreground">Uvely Glow Nepal</p>
            <p>Kathmandu, Nepal</p>
            <p>support@uvely.example</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 text-sm sm:grid-cols-2">
          <div>
            <h2 className="font-semibold">Bill to</h2>
            <p className="mt-2 text-muted">{order.email}</p>
          </div>
          <div>
            <h2 className="font-semibold">Ship to</h2>
            <p className="mt-2 text-muted">{order.shipping.name}</p>
            <p className="text-muted">{order.shipping.line1}</p>
            <p className="text-muted">
              {order.shipping.city}, {order.deliveryDistrict}, {order.deliveryProvince}
            </p>
          </div>
        </div>

        <table className="mt-8 w-full text-left text-sm">
          <thead className="border-b border-line text-xs uppercase tracking-widest text-muted">
            <tr>
              <th className="py-3 font-medium">Item</th>
              <th className="py-3 text-right font-medium">Qty</th>
              <th className="py-3 text-right font-medium">Unit</th>
              <th className="py-3 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.description} className="border-b border-line/70">
                <td className="py-3">{row.description}</td>
                <td className="py-3 text-right">{row.quantity}</td>
                <td className="py-3 text-right">{formatNPR(row.unitPriceKrw)}</td>
                <td className="py-3 text-right">{formatNPR(row.lineTotalKrw)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="ml-auto mt-6 max-w-xs space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>{formatNPR(order.subtotalKrw)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Delivery</span>
            <span>{formatNPR(order.shippingKrw)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Tax</span>
            <span>{formatNPR(order.taxKrw)}</span>
          </div>
          <div className="flex justify-between border-t border-line pt-2 text-base font-semibold">
            <span>Total</span>
            <span>{formatNPR(order.totalKrw)}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
