'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ProductCard } from '@/components/product-card';
import { supabase } from '@/lib/supabase-client';
import type { Product } from '@/lib/types';
import { TrendingUp } from 'lucide-react';

export function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_trending', true)
        .order('review_count', { ascending: false })
        .limit(4);
      setProducts((data as Product[]) || []);
      setLoading(false);
    })();
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="section-padding container-luxury py-20 md:py-28">
      <ScrollReveal className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-brand-accent" />
          <p className="eyebrow">Most Wanted</p>
        </div>
        <h2 className="heading-md text-brand-primary">Trending Now</h2>
        <p className="body-luxury mt-3 max-w-lg mx-auto">
          The pieces everyone is talking about — trending across our community and beyond.
        </p>
      </ScrollReveal>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] rounded-2xl bg-brand-light animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
