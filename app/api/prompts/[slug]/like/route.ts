import { NextResponse } from 'next/server';
import { incrementPromptLikesBySlug } from '@/lib/data';
import { supabase } from '@/lib/db';

export const runtime = 'nodejs';

// Use Supabase if configured
const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (useSupabase) {
      // Increment likes in Supabase
      const { data: prompt, error: fetchError } = await supabase
        .from('prompts')
        .select('likes')
        .eq('slug', params.slug)
        .single();

      if (fetchError || !prompt) {
        return NextResponse.json({ message: 'Prompt not found' }, { status: 404 });
      }

      const { data: updated, error: updateError } = await supabase
        .from('prompts')
        .update({ likes: (prompt.likes || 0) + 1 })
        .eq('slug', params.slug)
        .select('likes')
        .single();

      if (updateError || !updated) {
        throw new Error('Failed to update likes');
      }

      return NextResponse.json({ likes: updated.likes });
    } else {
      // Fall back to JSON file system
      const updated = incrementPromptLikesBySlug(params.slug);

      if (!updated) {
        return NextResponse.json({ message: 'Prompt not found' }, { status: 404 });
      }

      return NextResponse.json({ likes: updated.likes });
    }
  } catch (error) {
    console.error('Failed to increment likes', error);
    return NextResponse.json(
      { message: 'Failed to increment likes' },
      { status: 500 }
    );
  }
}
