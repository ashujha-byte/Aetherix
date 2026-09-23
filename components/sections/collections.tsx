'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    title: 'The Winter Edit',
    subtitle: 'Outerwear & Knitwear',
    image: 'https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg',
    href: '/shop?category=luxury-collection',
  },
  {
    title: 'Street Luxury',
    subtitle: 'Oversized & Hoodies',
    image: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg',
    href: '/shop?category=oversized',
  },
  {
    title: 'The Women\'s Atelier',
    subtitle: 'Dresses & Tailoring',
    image: 'https://images.pexels.com/photos/2673894/pexels-photo-2673894.jpeg',
    href: '/shop?category=women',
  },
];

export function Collections() {
  return (
    <section className="section-padding container-luxury py-20 md:py-28">
      <ScrollReveal className="text-center mb-12">
        <p className="eyebrow mb-3">Signature Lines</p>
        <h2 className="heading-md text-brand-primary">Our Collections</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {collections.map((col, i) => (
          <ScrollReveal key={col.title} delay={i * 0.15}>
            <Link href={col.href} className="group block relative aspect-[3/4] rounded-3xl overflow-hidden shadow-card hover-lift">
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-poppins text-xs tracking-[0.2em] uppercase text-brand-accent mb-2">
                  {col.subtitle}
                </p>
                <h3 className="font-playfair text-3xl font-bold text-brand-secondary mb-4">
                  {col.title}
                </h3>
                <div className="flex items-center gap-2 font-poppins text-sm text-brand-secondary/80 group-hover:text-brand-accent transition-colors">
                  Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
