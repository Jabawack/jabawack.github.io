import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/v2017/'],
    },
    sitemap: 'https://jabawack.github.io/sitemap.xml',
  };
}
