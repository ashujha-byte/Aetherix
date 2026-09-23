'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const announcementText = [
    'USE CODE WELCOME10 FOR 10% OFF YOUR FIRST ORDER',
    'COMPLIMENTARY SHIPPING ON ORDERS OVER ₹999',
    'NEW COLLECTION: AUTUMN / WINTER 2026',
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      {/* Top Announcement Bar (Marquee) */}
      <div className="w-full border-b border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden py-2">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-8 px-4">
              {announcementText.map((item, index) => (
                <div key={index} className="flex items-center gap-8">
                  <span className="font-poppins text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-white/90 hover:text-[#C89B6D] transition-colors">
                    {item}
                  </span>
                  <span className="text-[#C89B6D] text-xs opacity-75">—</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar Navigation */}
      <div className={`max-w-[1440px] mx-auto px-6 sm:px-12 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}>
        {/* Brand Logo */}
        <Link href="/" className="font-playfair text-2xl sm:text-3xl font-bold tracking-widest text-white drop-shadow">
          AETHERIX
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-poppins text-sm font-medium text-white/90">
          <Link href="/" className="hover:text-[#C89B6D] transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-[#C89B6D] transition-colors">Shop</Link>
          <Link href="/categories" className="hover:text-[#C89B6D] transition-colors">Categories</Link>
          <Link href="/new-arrivals" className="hover:text-[#C89B6D] transition-colors">New Arrivals</Link>
          <Link href="/collections" className="hover:text-[#C89B6D] transition-colors">Collections</Link>
        </nav>

        {/* Action Icons & CTA */}
        <div className="flex items-center gap-5 text-white">
          <button className="hover:text-[#C89B6D] transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-[#C89B6D] transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="hover:text-[#C89B6D] transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <Link
            href="/login"
            className="hidden sm:inline-block text-sm font-medium text-white hover:text-[#C89B6D] transition-colors ml-2"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="hidden sm:inline-block px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-[#C89B6D] hover:text-white transition-all shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}