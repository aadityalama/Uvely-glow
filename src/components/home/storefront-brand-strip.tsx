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
    <section className="border-y border-zinc-200 bg-white">
      <Container className="max-w-[1200px] py-5 sm:py-6">
        {title ? (
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
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
                "shrink-0 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-800 transition hover:text-accent sm:text-xs",
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
