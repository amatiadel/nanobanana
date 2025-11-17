import { NextResponse } from 'next/server';
import { incrementPromptLikesBySlug } from '@/lib/data';

export const runtime = 'nodejs';

export async function POST(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const updated = incrementPromptLikesBySlug(params.slug);

    if (!updated) {
      return NextResponse.json({ message: 'Prompt not found' }, { status: 404 });
    }

    return NextResponse.json({ likes: updated.likes });
  } catch (error) {
    console.error('Failed to increment likes', error);
    return NextResponse.json(
      { message: 'Failed to increment likes' },
      { status: 500 }
    );
  }
}
