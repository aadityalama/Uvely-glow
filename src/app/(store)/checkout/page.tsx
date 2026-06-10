"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { placeOrderAction } from "@/app/actions/checkout";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { resolveCartLines, useCart } from "@/context/cart-context";
import {
  calculateDeliveryFee,
  getDistrictsForProvince,
  NEPAL_PROVINCES,
  SHIPPING_METHOD_LABELS,
  type ShippingMethod,
} from "@/lib/services/nepal-shipping";
import { PAYMENT_METHOD_LABELS, type PaymentMethod } from "@/lib/services/payments";
import { formatNPR } from "@/lib/utils";

const TAX_RATE = 0.1;
const STEPS = ["Address", "Shipping", "Payment", "Review"] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, allProducts } = useCart();
  const resolved = resolveCartLines(lines, allProducts);
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [step, setStep] = useState(0);
  const [province, setProvince] = useState("Bagmati");
  const [district, setDistrict] = useState("Kathmandu");
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cash_on_delivery");

  const subtotal = resolved.reduce(
    (s, l) => s + l.product.priceKrw * l.quantity,
    0,
  );
  const districts = useMemo(() => getDistrictsForProvince(province), [province]);
  const delivery = calculateDeliveryFee({
    province,
    district,
    method: shippingMethod,
    subtotalKrw: subtotal,
  });
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + delivery.feeKrw + tax;

  function nextStep() {
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  function previousStep() {
    setStep((current) => Math.max(current - 1, 0));
  }

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
        Multi-step Nepal checkout with saved address, delivery, and payment options.
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
            line2: String(fd.get("line2") ?? ""),
            city: String(fd.get("city")),
            province,
            district,
            postal: String(fd.get("postal")),
            shippingMethod,
            paymentMethod,
            saveAddress: fd.get("save_address") === "on",
          });
          setPending(false);
          if ("error" in res) setErr(res.error);
          else {
            router.push(res.redirectUrl ?? `/account/orders/${res.orderId}`);
            router.refresh();
          }
        }}
      >
        <div className="space-y-6 rounded-2xl border border-line bg-card p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {STEPS.map((label, index) => (
              <button
                key={label}
                type="button"
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${
                  index === step
                    ? "bg-deep text-background"
                    : "bg-background text-muted"
                }`}
                onClick={() => setStep(index)}
              >
                {index + 1}. {label}
              </button>
            ))}
          </div>

          {step === 0 ? (
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-deep">Delivery address</h2>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="line1">Street address</Label>
                <Input id="line1" name="line1" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="line2">Apartment, landmark, or notes</Label>
                <Input id="line2" name="line2" className="mt-1.5" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="city">Municipality / city</Label>
                  <Input id="city" name="city" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="postal">Postal code</Label>
                  <Input id="postal" name="postal" required className="mt-1.5" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input name="save_address" type="checkbox" className="h-4 w-4" />
                Save this address to my account
              </label>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-deep">Shipping selection</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="province">Province</Label>
                  <select
                    id="province"
                    value={province}
                    onChange={(e) => {
                      const nextProvince = e.target.value;
                      setProvince(nextProvince);
                      setDistrict(getDistrictsForProvince(nextProvince)[0]?.district ?? "");
                    }}
                    className="mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm"
                  >
                    {NEPAL_PROVINCES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="district">District</Label>
                  <select
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm"
                  >
                    {districts.map((item) => (
                      <option key={item.district} value={item.district}>
                        {item.district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-3">
                {(Object.keys(SHIPPING_METHOD_LABELS) as ShippingMethod[]).map((method) => {
                  const quote = calculateDeliveryFee({
                    province,
                    district,
                    method,
                    subtotalKrw: subtotal,
                  });
                  return (
                    <label
                      key={method}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line bg-background p-4"
                    >
                      <span>
                        <span className="block font-medium">
                          {SHIPPING_METHOD_LABELS[method]}
                        </span>
                        <span className="text-xs text-muted">
                          {quote.supportsMethod
                            ? `${quote.estimatedDaysMin}-${quote.estimatedDaysMax} day delivery`
                            : "Unavailable for this district"}
                        </span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="text-sm font-semibold">
                          {formatNPR(quote.feeKrw)}
                        </span>
                        <input
                          type="radio"
                          checked={shippingMethod === method}
                          disabled={!quote.supportsMethod}
                          onChange={() => setShippingMethod(method)}
                        />
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-deep">Payment</h2>
              {(Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[]).map((method) => (
                <label
                  key={method}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line bg-background p-4"
                >
                  <span>
                    <span className="block font-medium">
                      {PAYMENT_METHOD_LABELS[method]}
                    </span>
                    <span className="text-xs text-muted">
                      {method === "cash_on_delivery"
                        ? "Collect payment at delivery."
                        : "Framework ready for provider credentials and callback verification."}
                    </span>
                  </span>
                  <input
                    type="radio"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                </label>
              ))}
            </section>
          ) : null}

          {step === 3 ? (
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-deep">Review order</h2>
              <p className="text-sm text-muted">
                Delivery to {district}, {province} by{" "}
                {SHIPPING_METHOD_LABELS[shippingMethod]}. Payment via{" "}
                {PAYMENT_METHOD_LABELS[paymentMethod]}.
              </p>
              {err ? <p className="text-sm text-accent">{err}</p> : null}
            </section>
          ) : null}

          <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={previousStep}
            >
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button type="button" variant="accent" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="submit" variant="accent" disabled={pending}>
                {pending ? "Placing order..." : "Place order"}
              </Button>
            )}
          </div>
        </div>
        <aside className="h-fit space-y-4 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-xl text-deep">Order summary</h2>
          <ul className="space-y-2 text-sm">
            {resolved.map((l) => (
              <li key={l.productId} className="flex justify-between gap-4">
                <span className="text-muted">
                  {l.product.name} <span className="text-foreground">x{l.quantity}</span>
                </span>
                <span>{formatNPR(l.product.priceKrw * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span>{formatNPR(subtotal)}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-muted">Delivery</span>
              <span>{formatNPR(delivery.feeKrw)}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-muted">Tax (10%)</span>
              <span>{formatNPR(tax)}</span>
            </div>
            <div className="mt-4 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatNPR(total)}</span>
            </div>
          </div>
          <p className="rounded-xl bg-background p-3 text-xs text-muted">
            Free delivery applies above {formatNPR(50000)}. Nepal provider fees
            are stored with the order for admin fulfillment.
          </p>
        </aside>
      </form>
    </Container>
  );
}
