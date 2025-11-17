import { MetadataRoute } from 'next';
import { getAllPrompts } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Get all prompts for dynamic routes
  const prompts = await getAllPrompts();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/images`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic prompt detail pages
  const promptRoutes: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: `${baseUrl}/images/${prompt.slug}`,
    lastModified: new Date(prompt.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...promptRoutes];
}
