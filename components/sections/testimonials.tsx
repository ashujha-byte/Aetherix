'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Isabella Chen',
    role: 'Creative Director',
    rating: 5,
    text: 'AETHERIX has redefined my wardrobe. The quality is exceptional — every piece feels like it was made just for me. The cashmere overcoat is a lifetime investment.',
  },
  {
    name: 'Marcus Reid',
    role: 'Architect',
    rating: 5,
    text: 'The attention to detail is unmatched. From the stitching to the packaging, everything speaks of intention. This is what modern luxury should feel like.',
  },
  {
    name: 'Sofia Almeida',
    role: 'Fashion Editor',
    rating: 5,
    text: 'I have covered fashion for 15 years. AETHERIX stands apart — not just for the design, but for the philosophy behind it. Fashion You Choose is more than a tagline.',
  },
];

export function Testimonials() {
  return (
    <section className="section-padding container-luxury py-20 md:py-28">
      <ScrollReveal className="text-center mb-12">
        <p className="eyebrow mb-3">Voices</p>
        <h2 className="heading-md text-brand-primary">What Our Community Says</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.15}>
            <div className="card-luxury p-8 h-full flex flex-col">
              <Quote className="w-8 h-8 text-brand-accent/30 mb-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                ))}
              </div>
              <p className="font-inter text-sm text-brand-text/70 leading-relaxed flex-1 italic">
                "{t.text}"
              </p>
              <div className="mt-6 pt-4 border-t border-brand-border/30">
                <div className="font-playfair text-lg font-semibold text-brand-primary">{t.name}</div>
                <div className="font-poppins text-xs text-brand-muted">{t.role}</div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
