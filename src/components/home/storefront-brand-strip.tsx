import Link from "next/link";
import { Container } from "@/components/layout/container";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";

/** Homepage featured brands — official display names + stable product search queries */
const FEATURED_BRANDS = [
  { name: "Beauty of Joseon", query: "Beauty of Joseon" },
  { name: "COSRX", query: "COSRX" },
  { name: "Anua", query: "Anua" },
  { name: "SKIN1004", query: "SKIN1004" },
  { name: "Round Lab", query: "Round Lab" },
] as const;

export function StorefrontBrandStrip({ title }: { title: StoreMessages["brands"]["title"] }) {
  const last = FEATURED_BRANDS.length - 1;

  return (
    <section className="border-y border-zinc-200/90 bg-white py-8 sm:py-12">
      <Container className="max-w-[1200px]">
        {title ? (
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.32em] text-zinc-600">
            {title}
          </p>
        ) : null}
        <div
          className={cn(
            "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 md:gap-3 lg:gap-5",
            title ? "mt-5" : "mt-0",
          )}
        >
          {FEATURED_BRANDS.map((brand, i) => (
            <Link
              key={brand.name}
              href={`/products?q=${encodeURIComponent(brand.query)}`}
              className={cn(
                "group flex min-h-[3.5rem] items-center justify-center rounded-2xl border border-zinc-200/90 bg-gradient-to-b from-white to-zinc-50/90 px-3 py-3 text-center text-[12px] font-semibold leading-snug tracking-wide text-zinc-900 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,10,12,0.04)] transition sm:min-h-[3.75rem] sm:px-4 sm:text-[13px] md:min-h-0 md:py-3.5",
                "hover:border-rose-gold/35 hover:text-accent hover:shadow-[var(--luxury-shadow-sm)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2",
                /* Center lone item on 2-col mobile layout */
                i === last && "col-span-2 justify-self-center sm:col-span-1",
              )}
            >
              <span className="text-balance">{brand.name}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
