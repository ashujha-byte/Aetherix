'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="section-padding container-luxury py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair text-8xl md:text-9xl font-bold text-gradient mb-4">404</h1>
          <h2 className="heading-sm text-brand-primary mb-3">Page Not Found</h2>
          <p className="body-luxury mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Link href="/" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">
            Return Home
          </Link>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
