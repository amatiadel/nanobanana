import { NextResponse } from 'next/server';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import {
  deletePrompt,
  getPromptById,
  updatePrompt,
} from '@/lib/data';
import { optimizeImageBuffer } from '@/lib/image';
import { supabase } from '@/lib/db';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const useSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function normalizeUploadPath(pathname: string) {
  if (!pathname.startsWith('/uploads/')) {
    return null;
  }
  return join(process.cwd(), 'public', pathname);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (useSupabase) {
      // Fetch existing prompt from Supabase
      const { data: existing, error: fetchError } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (fetchError || !existing) {
        return NextResponse.json({ message: 'Prompt not found.' }, { status: 404 });
      }

      const formData = await request.formData();

      const updates: Record<string, any> = {};
      
      const title = formData.get('title');
      if (title && typeof title === 'string' && title.trim()) {
        updates.title = title.trim();
      }

      const projectTitle = formData.get('projectTitle');
      if (projectTitle && typeof projectTitle === 'string' && projectTitle.trim()) {
        updates.description = projectTitle.trim();
      }

      const prompt = formData.get('prompt');
      if (prompt && typeof prompt === 'string' && prompt.trim()) {
        updates.prompt = prompt.trim();
      }

      const tags = formData.get('tags');
      if (tags && typeof tags === 'string' && tags.trim()) {
        updates.tags = tags.split(',').map(t => t.trim().toLowerCase());
      }

      const creatorHandle = formData.get('creatorHandle');
      if (creatorHandle && typeof creatorHandle === 'string' && creatorHandle.trim()) {
        updates.creator_handle = creatorHandle.trim();
      }

      // Handle image upload if provided
      const fileEntry = formData.get('image');
      if (fileEntry instanceof File && fileEntry.size > 0) {
        const buffer = Buffer.from(await fileEntry.arrayBuffer());
        const { buffer: optimizedBuffer, filename } = await optimizeImageBuffer(
          buffer,
          fileEntry.name
        );

        // Upload to R2 or Supabase Storage
        const { uploadToR2, isR2Configured } = await import('@/lib/r2');
        const useR2 = isR2Configured();

        if (useR2) {
          try {
            const imageUrl = await uploadToR2(optimizedBuffer, filename, fileEntry.type);
            updates.cover_url = imageUrl;
            updates.full_image_url = imageUrl;
          } catch (error) {
            console.error('R2 upload failed:', error);
          }
        } else {
          // Try Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('prompts')
            .upload(`images/${filename}`, optimizedBuffer, {
              contentType: fileEntry.type,
              upsert: true,
            });

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from('prompts')
              .getPublicUrl(`images/${filename}`);
            updates.cover_url = urlData.publicUrl;
            updates.full_image_url = urlData.publicUrl;
          }
        }
      }

      // Update in Supabase
      const { data: updated, error: updateError } = await supabase
        .from('prompts')
        .update(updates)
        .eq('id', params.id)
        .select()
        .single();

      if (updateError) {
        console.error('Supabase update error:', updateError);
        throw new Error(`Failed to update prompt: ${updateError.message}`);
      }

      // Map response to PromptItem format
      const mappedPrompt = {
        id: updated.id,
        slug: updated.slug,
        title: updated.title,
        creator: {
          id: updated.creator_id,
          handle: updated.creator_handle,
        },
        coverUrl: updated.cover_url,
        fullImageUrl: updated.full_image_url,
        description: updated.description,
        prompt: updated.prompt,
        tags: updated.tags,
        likes: updated.likes,
        premium: updated.premium,
        createdAt: updated.created_at,
      };

      return NextResponse.json({ prompt: mappedPrompt });
    } else {
      // JSON file fallback
      const existing = getPromptById(params.id);
      if (!existing) {
        return NextResponse.json({ message: 'Prompt not found.' }, { status: 404 });
      }

      const formData = await request.formData();

      const updates: Record<string, string> = {};
      ['title', 'projectTitle', 'prompt', 'tags', 'creatorHandle'].forEach((key) => {
        const value = formData.get(key);
        if (typeof value === 'string' && value.trim().length > 0) {
          updates[key] = value;
        }
      });

      const fileEntry = formData.get('image');
      let imagePath: string | undefined;

      if (fileEntry instanceof File && fileEntry.size > 0) {
        const buffer = Buffer.from(await fileEntry.arrayBuffer());
        const { buffer: optimizedBuffer, filename } = await optimizeImageBuffer(
          buffer,
          fileEntry.name
        );

        await mkdir(UPLOAD_DIR, { recursive: true });
        const filePath = join(UPLOAD_DIR, filename);
        await writeFile(filePath, optimizedBuffer);
        imagePath = `/uploads/${filename}`;

        const existingPath = normalizeUploadPath(existing.coverUrl);
        if (existingPath) {
          try {
            await unlink(existingPath);
          } catch {
            // Ignore delete errors
          }
        }
      }

      const tags = updates.tags ? updates.tags.split(',') : undefined;

      const updated = updatePrompt(params.id, {
        title: updates.title,
        projectTitle: updates.projectTitle,
        prompt: updates.prompt,
        creatorHandle: updates.creatorHandle,
        tags,
        imagePath,
      });

      if (!updated) {
        return NextResponse.json({ message: 'Failed to update prompt.' }, { status: 500 });
      }

      return NextResponse.json({ prompt: updated });
    }
  } catch (error) {
    console.error('Failed to update prompt', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      message: 'Failed to update prompt.',
      error: errorMessage 
    }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (useSupabase) {
      // Delete from Supabase
      const { data: existing, error: fetchError } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', params.id)
        .single();

      if (fetchError || !existing) {
        return NextResponse.json({ message: 'Prompt not found.' }, { status: 404 });
      }

      const { error: deleteError } = await supabase
        .from('prompts')
        .delete()
        .eq('id', params.id);

      if (deleteError) {
        throw deleteError;
      }

      // Optionally delete from Supabase Storage if using it
      if (existing.cover_url && existing.cover_url.includes('supabase')) {
        const filename = existing.cover_url.split('/').pop();
        if (filename) {
          await supabase.storage
            .from('prompts')
            .remove([`images/${filename}`]);
        }
      }

      return NextResponse.json({ success: true });
    } else {
      const existing = getPromptById(params.id);
      if (!existing) {
        return NextResponse.json({ message: 'Prompt not found.' }, { status: 404 });
      }

      const deleted = deletePrompt(params.id);
      if (!deleted) {
        return NextResponse.json({ message: 'Failed to delete prompt.' }, { status: 500 });
      }

      const existingPath = normalizeUploadPath(existing.coverUrl);
      if (existingPath) {
        try {
          await unlink(existingPath);
        } catch {
          // Ignore delete errors
        }
      }

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Failed to delete prompt', error);
    return NextResponse.json({ message: 'Failed to delete prompt.' }, { status: 500 });
  }
}
