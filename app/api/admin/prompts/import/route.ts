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
    const body = await request.json();
    
    const { title, prompt, imageUrl, tags, creatorHandle } = body;

    // Validate required fields
    if (!title || !prompt || !imageUrl) {
      return NextResponse.json({ 
        success: false,
        message: 'Missing required fields: title, prompt, imageUrl' 
      }, { status: 400 });
    }

    // Download image from URL
    console.log('Downloading image from:', imageUrl);
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    
    // Optimize image
    const { buffer: optimizedBuffer, filename } = await optimizeImageBuffer(
      imageBuffer,
      `imported-${Date.now()}.jpg`
    );

    let imagePath: string;

    // Upload image (R2 > Supabase > base64)
    if (useR2) {
      try {
        imagePath = await uploadToR2(optimizedBuffer, filename, contentType);
        console.log('Image uploaded to R2:', imagePath);
      } catch (r2Error) {
        console.error('R2 upload error:', r2Error);
        const base64 = optimizedBuffer.toString('base64');
        imagePath = `data:${contentType};base64,${base64}`;
      }
    } else if (useSupabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from('prompts')
          .upload(`images/${filename}`, optimizedBuffer, {
            contentType,
            upsert: false,
          });

        if (uploadError) {
          const base64 = optimizedBuffer.toString('base64');
          imagePath = `data:${contentType};base64,${base64}`;
        } else {
          const { data: urlData } = supabase.storage
            .from('prompts')
            .getPublicUrl(`images/${filename}`);
          imagePath = urlData.publicUrl;
        }
      } catch (storageError) {
        const base64 = optimizedBuffer.toString('base64');
        imagePath = `data:${contentType};base64,${base64}`;
      }
    } else {
      const base64 = optimizedBuffer.toString('base64');
      imagePath = `data:${contentType};base64,${base64}`;
    }

    if (useSupabase) {
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
          .from('prompts')
          .select('slug')
          .eq('slug', slug)
          .single();

        if (!existing) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      const { data: newPrompt, error: insertError } = await supabase
        .from('prompts')
        .insert({
          slug,
          title,
          description: title,
          prompt,
          tags: Array.isArray(tags) ? tags : (tags || '').split(',').map((t: string) => t.trim().toLowerCase()),
          cover_url: imagePath,
          full_image_url: imagePath,
          creator_id: `creator-${creatorHandle || 'AdX'}`,
          creator_handle: creatorHandle || 'AdX',
          likes: 0,
          premium: false,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      return NextResponse.json({ 
        success: true,
        message: 'Prompt imported successfully',
        prompt: {
          id: newPrompt.id,
          slug: newPrompt.slug,
          title: newPrompt.title,
        }
      }, { status: 201 });
    } else {
      return NextResponse.json({ 
        success: false,
        message: 'Database not configured' 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Import error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      success: false,
      message: 'Failed to import prompt',
      error: errorMessage 
    }, { status: 500 });
  }
}
