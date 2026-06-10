"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { placeOrderAction } from "@/app/actions/checkout";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { resolveCartLines, useCart } from "@/context/cart-context";
import { formatKRW } from "@/lib/utils";

const SHIPPING = 0;
const TAX_RATE = 0.1;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, allProducts } = useCart();
  const resolved = resolveCartLines(lines, allProducts);
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const subtotal = resolved.reduce(
    (s, l) => s + l.product.priceKrw * l.quantity,
    0,
  );
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + SHIPPING + tax;

  if (resolved.length === 0) {
    return (
      <Container className="py-16">
        <h1 className="font-display text-3xl text-deep">Checkout</h1>
        <p className="mt-4 text-muted">Your bag is empty.</p>
        <Button
          variant="accent"
          className="mt-6"
          onClick={() => router.push("/products")}
        >
          Browse products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl text-deep">Checkout</h1>
      <p className="mt-2 text-sm text-muted">
        Secure checkout — orders are saved to your Uvely Glow account.
      </p>
      <form
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)]"
        onSubmit={async (e) => {
          e.preventDefault();
          setErr(null);
          setPending(true);
          const fd = new FormData(e.currentTarget);
          const res = await placeOrderAction({
            email: String(fd.get("email")),
            name: String(fd.get("name")),
            line1: String(fd.get("line1")),
            city: String(fd.get("city")),
            region: String(fd.get("region")),
            postal: String(fd.get("postal")),
            country: String(fd.get("country") || "KR"),
          });
          setPending(false);
          if ("error" in res) setErr(res.error);
          else {
            router.push("/account/orders");
            router.refresh();
          }
        }}
      >
        <div className="space-y-6 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl text-deep">Shipping</h2>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" name="name" required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="line1">Address</Label>
            <Input id="line1" name="line1" required className="mt-1.5" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="region">Region</Label>
              <Input id="region" name="region" className="mt-1.5" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="postal">Postal code</Label>
              <Input id="postal" name="postal" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" name="country" defaultValue="KR" className="mt-1.5" />
            </div>
          </div>
          {err ? <p className="text-sm text-accent">{err}</p> : null}
        </div>
        <aside className="h-fit space-y-4 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-xl text-deep">Order summary</h2>
          <ul className="space-y-2 text-sm">
            {resolved.map((l) => (
              <li key={l.productId} className="flex justify-between gap-4">
                <span className="text-muted">
                  {l.product.name} <span className="text-foreground">×{l.quantity}</span>
                </span>
                <span>{formatKRW(l.product.priceKrw * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatKRW(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-muted">Shipping</span>
              <span>{formatKRW(SHIPPING)}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-muted">Tax (demo 10%)</span>
              <span>{formatKRW(tax)}</span>
            </div>
            <div className="mt-4 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatKRW(total)}</span>
            </div>
          </div>
          <Button
            type="submit"
            variant="accent"
            className="mt-4 w-full justify-center py-3"
            disabled={pending}
          >
            {pending ? "Placing order…" : "Place order"}
          </Button>
        </aside>
      </form>
    </Container>
  );
}
