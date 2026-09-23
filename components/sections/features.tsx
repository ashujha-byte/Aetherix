'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Complimentary Shipping',
    description: 'Free express shipping on all orders over ₹499.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: 'Bank-level encryption with Stripe & Razorpay protection.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '07-day hassle-free returns & Exchange on all order.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our concierge team is always here for you.',
  },
];

export function Features() {
  return (
    <section className="section-padding container-luxury py-16 border-y border-brand-border/30">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <ScrollReveal key={feature.title} delay={i * 0.1}>
            <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-brand-secondary/40 flex items-center justify-center shrink-0 group-hover:bg-brand-accent transition-all duration-500">
                <feature.icon className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <div>
                <h3 className="font-playfair text-base font-semibold text-brand-primary mb-1">
                  {feature.title}
                </h3>
                <p className="font-inter text-xs text-brand-text/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
