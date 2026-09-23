export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_featured: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  sku: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_trending: boolean;
  is_bestseller: boolean;
  is_flash_sale: boolean;
  flash_sale_ends_at: string | null;
  rating: number;
  review_count: number;
  tags: string[];
  created_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  body: string | null;
  created_at: string;
};

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  size: string | null;
  color: string | null;
  product?: Product;
};

export type WishlistItem = {
  id: string;
  product_id: string;
  product?: Product;
};

export type Address = {
  id: string;
  full_name: string;
  phone: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
};

export type Coupon = {
  id: string;
  code: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order: number;
  max_uses: number | null;
  used_count: number;
  valid_until: string | null;
  is_active: boolean;
};

export type OrderStatus = 'pending' | 'packed' | 'dispatched' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned';

export type Order = {
  id: string;
  order_number: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  coupon_code: string | null;
  payment_method: string | null;
  payment_status: 'unpaid' | 'paid' | 'refunded' | 'failed';
  address_json: any;
  tracking_timeline: any;
  created_at: string;
  items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string | null;
  size: string | null;
  color: string | null;
  quantity: number;
  price: number;
};
