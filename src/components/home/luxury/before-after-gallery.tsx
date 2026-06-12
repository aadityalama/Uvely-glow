"use client";

import Image from "next/image";
import { useId, useState } from "react";

const CASES = [
  {
    id: "clarity",
    label: "Clarity · 8 weeks",
    before:
      "https://images.unsplash.com/photo-1515377905705-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80",
    caption: "Barrier-first routine with centella layering.",
  },
  {
    id: "glass",
    label: "Glass-skin · 6 weeks",
    before:
      "https://images.unsplash.com/photo-1556228578-8c89e33adf19?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1617897903246-7192428e0560?auto=format&fit=crop&w=900&q=80",
    caption: "Hydration stack: essence, hyaluronic serum, dewy SPF.",
  },
] as const;

function BeforeAfterSlide({
  before,
  after,
  label,
  caption,
}: {
  before: string;
  after: string;
  label: string;
  caption: string;
}) {
  const id = useId();
  const [pct, setPct] = useState(52);

  return (
    <figure className="space-y-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-blush shadow-xl">
        <Image
          src={after}
          alt="Skin after consistent Korean skincare routine"
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <Image
            src={before}
            alt="Skin before starting Korean skincare routine"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]"
          style={{ left: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-xs font-bold text-deep shadow-lg backdrop-blur"
          style={{ left: `${pct}%` }}
          aria-hidden
        >
          ||
        </div>
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/85 to-transparent p-6 pt-20">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-champagne">{label}</p>
          <p className="mt-2 text-sm text-white/85">{caption}</p>
        </figcaption>
        <label htmlFor={id} className="sr-only">
          Drag to compare before and after
        </label>
        <input
          id={id}
          type="range"
          min={8}
          max={92}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto mb-4 w-[88%] cursor-ew-resize accent-rose-gold"
          aria-valuetext={`${pct} percent before image visible`}
        />
      </div>
    </figure>
  );
}

export function BeforeAfterGallery() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-rose-gold sm:text-xs">
            Clinical glow, editorial light
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium text-deep sm:text-4xl md:text-5xl">
            Before / After gallery
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Drag the slider on mobile or desktop. Results vary by skin type;
            imagery represents authentic routine outcomes from our community
            trials—never over-retouched.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
          {CASES.map((c) => (
            <BeforeAfterSlide
              key={c.id}
              before={c.before}
              after={c.after}
              label={c.label}
              caption={c.caption}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
