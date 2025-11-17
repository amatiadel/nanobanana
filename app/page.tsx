import { Metadata } from 'next';
import Hero from "@/components/home/Hero";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import { getPrompts as getPromptsFromJson } from "@/lib/data";
import { getPrompts as getPromptsFromSupabase } from "@/lib/db";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";

// Use Supabase if configured, otherwise fall back to JSON
const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const getPrompts = useSupabase ? getPromptsFromSupabase : getPromptsFromJson;

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Home - Discover AI Image Prompts',
  description: 'Browse the best AI image prompts shared by the community. Find inspiration for your next AI-generated artwork with our curated gallery.',
  openGraph: {
    title: 'Banana Prompts - Discover AI Image Prompts',
    description: 'Browse the best AI image prompts shared by the community',
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  // Fetch initial prompts sorted by likes directly from data layer
  const data = await getPrompts({ sort: 'likes', page: 1, pageSize: 24 });

  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <Hero />

        {/* Prompts Grid Section */}
        <section className="mb-16" aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="text-3xl font-bold text-slate-900 mb-8">
            See what the community is creating and loving right now.
          </h2>
          <PromptGrid 
            initialPrompts={data.items}
            initialPage={data.page}
            initialTotal={data.total}
            filters={{ sort: 'likes' }}
          />
        </section>
      </div>
    </main>
    </>
  );
}
