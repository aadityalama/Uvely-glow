import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatKRW } from "@/lib/utils";

export function NewArrivalsSection({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const [hero, ...rest] = products;

  return (
    <section className="bg-gradient-to-b from-blush/50 via-background to-background py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-gold">
              New arrivals
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.12] text-deep sm:text-4xl md:text-5xl">
              Just landed from Seoul.
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-gold underline-offset-8 transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25 focus-visible:ring-offset-2"
          >
            View all products
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Link
            href={`/products/${hero.slug}`}
            className="group relative overflow-hidden rounded-[1.75rem] border border-zinc-100/90 bg-card shadow-[var(--luxury-shadow)] ring-1 ring-black/[0.03] transition-shadow hover:shadow-[var(--luxury-shadow-lg)] lg:col-span-7 min-h-[22rem] sm:min-h-[26rem] sm:rounded-[2rem]"
          >
            <Image
              src={hero.imageUrl}
              alt={hero.name}
              fill
              sizes="(max-width:1024px) 100vw, 58vw"
              className="object-cover transition duration-[1.1s] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur">
                New
              </span>
              <h3 className="mt-4 max-w-lg font-display text-3xl text-white sm:text-4xl">
                {hero.name}
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/80">{hero.shortDescription}</p>
              <p className="mt-6 text-lg font-semibold text-champagne">{formatKRW(hero.priceKrw)}</p>
            </div>
          </Link>

          <div className="flex flex-col gap-4 lg:col-span-5">
            {rest.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="group flex gap-4 overflow-hidden rounded-[1.5rem] border border-zinc-100/90 bg-card p-4 shadow-[var(--luxury-shadow-sm)] transition hover:border-rose-gold/35 hover:shadow-[var(--luxury-shadow)] sm:rounded-[1.75rem] sm:p-5"
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-28">
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="112px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rose-gold">
                    New
                  </p>
                  <h3 className="mt-1 font-display text-lg leading-tight text-deep sm:text-xl">
                    {p.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-700">{p.shortDescription}</p>
                  <p className="mt-3 text-sm font-semibold">{formatKRW(p.priceKrw)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
