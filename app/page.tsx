import { Metadata } from 'next';
import Hero from "@/components/home/Hero";
import StatCard from "@/components/home/StatCard";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import { getPrompts } from "@/lib/data";

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
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" aria-label="Community statistics">
          <StatCard value="220+" label="Prompts shared this week" />
          <StatCard value="672+" label="Creators contributing" />
          <StatCard value="28.2K+" label="Total likes given" />
        </section>

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
  );
}
