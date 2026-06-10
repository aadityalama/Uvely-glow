import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const next = sp.next ?? "/account";

  return (
    <div className="rounded-2xl border border-line bg-card p-8 shadow-sm">
      <h1 className="font-display text-3xl text-deep">Welcome back</h1>
      <p className="mt-2 text-sm text-muted">Sign in to sync your cart and orders.</p>
      <LoginForm next={next} />
      <p className="mt-6 text-center text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="font-medium text-accent hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
