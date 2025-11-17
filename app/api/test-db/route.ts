import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check if Supabase is configured
    const isConfigured = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    if (!isConfigured) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase not configured',
        env: {
          url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        },
      });
    }

    // Try to fetch prompts
    const { data, error, count } = await supabase
      .from('prompts')
      .select('*', { count: 'exact' })
      .limit(5);

    if (error) {
      return NextResponse.json({
        status: 'error',
        message: 'Supabase query failed',
        error: error.message,
      });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Supabase is working',
      promptCount: count,
      samplePrompts: data?.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
      })),
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: 'Unexpected error',
      error: error instanceof Error ? error.message : 'Unknown',
    });
  }
}
