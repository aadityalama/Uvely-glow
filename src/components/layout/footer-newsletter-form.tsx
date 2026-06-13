"use client";

import { useActionState } from "react";
import { subscribeNewsletterAction } from "@/app/actions/marketing";

export function FooterNewsletterForm({
  emailPlaceholder,
  subscribeLabel,
  privacyNote,
  privacyLinkLabel,
}: {
  emailPlaceholder: string;
  subscribeLabel: string;
  privacyNote: string;
  privacyLinkLabel: string;
}) {
  const [state, formAction, pending] = useActionState(subscribeNewsletterAction, null);

  return (
    <div>
      <form action={formAction} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input type="hidden" name="source" value="footer" />
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={emailPlaceholder}
          className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/40 backdrop-blur transition focus:border-champagne/60 focus:ring-2 focus:ring-champagne/25"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-full bg-gradient-to-r from-champagne to-rose-gold-light px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-deep shadow-lg transition hover:opacity-95 disabled:opacity-60"
        >
          {pending ? "…" : subscribeLabel}
        </button>
      </form>
      {state?.error ? <p className="mt-2 text-sm text-rose-200">{state.error}</p> : null}
      {state?.ok ? <p className="mt-2 text-sm text-champagne/90">Thank you — you are subscribed.</p> : null}
      <p className="mt-4 text-xs text-white/45">
        {privacyNote}{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-white">
          {privacyLinkLabel}
        </a>
        .
      </p>
    </div>
  );
}
