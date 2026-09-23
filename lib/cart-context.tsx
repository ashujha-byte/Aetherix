'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase-client';
import type { CartItem, Product } from '@/lib/types';

type CartContextType = {
  items: CartItem[];
  loading: boolean;
  addItem: (productId: string, quantity?: number, size?: string, color?: string) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children, userId }: { children: ReactNode; userId: string | null }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!userId) {
      setItems([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('cart_items')
      .select('id, product_id, quantity, size, color, product:products(*)')
      .eq('user_id', userId);
    const cartItems = (data || []).map((row: any) => ({
      id: row.id,
      product_id: row.product_id,
      quantity: row.quantity,
      size: row.size,
      color: row.color,
      product: Array.isArray(row.product) ? row.product[0] : row.product,
    })) as CartItem[];
    setItems(cartItems);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(async (productId: string, quantity = 1, size?: string, color?: string) => {
    if (!userId) return;
    await supabase.from('cart_items').insert({
      user_id: userId,
      product_id: productId,
      quantity,
      size,
      color,
    });
    await fetchCart();
  }, [userId, fetchCart]);

  const updateItem = useCallback(async (id: string, quantity: number) => {
    if (!userId) return;
    await supabase.from('cart_items').update({ quantity }).eq('id', id);
    await fetchCart();
  }, [userId, fetchCart]);

  const removeItem = useCallback(async (id: string) => {
    if (!userId) return;
    await supabase.from('cart_items').delete().eq('id', id);
    await fetchCart();
  }, [userId, fetchCart]);

  const clearCart = useCallback(async () => {
    if (!userId) return;
    await supabase.from('cart_items').delete().eq('user_id', userId);
    await fetchCart();
  }, [userId, fetchCart]);

  const total = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, loading, addItem, updateItem, removeItem, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
