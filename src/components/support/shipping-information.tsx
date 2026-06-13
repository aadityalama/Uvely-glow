type RateRow = { place: string; rate: string };

type RateZone = { title: string; rows: RateRow[] };

const RATE_ZONES: RateZone[] = [
  {
    title: "Kathmandu Valley",
    rows: [
      { place: "Kathmandu", rate: "NPR 120" },
      { place: "Lalitpur", rate: "NPR 120" },
      { place: "Bhaktapur", rate: "NPR 120" },
    ],
  },
  {
    title: "Near Valley",
    rows: [
      { place: "Kavre", rate: "NPR 150" },
      { place: "Nuwakot", rate: "NPR 150" },
      { place: "Dhading", rate: "NPR 150" },
      { place: "Makwanpur", rate: "NPR 150" },
    ],
  },
  {
    title: "Major Cities",
    rows: [
      { place: "Pokhara", rate: "NPR 180" },
      { place: "Chitwan", rate: "NPR 180" },
      { place: "Butwal", rate: "NPR 180" },
      { place: "Biratnagar", rate: "NPR 200" },
      { place: "Itahari/Dharan", rate: "NPR 200" },
      { place: "Nepalgunj", rate: "NPR 200" },
      { place: "Birgunj", rate: "NPR 220" },
      { place: "Janakpur", rate: "NPR 220" },
    ],
  },
  {
    title: "Rest of Nepal",
    rows: [{ place: "Standard Delivery", rate: "NPR 275" }],
  },
  {
    title: "Remote Areas",
    rows: [
      { place: "Humla", rate: "NPR 350" },
      { place: "Dolpa", rate: "NPR 350" },
      { place: "Mugu", rate: "NPR 350" },
      { place: "Jumla", rate: "NPR 350" },
      { place: "Mustang", rate: "NPR 350" },
      { place: "Manang", rate: "NPR 350" },
      { place: "Bajura", rate: "NPR 350" },
      { place: "Bajhang", rate: "NPR 350" },
      { place: "Darchula", rate: "NPR 350" },
    ],
  },
];

const ADDITIONAL_INFO = [
  "Delivery Time: 1–7 business days",
  "Cash on Delivery Available",
  "Secure Packaging",
  "Order Tracking Support",
] as const;

function RateZoneCard({ zone }: { zone: RateZone }) {
  return (
    <div className="texture-noise flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--luxury-shadow-sm)]">
      <div className="border-b border-line bg-gradient-to-br from-accent-soft/40 to-transparent px-4 py-3 sm:px-5 sm:py-3.5">
        <h3 className="font-display text-lg tracking-tight text-deep sm:text-xl">{zone.title}</h3>
      </div>
      <div className="px-1 sm:px-2">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">{zone.title} shipping rates</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">Destination</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {zone.rows.map((row) => (
              <tr
                key={row.place}
                className="border-b border-line/70 last:border-b-0 [&>td]:py-2.5 sm:[&>td]:py-3"
              >
                <th
                  scope="row"
                  className="px-3 font-normal text-foreground sm:px-4"
                >
                  {row.place}
                </th>
                <td className="px-3 text-right tabular-nums text-muted sm:px-4">{row.rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ShippingInformationSection() {
  return (
    <section
      id="shipping"
      className="scroll-mt-28 rounded-[var(--luxury-radius-lg)] border border-line bg-card p-6 shadow-[var(--luxury-shadow)] sm:p-8 lg:p-10"
    >
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-champagne sm:text-xs">
          Delivery
        </p>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-deep sm:text-4xl">Shipping Rates</h2>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-[17px]">
          Transparent pricing by region. Rates apply per order unless otherwise stated at checkout.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {RATE_ZONES.map((zone) => (
          <RateZoneCard key={zone.title} zone={zone} />
        ))}
      </div>

      <div className="mt-8">
        <div className="texture-noise rounded-2xl border border-line bg-gradient-to-br from-ivory via-card to-accent-soft/25 p-6 shadow-[var(--luxury-shadow-sm)] sm:p-8">
          <h3 className="font-display text-xl text-deep sm:text-2xl">Additional Information</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
            {ADDITIONAL_INFO.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-snug text-muted sm:text-[15px]">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-champagne shadow-[0_0_0_3px_rgba(201,165,122,0.25)]"
                  aria-hidden
                />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
