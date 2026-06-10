"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-br from-accent-soft/40 via-background to-background">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-deep/5 blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-xl flex-1">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-accent"
          >
            Korean beauty · curated
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-4 font-display text-4xl leading-[1.1] text-deep sm:text-5xl lg:text-6xl"
          >
            Ritual-grade glow, bottled in Seoul.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            Discover toners, serums, creams, and sunscreens with textures that
            feel expensive on the skin—and honest in the formula.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <ButtonLink href="/products" variant="primary" className="px-7 py-3">
              Shop bestsellers
            </ButtonLink>
            <ButtonLink href="/categories" variant="outline" className="px-7 py-3">
              Browse categories
            </ButtonLink>
          </motion.div>
          <p className="mt-8 text-xs text-muted">
            <Link href="/admin" className="underline-offset-4 hover:underline">
              Merchant console
            </Link>
            <span className="mx-2">·</span>
            Free shipping over ₩50,000 (demo)
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative flex-1"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border border-line bg-card shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-deep/20 to-transparent" />
            <div className="flex h-full flex-col justify-end p-8 text-background">
              <p className="text-xs uppercase tracking-[0.25em] text-background/80">
                Featured texture
              </p>
              <p className="mt-2 font-display text-3xl leading-tight">
                Glass-skin toners &amp; dewy SPF
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
