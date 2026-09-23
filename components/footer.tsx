'use client';

import Link from 'next/link';
import { Instagram, Youtube, Facebook, Mail, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';
import { BRAND, CATEGORIES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-brand-primary text-brand-secondary mt-20">
      {/* Newsletter */}
      <div className="border-b border-brand-secondary/10">
        <div className="section-padding container-luxury py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-3">Join the Aetherix Circle</h3>
              <p className="font-inter text-brand-secondary/60 max-w-md">
                Be the first to discover new collections, private sales, and exclusive limited editions.
              </p>
            </div>
            <form className="flex gap-3 max-w-md md:ml-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 bg-brand-secondary/10 border border-brand-secondary/20 rounded-full font-inter text-brand-secondary placeholder:text-brand-secondary/40 focus:outline-none focus:border-brand-accent transition-colors"
              />
              <button
                type="submit"
                className="btn-luxury rounded-full px-6 py-3.5 flex items-center gap-2 text-sm whitespace-nowrap"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-padding container-luxury py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="light" />
            <p className="font-inter text-sm text-brand-secondary/50 mt-4 max-w-xs leading-relaxed">
              {BRAND.tagline}. Luxury fashion crafted with intention for the modern individual.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-secondary/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-secondary/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={BRAND.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-secondary/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="w-10 h-10 rounded-full border border-brand-secondary/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-5">Shop</h4>
            <ul className="space-y-3">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">About Us</Link></li>
              <li><Link href="/collections" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Collections</Link></li>
              <li><Link href="/contact" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Contact</Link></li>
              <li><Link href="/track-order" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Track Order</Link></li>
              <li><Link href="/support" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Support</Link></li>
              <li><Link href="/admin" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-5">Customer Care</h4>
            <ul className="space-y-3">
              <li><Link href="/support" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">FAQs</Link></li>
              <li><Link href="/support" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/support" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Refund Policy</Link></li>
              <li><Link href="/support" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/support" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-5">Account</h4>
            <ul className="space-y-3">
              <li><Link href="/login" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Login</Link></li>
              <li><Link href="/register" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Create Account</Link></li>
              <li><Link href="/dashboard" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">My Dashboard</Link></li>
              <li><Link href="/wishlist" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Wishlist</Link></li>
              <li><Link href="/cart" className="font-inter text-sm text-brand-secondary/60 hover:text-brand-secondary transition-colors">Cart</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-secondary/10">
        <div className="section-padding container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-brand-secondary/40">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-inter text-xs text-brand-secondary/40 tracking-wide">
            Crafted with intention. Fashion You Choose.
          </p>
        </div>
      </div>
    </footer>
  );
}
