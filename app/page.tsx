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
  // Fetch only 12 prompts (3 rows x 4 columns) for home page
  const data = await getPrompts({ sort: 'likes', page: 1, pageSize: 12 });

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
            showLoadMore={false}
          />
          
          {/* Explore Button */}
          <div className="flex justify-center mt-12">
            <a
              href="/images"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-lg hover:bg-slate-50 transition-colors font-medium shadow-sm border border-slate-200"
            >
              Explore trending prompts
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
