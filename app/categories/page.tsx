'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { supabase } from '@/lib/supabase-client';
import type { Category } from '@/lib/types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('categories').select('*').order('sort_order');
      setCategories((data as Category[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <section className="section-padding container-luxury py-20">
          <ScrollReveal className="text-center mb-16">
            <p className="eyebrow mb-3">Browse</p>
            <h1 className="heading-lg text-brand-primary mb-4">All Categories</h1>
            <p className="body-luxury max-w-lg mx-auto">
              Explore our full range of luxury fashion categories — from essentials to limited editions.
            </p>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-brand-light animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat, i) => (
                <ScrollReveal key={cat.id} delay={(i % 4) * 0.1}>
                  <Link href={`/shop?category=${cat.slug}`} className="group block">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-card hover-lift">
                      {cat.image_url && (
                        <Image
                          src={cat.image_url}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/70 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="font-playfair text-xl font-bold text-brand-secondary mb-1">{cat.name}</h3>
                        {cat.description && (
                          <p className="font-inter text-xs text-brand-secondary/60 line-clamp-1">{cat.description}</p>
                        )}
                        <div className="flex items-center gap-1 mt-2 font-poppins text-xs text-brand-accent">
                          Shop Now <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
