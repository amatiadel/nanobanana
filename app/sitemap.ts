import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.promptlibrary.space';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/images`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // Fetch dynamic prompt pages
  let promptPages: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${baseUrl}/api/prompts?pageSize=1000`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (response.ok) {
      const data = await response.json();
      promptPages = data.items.map((prompt: any) => ({
        url: `${baseUrl}/images/${prompt.slug}`,
        lastModified: new Date(prompt.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Error fetching prompts for sitemap:', error);
  }

  // Fetch dynamic blog pages
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${baseUrl}/api/blog?pageSize=1000`, {
      next: { revalidate: 3600 },
    });
    if (response.ok) {
      const data = await response.json();
      blogPages = data.items.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  return [...staticPages, ...promptPages, ...blogPages];
}
