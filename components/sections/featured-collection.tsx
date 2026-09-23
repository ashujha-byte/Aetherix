'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ProductCard } from '@/components/product-card';
import { supabase } from '@/lib/supabase-client';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function FeaturedCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('rating', { ascending: false })
        .limit(8);
      setProducts((data as Product[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="section-padding container-luxury py-20 md:py-28">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <p className="eyebrow mb-3">Curated Selection</p>
          <h2 className="heading-md text-brand-primary">Featured Collection</h2>
          <p className="body-luxury mt-3 max-w-lg">
            Hand-picked pieces that define the AETHERIX aesthetic — timeless, intentional, and unmistakably luxurious.
          </p>
        </div>
        <Link
          href="/shop"
          className="font-poppins text-sm font-medium text-brand-accent hover:text-brand-primary transition-colors flex items-center gap-1 group whitespace-nowrap"
        >
          Shop All
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </ScrollReveal>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(8)].map((_, i) => (
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
