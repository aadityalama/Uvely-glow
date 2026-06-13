"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setStoreLocaleAction } from "@/app/actions/locale";
import type { StoreLocale } from "@/lib/i18n/constants";
import { cn } from "@/lib/utils";

export function HeaderLanguageSwitch({
  locale,
  englishLabel,
  koreanLabel,
  ariaLabel,
  variant = "onDark",
  className,
  labelClassName,
}: {
  locale: StoreLocale;
  englishLabel: string;
  koreanLabel: string;
  ariaLabel: string;
  variant?: "onDark" | "onLight" | "onLuxury";
  /** Wrapper — use for spacing / base typography in footer etc. */
  className?: string;
  /** Per-button text sizing (defaults to compact header sizing). */
  labelClassName?: string;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function pick(next: StoreLocale) {
    if (next === locale) return;
    start(async () => {
      await setStoreLocaleAction(next);
      router.refresh();
    });
  }

  const inactive =
    variant === "onLuxury"
      ? "text-white/60 hover:text-champagne"
      : variant === "onDark"
        ? "text-white/55 hover:text-white/90"
        : "text-zinc-500 hover:text-zinc-800";
  const active =
    variant === "onLuxury"
      ? "text-champagne border-champagne"
      : variant === "onDark"
        ? "text-white border-white"
        : "text-deep border-deep";
  const sep =
    variant === "onLuxury" ? "text-white/35" : variant === "onDark" ? "text-white/35" : "text-zinc-300";

  const labelBase = labelClassName ?? "text-[11px] font-semibold uppercase tracking-[0.14em]";

  return (
    <div className={cn("flex items-center gap-2", labelBase, className)} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        disabled={pending}
        onClick={() => pick("en")}
        className={cn(
          "border-b border-transparent pb-0.5 transition",
          locale === "en" ? active : inactive,
        )}
      >
        {englishLabel}
      </button>
      <span className={cn("select-none font-normal opacity-80", sep)} aria-hidden>
        |
      </span>
      <button
        type="button"
        disabled={pending}
        onClick={() => pick("ko")}
        className={cn(
          "border-b border-transparent pb-0.5 transition",
          locale === "ko" ? active : inactive,
        )}
      >
        {koreanLabel}
      </button>
    </div>
  );
}
