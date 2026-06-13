"use client";

import { useEffect } from "react";

/** HTTP redirects cannot carry a hash; send users to the in-page shipping anchor on Support. */
export function ShippingInfoRedirect() {
  useEffect(() => {
    window.location.replace("/support#shipping");
  }, []);

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-sm text-muted">Opening shipping information…</p>
    </div>
  );
}
