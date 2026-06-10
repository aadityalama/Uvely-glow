"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button, ButtonLink } from "@/components/ui/button";
import { resolveCartLines, useCart } from "@/context/cart-context";
import { formatKRW } from "@/lib/utils";

export default function CartPage() {
  const { lines, setQty, remove, clear, allProducts } = useCart();
  const resolved = resolveCartLines(lines, allProducts);
  const subtotal = resolved.reduce(
    (s, l) => s + l.product.priceKrw * l.quantity,
    0,
  );

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl text-deep">Your bag</h1>
      {resolved.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-card p-10 text-center">
          <p className="text-muted">Your ritual bag is empty.</p>
          <ButtonLink href="/products" variant="accent" className="mt-6">
            Continue shopping
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,20rem)]">
          <ul className="space-y-4">
            {resolved.map((line) => (
              <li
                key={line.productId}
                className="flex gap-4 rounded-2xl border border-line bg-card p-4 sm:p-5"
              >
                <Link
                  href={`/products/${line.product.slug}`}
                  className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-accent-soft/30 sm:h-28 sm:w-24"
                >
                  <Image
                    src={line.product.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${line.product.slug}`}
                    className="font-medium text-deep hover:text-accent"
                  >
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {formatKRW(line.product.priceKrw)} each
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      max={line.product.stock}
                      className="w-16 rounded-lg border border-line bg-background px-2 py-1 text-sm"
                      value={line.quantity}
                      onChange={(e) =>
                        void setQty(line.productId, Number(e.target.value) || 1)
                      }
                    />
                    <button
                      type="button"
                      className="text-xs font-semibold uppercase tracking-widest text-accent"
                      onClick={() => void remove(line.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm font-semibold">
                  {formatKRW(line.product.priceKrw * line.quantity)}
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-2xl border border-line bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Summary
            </p>
            <div className="mt-4 flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span>{formatKRW(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Shipping &amp; tax calculated at checkout.
            </p>
            <ButtonLink href="/checkout" variant="accent" className="mt-6 w-full justify-center py-3">
              Checkout
            </ButtonLink>
            <Button
              type="button"
              variant="ghost"
              className="mt-3 w-full justify-center text-xs uppercase tracking-widest"
              onClick={() => void clear()}
            >
              Clear bag
            </Button>
          </aside>
        </div>
      )}
    </Container>
  );
}
