import type { MetadataRoute } from 'next';

const baseUrl = 'https://c77799.com.cn';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/en`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/zh`, changeFrequency: 'weekly', priority: 1.0 },
  ];
}
