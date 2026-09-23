'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { supabase } from '@/lib/supabase-client';
import type { Product, Category } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  useEffect(() => {
    (async () => {
      const { data: catData } = await supabase.from('categories').select('*').order('sort_order');
      setCategories((catData as Category[]) || []);

      let query = supabase.from('products').select('*');
      if (selectedCategory) {
        const cat = (catData as Category[])?.find((c) => c.slug === selectedCategory);
        if (cat) query = query.eq('category_id', cat.id);
      }
      if (filterParam === 'new') query = query.eq('is_new_arrival', true);
      if (filterParam === 'sale') query = query.eq('is_flash_sale', true);

      const { data: prodData } = await query.order('created_at', { ascending: false });
      setProducts((prodData as Product[]) || []);
      setLoading(false);
    })();
  }, [selectedCategory, filterParam]);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortBy === 'price-low') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'newest') result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return result;
  }, [products, sortBy, priceRange]);

  return (
    <>
      <Navbar />
      <main className="pt-8">
        {/* Page header */}
        <div className="section-padding container-luxury py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-3">The Collection</p>
            <h1 className="heading-lg text-brand-primary mb-3">
              {selectedCategory
                ? CATEGORIES.find((c) => c.toLowerCase().replace(/\s+/g, '-') === selectedCategory) || 'Shop'
                : 'All Products'}
            </h1>
            <p className="body-luxury max-w-xl">
              Explore our full collection of luxury fashion — crafted with intention, designed for you.
            </p>
          </motion.div>
        </div>

        {/* Filters bar */}
        <div className="section-padding container-luxury sticky top-[72px] z-30 glass py-4 mb-8 rounded-2xl">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 font-poppins text-sm font-medium text-brand-primary px-4 py-2.5 rounded-full border border-brand-border hover:border-brand-accent transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>
              <div className="hidden md:flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-poppins transition-all ${
                    !selectedCategory
                      ? 'bg-brand-primary text-brand-secondary'
                      : 'bg-brand-secondary/30 text-brand-primary/70 hover:bg-brand-secondary/50'
                  }`}
                >
                  All
                </button>
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-poppins transition-all ${
                      selectedCategory === cat.slug
                        ? 'bg-brand-primary text-brand-secondary'
                        : 'bg-brand-secondary/30 text-brand-primary/70 hover:bg-brand-secondary/50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-poppins text-xs text-brand-muted hidden sm:block">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="font-poppins text-sm bg-brand-bg border border-brand-border rounded-full px-4 py-2 focus:outline-none focus:border-brand-accent cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-brand-border/30"
            >
              <div className="mb-4">
                <label className="font-poppins text-xs font-medium text-brand-primary mb-2 block">
                  Price Range: ${priceRange[0]} — ${priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-brand-accent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-poppins transition-all ${
                      selectedCategory === cat.slug
                        ? 'bg-brand-primary text-brand-secondary'
                        : 'bg-brand-secondary/30 text-brand-primary/70 hover:bg-brand-secondary/50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Products grid */}
        <div className="section-padding container-luxury pb-20">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-brand-light animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-playfair text-2xl text-brand-primary mb-2">No products found</p>
              <p className="font-inter text-brand-muted">Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <p className="font-inter text-sm text-brand-muted mb-6">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
