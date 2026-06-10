"use client";

import { useEffect } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function ProductViewAnalytics({ productId }: { productId: string }) {
  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) return;
    void supabase.from("analytics_events").insert({
      event_name: "product_view",
      product_id: productId,
      metadata: { source: "product_detail" },
    });
  }, [productId]);

  return null;
}
