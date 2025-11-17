import { NextResponse } from 'next/server';
import { getPrompts as getPromptsFromJson } from '@/lib/data';
import { getPrompts as getPromptsFromSupabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check environment
    const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasSupabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const useSupabase = hasSupabaseUrl && hasSupabaseKey;

    // Get data from both sources
    const jsonData = await getPromptsFromJson({ page: 1, pageSize: 100 });
    
    let supabaseData = null;
    let supabaseError = null;
    
    if (useSupabase) {
      try {
        supabaseData = await getPromptsFromSupabase({ page: 1, pageSize: 100 });
      } catch (error) {
        supabaseError = error instanceof Error ? error.message : 'Unknown error';
      }
    }

    return NextResponse.json({
      environment: {
        hasSupabaseUrl,
        hasSupabaseKey,
        useSupabase,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
      },
      jsonData: {
        count: jsonData.items.length,
        total: jsonData.total,
        prompts: jsonData.items.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
        })),
      },
      supabaseData: supabaseData ? {
        count: supabaseData.items.length,
        total: supabaseData.total,
        prompts: supabaseData.items.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
        })),
      } : null,
      supabaseError,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
