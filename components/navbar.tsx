'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu khulte hi background scroll lock karna
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const announcementText = [
    'USE CODE WELCOME10 FOR 10% OFF YOUR FIRST ORDER',
    'COMPLIMENTARY SHIPPING ON ORDERS OVER ₹999',
    'NEW COLLECTION: AUTUMN / WINTER 2026',
  ];

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'Categories', href: '/categories' },
    { label: 'New Arrivals', href: '/new-arrivals' },
    { label: 'Collections', href: '/collections' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      {/* Top Announcement Bar */}
      <div className="w-full border-b border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden py-1.5 sm:py-2">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-6 sm:gap-8 px-3 sm:px-4">
              {announcementText.map((item, index) => (
                <div key={index} className="flex items-center gap-6 sm:gap-8">
                  <span className="font-poppins text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium text-white/90">
                    {item}
                  </span>
                  <span className="text-[#C89B6D] text-xs opacity-75">—</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div
        className={`max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4 sm:py-5'
        }`}
      >
        {/* Mobile Hamburger Button + Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            className="md:hidden text-white hover:text-[#C89B6D] p-1.5 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link
            href="/"
            className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold tracking-widest italic text-transparent bg-clip-text bg-gradient-to-r from-[#F8F5F2] via-[#C89B6D] to-[#E8D9C9] drop-shadow-[0_2px_10px_rgba(200,155,109,0.3)] select-none"
          >
            AETHERIX
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-poppins text-sm font-medium text-white/90">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#C89B6D] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-3 sm:gap-5 text-white">
          <button aria-label="Search" className="hover:text-[#C89B6D] transition-colors p-1">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Wishlist" className="hover:text-[#C89B6D] transition-colors p-1">
            <Heart className="w-5 h-5" />
          </button>
          <button aria-label="Cart" className="hover:text-[#C89B6D] transition-colors relative p-1">
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

      {/* Mobile Slide-out Drawer Menu */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[60] transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 bottom-0 w-[80%] max-w-xs bg-[#0F0D0C] border-r border-white/10 p-6 flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Menu Header */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-playfair text-xl font-bold tracking-widest italic text-transparent bg-clip-text bg-gradient-to-r from-[#F8F5F2] via-[#C89B6D] to-[#E8D9C9]"
              >
                AETHERIX
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
                className="text-white/70 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-5 mt-8 font-poppins text-base font-medium text-white/90">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#C89B6D] transition-colors py-1 border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-full text-sm font-semibold uppercase tracking-wider bg-[#C89B6D] text-white hover:brightness-110 transition-all shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}