import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { uploadToR2, isR2Configured } from '@/lib/r2';
import { optimizeImageBuffer } from '@/lib/image';

const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const useR2 = isR2Configured();

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    if (!useSupabase) {
      return NextResponse.json({ posts: [] });
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const posts = (data || []).map(row => ({
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

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return NextResponse.json({ message: 'Failed to load blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!useSupabase) {
      return NextResponse.json({ message: 'Blog not configured' }, { status: 400 });
    }

    const formData = await request.formData();

    const fields = {
      title: (formData.get('title') || '').toString(),
      excerpt: (formData.get('excerpt') || '').toString(),
      content: (formData.get('content') || '').toString(),
      tags: (formData.get('tags') || '').toString(),
      authorName: (formData.get('authorName') || '').toString(),
      published: formData.get('published') === 'true',
    };

    for (const [key, value] of Object.entries(fields)) {
      if (key !== 'published' && !value.toString().trim()) {
        return NextResponse.json({ message: `Field "${key}" is required.` }, { status: 400 });
      }
    }

    const fileEntry = formData.get('coverImage');
    if (!(fileEntry instanceof File) || fileEntry.size === 0) {
      return NextResponse.json({ message: 'Cover image is required.' }, { status: 400 });
    }

    const buffer = Buffer.from(await fileEntry.arrayBuffer());
    const { buffer: optimizedBuffer, filename } = await optimizeImageBuffer(
      buffer,
      fileEntry.name
    );

    let imagePath: string;

    if (useR2) {
      try {
        imagePath = await uploadToR2(optimizedBuffer, filename, fileEntry.type);
      } catch (r2Error) {
        console.error('R2 upload error:', r2Error);
        const base64 = optimizedBuffer.toString('base64');
        const mimeType = fileEntry.type || 'image/jpeg';
        imagePath = `data:${mimeType};base64,${base64}`;
      }
    } else {
      try {
        const { error: uploadError } = await supabase.storage
          .from('prompts')
          .upload(`blog/${filename}`, optimizedBuffer, {
            contentType: fileEntry.type,
            upsert: false,
          });

        if (uploadError) {
          const base64 = optimizedBuffer.toString('base64');
          const mimeType = fileEntry.type || 'image/jpeg';
          imagePath = `data:${mimeType};base64,${base64}`;
        } else {
          const { data: urlData } = supabase.storage
            .from('prompts')
            .getPublicUrl(`blog/${filename}`);
          imagePath = urlData.publicUrl;
        }
      } catch (storageError) {
        const base64 = optimizedBuffer.toString('base64');
        const mimeType = fileEntry.type || 'image/jpeg';
        imagePath = `data:${mimeType};base64,${base64}`;
      }
    }

    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const baseSlug = slugify(fields.title);
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (!existing) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const { data: newPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        slug,
        title: fields.title,
        excerpt: fields.excerpt,
        content: fields.content,
        tags: fields.tags.split(',').map((t) => t.trim().toLowerCase()),
        cover_image_url: imagePath,
        author_name: fields.authorName,
        published: fields.published,
        views: 0,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error(`Database insert failed: ${insertError.message}`);
    }

    const mappedPost = {
      id: newPost.id,
      slug: newPost.slug,
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      coverImageUrl: newPost.cover_image_url,
      authorName: newPost.author_name,
      authorAvatarUrl: newPost.author_avatar_url,
      tags: newPost.tags,
      published: newPost.published,
      views: newPost.views,
      createdAt: newPost.created_at,
      updatedAt: newPost.updated_at,
    };

    return NextResponse.json({ post: mappedPost }, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      message: 'Failed to create blog post',
      error: errorMessage,
    }, { status: 500 });
  }
}
