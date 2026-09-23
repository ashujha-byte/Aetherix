'use client';

import Link from 'next/link';
import { BRAND } from '@/lib/constants';

export function Logo({ className = '', variant = 'dark' }: { className?: string; variant?: 'dark' | 'light' }) {
  const color = variant === 'dark' ? 'text-brand-primary' : 'text-brand-secondary';
  return (
    <Link href="/" className={`group flex items-center gap-2 ${className}`} aria-label={`${BRAND.name} home`}>
      <span className={`font-playfair text-2xl md:text-3xl font-bold tracking-[0.15em] ${color} transition-all duration-500 group-hover:tracking-[0.25em]`}>
        {BRAND.name}
      </span>
    </Link>
  );
}
