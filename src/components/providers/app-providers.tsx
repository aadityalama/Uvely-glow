"use client";

import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { AccountProvider } from "@/context/account-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider>
      <WishlistProvider>
        <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </AccountProvider>
  );
}
