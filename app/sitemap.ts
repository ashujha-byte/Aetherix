import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', '/shop', '/categories', '/collections', '/about',
    '/contact', '/support', '/track-order', '/login', '/register',
  ];
  return routes.map((route) => ({
    url: `https://aetherix.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
