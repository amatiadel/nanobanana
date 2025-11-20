import { NextRequest, NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/r2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await image.arrayBuffer());
    
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `blog-content-${timestamp}-${image.name}`;

    // Upload to R2
    const imageUrl = await uploadToR2(buffer, filename, image.type);

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
