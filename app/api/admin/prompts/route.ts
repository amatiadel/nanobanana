import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { addPrompt, listPrompts } from '@/lib/data';
import { optimizeImageBuffer } from '@/lib/image';
import { supabase } from '@/lib/db';
import { uploadToR2, isR2Configured } from '@/lib/r2';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const useR2 = isR2Configured();

export async function GET() {
  try {
    if (useSupabase) {
      const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Map Supabase data to PromptItem format
      const prompts = (data || []).map(row => ({
        id: row.id || '',
        slug: row.slug || '',
        title: row.title || 'Untitled',
        creator: {
          id: row.creator_id || 'unknown',
          handle: row.creator_handle || 'anonymous',
        },
        coverUrl: row.cover_url || '/images/placeholder.svg',
        fullImageUrl: row.full_image_url || row.cover_url || '/images/placeholder.svg',
        description: row.description || '',
        prompt: row.prompt || '',
        tags: Array.isArray(row.tags) ? row.tags : [],
        likes: row.likes || 0,
        premium: row.premium || false,
        createdAt: row.created_at || new Date().toISOString(),
      }));
      
      return NextResponse.json({ prompts });
    } else {
      const prompts = listPrompts();
      return NextResponse.json({ prompts });
    }
  } catch (error) {
    console.error('Failed to load prompts', error);
    return NextResponse.json({ message: 'Failed to load prompts.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fields = {
      title: (formData.get('title') || '').toString(),
      projectTitle: (formData.get('projectTitle') || '').toString(),
      prompt: (formData.get('prompt') || '').toString(),
      tags: (formData.get('tags') || '').toString(),
      creatorHandle: (formData.get('creatorHandle') || '').toString(),
    };

    for (const [key, value] of Object.entries(fields)) {
      if (!value.trim()) {
        return NextResponse.json({ message: `Field "${key}" is required.` }, { status: 400 });
      }
    }

    const fileEntry = formData.get('image');
    if (!(fileEntry instanceof File) || fileEntry.size === 0) {
      return NextResponse.json({ message: 'Image upload is required.' }, { status: 400 });
    }

    const buffer = Buffer.from(await fileEntry.arrayBuffer());
    const { buffer: optimizedBuffer, filename } = await optimizeImageBuffer(
      buffer,
      fileEntry.name
    );

    let imagePath: string;

    // Priority: R2 > Supabase Storage > Base64 > Local filesystem
    if (useR2) {
      try {
        // Upload to Cloudflare R2
        imagePath = await uploadToR2(optimizedBuffer, filename, fileEntry.type);
        console.log('Image uploaded to R2:', imagePath);
      } catch (r2Error) {
        console.error('R2 upload error:', r2Error);
        // Fallback to base64
        const base64 = optimizedBuffer.toString('base64');
        const mimeType = fileEntry.type || 'image/jpeg';
        imagePath = `data:${mimeType};base64,${base64}`;
        console.log('Using base64 fallback after R2 error');
      }
    } else if (useSupabase) {
      try {
        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('prompts')
          .upload(`images/${filename}`, optimizedBuffer, {
            contentType: fileEntry.type,
            upsert: false,
          });

        if (uploadError) {
          console.error('Supabase upload error:', uploadError);
          // If storage fails, convert to base64 data URL as fallback
          const base64 = optimizedBuffer.toString('base64');
          const mimeType = fileEntry.type || 'image/jpeg';
          imagePath = `data:${mimeType};base64,${base64}`;
          console.log('Using base64 fallback for image storage');
        } else {
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('prompts')
            .getPublicUrl(`images/${filename}`);

          imagePath = urlData.publicUrl;
        }
      } catch (storageError) {
        console.error('Storage error, using base64 fallback:', storageError);
        // Fallback to base64 if storage completely fails
        const base64 = optimizedBuffer.toString('base64');
        const mimeType = fileEntry.type || 'image/jpeg';
        imagePath = `data:${mimeType};base64,${base64}`;
      }
    } else {
      // Fall back to local filesystem (development only)
      await mkdir(UPLOAD_DIR, { recursive: true });
      const filePath = join(UPLOAD_DIR, filename);
      await writeFile(filePath, optimizedBuffer);
      imagePath = `/uploads/${filename}`;
    }

    if (useSupabase) {
      // Create slug
      const slugify = (str: string) =>
        str
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

      const baseSlug = slugify(fields.title || fields.projectTitle);
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
          title: fields.title || fields.projectTitle,
          description: fields.projectTitle || fields.title,
          prompt: fields.prompt,
          tags: fields.tags.split(',').map((t) => t.trim()),
          cover_url: imagePath,
          full_image_url: imagePath,
          creator_id: `creator-${fields.creatorHandle}`,
          creator_handle: fields.creatorHandle,
          likes: 0,
          premium: false,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        throw new Error(`Database insert failed: ${insertError.message}`);
      }
      
      // Map the response to PromptItem format
      const mappedPrompt = {
        id: newPrompt.id,
        slug: newPrompt.slug,
        title: newPrompt.title,
        creator: {
          id: newPrompt.creator_id,
          handle: newPrompt.creator_handle,
        },
        coverUrl: newPrompt.cover_url,
        fullImageUrl: newPrompt.full_image_url,
        description: newPrompt.description,
        prompt: newPrompt.prompt,
        tags: newPrompt.tags,
        likes: newPrompt.likes,
        premium: newPrompt.premium,
        createdAt: newPrompt.created_at,
      };
      
      return NextResponse.json({ prompt: mappedPrompt }, { status: 201 });
    } else {
      const newPrompt = addPrompt({
        title: fields.title,
        projectTitle: fields.projectTitle,
        prompt: fields.prompt,
        tags: fields.tags.split(','),
        imagePath,
        creatorHandle: fields.creatorHandle,
      });

      return NextResponse.json({ prompt: newPrompt }, { status: 201 });
    }
  } catch (error) {
    console.error('Failed to add prompt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      message: 'Failed to add prompt.',
      error: errorMessage,
      details: error 
    }, { status: 500 });
  }
}
