import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">404</p>
        <h1 className="mt-4 font-display text-4xl text-deep sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-md text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full border border-line bg-card px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-deep transition hover:border-accent/40 hover:text-accent"
        >
          Back home
        </Link>
      </Container>
    </div>
  );
}
