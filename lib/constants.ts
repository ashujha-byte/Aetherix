export const BRAND = {
  name: 'AETHERIX',
  tagline: 'Fashion You Choose',
  email: 'aetherixofficialsupport@gmail.com',
  social: {
    instagram: 'https://www.instagram.com/aetherix.officiall?igsh=MWJzZDl0ZHZyb3l2dg==',
    youtube: 'https://www.youtube.com/@Aetherix-x6j',
    facebook: 'https://www.facebook.com/share/1Byt11xLdQ/',
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories' },
  { label: 'New Arrivals', href: '/shop?filter=new' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Track Order', href: '/track-order' },
];

export const CATEGORIES = [
  'Men', 'Women', 'Oversized', 'T-Shirts', 'Shirts', 'Hoodies',
  'Jackets', 'Jeans', 'Sneakers', 'Accessories', 'Luxury Collection', 'Limited Edition',
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};
