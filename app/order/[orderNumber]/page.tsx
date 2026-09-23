'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { supabase } from '@/lib/supabase-client';
import { formatPrice } from '@/lib/constants';
import type { Order } from '@/lib/types';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams() as { orderNumber: string };
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('orders')
        .select('*, items:order_items(*)')
        .eq('order_number', orderNumber)
        .maybeSingle();
      setOrder((data as Order) || null);
      setLoading(false);
    })();
  }, [orderNumber]);

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <div className="section-padding container-luxury py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>

            <h1 className="heading-md text-brand-primary mb-3">Order Confirmed!</h1>
            <p className="body-luxury mb-2">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <p className="font-poppins text-sm text-brand-muted mb-8">
              Order Number: <span className="font-semibold text-brand-primary">{orderNumber}</span>
            </p>

            {order && (
              <div className="glass-card rounded-2xl p-6 text-left mb-8">
                <h2 className="font-playfair text-lg font-bold text-brand-primary mb-4">Order Details</h2>
                {order.items && order.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between py-2 border-b border-brand-border/20 last:border-0">
                    <div>
                      <p className="font-poppins text-sm font-medium text-brand-primary">{item.product_name}</p>
                      <p className="font-inter text-xs text-brand-muted">Qty: {item.quantity} {item.size && `· ${item.size}`} {item.color && `· ${item.color}`}</p>
                    </div>
                    <p className="font-poppins text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
                <div className="flex justify-between pt-4 mt-2 border-t border-brand-border/30">
                  <span className="font-playfair font-bold text-lg">Total</span>
                  <span className="font-playfair text-xl font-bold text-gradient">{formatPrice(order.total)}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/track-order" className="btn-luxury rounded-full px-8 py-4 text-sm inline-flex items-center justify-center gap-2">
                <Package className="w-4 h-4" /> Track Order
              </Link>
              <Link href="/shop" className="btn-outline-luxury rounded-full px-8 py-4 text-sm inline-flex items-center justify-center gap-2">
                Continue Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
