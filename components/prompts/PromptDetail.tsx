'use client';

import Image from 'next/image';
import { PromptItem } from '@/lib/types';
import { generateBlurDataURL, getImageUrl } from '@/lib/utils';
import { PromptGrid } from '@/components/prompts/PromptGrid';
import { PromptInfoCard } from './PromptInfoCard';
import { LikeCard } from './LikeCard';

interface PromptDetailProps {
  prompt: PromptItem;
  relatedPrompts: PromptItem[];
}

export function PromptDetail({ prompt, relatedPrompts }: PromptDetailProps) {
  const mainImagePath = prompt.fullImageUrl || prompt.coverUrl;
  const imageUrl = getImageUrl(mainImagePath);

  return (
    <div className="space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,55%)_minmax(0,45%)]">
        <div className="relative flex justify-center lg:items-start items-center">
          <div className="relative w-full max-w-full overflow-hidden rounded-3xl">
            <div className="relative w-full pb-[133.33%]">
              <Image
                src={imageUrl}
                alt={prompt.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL={generateBlurDataURL(mainImagePath)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <PromptInfoCard prompt={prompt} />
          <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            <LikeCard promptSlug={prompt.slug} initialLikes={prompt.likes} />
          </div>
        </div>
      </div>

      {relatedPrompts.length > 0 && (
        <section className="space-y-6" aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
          >
            More like this
          </h2>
          <PromptGrid initialPrompts={relatedPrompts} />
        </section>
      )}
    </div>
  );
}
