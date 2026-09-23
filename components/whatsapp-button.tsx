'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-card rounded-2xl p-5 shadow-luxury max-w-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-playfair text-base font-semibold text-brand-primary">Customer Support</h4>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="w-4 h-4 text-brand-muted" />
              </button>
            </div>
            <p className="font-inter text-sm text-brand-text/70 mb-4">
              Need help? Chat with our concierge team 24/7 or send us an email.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${BRAND.email}`}
                className="btn-outline-luxury rounded-full px-4 py-2.5 text-center text-xs"
              >
                Email Support
              </a>
              <Link
                href="/support"
                className="btn-luxury rounded-full px-4 py-2.5 text-center text-xs"
              >
                Visit Support Center
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-brand-primary shadow-luxury flex items-center justify-center text-brand-secondary hover:bg-brand-accent transition-colors"
        aria-label="Customer support"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
