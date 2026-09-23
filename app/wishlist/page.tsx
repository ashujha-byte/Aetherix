'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { useWishlist } from '@/lib/wishlist-context';
import { useAuth } from '@/lib/auth-context';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { items } = useWishlist();
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="section-padding container-luxury py-32 text-center">
          <Heart className="w-16 h-16 text-brand-muted mx-auto mb-4" />
          <h1 className="heading-sm text-brand-primary mb-3">Please Sign In</h1>
          <p className="body-luxury mb-8">Sign in to view your saved items.</p>
          <Link href="/login" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">
            Sign In
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
          <h1 className="heading-md text-brand-primary mb-2">Your Wishlist</h1>
          <p className="font-inter text-brand-muted mb-10">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-brand-muted mx-auto mb-4" />
              <p className="font-playfair text-2xl text-brand-primary mb-2">No saved items yet</p>
              <p className="font-inter text-brand-muted mb-8">Tap the heart icon on any product to save it here.</p>
              <Link href="/shop" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {items.map((item, i) =>
                item.product ? <ProductCard key={item.id} product={item.product} index={i} /> : null
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
