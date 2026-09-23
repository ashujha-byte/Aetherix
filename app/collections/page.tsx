'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';

const collections = [
  {
    title: 'The Winter Edit',
    subtitle: 'Autumn / Winter 2026',
    description: 'Outerwear, knitwear, and tailored pieces designed for the cold season. Crafted from the finest wools and cashmere.',
    image: 'https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg',
    href: '/shop?category=luxury-collection',
    span: 'lg:col-span-2',
  },
  {
    title: 'Street Luxury',
    subtitle: 'Oversized & Hoodies',
    description: 'Where streetwear meets luxury. Heavyweight fabrics, oversized silhouettes, and premium finishes.',
    image: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg',
    href: '/shop?category=oversized',
    span: '',
  },
  {
    title: "Women's Atelier",
    subtitle: 'Dresses & Tailoring',
    description: 'Elegant silhouettes in silk and wool. Designed to move with you, from day to evening.',
    image: 'https://images.pexels.com/photos/2673894/pexels-photo-2673894.jpeg',
    href: '/shop?category=women',
    span: '',
  },
  {
    title: 'The Sneaker Collection',
    subtitle: 'Footwear',
    description: 'Minimalist sneakers in full-grain leather. Comfort meets craftsmanship.',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    href: '/shop?category=sneakers',
    span: 'lg:col-span-2',
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8">
        <section className="section-padding container-luxury py-20">
          <ScrollReveal className="text-center mb-16">
            <p className="eyebrow mb-3">Signature Lines</p>
            <h1 className="heading-lg text-brand-primary mb-4">Our Collections</h1>
            <p className="body-luxury max-w-lg mx-auto">
              Each collection tells a story. Discover the pieces that define the AETHERIX aesthetic.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-6">
            {collections.map((col, i) => (
              <ScrollReveal key={col.title} delay={i * 0.1} className={col.span}>
                <Link href={col.href} className="group block relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card hover-lift">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="font-poppins text-xs tracking-[0.2em] uppercase text-brand-accent mb-2">{col.subtitle}</p>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-brand-secondary mb-3">{col.title}</h2>
                    <p className="font-inter text-sm text-brand-secondary/60 max-w-md mb-4">{col.description}</p>
                    <div className="flex items-center gap-2 font-poppins text-sm text-brand-secondary/80 group-hover:text-brand-accent transition-colors">
                      Explore Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section className="section-padding container-luxury py-20">
          <ScrollReveal className="text-center">
            <div className="glass-card rounded-3xl p-10 max-w-2xl mx-auto">
              <h2 className="heading-sm text-brand-primary mb-4">Can't Find What You're Looking For?</h2>
              <p className="body-luxury mb-8">Browse our full catalog of luxury fashion pieces.</p>
              <MagneticButton className="btn-luxury rounded-full px-8 py-4 text-sm inline-flex items-center gap-2">
                <Link href="/shop" className="flex items-center gap-2">
                  View All Products <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
