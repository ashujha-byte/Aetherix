'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';

export function About() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="section-padding container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <ScrollReveal className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury">
              <Image
                src="https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg"
                alt="AETHERIX craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Top-Left Glass Card (100+ Pieces Crafted) */}
            <motion.div
              className="absolute -top-6 -left-6 glass-card rounded-2xl p-5 shadow-luxury hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="font-playfair text-3xl font-bold text-gradient">100+</div>
              <div className="font-poppins text-xs text-brand-muted tracking-wide">Pieces Crafted</div>
            </motion.div>
          </ScrollReveal>

          {/* Text side */}
          <ScrollReveal delay={0.2}>
            <p className="eyebrow mb-4">Our Story</p>
            <h2 className="heading-md text-brand-primary mb-6">
              Where Craftsmanship<br />Meets Modern Design
            </h2>
            <div className="space-y-4 mb-8">
              <p className="body-luxury">
                AETHERIX was born from a singular vision: to create fashion that empowers the
                individual to choose their own expression. Every piece is designed with intention,
                crafted from the finest materials, and made to last.
              </p>
              <p className="body-luxury">
                From our atelier to your wardrobe, we believe luxury is not about excess —
                it's about the deliberate choice of quality over quantity, of timeless over
                transient, of you over everyone.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Mission', value: 'Redefine modern luxury through intentional design' },
                { label: 'Vision', value: 'A world where fashion is a personal choice, not a trend' },
                { label: 'Promise', value: 'Uncompromising quality in every stitch' },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4">
                  <div className="font-poppins text-xs font-semibold tracking-widest uppercase text-brand-accent mb-2">
                    {item.label}
                  </div>
                  <p className="font-inter text-xs text-brand-text/70 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <MagneticButton className="btn-luxury rounded-full px-8 py-4 text-sm flex items-center gap-2">
              <Link href="/about" className="flex items-center gap-2">
                Discover Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}