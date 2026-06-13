import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-background">Settings</h1>
      <p className="mt-2 max-w-2xl text-sm text-background/70">
        Configure storefront defaults, shipping thresholds (including NPR 7,000 free shipping),
        tax display, and notification emails. Wire environment-backed values in production.
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-sm text-background/75">
        <li>Primary locale: English (storefront Korean toggle is customer-facing only).</li>
        <li>Supabase keys and service integrations belong in deployment secrets.</li>
      </ul>
    </div>
  );
}
