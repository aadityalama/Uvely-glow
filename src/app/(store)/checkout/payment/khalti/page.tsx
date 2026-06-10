import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { formatNPR } from "@/lib/utils";

export default async function KhaltiPaymentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const orderId = String(params.order_id ?? "");
  const amount = Number(params.amount ?? 0);

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-card p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Khalti framework
        </p>
        <h1 className="mt-3 font-display text-4xl text-deep">Payment initiated</h1>
        <p className="mt-4 text-muted">
          Order {orderId.slice(0, 8)} is ready for Khalti checkout for{" "}
          {formatNPR(amount)}. Add public key initialization, token exchange, and
          server-side verification before enabling live capture.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`/account/orders/${orderId}`} variant="accent">
            Track order
          </ButtonLink>
          <Link href="/account/orders" className="px-5 py-2.5 text-sm text-muted">
            Order history
          </Link>
        </div>
      </div>
    </Container>
  );
}
