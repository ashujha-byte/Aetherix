import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Poppins } from 'next/font/google';
import { Providers } from '@/components/providers';
import { CustomCursor } from '@/components/custom-cursor';
import { LoadingScreen } from '@/components/loading-screen';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://aetherix.com'),
  title: {
    default: 'AETHERIX — Fashion You Choose',
    template: '%s | AETHERIX',
  },
  description:
    'AETHERIX — Luxury fashion for the modern individual. Discover premium menswear, womenswear, and limited edition collections. Fashion You Choose.',
  keywords: [
    'AETHERIX', 'luxury fashion', 'premium clothing', 'menswear', 'womenswear',
    'streetwear', 'designer fashion', 'limited edition', 'fashion brand',
  ],
  authors: [{ name: 'AETHERIX' }],
  creator: 'AETHERIX',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aetherix.com',
    siteName: 'AETHERIX',
    title: 'AETHERIX — Fashion You Choose',
    description: 'Luxury fashion for the modern individual. Discover premium collections crafted with intention.',
    images: [
      {
        url: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg',
        width: 1200,
        height: 630,
        alt: 'AETHERIX Luxury Fashion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AETHERIX — Fashion You Choose',
    description: 'Luxury fashion for the modern individual. Discover premium collections crafted with intention.',
    images: ['https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aetherix.com',
  },
};

export const viewport = {
  themeColor: '#3B1F17',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Brand',
  name: 'AETHERIX',
  slogan: 'Fashion You Choose',
  description: 'Luxury fashion for the modern individual.',
  email: 'aetherixofficialsupport@gmail.com',
  sameAs: [
    'https://www.instagram.com/aetherix.officiall',
    'https://www.youtube.com/@Aetherix-x6j',
    'https://www.facebook.com/share/1Byt11xLdQ/',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}>
      <body className="font-inter antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <LoadingScreen />
          <CustomCursor />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
