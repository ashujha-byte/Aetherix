'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-[#0A0705] flex items-center">
      {/* Background Video Layer */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg"
          className="w-full h-full object-cover object-center brightness-[0.55] contrast-[1.15]"
        >
          <source src="https://videos.pexels.com/video-files/7667417/7667417-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://www.pexels.com/download/video/7667417/" type="video/mp4" />
        </video>

        {/* Studio Scrim Gradients for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-black/80" />
      </motion.div>

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 right-[10%] w-72 h-72 rounded-full bg-[#C89B6D]/15 blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-1/4 left-[5%] w-96 h-96 rounded-full bg-[#3B1F17]/35 blur-3xl pointer-events-none z-10" />

      {/* Main Content Layer - Forced to Top Level (z-30) */}
      <div className="relative z-30 w-full section-padding container-luxury py-24 sm:py-32">
        <div className="max-w-3xl">
         

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="font-playfair text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[0.95] mb-4 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            Fashion <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F8F5F2] via-[#C89B6D] to-[#E8D9C9]">
              You Choose
            </span>
          </motion.h1>

          {/* Tagline: Wear The Moment */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-0.5 w-10 bg-[#C89B6D]" />
            <span className="font-poppins text-sm md:text-base font-bold tracking-[0.35em] text-[#C89B6D] uppercase drop-shadow-md">
              Wear The Moment
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="font-inter text-slate-100/90 text-lg md:text-xl max-w-xl mb-10 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            Discover a curated world of luxury fashion — where craftsmanship meets
            modern design. Every piece is an expression of intention.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 relative z-40"
          >
            <MagneticButton className="btn-luxury rounded-full px-8 py-4 text-sm font-semibold flex items-center justify-center gap-2 border border-[#C89B6D]/40 shadow-2xl bg-gradient-to-r from-[#3B1F17] to-[#C89B6D] text-white hover:brightness-110 transition-all">
              <Link href="/shop" className="flex items-center gap-2">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>

            <MagneticButton className="rounded-full px-8 py-4 text-sm font-medium text-white border-2 border-white/40 backdrop-blur-md bg-black/40 hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center">
              <Link href="/collections">Explore Collection</Link>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-poppins text-[10px] tracking-[0.3em] uppercase text-white/70">Scroll</span>
        <div className="w-0.5 h-10 bg-white/30 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 w-full h-3 bg-[#C89B6D]"
            animate={{ y: [0, 28, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}