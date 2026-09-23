import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/dashboard', '/checkout', '/cart', '/wishlist'],
    },
    sitemap: 'https://aetherix.com/sitemap.xml',
  };
}
