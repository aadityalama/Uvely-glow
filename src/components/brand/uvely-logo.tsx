import { cn } from "@/lib/utils";
import Link from "next/link";

type LogoSize = "sm" | "md" | "lg" | "hero";

const sizeClasses: Record<LogoSize, { wrap: string; monogram: string; word: string; tag: string }> = {
  sm: {
    wrap: "gap-2",
    monogram: "h-8 w-8 text-[11px]",
    word: "text-lg tracking-[0.02em]",
    tag: "text-[9px] tracking-[0.35em]",
  },
  md: {
    wrap: "gap-2.5",
    monogram: "h-9 w-9 text-xs",
    word: "text-xl sm:text-2xl tracking-[0.02em]",
    tag: "text-[10px] tracking-[0.38em]",
  },
  lg: {
    wrap: "gap-3",
    monogram: "h-11 w-11 text-sm",
    word: "text-2xl sm:text-3xl tracking-[0.01em]",
    tag: "text-[10px] tracking-[0.4em]",
  },
  hero: {
    wrap: "gap-4",
    monogram: "h-14 w-14 sm:h-16 sm:w-16 text-base sm:text-lg",
    word: "text-4xl sm:text-5xl md:text-6xl tracking-[0.01em]",
    tag: "text-[11px] sm:text-xs tracking-[0.45em]",
  },
};

export function UvelyLogo({
  size = "md",
  href,
  className,
  inverted,
  wordmarkOnly = false,
}: {
  size?: LogoSize;
  href?: string;
  className?: string;
  /** Light-on-dark treatment */
  inverted?: boolean;
  /** Reference header: serif wordmark without monogram circle */
  wordmarkOnly?: boolean;
}) {
  const s = sizeClasses[size];
  const content = (
    <span className={cn("inline-flex items-center", wordmarkOnly ? "gap-0" : s.wrap, className)}>
      {wordmarkOnly ? null : (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border font-display font-semibold leading-none",
            s.monogram,
            inverted
              ? "border-white/35 bg-white/10 text-white backdrop-blur-md"
              : "border-rose-gold/35 bg-gradient-to-br from-rose-gold/15 to-blush-deep/10 text-deep",
          )}
          aria-hidden
        >
          UG
        </span>
      )}
      <span className={cn("flex min-w-0 flex-col", wordmarkOnly && "-mt-0.5")}>
        <span
          className={cn(
            "font-display font-medium leading-none",
            s.word,
            inverted ? "text-white" : "text-deep",
          )}
        >
          Uvely Glow
        </span>
        <span
          className={cn(
            "mt-1 font-sans font-semibold uppercase",
            s.tag,
            inverted ? "text-champagne/90" : "text-rose-gold",
          )}
        >
          Seoul · Since 2019
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm">
        {content}
      </Link>
    );
  }
  return content;
}
