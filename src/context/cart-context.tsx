"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine } from "@/types";
import { products } from "@/data/products";

const STORAGE = "uvely-glow-cart";

type CartContextValue = {
  lines: CartLine[];
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback((productId: string, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.productId === productId);
      if (i === -1) return [...prev, { productId, quantity: qty }];
      const next = [...prev];
      next[i] = { ...next[i], quantity: next[i].quantity + qty };
      return next;
    });
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    const q = Math.max(0, Math.floor(qty));
    setLines((prev) => {
      if (q === 0) return prev.filter((l) => l.productId !== productId);
      const i = prev.findIndex((l) => l.productId === productId);
      if (i === -1) return [...prev, { productId, quantity: q }];
      const next = [...prev];
      next[i] = { ...next[i], quantity: q };
      return next;
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(
    () => lines.reduce((s, l) => s + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({ lines, add, setQty, remove, clear, count }),
    [lines, add, setQty, remove, clear, count],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function useCartProduct(productId: string) {
  const { lines } = useCart();
  return lines.find((l) => l.productId === productId)?.quantity ?? 0;
}

export function resolveCartLines(lines: CartLine[]) {
  return lines
    .map((line) => {
      const product = products.find((p) => p.id === line.productId);
      if (!product) return null;
      return { ...line, product };
    })
    .filter(Boolean) as Array<CartLine & { product: (typeof products)[number] }>;
}
