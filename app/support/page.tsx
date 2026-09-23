'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ChevronDown, HelpCircle, Truck, RefreshCw, Shield, CreditCard, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard delivery takes 3-5 business days. Express delivery arrives in 1-2 business days. International shipping may take 7-14 business days depending on your location.' },
  { q: 'What is your return policy?', a: 'We offer 30-day hassle-free returns on all unworn pieces with original tags. Refunds are processed within 5-7 business days of receiving your return.' },
  { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide. International shipping costs are calculated at checkout based on your location. Free shipping applies to orders over $200.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), UPI, Razorpay, net banking, wallets, and cash on delivery within select regions.' },
  { q: 'How do I track my order?', a: 'Once your order is dispatched, you will receive a tracking number via email. You can also track your order anytime on our Track Order page.' },
  { q: 'Are your products authentic?', a: 'Every AETHERIX product is crafted in-house with the finest materials. Limited Edition pieces are numbered and come with a certificate of authenticity.' },
  { q: 'How do I care for my AETHERIX pieces?', a: 'Each piece comes with specific care instructions. Generally, we recommend dry cleaning for tailored items and gentle machine wash for knitwear. Always store in the provided garment bag.' },
  { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. Please contact our support team immediately if you need to make changes.' },
];

const policies = [
  { icon: Truck, title: 'Shipping Policy', desc: 'Free shipping on orders over $200. Express and international shipping available.' },
  { icon: RefreshCw, title: 'Refund Policy', desc: '30-day hassle-free returns on unworn pieces with original tags and packaging.' },
  { icon: Shield, title: 'Privacy Policy', desc: 'Your data is encrypted and never shared. We use bank-level security for all transactions.' },
  { icon: CreditCard, title: 'Payment Security', desc: 'All payments are processed through secure gateways (Stripe, Razorpay) with SSL encryption.' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <section className="section-padding container-luxury py-20">
          <ScrollReveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <HelpCircle className="w-4 h-4 text-brand-accent" />
              <p className="eyebrow">Help Center</p>
            </div>
            <h1 className="heading-lg text-brand-primary mb-4">Customer Support</h1>
            <p className="body-luxury max-w-lg mx-auto">
              We're here for you 24/7. Find answers to common questions or reach out to our concierge team.
            </p>
          </ScrollReveal>

          {/* Policies */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {policies.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="card-luxury p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-brand-secondary/40 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-brand-primary mb-2">{p.title}</h3>
                  <p className="font-inter text-xs text-brand-text/70 leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mb-16">
            <ScrollReveal className="text-center mb-10">
              <h2 className="heading-sm text-brand-primary">Frequently Asked Questions</h2>
            </ScrollReveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="font-poppins text-sm font-medium text-brand-primary">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-brand-accent transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 font-inter text-sm text-brand-text/70 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <ScrollReveal className="text-center">
            <div className="glass-card rounded-3xl p-10 max-w-2xl mx-auto">
              <Package className="w-12 h-12 text-brand-accent mx-auto mb-4" />
              <h2 className="heading-sm text-brand-primary mb-3">Still Need Help?</h2>
              <p className="body-luxury mb-6">
                Our concierge team is available 24/7. Reach out and we'll take care of you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/contact" className="btn-luxury rounded-full px-8 py-4 text-sm inline-block text-center">Contact Us</Link>
                <a href={`mailto:${BRAND.email}`} className="btn-outline-luxury rounded-full px-8 py-4 text-sm inline-block text-center">Email Support</a>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
