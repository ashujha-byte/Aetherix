'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { MagneticButton } from '@/components/magnetic-button';
import { ScrollReveal } from '@/components/scroll-reveal';
import { supabase } from '@/lib/supabase-client';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useAuth } from '@/lib/auth-context';
import type { Product, Review } from '@/lib/types';
import { formatPrice } from '@/lib/constants';
import { toast } from 'sonner';
import {
  Heart, ShoppingBag, Star, Truck, RefreshCw, Shield, Share2,
  ChevronRight, Minus, Plus, ZoomIn, Ruler, Check,
} from 'lucide-react';

export default function ProductPage() {
  const { slug } = useParams() as { slug: string };
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');

  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('products').select('*').eq('slug', slug).maybeSingle();
      if (!data) {
        setLoading(false);
        return;
      }
      const prod = data as Product;
      setProduct(prod);
      setSelectedSize(prod.sizes[0] || '');
      setSelectedColor(prod.colors[0] || '');

      const { data: revData } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', prod.id)
        .order('created_at', { ascending: false });
      setReviews((revData as Review[]) || []);

      if (prod.category_id) {
        const { data: relData } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', prod.category_id)
          .neq('id', prod.id)
          .limit(4);
        setRelated((relData as Product[]) || []);
      }

      setLoading(false);
    })();
  }, [slug]);

  const handleAddCart = async () => {
    if (!user) {
      toast.info('Please sign in to add items to your cart');
      return;
    }
    if (!product) return;
    await addItem(product.id, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = async () => {
    if (!user) {
      toast.info('Please sign in to checkout');
      return;
    }
    if (!product) return;
    await addItem(product.id, quantity, selectedSize, selectedColor);
    window.location.href = '/checkout';
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.info('Please sign in to save items');
      return;
    }
    if (!product) return;
    await toggle(product.id);
    toast.success(has(product.id) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="section-padding container-luxury py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-[4/5] rounded-3xl bg-brand-light animate-pulse" />
            <div className="space-y-4">
              <div className="h-10 bg-brand-light animate-pulse rounded" />
              <div className="h-6 bg-brand-light animate-pulse rounded w-1/2" />
              <div className="h-40 bg-brand-light animate-pulse rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="section-padding container-luxury py-32 text-center">
          <h1 className="heading-md text-brand-primary mb-4">Product Not Found</h1>
          <p className="body-luxury mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/shop" className="btn-luxury rounded-full px-8 py-4 inline-block text-sm">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const isWished = has(product.id);
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <>
      <Navbar />
      <main className="pt-8">
        {/* Breadcrumb */}
        <div className="section-padding container-luxury py-4">
          <div className="flex items-center gap-2 font-poppins text-xs text-brand-muted">
            <Link href="/" className="hover:text-brand-accent">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-brand-accent">Shop</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-primary">{product.name}</span>
          </div>
        </div>

        {/* Product main */}
        <div className="section-padding container-luxury py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image gallery */}
            <div>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-brand-light shadow-card group cursor-zoom-in"
                onClick={() => setZoomOpen(true)}
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center">
                  <ZoomIn className="w-4 h-4 text-brand-primary" />
                </div>
                {discount > 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-brand-accent text-white text-xs font-poppins font-bold rounded-full">
                    -{discount}%
                  </div>
                )}
              </motion.div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden transition-all ${
                        activeImage === i
                          ? 'ring-2 ring-brand-accent ring-offset-2 ring-offset-brand-bg'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {product.is_new_arrival && (
                  <span className="px-2.5 py-1 bg-brand-primary text-brand-secondary text-[10px] font-poppins font-medium tracking-wider uppercase rounded-full">
                    New Arrival
                  </span>
                )}
                {product.is_flash_sale && (
                  <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-poppins font-medium tracking-wider uppercase rounded-full">
                    Flash Sale
                  </span>
                )}
              </div>

              <h1 className="font-playfair text-3xl md:text-5xl font-bold text-brand-primary mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-brand-accent text-brand-accent'
                          : 'text-brand-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-inter text-sm text-brand-muted">
                  {product.rating.toFixed(1)} ({product.review_count} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-playfair text-3xl font-bold text-brand-primary">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && (
                  <span className="font-poppins text-lg text-brand-muted line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-poppins font-semibold rounded-full">
                    Save {discount}%
                  </span>
                )}
              </div>

              <p className="font-inter text-brand-text/70 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color selector */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="font-poppins text-sm font-medium text-brand-primary mb-3 block">
                    Color: <span className="text-brand-muted">{selectedColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-full text-xs font-poppins font-medium border-2 transition-all ${
                          selectedColor === color
                            ? 'border-brand-primary bg-brand-primary text-brand-secondary'
                            : 'border-brand-border text-brand-primary hover:border-brand-accent'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-poppins text-sm font-medium text-brand-primary">
                      Size: <span className="text-brand-muted">{selectedSize}</span>
                    </label>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="flex items-center gap-1 font-poppins text-xs text-brand-accent hover:text-brand-primary"
                    >
                      <Ruler className="w-3.5 h-3.5" /> Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] px-4 py-2.5 rounded-xl text-sm font-poppins font-medium border-2 transition-all ${
                          selectedSize === size
                            ? 'border-brand-primary bg-brand-primary text-brand-secondary'
                            : 'border-brand-border text-brand-primary hover:border-brand-accent'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {showSizeGuide && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 glass-card rounded-2xl p-5 overflow-hidden"
                    >
                      <h4 className="font-playfair text-lg font-semibold text-brand-primary mb-3">Size Guide</h4>
                      <table className="w-full font-inter text-sm">
                        <thead>
                          <tr className="border-b border-brand-border">
                            <th className="text-left py-2 font-poppins text-xs text-brand-muted">Size</th>
                            <th className="text-left py-2 font-poppins text-xs text-brand-muted">Chest (in)</th>
                            <th className="text-left py-2 font-poppins text-xs text-brand-muted">Waist (in)</th>
                            <th className="text-left py-2 font-poppins text-xs text-brand-muted">Hip (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { size: 'XS', chest: '32-34', waist: '26-28', hip: '34-36' },
                            { size: 'S', chest: '34-36', waist: '28-30', hip: '36-38' },
                            { size: 'M', chest: '38-40', waist: '30-32', hip: '38-40' },
                            { size: 'L', chest: '40-42', waist: '32-34', hip: '40-42' },
                            { size: 'XL', chest: '42-44', waist: '34-36', hip: '42-44' },
                            { size: 'XXL', chest: '44-46', waist: '36-38', hip: '44-46' },
                          ].map((row) => (
                            <tr key={row.size} className="border-b border-brand-border/30">
                              <td className="py-2 font-medium text-brand-primary">{row.size}</td>
                              <td className="py-2 text-brand-text/70">{row.chest}</td>
                              <td className="py-2 text-brand-text/70">{row.waist}</td>
                              <td className="py-2 text-brand-text/70">{row.hip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Stock status */}
              <div className="mb-6 flex items-center gap-2">
                {product.stock > 10 ? (
                  <span className="flex items-center gap-1.5 font-poppins text-sm text-green-700">
                    <Check className="w-4 h-4" /> In Stock ({product.stock} available)
                  </span>
                ) : product.stock > 0 ? (
                  <span className="flex items-center gap-1.5 font-poppins text-sm text-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-600" /> Low Stock — only {product.stock} left
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-poppins text-sm text-red-700">
                    <span className="w-2 h-2 rounded-full bg-red-600" /> Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity + actions */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border-2 border-brand-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-brand-secondary/30 rounded-l-full transition-colors"
                  >
                    <Minus className="w-4 h-4 text-brand-primary" />
                  </button>
                  <span className="w-12 text-center font-poppins font-semibold text-brand-primary">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-brand-secondary/30 rounded-r-full transition-colors"
                  >
                    <Plus className="w-4 h-4 text-brand-primary" />
                  </button>
                </div>

                <MagneticButton
                  onClick={handleAddCart}
                  className="btn-luxury rounded-full px-8 py-3.5 text-sm flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </MagneticButton>

                <button
                  onClick={handleWishlist}
                  className="w-12 h-12 rounded-full border-2 border-brand-border flex items-center justify-center hover:border-brand-accent transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWished ? 'fill-red-500 text-red-500' : 'text-brand-primary'}`} />
                </button>
              </div>

              <MagneticButton
                onClick={handleBuyNow}
                className="btn-outline-luxury rounded-full px-8 py-3.5 text-sm w-full mb-8"
              >
                Buy Now
              </MagneticButton>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $200' },
                  { icon: RefreshCw, label: '30-Day Returns', sub: 'Hassle-free' },
                  { icon: Shield, label: 'Secure Payment', sub: 'Protected checkout' },
                ].map((item) => (
                  <div key={item.label} className="glass-card rounded-xl p-4 text-center">
                    <item.icon className="w-5 h-5 text-brand-accent mx-auto mb-2" />
                    <div className="font-poppins text-xs font-semibold text-brand-primary">{item.label}</div>
                    <div className="font-inter text-[10px] text-brand-muted">{item.sub}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Product link copied');
                }}
                className="flex items-center gap-2 font-poppins text-sm text-brand-muted hover:text-brand-accent transition-colors"
              >
                <Share2 className="w-4 h-4" /> Share this product
              </button>
            </div>
          </div>
        </div>

        {/* Tabs: Description / Reviews / Shipping */}
        <div className="section-padding container-luxury py-12">
          <div className="flex gap-6 border-b border-brand-border mb-8">
            {[
              { key: 'description', label: 'Description' },
              { key: 'reviews', label: `Reviews (${reviews.length})` },
              { key: 'shipping', label: 'Shipping & Returns' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`pb-4 font-poppins text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-brand-primary'
                    : 'text-brand-muted hover:text-brand-primary'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'description' && (
                <div className="max-w-2xl">
                  <p className="body-luxury mb-4">{product.description}</p>
                  <ul className="space-y-2">
                    {product.tags.map((tag) => (
                      <li key={tag} className="flex items-center gap-2 font-inter text-sm text-brand-text/70">
                        <Check className="w-4 h-4 text-brand-accent" /> {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="max-w-3xl">
                  {reviews.length === 0 ? (
                    <p className="font-inter text-brand-muted">No reviews yet. Be the first to review this product.</p>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="glass-card rounded-2xl p-5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex gap-1">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-brand-accent text-brand-accent" />
                              ))}
                            </div>
                            <span className="font-inter text-xs text-brand-muted">
                              {new Date(rev.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          {rev.title && <h4 className="font-playfair text-lg font-semibold text-brand-primary mb-1">{rev.title}</h4>}
                          <p className="font-inter text-sm text-brand-text/70">{rev.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="max-w-2xl space-y-4">
                  <div className="glass-card rounded-2xl p-5">
                    <h4 className="font-playfair text-lg font-semibold text-brand-primary mb-2">Shipping</h4>
                    <p className="font-inter text-sm text-brand-text/70">
                      Complimentary express shipping on all orders over $200. Standard delivery takes 3-5 business days;
                      express delivery arrives in 1-2 business days. International shipping available worldwide.
                    </p>
                  </div>
                  <div className="glass-card rounded-2xl p-5">
                    <h4 className="font-playfair text-lg font-semibold text-brand-primary mb-2">Returns</h4>
                    <p className="font-inter text-sm text-brand-text/70">
                      We offer 30-day hassle-free returns on all unworn pieces with original tags.
                      Refunds are processed within 5-7 business days of receiving your return.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="section-padding container-luxury py-16">
            <ScrollReveal className="mb-10">
              <h2 className="heading-sm text-brand-primary">You May Also Like</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomOpen(false)}
            className="fixed inset-0 z-[80] bg-brand-primary/90 backdrop-blur-md flex items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-3xl aspect-[4/5]"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
