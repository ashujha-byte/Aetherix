import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Hero } from '@/components/sections/hero';
import { Features } from '@/components/sections/features';
import { CategoryGrid } from '@/components/sections/category-grid';
import { FeaturedCollection } from '@/components/sections/featured-collection';
import { FlashSale } from '@/components/sections/flash-sale';
import { NewArrivals } from '@/components/sections/new-arrivals';
import { Collections } from '@/components/sections/collections';
import { TrendingProducts } from '@/components/sections/trending-products';
import { BestSellers } from '@/components/sections/best-sellers';
import { About } from '@/components/sections/about';
import { Testimonials } from '@/components/sections/testimonials';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CategoryGrid />
        <FeaturedCollection />
        <FlashSale />
        <NewArrivals />
        <Collections />
        <TrendingProducts />
        <BestSellers />
        <About />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
