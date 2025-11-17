import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPromptBySlug, getRelatedPrompts } from '@/lib/data';
import { getImageUrl } from '@/lib/utils';
import { PromptDetail } from '@/components/prompts/PromptDetail';

export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const prompt = await getPromptBySlug(params.slug);

  if (!prompt) {
    return {
      title: 'Prompt Not Found',
    };
  }

  const imageUrl = getImageUrl(prompt.fullImageUrl || prompt.coverUrl);
  const creatorName = prompt.creator.handle.replace(/^@/, '');

  return {
    title: `${prompt.title} by ${creatorName} | Banana Prompts`,
    description: prompt.description,
    openGraph: {
      title: prompt.title,
      description: prompt.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: prompt.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: prompt.title,
      description: prompt.description,
      images: [imageUrl],
    },
  };
}

export default async function PromptDetailPage({ params }: PageProps) {
  // Fetch the prompt by slug
  const prompt = await getPromptBySlug(params.slug);

  // Handle 404 if prompt not found
  if (!prompt) {
    notFound();
  }

  // Fetch related prompts (3-6 items with overlapping tags)
  const relatedPrompts = await getRelatedPrompts(prompt, 6);

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <PromptDetail prompt={prompt} relatedPrompts={relatedPrompts} />
      </div>
    </div>
  );
}
