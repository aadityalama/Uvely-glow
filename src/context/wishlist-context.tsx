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
import { toggleWishlistAction } from "@/app/actions/wishlist";

const STORAGE = "uvely-glow-wishlist";

type WishlistContextValue = {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({
  children,
  userId,
  initialDbIds,
}: {
  children: React.ReactNode;
  userId: string | null;
  initialDbIds: string[];
}) {
  const router = useRouter();
  const [ids, setIds] = useState<string[]>(userId ? initialDbIds : []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (userId) {
      setIds(initialDbIds);
    } else {
      setIds(readStorage());
    }
    setReady(true);
  }, [userId, initialDbIds]);

  useEffect(() => {
    if (!ready || userId) return;
    window.localStorage.setItem(STORAGE, JSON.stringify(ids));
  }, [ids, ready, userId]);

  const toggle = useCallback(
    async (productId: string) => {
      if (userId) {
        await toggleWishlistAction(productId);
        router.refresh();
        return;
      }
      setIds((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
    },
    [userId, router],
  );

  const has = useCallback(
    (productId: string) => ids.includes(productId),
    [ids],
  );

  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
