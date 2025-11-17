"use client";

import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/prompts/CopyButton';
import { getTagLabel } from '@/lib/tags';
import { PromptItem } from '@/lib/types';

interface PromptInfoCardProps {
  prompt: PromptItem;
}

export function PromptInfoCard({ prompt }: PromptInfoCardProps) {
  const creatorName = prompt.creator.handle.replace(/^@/, '');

  return (
    <div className="h-fit rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {prompt.title}
            </h1>
            {prompt.premium && (
              <Badge
                className="bg-yellow-400 text-yellow-900 border-0 font-semibold shrink-0"
                aria-label="Premium prompt"
              >
                PREMIUM
              </Badge>
            )}
          </div>

          <div className="text-sm text-slate-600">
            by <span className="font-medium text-slate-900">{creatorName}</span>
          </div>
        </div>

        <section className="space-y-3" aria-labelledby="prompt-heading">
          <h2 id="prompt-heading" className="text-lg font-semibold text-slate-900">
            Prompt
          </h2>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 max-h-[25rem] overflow-y-auto pr-2">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {prompt.prompt}
            </p>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <CopyButton
            text={prompt.prompt}
            label="Copy Prompt"
            className="bg-slate-900 hover:bg-slate-800 text-white"
          />
        </div>

        {prompt.tags.length > 0 && (
          <section className="space-y-3" aria-labelledby="tags-heading">
            <h2 id="tags-heading" className="text-lg font-semibold text-slate-900">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2" role="list">
              {prompt.tags.map((tagSlug) => (
                <Badge
                  key={tagSlug}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 border-0"
                  role="listitem"
                >
                  {getTagLabel(tagSlug)}
                </Badge>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
