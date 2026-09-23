'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useAuth } from '@/lib/auth-context';
import { useWishlist } from '@/lib/wishlist-context';
import { supabase } from '@/lib/supabase-client';
import { formatPrice } from '@/lib/constants';
import type { Order, Address } from '@/lib/types';
import { motion } from 'framer-motion';
import {
  Package, Heart, MapPin, Settings, Bell, LogOut, User, ChevronRight,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const { items: wishItems } = useWishlist();
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data: orderData } = await supabase
        .from('orders')
        .select('*, items:order_items(*)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setOrders((orderData as Order[]) || []);

      const { data: addrData } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setAddresses((addrData as Address[]) || []);
    })();
  }, [user]);

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <div className="section-padding container-luxury py-32 text-center">
          <div className="w-10 h-10 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
        <Footer />
      </>
    );
  }

  const tabs = [
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'addresses', label: 'Addresses', icon: MapPin },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <div className="section-padding container-luxury py-12">
          <div className="mb-8">
            <h1 className="heading-md text-brand-primary mb-2">My Dashboard</h1>
            <p className="font-inter text-brand-muted">Welcome back, {user.user_metadata?.full_name || user.email}</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-4 sticky top-32">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-poppins text-sm transition-all ${
                        activeTab === tab.key
                          ? 'bg-brand-primary text-brand-secondary'
                          : 'text-brand-primary/70 hover:bg-brand-secondary/30'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                      {tab.key === 'wishlist' && wishItems.length > 0 && (
                        <span className="ml-auto text-xs bg-brand-accent text-white px-2 py-0.5 rounded-full">{wishItems.length}</span>
                      )}
                    </button>
                  ))}
                  <button
                    onClick={async () => { await signOut(); router.push('/'); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-poppins text-sm text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-brand-primary mb-5">Order History</h2>
                  {orders.length === 0 ? (
                    <div className="glass-card rounded-2xl p-12 text-center">
                      <Package className="w-12 h-12 text-brand-muted mx-auto mb-3" />
                      <p className="font-inter text-brand-muted mb-4">No orders yet</p>
                      <Link href="/shop" className="btn-luxury rounded-full px-6 py-3 text-sm inline-block">Start Shopping</Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-card rounded-2xl p-5"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <p className="font-poppins text-sm font-semibold text-brand-primary">{order.order_number}</p>
                              <p className="font-inter text-xs text-brand-muted">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-poppins font-medium capitalize ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>{order.status.replace(/_/g, ' ')}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-poppins text-sm text-brand-muted">{order.items?.length || 0} items</p>
                            <p className="font-playfair text-lg font-bold text-gradient">{formatPrice(order.total)}</p>
                          </div>
                          <Link href={`/order/${order.order_number}`} className="flex items-center gap-1 font-poppins text-xs text-brand-accent hover:text-brand-primary mt-3">
                            Track Order <ChevronRight className="w-3 h-3" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-brand-primary mb-5">Wishlist</h2>
                  {wishItems.length === 0 ? (
                    <div className="glass-card rounded-2xl p-12 text-center">
                      <Heart className="w-12 h-12 text-brand-muted mx-auto mb-3" />
                      <p className="font-inter text-brand-muted mb-4">Your wishlist is empty</p>
                      <Link href="/shop" className="btn-luxury rounded-full px-6 py-3 text-sm inline-block">Browse Products</Link>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {wishItems.map((item) => item.product && (
                        <Link key={item.id} href={`/product/${item.product.slug}`} className="glass-card rounded-2xl p-4 flex gap-3 hover-lift">
                          <div className="w-16 h-20 rounded-lg overflow-hidden bg-brand-light relative shrink-0">
                            {item.product.images[0] && (
                              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div>
                            <p className="font-poppins text-sm font-medium text-brand-primary">{item.product.name}</p>
                            <p className="font-poppins text-sm font-semibold text-brand-accent">{formatPrice(item.product.price)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-brand-primary mb-5">Saved Addresses</h2>
                  {addresses.length === 0 ? (
                    <div className="glass-card rounded-2xl p-12 text-center">
                      <MapPin className="w-12 h-12 text-brand-muted mx-auto mb-3" />
                      <p className="font-inter text-brand-muted">No saved addresses yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {addresses.map((addr) => (
                        <div key={addr.id} className="glass-card rounded-2xl p-5">
                          <p className="font-poppins text-sm font-semibold text-brand-primary">{addr.full_name}</p>
                          <p className="font-inter text-sm text-brand-text/70">{addr.line1}, {addr.city}, {addr.state} {addr.postal_code}</p>
                          <p className="font-inter text-xs text-brand-muted mt-1">{addr.phone}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-brand-primary mb-5">Notifications</h2>
                  <div className="glass-card rounded-2xl p-5 mb-3">
                    <p className="font-poppins text-sm font-medium text-brand-primary">Welcome to AETHERIX</p>
                    <p className="font-inter text-xs text-brand-muted mt-1">Thank you for joining our circle. Enjoy 10% off with code WELCOME10.</p>
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-brand-primary mb-5">Profile</h2>
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center font-playfair text-2xl font-bold">
                        {(user.user_metadata?.full_name || user.email || 'A')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-playfair text-lg font-semibold text-brand-primary">{user.user_metadata?.full_name || 'AETHERIX Member'}</p>
                        <p className="font-inter text-sm text-brand-muted">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-brand-primary mb-5">Settings</h2>
                  <div className="glass-card rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-poppins text-sm font-medium text-brand-primary">Email Notifications</p>
                        <p className="font-inter text-xs text-brand-muted">Receive updates about new collections</p>
                      </div>
                      <input type="checkbox" defaultChecked className="accent-brand-accent w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-poppins text-sm font-medium text-brand-primary">SMS Alerts</p>
                        <p className="font-inter text-xs text-brand-muted">Order updates via SMS</p>
                      </div>
                      <input type="checkbox" className="accent-brand-accent w-5 h-5" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
