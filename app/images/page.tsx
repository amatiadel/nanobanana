import { Metadata } from 'next';
import { ImagesPageClient } from './ImagesPageClient';
import { getPrompts as getPromptsFromJson } from '@/lib/data';
import { getPrompts as getPromptsFromSupabase } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Use Supabase if configured, otherwise fall back to JSON
const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const getPrompts = useSupabase ? getPromptsFromSupabase : getPromptsFromJson;

export const metadata: Metadata = {
  title: 'Browse AI Image Prompts',
  description: 'Explore our collection of AI image prompts. Filter by tags and search to find the perfect prompt for your next creation.',
};

export default async function ImagesPage() {
  // Fetch initial prompts server-side
  const data = await getPrompts({ sort: 'likes', page: 1, pageSize: 24 });

  return <ImagesPageClient initialData={data} />;
}
