import Link from "next/link";

const STEPS = [
  {
    title: "Double cleanse",
    body: "Oil first to lift SPF and sebum, then a water-based gel to leave pores quietly refined.",
    time: "Night · 2 min",
  },
  {
    title: "Essence & toner",
    body: "Pat—don’t rub—until skin drinks it in. This is where Korean routines earn their glass-skin reputation.",
    time: "AM / PM · 90 sec",
  },
  {
    title: "Treatment serum",
    body: "One active focus: barrier support, clarity, or bounce. We sequence textures lightest to richest.",
    time: "PM · 1 min",
  },
  {
    title: "Moisture lock",
    body: "Cream or sleeping mask to seal humectants. Finish AM with SPF you’ll actually want to wear.",
    time: "AM / PM · 1 min",
  },
] as const;

export function SkincareRoutineSection() {
  return (
    <section className="relative overflow-hidden bg-deep py-20 text-ivory sm:py-28 md:py-32 texture-noise">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-rose-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-champagne/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-champagne">
              The Seoul ritual
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              Four steps. Infinite composure.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-[17px] sm:leading-[1.75]">
              Korean skincare is choreography: deliberate layers, breathable
              finishes, and respect for the barrier. Uvely Glow edits each step
              so you never choose between clinical rigor and sensorial luxury.
            </p>
            <Link
              href="/quiz"
              className="mt-10 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-xs font-semibold uppercase tracking-[0.26em] backdrop-blur transition hover:border-champagne/60 hover:bg-white/15"
            >
              Build my routine
            </Link>
          </div>

          <ol className="space-y-6 lg:col-span-7">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-5 rounded-[1.75rem] border border-white/12 bg-white/[0.06] p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-md sm:gap-6 sm:rounded-[2rem] sm:p-8"
              >
                <span className="font-display text-3xl text-champagne/90 sm:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl text-white sm:text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/78 sm:text-base sm:leading-relaxed">{step.body}</p>
                  <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne/80">
                    {step.time}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
