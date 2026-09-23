'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ProductCard } from '@/components/product-card';
import { supabase } from '@/lib/supabase-client';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_new_arrival', true)
        .order('created_at', { ascending: false })
        .limit(4);
      setProducts((data as Product[]) || []);
      setLoading(false);
    })();
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="bg-brand-light/50 py-20 md:py-28">
      <div className="section-padding container-luxury">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="eyebrow mb-3">Just Arrived</p>
            <h2 className="heading-md text-brand-primary">New Arrivals</h2>
            <p className="body-luxury mt-3 max-w-lg">
              The latest additions to the AETHERIX universe — fresh silhouettes and seasonal statements.
            </p>
          </div>
          <Link
            href="/shop?filter=new"
            className="font-poppins text-sm font-medium text-brand-accent hover:text-brand-primary transition-colors flex items-center gap-1 group whitespace-nowrap"
          >
            View All
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </ScrollReveal>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-brand-bg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
