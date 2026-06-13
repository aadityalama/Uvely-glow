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
    <section className="border-b border-line/80 bg-background py-6 sm:py-7">
      <Container>
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">
          {title}
        </p>
        <div className="scrollbar-hide mt-5 flex items-center justify-start gap-8 overflow-x-auto pb-1 sm:justify-center sm:gap-10 md:gap-12">
          {BRANDS.map((name) => (
            <Link
              key={name}
              href={`/products?q=${encodeURIComponent(name)}`}
              className={cn(
                "shrink-0 font-display text-lg tracking-[0.08em] text-deep/85 transition hover:text-accent sm:text-xl",
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
