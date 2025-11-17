import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { BlogPost, BlogPostsQueryParams } from '@/lib/types';

const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const tags = searchParams.get('tags') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');

    if (!useSupabase) {
      return NextResponse.json({ 
        items: [], 
        page, 
        pageSize, 
        total: 0 
      });
    }

    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('published', true);

    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
    }

    if (tags) {
      const tagArray = tags.split(',').map(t => t.trim());
      if (tagArray.length > 0) {
        query = query.overlaps('tags', tagArray);
      }
    }

    query = query.order('created_at', { ascending: false });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Blog query error:', error);
      throw new Error('Failed to fetch blog posts');
    }

    const items: BlogPost[] = (data || []).map(row => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      coverImageUrl: row.cover_image_url,
      authorName: row.author_name,
      authorAvatarUrl: row.author_avatar_url,
      tags: Array.isArray(row.tags) ? row.tags : [],
      published: row.published,
      views: row.views || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return NextResponse.json({
      items,
      page,
      pageSize,
      total: count || 0,
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return NextResponse.json({ message: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
