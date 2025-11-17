import { Metadata } from 'next';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { PromptGrid } from '@/components/prompts/PromptGrid';
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

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
          Keep exploring the prompts your peers are sharing
        </h1>

        {/* Show prompt count */}
        <p className="text-sm text-slate-600 mb-4">
          Showing {data.items.length} of {data.total} prompts
        </p>

        {/* Prompts Grid */}
        <PromptGrid
          initialPrompts={data.items}
          initialPage={data.page}
          initialTotal={data.total}
          filters={{ sort: 'likes' }}
        />
      </div>
    </main>
  );
}
