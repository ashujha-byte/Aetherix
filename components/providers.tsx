'use client';

import { AuthProvider, useAuth } from '@/lib/auth-context';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';

function Inner({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const userId = user?.id || null;
  return (
    <CartProvider userId={userId}>
      <WishlistProvider userId={userId}>
        {children}
      </WishlistProvider>
    </CartProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Inner>{children}</Inner>
    </AuthProvider>
  );
}
