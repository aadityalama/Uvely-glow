import { Container } from "@/components/layout/container";

export default function ProductsLoading() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <div className="h-3 w-44 animate-pulse rounded-full bg-accent-soft" />
        <div className="mt-5 h-16 w-full max-w-xl animate-pulse rounded-full bg-accent-soft/80" />
        <div className="mt-4 h-4 w-64 animate-pulse rounded-full bg-accent-soft" />
      </div>
      <div className="mt-10 h-40 animate-pulse rounded-[2rem] bg-card" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[1.75rem] border border-line bg-card"
          >
            <div className="aspect-[4/5] animate-pulse bg-accent-soft/60" />
            <div className="space-y-3 p-5">
              <div className="h-3 w-20 animate-pulse rounded-full bg-accent-soft" />
              <div className="h-6 w-4/5 animate-pulse rounded-full bg-accent-soft" />
              <div className="h-4 w-full animate-pulse rounded-full bg-accent-soft/70" />
              <div className="h-10 w-full animate-pulse rounded-full bg-accent-soft" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
