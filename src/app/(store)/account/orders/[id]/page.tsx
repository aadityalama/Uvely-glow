import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { getOrderForUser } from "@/lib/services/orders";
import { PAYMENT_METHOD_LABELS } from "@/lib/services/payments";
import { SHIPPING_METHOD_LABELS } from "@/lib/services/nepal-shipping";
import { getSessionUser } from "@/lib/supabase/session";
import { formatNPR } from "@/lib/utils";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account/orders");
  const { id } = await params;
  const order = await getOrderForUser(user.id, id);
  if (!order) notFound();

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Tracking
          </p>
          <h1 className="mt-2 font-display text-4xl text-deep">
            Order {order.id.slice(0, 8)}
          </h1>
          <p className="mt-2 text-muted">Invoice {order.invoiceNumber}</p>
        </div>
        <ButtonLink href={`/account/orders/${order.id}/invoice`} variant="outline">
          View invoice
        </ButtonLink>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <section className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-2xl text-deep">Status timeline</h2>
          <ol className="mt-6 space-y-4">
            {(order.events.length
              ? order.events
              : [
                  {
                    status: order.status,
                    fulfillmentStatus: "current",
                    note: null,
                    createdAt: order.createdAt,
                  },
                ]
            ).map((event, index) => (
              <li key={`${event.createdAt}-${index}`} className="flex gap-4">
                <span className="mt-1 h-3 w-3 rounded-full bg-accent" />
                <span>
                  <span className="block text-sm font-semibold uppercase tracking-widest">
                    {event.status} · {event.fulfillmentStatus}
                  </span>
                  <span className="text-sm text-muted">
                    {new Date(event.createdAt).toLocaleString("en-NP")}
                  </span>
                  {event.note ? (
                    <span className="mt-1 block text-sm text-muted">{event.note}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <aside className="space-y-4 rounded-2xl border border-line bg-card p-6 text-sm">
          <h2 className="font-display text-xl text-deep">Delivery</h2>
          <p className="text-muted">
            {order.deliveryDistrict}, {order.deliveryProvince}
          </p>
          <p>{SHIPPING_METHOD_LABELS[order.shippingMethod]}</p>
          <p className="text-muted">
            ETA: {order.estimatedDeliveryDays ?? 3} days
          </p>
          {order.trackingNumber ? (
            <p className="rounded-xl bg-background p-3 font-mono text-xs">
              {order.trackingNumber}
            </p>
          ) : (
            <p className="text-muted">Tracking number will appear after shipment.</p>
          )}
          <div className="border-t border-line pt-4">
            <p>{PAYMENT_METHOD_LABELS[order.paymentMethod]}</p>
            <p className="text-muted">Payment status: {order.paymentStatus}</p>
          </div>
        </aside>
      </div>

      <section className="mt-6 rounded-2xl border border-line bg-card p-6">
        <h2 className="font-display text-2xl text-deep">Items</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {order.items.map((item) => (
            <li key={`${item.productId}-${item.name}`} className="flex justify-between gap-4">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{formatNPR(item.unitPriceKrw * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-right font-semibold">
          Total {formatNPR(order.totalKrw)}
        </p>
      </section>

      <p className="mt-10 text-center text-sm">
        <Link href="/account/orders" className="text-accent underline-offset-4 hover:underline">
          Back to order history
        </Link>
      </p>
    </Container>
  );
}
