'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { supabase } from '@/lib/supabase-client';
import { formatPrice } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import type { Order } from '@/lib/types';
import Link from 'next/link';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const trackOrder = async () => {
    if (!orderNumber) return;
    setLoading(true);
    setSearched(true);
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber.toUpperCase())
      .maybeSingle();
    setOrder((data as Order) || null);
    setLoading(false);
  };

  const statuses = [
    { key: 'pending', label: 'Order Placed', icon: Clock },
    { key: 'packed', label: 'Packed', icon: Package },
    { key: 'dispatched', label: 'Dispatched', icon: Truck },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const currentStatusIndex = order ? statuses.findIndex((s) => s.key === order.status) : -1;

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <div className="section-padding container-luxury py-12">
          <div className="text-center mb-10">
            <h1 className="heading-md text-brand-primary mb-3">Track Your Order</h1>
            <p className="body-luxury max-w-lg mx-auto">
              Enter your order number to see the real-time status of your shipment.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-12">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && trackOrder()}
                  placeholder="e.g. AET-XXXXXXX"
                  className="w-full pl-12 pr-4 py-4 bg-brand-bg border border-brand-border rounded-full font-inter text-sm focus:outline-none focus:border-brand-accent"
                />
              </div>
              <button onClick={trackOrder} className="btn-luxury rounded-full px-8 text-sm">
                Track
              </button>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {searched && !loading && !order && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-brand-muted mx-auto mb-4" />
              <p className="font-playfair text-2xl text-brand-primary mb-2">Order Not Found</p>
              <p className="font-inter text-brand-muted">Please check your order number and try again.</p>
            </div>
          )}

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="glass-card rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="font-poppins text-xs text-brand-muted">Order Number</p>
                    <h2 className="font-playfair text-2xl font-bold text-brand-primary">{order.order_number}</h2>
                  </div>
                  <div className="text-right">
                    <p className="font-poppins text-xs text-brand-muted">Total</p>
                    <p className="font-playfair text-xl font-bold text-gradient">{formatPrice(order.total)}</p>
                  </div>
                </div>

                {/* Progress timeline */}
                <div className="relative mb-8">
                  <div className="absolute top-6 left-6 right-6 h-0.5 bg-brand-border" />
                  <motion.div
                    className="absolute top-6 left-6 h-0.5 bg-gradient-to-r from-brand-accent to-brand-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ maxWidth: 'calc(100% - 48px)' }}
                  />
                  <div className="relative flex justify-between">
                    {statuses.map((s, i) => {
                      const completed = i <= currentStatusIndex;
                      return (
                        <div key={s.key} className="flex flex-col items-center gap-2 z-10">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            completed ? 'bg-brand-primary text-brand-secondary' : 'bg-brand-light text-brand-muted'
                          }`}>
                            <s.icon className="w-5 h-5" />
                          </div>
                          <span className={`font-poppins text-[10px] text-center max-w-[80px] ${
                            completed ? 'text-brand-primary font-medium' : 'text-brand-muted'
                          }`}>{s.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Address */}
                {order.address_json && (
                  <div className="mb-6 p-4 bg-brand-light/50 rounded-xl">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-accent mt-0.5" />
                      <div className="font-inter text-sm text-brand-text/70">
                        <p className="font-medium text-brand-primary">{order.address_json.full_name}</p>
                        <p>{order.address_json.line1}, {order.address_json.city}, {order.address_json.state} {order.address_json.postal_code}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-brand-border/30">
                  <div>
                    <p className="font-poppins text-xs text-brand-muted">Payment Status</p>
                    <p className={`font-poppins text-sm font-medium capitalize ${order.payment_status === 'paid' ? 'text-green-700' : 'text-amber-700'}`}>
                      {order.payment_status}
                    </p>
                  </div>
                  <Link href="/dashboard" className="font-poppins text-sm text-brand-accent hover:text-brand-primary">
                    View in Dashboard →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
