import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db';
import { uploadToR2, isR2Configured } from '@/lib/r2';
import { optimizeImageBuffer } from '@/lib/image';

const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const useR2 = isR2Configured();

// API Key authentication
function validateApiKey(request: Request): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validApiKey = process.env.ADMIN_API_KEY;
  
  if (!validApiKey) {
    console.error('ADMIN_API_KEY not configured');
    return false;
  }
  
  return apiKey === validApiKey;
}

export async function POST(request: Request) {
  // Validate API key
  if (!validateApiKey(request)) {
    return NextResponse.json({ 
      success: false,
      message: 'Unauthorized - Invalid API key' 
    }, { status: 401 });
  }

  try {
    if (!useSupabase) {
      return NextResponse.json({ 
        success: false,
        message: 'Blog not configured' 
      }, { status: 400 });
    }

    const body = await request.json();
    
    const { title, excerpt, content, coverImageUrl, tags, authorName, published } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !coverImageUrl) {
      return NextResponse.json({ 
        success: false,
        message: 'Missing required fields: title, excerpt, content, coverImageUrl' 
      }, { status: 400 });
    }

    // Download cover image from URL
    console.log('Downloading cover image from:', coverImageUrl);
    const imageResponse = await fetch(coverImageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    
    // Optimize image
    const { buffer: optimizedBuffer, filename } = await optimizeImageBuffer(
      imageBuffer,
      `blog-${Date.now()}.jpg`
    );

    let imagePath: string;

    // Upload image (R2 > Supabase > base64)
    if (useR2) {
      try {
        imagePath = await uploadToR2(optimizedBuffer, filename, contentType);
        console.log('Cover image uploaded to R2:', imagePath);
      } catch (r2Error) {
        console.error('R2 upload error:', r2Error);
        const base64 = optimizedBuffer.toString('base64');
        imagePath = `data:${contentType};base64,${base64}`;
      }
    } else {
      try {
        const { error: uploadError } = await supabase.storage
          .from('prompts')
          .upload(`blog/${filename}`, optimizedBuffer, {
            contentType,
            upsert: false,
          });

        if (uploadError) {
          const base64 = optimizedBuffer.toString('base64');
          imagePath = `data:${contentType};base64,${base64}`;
        } else {
          const { data: urlData } = supabase.storage
            .from('prompts')
            .getPublicUrl(`blog/${filename}`);
          imagePath = urlData.publicUrl;
        }
      } catch (storageError) {
        const base64 = optimizedBuffer.toString('base64');
        imagePath = `data:${contentType};base64,${base64}`;
      }
    }

    // Create slug
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
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
        title,
        excerpt,
        content,
        tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim().toLowerCase()),
        cover_image_url: imagePath,
        author_name: authorName || 'Admin',
        published: published === true || published === 'true',
        views: 0,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error(`Database insert failed: ${insertError.message}`);
    }

    return NextResponse.json({ 
      success: true,
      message: 'Blog post imported successfully',
      post: {
        id: newPost.id,
        slug: newPost.slug,
        title: newPost.title,
        published: newPost.published,
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Import error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      success: false,
      message: 'Failed to import blog post',
      error: errorMessage 
    }, { status: 500 });
  }
}
