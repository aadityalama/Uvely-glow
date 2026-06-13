import Link from "next/link";
import { Container } from "@/components/layout/container";
import type { StoreMessages } from "@/lib/i18n/store-messages";
import { cn } from "@/lib/utils";

const BRANDS = [
  "TIRTIR",
  "ANUA",
  "COSRX",
  "ABIB",
  "ROUND LAB",
  "BEAUTY OF JOSEON",
  "MEDIHEAL",
] as const;

export function StorefrontBrandStrip({ title }: { title: StoreMessages["brands"]["title"] }) {
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
            "scrollbar-hide flex items-center justify-start gap-10 overflow-x-auto pb-0.5 sm:justify-center md:gap-14",
            title ? "mt-5" : "mt-0",
          )}
        >
          {BRANDS.map((name) => (
            <Link
              key={name}
              href={`/products?q=${encodeURIComponent(name)}`}
              className={cn(
                "shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-900 transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2 sm:text-xs",
                name.includes(" ") ? "whitespace-nowrap" : "",
              )}
            >
              {name}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
