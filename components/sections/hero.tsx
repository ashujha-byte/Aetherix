'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/30 via-brand-primary/20 to-brand-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/40 via-transparent to-transparent" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full bg-brand-accent/20 blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-[8%] w-40 h-40 rounded-full bg-brand-secondary/20 blur-3xl"
        animate={{ y: [0, 40, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-center section-padding container-luxury"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-brand-accent" />
            <span className="eyebrow text-brand-secondary/90">Autumn / Winter 2026</span>
          </div>

          <h1 className="font-playfair text-brand-secondary text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] mb-6">
            {'Fashion'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 + i * 0.05, ease: 'easeOut' }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
              className="text-gradient-gold italic"
            >
              You Choose
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="font-inter text-brand-secondary/70 text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
          >
            Discover a curated world of luxury fashion — where craftsmanship meets
            modern design. Every piece is an expression of intention.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton className="btn-luxury rounded-full px-8 py-4 text-sm flex items-center gap-2">
              <Link href="/shop" className="flex items-center gap-2">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <MagneticButton className="btn-outline-luxury !text-brand-secondary !border-brand-secondary rounded-full px-8 py-4 text-sm hover:!bg-brand-secondary hover:!text-brand-primary">
              <Link href="/collections">Explore Collection</Link>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-poppins text-[10px] tracking-[0.3em] uppercase text-brand-secondary/50">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-secondary/50 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute top-0 w-full h-4 bg-brand-secondary"
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
