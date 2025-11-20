import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { uploadToR2 } from '@/lib/r2';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const tags = formData.get('tags') as string;
    const authorName = formData.get('authorName') as string;
    const published = formData.get('published') === 'true';
    const coverImage = formData.get('coverImage') as File | null;

    if (!title || !excerpt || !content || !tags || !authorName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload new cover image if provided
    let coverImageUrl: string | undefined;
    if (coverImage) {
      const buffer = Buffer.from(await coverImage.arrayBuffer());
      coverImageUrl = await uploadToR2(buffer, coverImage.name, 'blog-covers');
    }

    // Prepare update data
    const updateData: any = {
      title,
      excerpt,
      content,
      tags: tags.split(',').map((t) => t.trim()),
      author_name: authorName,
      published,
      updated_at: new Date().toISOString(),
    };

    // Only update cover image if a new one was uploaded
    if (coverImageUrl) {
      updateData.cover_image_url = coverImageUrl;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ post: data });
  } catch (error) {
    console.error('Update blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
