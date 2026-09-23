'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { WishlistItem } from '@/lib/types';

type WishlistContextType = {
  items: WishlistItem[];
  loading: boolean;
  toggle: (productId: string) => Promise<void>;
  has: (productId: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children, userId }: { children: ReactNode; userId: string | null }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!userId) {
      setItems([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('wishlists')
      .select('id, product_id, product:products(*)')
      .eq('user_id', userId);
    const wishlistItems = (data || []).map((row: any) => ({
      id: row.id,
      product_id: row.product_id,
      product: Array.isArray(row.product) ? row.product[0] : row.product,
    })) as WishlistItem[];
    setItems(wishlistItems);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const toggle = useCallback(async (productId: string) => {
    if (!userId) return;
    const existing = items.find((i) => i.product_id === productId);
    if (existing) {
      await supabase.from('wishlists').delete().eq('id', existing.id);
    } else {
      await supabase.from('wishlists').insert({ user_id: userId, product_id: productId });
    }
    await fetchWishlist();
  }, [userId, items, fetchWishlist]);

  const has = useCallback((productId: string) => items.some((i) => i.product_id === productId), [items]);
  const count = items.length;

  return (
    <WishlistContext.Provider value={{ items, loading, toggle, has, count }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
