'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 120);

    const timer = setTimeout(() => setLoading(false), 2200);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-primary"
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              <motion.span
                className="font-playfair text-5xl md:text-7xl font-bold tracking-[0.2em] text-brand-secondary"
                initial={{ letterSpacing: '0.5em', opacity: 0 }}
                animate={{ letterSpacing: '0.2em', opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                AETHERIX
              </motion.span>
              <motion.div
                className="absolute -bottom-2 left-0 h-px bg-brand-accent"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <motion.p
              className="font-poppins text-xs tracking-[0.4em] uppercase text-brand-accent/80 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Fashion You Choose
            </motion.p>
            <div className="w-48 h-px bg-brand-secondary/20 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-accent to-brand-secondary"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <motion.p
              className="font-inter text-[10px] tracking-widest text-brand-secondary/40 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {Math.min(Math.floor(progress), 100)}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
