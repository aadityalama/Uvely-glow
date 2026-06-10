"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { mergeGuestCartAction } from "@/app/actions/cart";

const STORAGE = "uvely-glow-cart";

export function MergeGuestCart({ userId }: { userId: string | null }) {
  const router = useRouter();
  const ran = useRef(false);

  useEffect(() => {
    if (!userId || ran.current) return;
    try {
      const raw = window.localStorage.getItem(STORAGE);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { productId: string; quantity: number }[];
      if (!Array.isArray(parsed) || !parsed.length) return;
      ran.current = true;
      void mergeGuestCartAction(parsed).then(() => {
        window.localStorage.removeItem(STORAGE);
        router.refresh();
      });
    } catch {
      ran.current = true;
    }
  }, [userId, router]);

  return null;
}
