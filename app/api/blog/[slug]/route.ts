import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { BlogPost } from '@/lib/types';

const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    if (!useSupabase) {
      return NextResponse.json({ message: 'Blog not configured' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', params.slug)
      .eq('published', true)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    // Increment view count
    await supabase
      .from('blog_posts')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', data.id);

    const post: BlogPost = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImageUrl: data.cover_image_url,
      authorName: data.author_name,
      authorAvatarUrl: data.author_avatar_url,
      tags: Array.isArray(data.tags) ? data.tags : [],
      published: data.published,
      views: (data.views || 0) + 1,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return NextResponse.json({ message: 'Failed to fetch blog post' }, { status: 500 });
  }
}
