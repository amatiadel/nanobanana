import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';

const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!useSupabase) {
      return NextResponse.json({ message: 'Blog not configured' }, { status: 400 });
    }

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Delete error:', error);
      throw error;
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json({ message: 'Failed to delete blog post' }, { status: 500 });
  }
}
