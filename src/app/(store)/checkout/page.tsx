"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useAccount } from "@/context/account-context";
import { useCart, resolveCartLines } from "@/context/cart-context";
import type { LocalOrder, OrderStatus } from "@/types";
import { formatKRW } from "@/lib/utils";

const SHIPPING = 0;
const TAX_RATE = 0.1;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, clear } = useCart();
  const { addOrder, profile } = useAccount();
  const resolved = resolveCartLines(lines);

  const [email, setEmail] = useState(profile.email);
  const [name, setName] = useState(profile.fullName);
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("KR");

  const subtotal = useMemo(
    () => resolved.reduce((s, l) => s + l.product.priceKrw * l.quantity, 0),
    [resolved],
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
        Demo checkout — orders are stored locally in your browser.
      </p>
      <form
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)]"
        onSubmit={(e) => {
          e.preventDefault();
          const order: LocalOrder = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            email,
            status: "paid" as OrderStatus,
            subtotalKrw: subtotal,
            shippingKrw: SHIPPING,
            taxKrw: tax,
            totalKrw: total,
            items: resolved.map((l) => ({
              productId: l.productId,
              name: l.product.name,
              unitPriceKrw: l.product.priceKrw,
              quantity: l.quantity,
            })),
            shipping: {
              name,
              line1,
              line2: "",
              city,
              region,
              postal,
              country,
            },
          };
          addOrder(order);
          clear();
          router.push("/account/orders");
        }}
      >
        <div className="space-y-6 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl text-deep">Shipping</h2>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="line1">Address</Label>
            <Input
              id="line1"
              required
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="postal">Postal code</Label>
              <Input
                id="postal"
                required
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>
        <aside className="h-fit space-y-4 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-xl text-deep">Order summary</h2>
          <ul className="space-y-2 text-sm">
            {resolved.map((l) => (
              <li key={l.productId} className="flex justify-between gap-4">
                <span className="text-muted">
                  {l.product.name}{" "}
                  <span className="text-foreground">×{l.quantity}</span>
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
          <Button type="submit" variant="accent" className="mt-4 w-full justify-center py-3">
            Place order
          </Button>
        </aside>
      </form>
    </Container>
  );
}
