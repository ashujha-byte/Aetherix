'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { MagneticButton } from '@/components/magnetic-button';
import { Mail, Phone, MapPin, MessageCircle, Send, Loader2 } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent! We will get back to you within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <section className="section-padding container-luxury py-20">
          <ScrollReveal className="text-center mb-16">
            <p className="eyebrow mb-3">Get in Touch</p>
            <h1 className="heading-lg text-brand-primary mb-4">Contact Us</h1>
            <p className="body-luxury max-w-lg mx-auto">
              Our concierge team is available 24/7 to assist you with any questions, concerns, or inquiries.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: MessageCircle, label: 'Live Chat', value: 'Available 24/7', href: '#' },
                { icon: MapPin, label: 'Atelier', value: 'Mumbai, India', href: '#' },
              ].map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 0.1}>
                  <a href={item.href} className="glass-card rounded-2xl p-5 flex items-center gap-4 hover-lift block">
                    <div className="w-12 h-12 rounded-xl bg-brand-secondary/40 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <p className="font-poppins text-xs text-brand-muted">{item.label}</p>
                      <p className="font-poppins text-sm font-medium text-brand-primary">{item.value}</p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.3}>
                <div className="glass-card rounded-2xl p-5">
                  <h3 className="font-playfair text-lg font-semibold text-brand-primary mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-secondary/40 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all font-poppins text-xs font-bold">IG</a>
                    <a href={BRAND.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-secondary/40 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all font-poppins text-xs font-bold">YT</a>
                    <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-secondary/40 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all font-poppins text-xs font-bold">FB</a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.2}>
                <div className="glass-card rounded-3xl p-8 md:p-10">
                  <h2 className="font-playfair text-2xl font-bold text-brand-primary mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="px-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="px-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent"
                    />
                    <textarea
                      required
                      placeholder="Your Message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3.5 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent resize-none"
                    />
                    <MagneticButton type="submit" className="btn-luxury rounded-full px-8 py-4 text-sm flex items-center justify-center gap-2 w-full">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send Message <Send className="w-4 h-4" /></>}
                    </MagneticButton>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
