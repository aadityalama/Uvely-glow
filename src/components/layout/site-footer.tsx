import Link from "next/link";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-card">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl text-deep">Uvely Glow</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Curated Korean beauty with a luxury lens—authentic textures, calm
            rituals, and Seoul-grade glow.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-accent" href="/products">
                All products
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent" href="/categories">
                Categories
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent" href="/wishlist">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Care
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="hover:text-accent" href="/account">
                Profile
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent" href="/account/orders">
                Order history
              </Link>
            </li>
            <li>
              <Link className="hover:text-accent" href="/checkout">
                Checkout
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Newsletter
          </p>
          <p className="mt-4 text-sm text-muted">
            New drops & ritual notes—quietly, no spam.
          </p>
          <form className="mt-4 flex gap-2">
            <input
              type="email"
              required
              placeholder="Email"
              className="min-w-0 flex-1 rounded-full border border-line bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent-soft"
            />
            <button
              type="submit"
              className="rounded-full bg-deep px-4 py-2 text-xs font-semibold uppercase tracking-widest text-background"
            >
              Join
            </button>
          </form>
        </div>
      </Container>
      <div className="border-t border-line py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Uvely Glow · Demo storefront
      </div>
    </footer>
  );
}
