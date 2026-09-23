'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  { name: 'Men', slug: 'men', image: 'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg' },
  { name: 'Women', slug: 'women', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Oversized', slug: 'oversized', image: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg' },
  { name: 'Sneakers', slug: 'sneakers', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg' },
  { name: 'Hoodies', slug: 'hoodies', image: 'https://images.pexels.com/photos/2466756/pexels-photo-2466756.jpeg' },
  { name: 'Limited Edition', slug: 'limited-edition', image: 'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg' },
];

export function CategoryGrid() {
  return (
    <section className="section-padding container-luxury py-20 md:py-28">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <p className="eyebrow mb-3">Explore</p>
          <h2 className="heading-md text-brand-primary">Shop by Category</h2>
        </div>
        <Link
          href="/categories"
          className="font-poppins text-sm font-medium text-brand-accent hover:text-brand-primary transition-colors flex items-center gap-1 group"
        >
          View All Categories
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
          <ScrollReveal key={cat.slug} delay={i * 0.08}>
            <Link href={`/shop?category=${cat.slug}`} className="group block">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card hover-lift">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/70 via-brand-primary/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-playfair text-lg md:text-xl font-bold text-brand-secondary text-center">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
