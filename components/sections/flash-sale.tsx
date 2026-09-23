'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Clock, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/constants';

export function FlashSale() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_flash_sale', true)
        .limit(3);
      setProducts((data as Product[]) || []);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;
    const target = new Date(products[0].flash_sale_ends_at || Date.now() + 86400000).getTime();
    const interval = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [products]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="section-padding container-luxury py-20 md:py-28">
      <div className="relative rounded-3xl overflow-hidden bg-brand-primary">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/20 blur-3xl rounded-full" />

        <div className="relative z-10 p-8 md:p-16">
          <ScrollReveal className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-brand-accent" />
                <p className="eyebrow text-brand-accent">Limited Time</p>
              </div>
              <h2 className="font-playfair text-4xl md:text-6xl font-bold text-brand-secondary">
                Flash Sale
              </h2>
              <p className="font-inter text-brand-secondary/60 mt-2 max-w-md">
                Exclusive prices on selected pieces. Once they're gone, they're gone.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-brand-accent" />
              <div className="flex gap-2">
                {[
                  { label: 'HRS', value: timeLeft.hours },
                  { label: 'MIN', value: timeLeft.minutes },
                  { label: 'SEC', value: timeLeft.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="glass-dark rounded-xl px-4 py-3 text-center min-w-[70px]">
                    <div className="font-playfair text-2xl font-bold text-brand-secondary">
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div className="font-poppins text-[9px] tracking-widest text-brand-accent/80">{unit.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 rounded-2xl bg-brand-secondary/10 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product, i) => {
                const discount = product.compare_at_price
                  ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
                  : 0;
                return (
                  <ScrollReveal key={product.id} delay={i * 0.1}>
                    <Link href={`/product/${product.slug}`} className="group block">
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-600 text-white text-xs font-poppins font-bold rounded-full">
                          -{discount}%
                        </div>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-playfair text-lg font-semibold text-brand-secondary group-hover:text-brand-accent transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-poppins font-bold text-brand-accent">{formatPrice(product.price)}</span>
                          {product.compare_at_price && (
                            <span className="font-poppins text-sm text-brand-secondary/40 line-through">
                              {formatPrice(product.compare_at_price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
