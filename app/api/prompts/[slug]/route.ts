import { NextRequest, NextResponse } from 'next/server';
import { getPromptBySlug as getPromptBySlugFromJson } from '@/lib/data';
import { getPromptBySlug as getPromptBySlugFromSupabase } from '@/lib/db';

// Use Supabase if configured, otherwise fall back to JSON
const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const getPromptBySlug = useSupabase ? getPromptBySlugFromSupabase : getPromptBySlugFromJson;

/**
 * GET /api/prompts/[slug]
 * Fetches a single prompt by its slug identifier
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Extract slug from URL parameters
    const { slug } = params;

    // Validate slug parameter
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid slug parameter.' },
        { status: 400 }
      );
    }

    // Fetch prompt by slug
    const prompt = await getPromptBySlug(slug.trim());

    // Return 404 if prompt not found
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found.' },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(prompt, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching prompt by slug:', error);

    // Return error response
    return NextResponse.json(
      {
        error: 'Failed to fetch prompt. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
