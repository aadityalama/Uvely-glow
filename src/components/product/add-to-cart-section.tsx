"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/types";

export function AddToCartSection({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div>
        <label htmlFor="qty" className="text-xs font-medium uppercase tracking-widest text-muted">
          Quantity
        </label>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-line text-lg leading-none"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            id="qty"
            inputMode="numeric"
            className="h-10 w-14 rounded-xl border border-line bg-card text-center text-sm outline-none"
            value={qty}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (Number.isNaN(v)) return;
              setQty(Math.max(1, Math.min(product.stock, v)));
            }}
          />
          <button
            type="button"
            className="h-10 w-10 rounded-full border border-line text-lg leading-none"
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <Button
        variant="accent"
        className="sm:min-w-[12rem]"
        disabled={product.stock <= 0}
        onClick={() => {
          add(product.id, qty);
          setFlash(true);
          window.setTimeout(() => setFlash(false), 1600);
        }}
      >
        {product.stock <= 0 ? "Out of stock" : flash ? "Added to bag" : "Add to bag"}
      </Button>
    </div>
  );
}
