import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const cardHeading = "font-display text-2xl text-[#0F172A] sm:text-3xl";
const cardLabel =
  "text-xs font-semibold uppercase tracking-[0.22em] text-[#475569]";
const cardBody =
  "mt-4 space-y-4 text-sm leading-relaxed text-[#334155] sm:text-base";

type LightGlassCardProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Light frosted glass panel on dark pages. Typography is tuned for contrast
 * (dark text); hero and page shell keep light-on-dark styling separately.
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

/** Inline subheading inside a glass card (still on light glass). */
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
        "text-base font-semibold text-[#0F172A] sm:text-lg",
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
    <p className={cn("text-sm text-[#475569]", className)}>{children}</p>
  );
}
