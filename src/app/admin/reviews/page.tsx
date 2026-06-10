import Link from "next/link";
import {
  adminApproveReviewFormAction,
  adminDismissReviewFormAction,
} from "@/app/actions/admin";
import { listPendingReviewsForAdmin } from "@/lib/services/reviews";
import { isSupabaseConfigured } from "@/lib/env";

export default async function AdminReviewsPage() {
  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-background/70">
        Set NEXT_PUBLIC_SUPABASE_URL and anon key to moderate reviews.
      </p>
    );
  }

  const pending = await listPendingReviewsForAdmin();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl text-background">Reviews</h1>
      <p className="text-sm text-background/70">
        Approve reviews to show them on product pages, or dismiss spam.
      </p>
      {pending.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-background/70">
          No pending reviews.
        </p>
      ) : (
        <ul className="space-y-4">
          {pending.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-background/90"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-background">{r.productName}</p>
                  <p className="mt-1 text-xs text-background/50">
                    {new Date(r.createdAt).toLocaleString()} · {r.rating}★
                  </p>
                  {r.title ? <p className="mt-2 font-medium text-background">{r.title}</p> : null}
                  {r.body ? <p className="mt-2 text-background/80">{r.body}</p> : null}
                </div>
                <div className="flex shrink-0 gap-2">
                  <form action={adminApproveReviewFormAction}>
                    <input type="hidden" name="review_id" value={r.id} />
                    <button
                      type="submit"
                      className="rounded-full bg-background px-4 py-2 text-xs font-semibold uppercase tracking-widest text-deep"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={adminDismissReviewFormAction}>
                    <input type="hidden" name="review_id" value={r.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-widest hover:bg-white/10"
                    >
                      Dismiss
                    </button>
                  </form>
                  {r.productSlug ? (
                    <Link
                      href={`/products/${r.productSlug}`}
                      className="self-center text-xs uppercase tracking-widest text-accent-soft hover:underline"
                    >
                      Product
                    </Link>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
