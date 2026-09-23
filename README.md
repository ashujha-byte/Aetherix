# AETHERIX — Luxury Fashion E-Commerce

> **Fashion You Choose**

A premium, luxury fashion e-commerce website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Supabase. Designed to deliver a world-class shopping experience comparable to Louis Vuitton, Dior, and Apple.

## Features

### Frontend
- **Cinematic Loading Screen** with animated logo intro
- **Custom Cursor** with glow and magnetic hover states
- **Glassmorphism UI** throughout — frosted glass cards, navigation, and overlays
- **Framer Motion animations** — scroll reveals, page transitions, floating elements, parallax
- **Magnetic buttons** that respond to mouse proximity
- **Smooth scroll** and micro-interactions
- **Fully responsive** — desktop, laptop, tablet, mobile

### E-Commerce
- **Product catalog** with 12+ categories and seeded luxury products
- **Product detail pages** — image gallery, zoom, size guide, color selector, reviews, related products
- **Shopping cart** with quantity management and coupon system
- **Wishlist** — save/remove items
- **Checkout** — 3-step flow (address → payment → confirm) with Stripe, Razorpay, UPI, COD options
- **Order tracking** — animated timeline (Placed → Packed → Dispatched → Out for Delivery → Delivered)
- **User dashboard** — orders, wishlist, addresses, notifications, profile, settings
- **Admin dashboard** — revenue analytics, sales graphs, orders, products, customers

### Authentication
- Email/password sign up and login (Supabase Auth)
- Password reset / forgot password flow
- Protected routes for cart, checkout, dashboard

### Design System
- **Colors**: Primary `#3B1F17`, Secondary `#E8D9C9`, Accent `#C89B6D`, Background `#F8F5F2`, Text `#1F1F1F`
- **Fonts**: Playfair Display (headings), Poppins (UI), Inter (body)
- **Typography**: Massive hero, clear hierarchy, 150% body / 120% heading line-height
- **Spacing**: 8px system
- **Shadows**: Luxury soft shadows with hover lift effects

### SEO & Performance
- Server-side rendering
- Optimized images (Next.js Image component)
- Meta tags, Open Graph, Twitter cards
- Schema markup (Brand JSON-LD)
- Sitemap.xml and robots.txt
- Code splitting and lazy loading

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 13 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| Animation | Framer Motion, GSAP |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| UI Components | shadcn/ui, Radix UI |
| Icons | Lucide React |
| Charts | Recharts |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

The following are pre-configured in the hosted environment. For local development, add them to `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=your_database_url
```

## Database Schema

The Supabase database includes:

- `categories` — product categories
- `products` — full catalog with variants, stock, images, pricing
- `reviews` — product reviews and ratings
- `wishlists` — per-user saved items
- `cart_items` — per-user shopping cart
- `addresses` — shipping/billing addresses
- `coupons` — discount codes with usage tracking
- `orders` — placed orders with tracking timeline
- `order_items` — line items within orders

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, collections, featured products, flash sale, testimonials |
| `/shop` | Product listing with filters and sorting |
| `/product/[slug]` | Product detail with gallery, variants, reviews |
| `/categories` | All categories grid |
| `/collections` | Signature collection showcases |
| `/cart` | Shopping cart with coupon system |
| `/checkout` | 3-step checkout flow |
| `/wishlist` | Saved items |
| `/track-order` | Order tracking with animated timeline |
| `/order/[orderNumber]` | Order confirmation page |
| `/login` | Sign in |
| `/register` | Create account |
| `/forgot-password` | Password reset |
| `/dashboard` | User dashboard |
| `/admin` | Admin panel with analytics |
| `/about` | Brand story |
| `/contact` | Contact form |
| `/support` | FAQs and policies |

## Social Media

- **Instagram**: [@aetherix.officiall](https://www.instagram.com/aetherix.officiall)
- **YouTube**: [@Aetherix-x6j](https://www.youtube.com/@Aetherix-x6j)
- **Facebook**: [Aetherix](https://www.facebook.com/share/1Byt11xLdQ/)
- **Email**: aetherixofficialsupport@gmail.com

## Deployment

This project is configured for deployment on Netlify. The `netlify.toml` file is included.

```bash
npm run build
```

The build output is optimized for production hosting.

## License

© AETHERIX. All rights reserved.
