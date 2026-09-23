'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { supabase } from '@/lib/supabase-client';
import { formatPrice } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, Users, Tag, BarChart3, TrendingUp,
  DollarSign, ShoppingBag, Layers,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart,
} from 'recharts';

type Stats = {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<Stats>({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalCustomers: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      const { data: prods } = await supabase.from('products').select('*');
      const { count: custCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });

      const totalRev = (orders || []).reduce((sum: number, o: any) => sum + Number(o.total), 0);
      setStats({
        totalRevenue: totalRev,
        totalOrders: (orders || []).length,
        totalProducts: (prods || []).length,
        totalCustomers: custCount || 0,
      });
      setRecentOrders((orders || []).slice(0, 8));
      setProducts((prods || []).slice(0, 8));
      setLoading(false);
    })();
  }, []);

  const salesData = [
    { month: 'Jan', sales: 4200, orders: 12 },
    { month: 'Feb', sales: 5800, orders: 18 },
    { month: 'Mar', sales: 7100, orders: 22 },
    { month: 'Apr', sales: 6400, orders: 19 },
    { month: 'May', sales: 8900, orders: 28 },
    { month: 'Jun', sales: 10200, orders: 34 },
    { month: 'Jul', sales: 9700, orders: 31 },
  ];

  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'orders', label: 'Orders', icon: ShoppingBag },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'customers', label: 'Customers', icon: Users },
    { key: 'coupons', label: 'Coupons', icon: Tag },
    { key: 'categories', label: 'Categories', icon: Layers },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-8">
        <div className="section-padding container-luxury py-12">
          <div className="mb-8">
            <p className="eyebrow mb-2">Admin Panel</p>
            <h1 className="heading-md text-brand-primary">Dashboard</h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-3 sticky top-32">
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
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-4">
              {activeTab === 'dashboard' && (
                <div>
                  {/* Stats cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
                      { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
                      { label: 'Products', value: stats.totalProducts, icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
                      { label: 'Customers', value: stats.totalCustomers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card rounded-2xl p-5"
                      >
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="font-poppins text-xs text-brand-muted">{stat.label}</p>
                        <p className="font-playfair text-2xl font-bold text-brand-primary mt-1">{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid lg:grid-cols-2 gap-4 mb-6">
                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="font-playfair text-lg font-semibold text-brand-primary mb-4">Revenue Overview</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={salesData}>
                          <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#C89B6D" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#C89B6D" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 12, fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #D4C4B5', fontFamily: 'Poppins' }} />
                          <Area type="monotone" dataKey="sales" stroke="#3B1F17" strokeWidth={2} fill="url(#colorSales)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="glass-card rounded-2xl p-6">
                      <h3 className="font-playfair text-lg font-semibold text-brand-primary mb-4">Orders per Month</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={salesData}>
                          <XAxis dataKey="month" tick={{ fontSize: 12, fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 12, fontFamily: 'Poppins' }} axisLine={false} tickLine={false} />
                          <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #D4C4B5', fontFamily: 'Poppins' }} />
                          <Bar dataKey="orders" fill="#C89B6D" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Recent orders */}
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-playfair text-lg font-semibold text-brand-primary mb-4">Recent Orders</h3>
                    {recentOrders.length === 0 ? (
                      <p className="font-inter text-sm text-brand-muted">No orders yet</p>
                    ) : (
                      <div className="space-y-2">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between py-2 border-b border-brand-border/20 last:border-0">
                            <div>
                              <p className="font-poppins text-sm font-medium text-brand-primary">{order.order_number}</p>
                              <p className="font-inter text-xs text-brand-muted">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-poppins capitalize ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                            }`}>{order.status.replace(/_/g, ' ')}</span>
                            <p className="font-poppins text-sm font-semibold">{formatPrice(order.total)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="font-playfair text-xl font-bold text-brand-primary mb-4">All Orders</h2>
                  {recentOrders.length === 0 ? (
                    <p className="font-inter text-sm text-brand-muted">No orders yet</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-brand-border">
                            <th className="text-left py-3 font-poppins text-xs text-brand-muted">Order #</th>
                            <th className="text-left py-3 font-poppins text-xs text-brand-muted">Date</th>
                            <th className="text-left py-3 font-poppins text-xs text-brand-muted">Status</th>
                            <th className="text-right py-3 font-poppins text-xs text-brand-muted">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentOrders.map((order) => (
                            <tr key={order.id} className="border-b border-brand-border/20">
                              <td className="py-3 font-poppins text-sm text-brand-primary">{order.order_number}</td>
                              <td className="py-3 font-inter text-xs text-brand-muted">{new Date(order.created_at).toLocaleDateString()}</td>
                              <td className="py-3"><span className="px-2 py-1 rounded-full text-xs font-poppins capitalize bg-brand-secondary/40 text-brand-primary">{order.status.replace(/_/g, ' ')}</span></td>
                              <td className="py-3 text-right font-poppins text-sm font-semibold">{formatPrice(order.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'products' && (
                <div className="glass-card rounded-2xl p-6">
                  <h2 className="font-playfair text-xl font-bold text-brand-primary mb-4">Products</h2>
                  <div className="space-y-2">
                    {products.map((p) => (
                      <div key={p.id} className="flex items-center gap-4 py-3 border-b border-brand-border/20 last:border-0">
                        {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-12 h-14 rounded-lg object-cover" />}
                        <div className="flex-1">
                          <p className="font-poppins text-sm font-medium text-brand-primary">{p.name}</p>
                          <p className="font-inter text-xs text-brand-muted">Stock: {p.stock}</p>
                        </div>
                        <p className="font-poppins text-sm font-semibold">{formatPrice(p.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <div className="glass-card rounded-2xl p-6 mb-4">
                    <h3 className="font-playfair text-lg font-semibold text-brand-primary mb-4">Sales Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={salesData}>
                        <defs>
                          <linearGradient id="colorSales2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B1F17" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#3B1F17" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #D4C4B5' }} />
                        <Area type="monotone" dataKey="sales" stroke="#3B1F17" strokeWidth={2} fill="url(#colorSales2)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {(activeTab === 'customers' || activeTab === 'coupons' || activeTab === 'categories') && (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <p className="font-inter text-brand-muted">This section is part of the admin panel. Data is managed through the database.</p>
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
