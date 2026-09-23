'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MagneticButton } from '@/components/magnetic-button';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { formatPrice } from '@/lib/constants';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, updateItem, removeItem, total, count } = useCart();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const applyCoupon = async () => {
    if (!couponCode) return;
    const { data } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.toUpperCase())
      .eq('is_active', true)
      .maybeSingle();

    if (!data) {
      toast.error('Invalid coupon code');
      return;
    }

    if (data.min_order && total < data.min_order) {
      toast.error(`Minimum order of ${formatPrice(data.min_order)} required`);
      return;
    }

    const disc = data.discount_type === 'percentage'
      ? (total * data.discount_value) / 100
      : data.discount_value;
    setDiscount(disc);
    setAppliedCoupon(data.code);
    toast.success(`Coupon ${data.code} applied — you saved ${formatPrice(disc)}`);
  };

  const shipping = total > 200 ? 0 : 15;
  const tax = (total - discount) * 0.08;
  const grandTotal = total - discount + shipping + tax;

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="section-padding container-luxury py-32 text-center">
          <ShoppingBag className="w-16 h-16 text-brand-muted mx-auto mb-4" />
          <h1 className="heading-sm text-brand-primary mb-3">Please Sign In</h1>
          <p className="body-luxury mb-8">You need an account to view your cart.</p>
          <Link href="/login" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">
            Sign In
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="section-padding container-luxury py-32 text-center">
          <ShoppingBag className="w-16 h-16 text-brand-muted mx-auto mb-4" />
          <h1 className="heading-sm text-brand-primary mb-3">Your Cart is Empty</h1>
          <p className="body-luxury mb-8">Discover our collections and find something you love.</p>
          <Link href="/shop" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">
            Start Shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <div className="section-padding container-luxury py-12">
          <h1 className="heading-md text-brand-primary mb-2">Shopping Cart</h1>
          <p className="font-inter text-brand-muted mb-10">{count} {count === 1 ? 'item' : 'items'} in your cart</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="glass-card rounded-2xl p-4 flex gap-4"
                  >
                    <Link href={`/product/${item.product?.slug || ''}`} className="relative w-24 h-32 rounded-xl overflow-hidden shrink-0 bg-brand-light">
                      {item.product?.images?.[0] && (
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      )}
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link href={`/product/${item.product?.slug || ''}`}>
                          <h3 className="font-playfair text-lg font-semibold text-brand-primary hover:text-brand-accent transition-colors">
                            {item.product?.name}
                          </h3>
                        </Link>
                        <div className="flex gap-3 mt-1">
                          {item.size && <span className="font-inter text-xs text-brand-muted">Size: {item.size}</span>}
                          {item.color && <span className="font-inter text-xs text-brand-muted">Color: {item.color}</span>}
                        </div>
                        <p className="font-poppins text-sm font-semibold text-brand-primary mt-1">
                          {formatPrice(item.product?.price || 0)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-brand-border rounded-full">
                          <button
                            onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center hover:bg-brand-secondary/30 rounded-l-full transition-colors"
                          >
                            <Minus className="w-3 h-3 text-brand-primary" />
                          </button>
                          <span className="w-10 text-center font-poppins text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-brand-secondary/30 rounded-r-full transition-colors"
                          >
                            <Plus className="w-3 h-3 text-brand-primary" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 sticky top-32">
                <h2 className="font-playfair text-xl font-bold text-brand-primary mb-5">Order Summary</h2>

                {/* Coupon */}
                <div className="mb-5">
                  <label className="font-poppins text-xs font-medium text-brand-primary mb-2 block">Coupon Code</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="WELCOME10"
                        className="w-full pl-9 pr-3 py-2.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      className="btn-outline-luxury rounded-xl px-4 text-xs whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="font-inter text-xs text-green-700 mt-2">
                      Coupon "{appliedCoupon}" applied — saved {formatPrice(discount)}
                    </p>
                  )}
                  <p className="font-inter text-[10px] text-brand-muted mt-1">Try: WELCOME10, LUXURY20, AETHER50</p>
                </div>

                <div className="space-y-3 mb-5 pb-5 border-b border-brand-border/30">
                  <div className="flex justify-between font-inter text-sm">
                    <span className="text-brand-muted">Subtotal</span>
                    <span className="font-medium text-brand-primary">{formatPrice(total)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between font-inter text-sm">
                      <span className="text-green-700">Discount</span>
                      <span className="font-medium text-green-700">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-inter text-sm">
                    <span className="text-brand-muted">Shipping</span>
                    <span className="font-medium text-brand-primary">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-inter text-sm">
                    <span className="text-brand-muted">Tax (8%)</span>
                    <span className="font-medium text-brand-primary">{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-playfair text-lg font-bold text-brand-primary">Total</span>
                  <span className="font-playfair text-2xl font-bold text-gradient">{formatPrice(grandTotal)}</span>
                </div>

                <MagneticButton className="btn-luxury rounded-full w-full py-4 text-sm flex items-center justify-center gap-2">
                  <Link href="/checkout" className="flex items-center gap-2 w-full justify-center">
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>

                <Link
                  href="/shop"
                  className="block text-center font-poppins text-xs text-brand-muted hover:text-brand-accent mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
