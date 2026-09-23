'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MagneticButton } from '@/components/magnetic-button';
import { Logo } from '@/components/logo';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Password reset link sent to your email');
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center section-padding py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-3xl p-8 md:p-10 shadow-luxury">
            <div className="text-center mb-8">
              <Logo className="justify-center mb-4" />
              <h1 className="font-playfair text-3xl font-bold text-brand-primary">Forgot Password</h1>
              <p className="font-inter text-sm text-brand-muted mt-2">
                {sent ? 'Check your email for a reset link' : 'Enter your email to receive a reset link'}
              </p>
            </div>

            {sent ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <p className="font-inter text-sm text-brand-text/70 mb-6">
                  We've sent a password reset link to <span className="font-semibold">{email}</span>.
                  Please check your inbox and follow the instructions.
                </p>
                <Link href="/login" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-poppins text-xs font-medium text-brand-primary mb-2 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent"
                    />
                  </div>
                </div>
                <MagneticButton type="submit" className="btn-luxury rounded-full w-full py-4 text-sm flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Reset Link <ArrowRight className="w-4 h-4" /></>}
                </MagneticButton>
              </form>
            )}

            <p className="text-center font-inter text-sm text-brand-muted mt-6">
              Remember your password?{' '}
              <Link href="/login" className="font-poppins font-medium text-brand-accent hover:text-brand-primary">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
