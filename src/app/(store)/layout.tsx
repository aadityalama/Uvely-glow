import { MergeGuestCart } from "@/components/auth/merge-guest-cart";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CartProvider } from "@/context/cart-context";
import { SessionProvider } from "@/context/session-context";
import { WishlistProvider } from "@/context/wishlist-context";
import {
  getCartItemCount,
  getCartLinesForUser,
} from "@/lib/services/cart";
import { listProducts } from "@/lib/services/catalog";
import { getWishlistIdsForUser } from "@/lib/services/wishlist";
import { getSessionUser } from "@/lib/supabase/session";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  const catalog = await listProducts({ activeOnly: false });
  const initialLines = user ? await getCartLinesForUser(user.id) : [];
  const initialWishlist = user ? await getWishlistIdsForUser(user.id) : [];
  const serverCartCount = user ? await getCartItemCount(user.id) : undefined;
  const serverWishlistCount = user ? initialWishlist.length : undefined;

  return (
    <SessionProvider userId={user?.id ?? null} email={user?.email ?? null}>
      <MergeGuestCart userId={user?.id ?? null} />
      <CartProvider
        userId={user?.id ?? null}
        initialDbLines={initialLines}
        allProducts={catalog}
      >
        <WishlistProvider
          userId={user?.id ?? null}
          initialDbIds={initialWishlist}
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader
              serverCartCount={serverCartCount}
              serverWishlistCount={serverWishlistCount}
            />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </WishlistProvider>
      </CartProvider>
    </SessionProvider>
  );
}
