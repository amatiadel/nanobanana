import { NextRequest, NextResponse } from 'next/server';
import { getPrompts as getPromptsFromJson } from '@/lib/data';
import { getPrompts as getPromptsFromSupabase } from '@/lib/db';
import { PromptsQueryParams } from '@/lib/types';

// Use Supabase if configured, otherwise fall back to JSON
const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const getPrompts = useSupabase ? getPromptsFromSupabase : getPromptsFromJson;

export const dynamic = 'force-dynamic';

/**
 * GET /api/prompts
 * Fetches prompts with optional filtering, sorting, and pagination
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters from URL
    const searchParams = request.nextUrl.searchParams;

    // Build query parameters object
    const params: PromptsQueryParams = {};

    // Extract and validate search parameter
    const search = searchParams.get('search');
    if (search) {
      params.search = search.trim();
    }

    // Extract and validate tags parameter (comma-separated)
    const tags = searchParams.get('tags');
    if (tags) {
      params.tags = tags.trim();
    }

    // Extract and validate sort parameter
    const sort = searchParams.get('sort');
    if (sort === 'likes' || sort === 'new') {
      params.sort = sort;
    }

    // Extract and validate page parameter
    const page = searchParams.get('page');
    if (page) {
      const pageNum = parseInt(page, 10);
      if (!isNaN(pageNum) && pageNum > 0) {
        params.page = pageNum;
      } else {
        return NextResponse.json(
          { error: 'Invalid page parameter. Must be a positive integer.' },
          { status: 400 }
        );
      }
    }

    // Extract and validate pageSize parameter
    const pageSize = searchParams.get('pageSize');
    if (pageSize) {
      const pageSizeNum = parseInt(pageSize, 10);
      if (!isNaN(pageSizeNum) && pageSizeNum > 0 && pageSizeNum <= 100) {
        params.pageSize = pageSizeNum;
      } else {
        return NextResponse.json(
          {
            error:
              'Invalid pageSize parameter. Must be a positive integer between 1 and 100.',
          },
          { status: 400 }
        );
      }
    }

    // Fetch prompts with parsed parameters
    const response = await getPrompts(params);

    // Debug logging
    console.log('[API /prompts] Returning', response.items.length, 'prompts, total:', response.total);
    console.log('[API /prompts] First prompt:', response.items[0]?.title);

    // Return successful response
    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'X-Timestamp': Date.now().toString(),
      },
    });
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching prompts:', error);

    // Return error response
    return NextResponse.json(
      {
        error: 'Failed to fetch prompts. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
