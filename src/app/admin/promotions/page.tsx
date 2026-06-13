import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotions",
  robots: { index: false, follow: false },
};

export default function AdminPromotionsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-background">Promotions</h1>
      <p className="mt-2 max-w-2xl text-sm text-background/70">
        Manage coupons, timed drops, and campaign landing pages. Marketing automation hooks can
        connect here when you enable outbound messaging.
      </p>
      <p className="mt-6 text-sm text-background/80">
        Related tools:{" "}
        <Link className="text-champagne underline-offset-4 hover:underline" href="/admin/marketing">
          Marketing workspace
        </Link>
      </p>
    </div>
  );
}
