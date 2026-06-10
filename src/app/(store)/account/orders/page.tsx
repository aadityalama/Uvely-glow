"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { useAccount } from "@/context/account-context";
import { formatKRW } from "@/lib/utils";

export default function OrdersPage() {
  const { orders } = useAccount();

  return (
    <Container className="py-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-deep">Order history</h1>
          <p className="mt-2 text-muted">Placed orders in this browser session.</p>
        </div>
        <ButtonLink href="/products" variant="outline">
          Shop again
        </ButtonLink>
      </div>
      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-card p-10 text-center text-muted">
          No orders yet. Complete checkout to see them here.
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="rounded-2xl border border-line bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">
                  {new Date(o.createdAt).toLocaleString("ko-KR")}
                </p>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                  {o.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{o.email}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {o.items.map((it) => (
                  <li key={`${o.id}-${it.productId}`} className="flex justify-between gap-4">
                    <span>
                      {it.name} ×{it.quantity}
                    </span>
                    <span>{formatKRW(it.unitPriceKrw * it.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-right text-base font-semibold">
                Total {formatKRW(o.totalKrw)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-10 text-center text-sm">
        <Link href="/account" className="text-accent underline-offset-4 hover:underline">
          Back to profile
        </Link>
      </p>
    </Container>
  );
}
