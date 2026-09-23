'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MagneticButton } from '@/components/magnetic-button';
import { useAuth } from '@/lib/auth-context';
import { Logo } from '@/components/logo';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Account created. Welcome to AETHERIX');
      router.push('/dashboard');
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
              <h1 className="font-playfair text-3xl font-bold text-brand-primary">Create Account</h1>
              <p className="font-inter text-sm text-brand-muted mt-2">Join the AETHERIX circle</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-poppins text-xs font-medium text-brand-primary mb-2 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-11 pr-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>

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
                    className="w-full pl-11 pr-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-poppins text-xs font-medium text-brand-primary mb-2 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-11 pr-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-poppins text-xs font-medium text-brand-primary mb-2 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                  <input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-11 pr-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
                  />
                </div>
              </div>

              <label className="flex items-start gap-2 font-inter text-xs text-brand-muted cursor-pointer">
                <input type="checkbox" required className="accent-brand-accent mt-0.5" />
                <span>I agree to the <Link href="/support" className="text-brand-accent">Terms of Service</Link> and <Link href="/support" className="text-brand-accent">Privacy Policy</Link></span>
              </label>

              <MagneticButton
                type="submit"
                className="btn-luxury rounded-full w-full py-4 text-sm flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
              </MagneticButton>
            </form>

            <p className="text-center font-inter text-sm text-brand-muted mt-6">
              Already have an account?{' '}
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
