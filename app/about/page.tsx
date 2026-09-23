'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/magnetic-button';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-8">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg"
              alt="AETHERIX"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/40 via-brand-primary/30 to-brand-primary/70" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center text-center section-padding">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <p className="eyebrow text-brand-secondary/90">Our Story</p>
              </div>
              <h1 className="font-playfair text-5xl md:text-7xl font-bold text-brand-secondary mb-4">
                The AETHERIX<br />Philosophy
              </h1>
              <p className="font-inter text-lg text-brand-secondary/70 max-w-xl mx-auto">
                Fashion is not what we wear. It's what we choose. And choice is the ultimate luxury.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Brand story */}
        <section className="section-padding container-luxury py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <Image
                src="https://images.pexels.com/photos/2673894/pexels-photo-2673894.jpeg"
                alt="AETHERIX craftsmanship"
                width={600}
                height={750}
                className="rounded-3xl shadow-luxury w-full"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="eyebrow mb-4">The Beginning</p>
              <h2 className="heading-md text-brand-primary mb-6">Born from Intention</h2>
              <div className="space-y-4">
                <p className="body-luxury">
                  AETHERIX was founded on a simple belief: that fashion should empower, not dictate.
                  In a world of fast trends and fleeting styles, we chose a different path — one of
                  intention, craftsmanship, and timeless design.
                </p>
                <p className="body-luxury">
                  Every piece in our collection begins with a question: does this deserve to exist?
                  If the answer is yes, it's crafted from the finest materials, by skilled hands,
                  with an attention to detail that borders on obsession.
                </p>
                <p className="body-luxury">
                  We don't make fashion for everyone. We make it for you.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="bg-brand-light/50 py-20 md:py-28">
          <div className="section-padding container-luxury">
            <ScrollReveal className="text-center mb-12">
              <p className="eyebrow mb-3">What Drives Us</p>
              <h2 className="heading-md text-brand-primary">Our Pillars</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Mission', text: 'To redefine modern luxury through intentional design — creating pieces that last, empower, and inspire.' },
                { title: 'Vision', text: 'A world where fashion is a personal choice, not a trend. Where quality is the standard, not the exception.' },
                { title: 'Promise', text: 'Uncompromising quality in every stitch. Every material, every cut, every finish — chosen with intention.' },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.15}>
                  <div className="card-luxury p-8 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center mb-5">
                      <span className="font-playfair text-xl font-bold text-brand-secondary">{item.title[0]}</span>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-brand-primary mb-3">{item.title}</h3>
                    <p className="font-inter text-sm text-brand-text/70 leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="section-padding container-luxury py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal>
              <p className="eyebrow mb-4">The Founder</p>
              <h2 className="heading-md text-brand-primary mb-6">A Vision Realized</h2>
              <div className="space-y-4 mb-8">
                <p className="body-luxury">
                  "When I started AETHERIX, I didn't want to create just another fashion brand.
                  I wanted to create a movement — a return to intention, to quality, to the idea
                  that what we wear is a reflection of who we choose to be."
                </p>
                <p className="body-luxury">
                  "Fashion You Choose isn't just a tagline. It's a philosophy. It's the belief
                  that true luxury is the freedom to express yourself, on your own terms."
                </p>
              </div>
              <p className="font-playfair text-xl font-semibold text-gradient">— Founder, AETHERIX</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-luxury">
                <Image
                  src="https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg"
                  alt="AETHERIX Founder"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding container-luxury py-20">
          <ScrollReveal className="text-center">
            <h2 className="heading-md text-brand-primary mb-6">Begin Your Journey</h2>
            <p className="body-luxury max-w-lg mx-auto mb-8">
              Explore our collections and discover pieces that speak to you.
            </p>
            <MagneticButton className="btn-luxury rounded-full px-8 py-4 text-sm inline-flex items-center gap-2">
              <Link href="/shop" className="flex items-center gap-2">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
