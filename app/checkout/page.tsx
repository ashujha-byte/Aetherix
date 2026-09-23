'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MagneticButton } from '@/components/magnetic-button';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { formatPrice } from '@/lib/constants';
import { supabase } from '@/lib/supabase-client';
import { toast } from 'sonner';
import { Check, CreditCard, Wallet, Banknote, Loader2, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState<'address' | 'payment' | 'confirm'>('address');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const [address, setAddress] = useState({
    full_name: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
  });

  const shipping = total > 200 ? 0 : 15;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="section-padding container-luxury py-32 text-center">
          <h1 className="heading-sm text-brand-primary mb-3">Please Sign In</h1>
          <Link href="/login" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">Sign In</Link>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="section-padding container-luxury py-32 text-center">
          <h1 className="heading-sm text-brand-primary mb-3">Your Cart is Empty</h1>
          <Link href="/shop" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">Start Shopping</Link>
        </main>
        <Footer />
      </>
    );
  }

  const placeOrder = async () => {
    setLoading(true);
    const orderNumber = `AET-${Date.now().toString(36).toUpperCase()}`;
    const timeline = [
      { status: 'pending', label: 'Order Placed', timestamp: new Date().toISOString(), completed: true },
      { status: 'packed', label: 'Packed', timestamp: null, completed: false },
      { status: 'dispatched', label: 'Dispatched', timestamp: null, completed: false },
      { status: 'out_for_delivery', label: 'Out for Delivery', timestamp: null, completed: false },
      { status: 'delivered', label: 'Delivered', timestamp: null, completed: false },
    ];

    const { data: order, error } = await supabase.from('orders').insert({
      user_id: user.id,
      order_number: orderNumber,
      status: 'pending',
      subtotal: total,
      discount: 0,
      shipping,
      tax,
      total: grandTotal,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cod' ? 'unpaid' : 'paid',
      address_json: address,
      tracking_timeline: timeline,
    }).select().single();

    if (error || !order) {
      toast.error('Failed to place order. Please try again.');
      setLoading(false);
      return;
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product?.name || '',
      product_image: item.product?.images?.[0] || null,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.product?.price || 0,
    }));

    await supabase.from('order_items').insert(orderItems);
    await clearCart();
    setLoading(false);
    toast.success('Order placed successfully!');
    router.push(`/order/${orderNumber}`);
  };

  const steps = [
    { key: 'address', label: 'Address', icon: MapPin },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'confirm', label: 'Confirm', icon: Check },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <div className="section-padding container-luxury py-12">
          <h1 className="heading-md text-brand-primary mb-8">Checkout</h1>

          {/* Steps indicator */}
          <div className="flex items-center gap-4 mb-10">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  step === s.key || (steps.findIndex(x => x.key === step) > i)
                    ? 'bg-brand-primary text-brand-secondary'
                    : 'bg-brand-secondary/40 text-brand-muted'
                }`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <span className={`font-poppins text-sm font-medium ${
                  step === s.key ? 'text-brand-primary' : 'text-brand-muted'
                }`}>{s.label}</span>
                {i < steps.length - 1 && <div className="w-8 h-px bg-brand-border" />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Address step */}
              {step === 'address' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
                  <h2 className="font-playfair text-xl font-bold text-brand-primary mb-5">Shipping Address</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input className="px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent" placeholder="Full Name" value={address.full_name} onChange={(e) => setAddress({ ...address, full_name: e.target.value })} />
                    <input className="px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent" placeholder="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
                    <input className="md:col-span-2 px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent" placeholder="Address Line 1" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                    <input className="md:col-span-2 px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent" placeholder="Address Line 2 (optional)" value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} />
                    <input className="px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    <input className="px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                    <input className="px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent" placeholder="Postal Code" value={address.postal_code} onChange={(e) => setAddress({ ...address, postal_code: e.target.value })} />
                    <input className="px-4 py-3 bg-brand-bg border border-brand-border rounded-xl font-inter text-sm focus:outline-none focus:border-brand-accent" placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
                  </div>
                  <button
                    onClick={() => {
                      if (!address.full_name || !address.phone || !address.line1 || !address.city || !address.state || !address.postal_code) {
                        toast.error('Please fill all required fields');
                        return;
                      }
                      setStep('payment');
                    }}
                    className="btn-luxury rounded-full px-8 py-3.5 text-sm mt-6"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {/* Payment step */}
              {step === 'payment' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
                  <h2 className="font-playfair text-xl font-bold text-brand-primary mb-5">Payment Method</h2>
                  <div className="space-y-3">
                    {[
                      { id: 'stripe', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Amex via Stripe', icon: CreditCard },
                      { id: 'razorpay', label: 'Razorpay', sub: 'UPI, Wallets, Net Banking', icon: Wallet },
                      { id: 'upi', label: 'UPI Direct', sub: 'GPay, PhonePe, Paytm', icon: Wallet },
                      { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when you receive', icon: Banknote },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                          paymentMethod === method.id
                            ? 'border-brand-accent bg-brand-accent/5'
                            : 'border-brand-border hover:border-brand-accent/50'
                        }`}
                      >
                        <method.icon className={`w-6 h-6 ${paymentMethod === method.id ? 'text-brand-accent' : 'text-brand-muted'}`} />
                        <div className="flex-1">
                          <div className="font-poppins text-sm font-semibold text-brand-primary">{method.label}</div>
                          <div className="font-inter text-xs text-brand-muted">{method.sub}</div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id ? 'border-brand-accent bg-brand-accent' : 'border-brand-border'
                        }`}>
                          {paymentMethod === method.id && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setStep('address')} className="btn-outline-luxury rounded-full px-6 py-3.5 text-sm">
                      Back
                    </button>
                    <button onClick={() => setStep('confirm')} className="btn-luxury rounded-full px-8 py-3.5 text-sm flex-1">
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Confirm step */}
              {step === 'confirm' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
                  <h2 className="font-playfair text-xl font-bold text-brand-primary mb-5">Review Your Order</h2>

                  <div className="mb-5">
                    <h3 className="font-poppins text-sm font-semibold text-brand-primary mb-2">Shipping To:</h3>
                    <p className="font-inter text-sm text-brand-text/70">
                      {address.full_name}, {address.line1}, {address.city}, {address.state} {address.postal_code}, {address.country}
                    </p>
                  </div>

                  <div className="mb-5">
                    <h3 className="font-poppins text-sm font-semibold text-brand-primary mb-2">Payment Method:</h3>
                    <p className="font-inter text-sm text-brand-text/70 capitalize">{paymentMethod}</p>
                  </div>

                  <div className="space-y-3 mb-5">
                    <h3 className="font-poppins text-sm font-semibold text-brand-primary">Items:</h3>
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3 items-center">
                        <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-brand-light shrink-0">
                          {item.product?.images?.[0] && (
                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-poppins text-sm font-medium text-brand-primary">{item.product?.name}</p>
                          <p className="font-inter text-xs text-brand-muted">Qty: {item.quantity} {item.size && `· Size: ${item.size}`} {item.color && `· ${item.color}`}</p>
                        </div>
                        <p className="font-poppins text-sm font-semibold">{formatPrice((item.product?.price || 0) * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep('payment')} className="btn-outline-luxury rounded-full px-6 py-3.5 text-sm">
                      Back
                    </button>
                    <MagneticButton
                      onClick={placeOrder}
                      className="btn-luxury rounded-full px-8 py-3.5 text-sm flex-1 flex items-center justify-center gap-2"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Place Order — {formatPrice(grandTotal)}</>}
                    </MagneticButton>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 sticky top-32">
                <h2 className="font-playfair text-lg font-bold text-brand-primary mb-4">Summary</h2>
                <div className="space-y-2 mb-4 pb-4 border-b border-brand-border/30">
                  <div className="flex justify-between font-inter text-sm"><span className="text-brand-muted">Subtotal</span><span className="font-medium">{formatPrice(total)}</span></div>
                  <div className="flex justify-between font-inter text-sm"><span className="text-brand-muted">Shipping</span><span className="font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between font-inter text-sm"><span className="text-brand-muted">Tax</span><span className="font-medium">{formatPrice(tax)}</span></div>
                </div>
                <div className="flex justify-between"><span className="font-playfair font-bold text-lg">Total</span><span className="font-playfair text-2xl font-bold text-gradient">{formatPrice(grandTotal)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
