import { NextResponse } from 'next/server';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { join } from 'path';
import {
  deletePrompt,
  getPromptById,
  updatePrompt,
} from '@/lib/data';
import { optimizeImageBuffer } from '@/lib/image';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

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
  } catch (error) {
    console.error('Failed to update prompt', error);
    return NextResponse.json({ message: 'Failed to update prompt.' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
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
  } catch (error) {
    console.error('Failed to delete prompt', error);
    return NextResponse.json({ message: 'Failed to delete prompt.' }, { status: 500 });
  }
}
