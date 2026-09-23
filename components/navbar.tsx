'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { Logo } from '@/components/logo';
import { MagneticButton } from '@/components/magnetic-button';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useAuth } from '@/lib/auth-context';
import { NAV_LINKS, CATEGORIES } from '@/lib/constants';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopOpen, setShopOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Search Submit Handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement bar - Bold text */}
      <div className="bg-brand-primary text-brand-secondary text-center py-2.5 overflow-hidden font-bold">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 font-poppins text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap">
              <span>Complimentary shipping on orders over 499</span>
              <span className="text-brand-accent">—</span>
              <span>New Collection: Autumn / Winter 2026</span>
              <span className="text-brand-accent">—</span>
              <span>Use code WELCOME10 for 10% off your first order</span>
              <span className="text-brand-accent">—</span>
            </div>
          ))}
        </div>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="section-padding container-luxury flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-black stroke-[2.5]" />
          </button>

          {/* Logo */}
          <Logo className="lg:flex-1" />

          {/* Desktop Nav - HIGH BOLD & DARK TEXT */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {NAV_LINKS.slice(0, 5).map((link) =>
              link.label === 'Shop' ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setShopOpen(true)}
                  onMouseLeave={() => setShopOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="font-poppins text-[14px] font-extrabold tracking-wide text-black hover:text-brand-accent transition-colors flex items-center gap-1 py-1"
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 stroke-[3]" />
                  </Link>
                  <AnimatePresence>
                    {shopOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] glass rounded-2xl shadow-luxury p-4 grid grid-cols-3 gap-3"
                      >
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat}
                            href={`/shop?category=${cat.toLowerCase().replace(/\s+/g, '-')}`}
                            className="font-poppins text-sm font-bold text-black hover:text-brand-accent transition-colors py-2 px-3 rounded-lg hover:bg-brand-secondary/50"
                          >
                            {cat}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-poppins text-[14px] font-extrabold tracking-wide transition-colors whitespace-nowrap py-1 ${
                    pathname === link.href
                      ? 'text-black border-b-2 border-black'
                      : 'text-black/80 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right Icons - Bold Lines */}
          <div className="flex items-center gap-2 lg:gap-3 lg:flex-1 justify-end">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-brand-secondary/40 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-black stroke-[2.5]" />
            </button>

            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-brand-secondary/40 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-black stroke-[2.5]" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative p-2 hover:bg-brand-secondary/40 rounded-full transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-black stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link
                href="/dashboard"
                className="p-2 hover:bg-brand-secondary/40 rounded-full transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5 text-black stroke-[2.5]" />
              </Link>
            ) : (
              <div className="hidden md:flex items-center gap-2 ml-2">
                <Link
                  href="/login"
                  className="font-poppins text-[13px] font-extrabold text-black hover:text-brand-accent transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <MagneticButton className="btn-luxury rounded-full px-5 py-2.5 text-sm font-bold">
                  <Link href="/register">Sign Up</Link>
                </MagneticButton>
              </div>
            )}
          </div>
        </nav>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-brand-border/30"
            >
              <div className="section-padding container-luxury py-6">
                <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, collections..."
                    className="w-full pl-12 pr-4 py-4 bg-brand-bg border border-brand-border rounded-full font-inter text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors font-medium"
                    autoFocus
                  />
                  <button type="submit" className="hidden">Search</button>
                </form>
                <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-2xl mx-auto">
                  {['Hoodies', 'Dresses', 'Sneakers', 'Limited Edition', 'New Arrivals'].map((tag) => (
                    <Link
                      key={tag}
                      href={`/shop?q=${encodeURIComponent(tag.toLowerCase())}`}
                      onClick={() => setSearchOpen(false)}
                      className="px-4 py-1.5 text-sm font-poppins font-bold text-black bg-brand-secondary/40 rounded-full hover:bg-brand-accent hover:text-white transition-all"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brand-primary/40 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-brand-bg z-[70] lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-brand-border">
                <Logo />
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6 text-black stroke-[2.5]" />
                </button>
              </div>
              <div className="p-6 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block py-3 font-poppins text-base font-extrabold text-black hover:text-brand-accent transition-colors border-b border-brand-border/30"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-1">
                  {CATEGORIES.slice(0, 6).map((cat) => (
                    <Link
                      key={cat}
                      href={`/shop?category=${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-2 font-poppins text-sm font-extrabold text-black hover:text-brand-accent transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
                <div className="pt-6 flex flex-col gap-3">
                  {user ? (
                    <Link href="/dashboard" className="btn-luxury rounded-full px-6 py-3 text-center text-sm font-bold">
                      My Account
                    </Link>
                  ) : (
                    <>
                      <Link href="/login" className="btn-outline-luxury rounded-full px-6 py-3 text-center text-sm font-bold">
                        Login
                      </Link>
                      <Link href="/register" className="btn-luxury rounded-full px-6 py-3 text-center text-sm font-bold">
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}