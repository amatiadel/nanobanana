import { NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { addPrompt, listPrompts } from '@/lib/data';
import { optimizeImageBuffer } from '@/lib/image';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function GET() {
  try {
    const prompts = listPrompts();
    return NextResponse.json({ prompts });
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

    await mkdir(UPLOAD_DIR, { recursive: true });
    const filePath = join(UPLOAD_DIR, filename);
    await writeFile(filePath, optimizedBuffer);

    const newPrompt = addPrompt({
      title: fields.title,
      projectTitle: fields.projectTitle,
      prompt: fields.prompt,
      tags: fields.tags.split(','),
      imagePath: `/uploads/${filename}`,
      creatorHandle: fields.creatorHandle,
    });

    return NextResponse.json({ prompt: newPrompt }, { status: 201 });
  } catch (error) {
    console.error('Failed to add prompt', error);
    return NextResponse.json({ message: 'Failed to add prompt.' }, { status: 500 });
  }
}
