"use client";

import { useActionState } from "react";
import { subscribeNewsletterAction } from "@/app/actions/marketing";
import { cn } from "@/lib/utils";

export function FooterNewsletterForm({
  emailPlaceholder,
  subscribeLabel,
  privacyNote,
  privacyLinkLabel,
  theme = "dark",
}: {
  emailPlaceholder: string;
  subscribeLabel: string;
  privacyNote: string;
  privacyLinkLabel: string;
  theme?: "dark" | "light";
}) {
  const [state, formAction, pending] = useActionState(subscribeNewsletterAction, null);
  const light = theme === "light";

  return (
    <div>
      <form action={formAction} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input type="hidden" name="source" value="footer" />
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={emailPlaceholder}
          className={cn(
            "min-h-[44px] min-w-0 flex-1 border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-offset-0",
            light
              ? "border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-zinc-900/15"
              : "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-champagne/60 focus:ring-champagne/25",
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "min-h-[44px] shrink-0 px-6 text-[11px] font-semibold uppercase tracking-[0.2em] transition disabled:opacity-60",
            light
              ? "border border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800"
              : "rounded-full bg-gradient-to-r from-champagne to-rose-gold-light text-deep shadow-lg hover:opacity-95",
          )}
        >
          {pending ? "…" : subscribeLabel}
        </button>
      </form>
      {state?.error ? (
        <p className={cn("mt-2 text-sm", light ? "text-red-600" : "text-rose-200")}>{state.error}</p>
      ) : null}
      {state?.ok ? (
        <p className={cn("mt-2 text-sm", light ? "text-emerald-700" : "text-champagne/90")}>
          Thank you — you are subscribed.
        </p>
      ) : null}
      <p className={cn("mt-4 text-xs", light ? "text-zinc-500" : "text-white/45")}>
        {privacyNote}{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:opacity-80">
          {privacyLinkLabel}
        </a>
        .
      </p>
    </div>
  );
}
