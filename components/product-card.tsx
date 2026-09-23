'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/constants';
import { useWishlist } from '@/lib/wishlist-context';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { toast } from 'sonner';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { has, toggle } = useWishlist();
  const { addItem } = useCart();
  const { user } = useAuth();
  const isWished = has(product.id);
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const handleAddCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please sign in to add items to your cart');
      return;
    }
    await addItem(product.id, 1, product.sizes[0], product.colors[0]);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please sign in to save items');
      return;
    }
    await toggle(product.id);
    toast.success(isWished ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: 'easeOut' }}
      className="group relative"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-light zoom-container shadow-card">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_new_arrival && (
              <span className="px-2.5 py-1 bg-brand-primary text-brand-secondary text-[10px] font-poppins font-medium tracking-wider uppercase rounded-full">
                New
              </span>
            )}
            {product.is_flash_sale && (
              <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-poppins font-medium tracking-wider uppercase rounded-full">
                Flash Sale
              </span>
            )}
            {discount > 0 && (
              <span className="px-2.5 py-1 bg-brand-accent text-white text-[10px] font-poppins font-medium tracking-wider uppercase rounded-full">
                -{discount}%
              </span>
            )}
            {product.stock <= 10 && product.stock > 0 && (
              <span className="px-2.5 py-1 bg-amber-700 text-white text-[10px] font-poppins font-medium tracking-wider uppercase rounded-full">
                Low Stock
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full glass flex items-center justify-center transition-all hover:scale-110"
            aria-label="Toggle wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isWished ? 'fill-red-500 text-red-500' : 'text-brand-primary'}`}
            />
          </button>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Quick actions */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={handleAddCart}
              className="flex-1 btn-luxury rounded-full py-2.5 text-xs font-poppins font-medium flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
            </button>
            <div className="w-10 h-10 glass rounded-full flex items-center justify-center">
              <Eye className="w-4 h-4 text-brand-primary" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 px-1">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 fill-brand-accent text-brand-accent" />
            <span className="font-inter text-xs text-brand-muted">{product.rating.toFixed(1)}</span>
            <span className="font-inter text-xs text-brand-muted/60">({product.review_count})</span>
          </div>
          <h3 className="font-playfair text-base font-semibold text-brand-text line-clamp-1 group-hover:text-brand-accent transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-poppins text-sm font-semibold text-brand-primary">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="font-poppins text-xs text-brand-muted line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>
          {/* Color dots */}
          <div className="flex gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                className="w-3 h-3 rounded-full border border-brand-border"
                style={{ backgroundColor: getColorValue(color) }}
                title={color}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function getColorValue(color: string): string {
  const map: Record<string, string> = {
    Black: '#1F1F1F', White: '#F8F5F2', Sand: '#E8D9C9', Camel: '#C19A6B',
    Charcoal: '#36454F', Espresso: '#4B2F1F', Olive: '#808000', Ivory: '#FFFFF0',
    Mocha: '#967969', Stone: '#9A8F7D', Bone: '#E3DAC9', Sky: '#87CEEB',
    Indigo: '#4B0082', Cognac: '#9A463D', Oat: '#E6DBD0', 'Washed Black': '#3A3A3A',
    Default: '#C89B6D',
  };
  return map[color] || '#C89B6D';
}
