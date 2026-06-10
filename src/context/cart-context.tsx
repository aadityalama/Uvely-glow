"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { CartLine, Product } from "@/types";
import {
  addToCartAction,
  clearCartAction,
  removeFromCartAction,
  setCartQtyAction,
} from "@/app/actions/cart";

const STORAGE = "uvely-glow-cart";

type CartContextValue = {
  lines: CartLine[];
  allProducts: Product[];
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

export function CartProvider({
  children,
  userId,
  initialDbLines,
  allProducts,
}: {
  children: React.ReactNode;
  userId: string | null;
  initialDbLines: CartLine[];
  allProducts: Product[];
}) {
  const router = useRouter();
  const [lines, setLines] = useState<CartLine[]>(userId ? initialDbLines : []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (userId) {
      setLines(initialDbLines);
    } else {
      setLines(readStorage());
    }
    setReady(true);
  }, [userId, initialDbLines]);

  useEffect(() => {
    if (!ready || userId) return;
    window.localStorage.setItem(STORAGE, JSON.stringify(lines));
  }, [lines, ready, userId]);

  const refresh = useCallback(() => {
    router.refresh();
  }, [router]);

  const add = useCallback(
    async (productId: string, qty = 1) => {
      if (userId) {
        await addToCartAction(productId, qty);
        refresh();
        return;
      }
      setLines((prev) => {
        const i = prev.findIndex((l) => l.productId === productId);
        if (i === -1) return [...prev, { productId, quantity: qty }];
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + qty };
        return next;
      });
    },
    [userId, refresh],
  );

  const setQty = useCallback(
    async (productId: string, qty: number) => {
      const q = Math.max(0, Math.floor(qty));
      if (userId) {
        await setCartQtyAction(productId, q);
        refresh();
        return;
      }
      setLines((prev) => {
        if (q === 0) return prev.filter((l) => l.productId !== productId);
        const i = prev.findIndex((l) => l.productId === productId);
        if (i === -1) return [...prev, { productId, quantity: q }];
        const next = [...prev];
        next[i] = { ...next[i], quantity: q };
        return next;
      });
    },
    [userId, refresh],
  );

  const remove = useCallback(
    async (productId: string) => {
      if (userId) {
        await removeFromCartAction(productId);
        refresh();
        return;
      }
      setLines((prev) => prev.filter((l) => l.productId !== productId));
    },
    [userId, refresh],
  );

  const clear = useCallback(async () => {
    if (userId) {
      await clearCartAction();
      refresh();
      return;
    }
    setLines([]);
  }, [userId, refresh]);

  const count = useMemo(
    () => lines.reduce((s, l) => s + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      allProducts,
      add,
      setQty,
      remove,
      clear,
      count,
    }),
    [lines, allProducts, add, setQty, remove, clear, count],
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

export function resolveCartLines(
  lines: CartLine[],
  catalog: Product[],
): Array<CartLine & { product: Product }> {
  return lines
    .map((line) => {
      const product = catalog.find((p) => p.id === line.productId);
      if (!product) return null;
      return { ...line, product };
    })
    .filter(Boolean) as Array<CartLine & { product: Product }>;
}
