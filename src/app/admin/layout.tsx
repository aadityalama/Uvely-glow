import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/layout/container";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Admin · Uvely Glow" },
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/brands", label: "Brands" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/promotions", label: "Promotions" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    redirect("/login?next=/admin&error=supabase_env");
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    redirect("/login?next=/admin&error=supabase_env");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.is_admin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-deep text-background">
      <div className="border-b border-white/10">
        <Container className="flex h-14 items-center justify-between gap-4">
          <Link href="/admin" className="font-display text-xl tracking-tight">
            Uvely Glow · Admin
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-background/70 hover:text-background"
          >
            View storefront
          </Link>
        </Container>
      </div>
      <div className="border-b border-white/10 lg:hidden">
        <Container className="flex gap-2 overflow-x-auto py-3 text-xs">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-background/90"
            >
              {l.label}
            </Link>
          ))}
        </Container>
      </div>
      <Container className="flex gap-10 py-10">
        <nav className="hidden w-48 shrink-0 flex-col gap-1 text-sm lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-background/80 transition hover:bg-white/10 hover:text-background"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </div>
  );
}
