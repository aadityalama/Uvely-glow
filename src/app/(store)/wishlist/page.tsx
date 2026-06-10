"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { formatKRW } from "@/lib/utils";

export default function WishlistPage() {
  const { ids, toggle } = useWishlist();
  const { allProducts } = useCart();
  const items = allProducts.filter((p) => ids.includes(p.id));

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl text-deep">Wishlist</h1>
      <p className="mt-2 text-muted">Saved for your next ritual restock.</p>
      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-card p-10 text-center">
          <p className="text-muted">No saved products yet.</p>
          <ButtonLink href="/products" variant="accent" className="mt-6">
            Explore shop
          </ButtonLink>
        </div>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li
              key={p.id}
              className="overflow-hidden rounded-2xl border border-line bg-card shadow-sm"
            >
              <Link href={`/products/${p.slug}`} className="relative block aspect-[4/5]">
                <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="33vw" />
              </Link>
              <div className="space-y-2 p-4">
                <Link href={`/products/${p.slug}`} className="font-medium hover:text-accent">
                  {p.name}
                </Link>
                <p className="text-sm font-semibold">{formatKRW(p.priceKrw)}</p>
                <button
                  type="button"
                  className="text-xs font-semibold uppercase tracking-widest text-accent"
                  onClick={() => void toggle(p.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
