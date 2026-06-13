import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Light-on-frosted-glass: tuned for WCAG AA on dark marketing shells */
const cardHeading =
  "font-display text-2xl font-semibold leading-tight tracking-tight text-[#F8F5F0] sm:text-3xl sm:font-bold";
const cardLabel =
  "text-xs font-semibold uppercase tracking-[0.22em] text-[#E5E7EB]";
const cardBody =
  "mt-4 space-y-4 text-base font-normal leading-[1.8] text-[#D1D5DB] sm:text-lg sm:leading-[1.85]";

type LightGlassCardProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Light frosted glass panel on dark pages. Copy uses high-contrast light
 * typography so body and headings stay readable over the glass layer.
 */
export function LightGlassCard({
  id,
  eyebrow,
  title,
  children,
  className,
}: LightGlassCardProps) {
  return (
    <section
      id={id}
      className={cn(
        "rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg shadow-black/20 backdrop-blur-xl sm:p-8",
        className,
      )}
    >
      {eyebrow ? <p className={cardLabel}>{eyebrow}</p> : null}
      <h2 className={cn(eyebrow ? "mt-3" : "", cardHeading)}>{title}</h2>
      <div className={cardBody}>{children}</div>
    </section>
  );
}

/** Inline subheading inside a glass card (same ivory title treatment as card H2). */
export function LightGlassCardSubheading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-base font-semibold leading-snug text-[#F8F5F0] sm:text-lg sm:font-bold",
        className,
      )}
    >
      {children}
    </h3>
  );
}

/** Muted line inside a glass card (captions, hints). */
export function LightGlassCardMuted({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-base font-normal leading-[1.8] text-[#D1D5DB] sm:leading-[1.85]",
        className,
      )}
    >
      {children}
    </p>
  );
}
