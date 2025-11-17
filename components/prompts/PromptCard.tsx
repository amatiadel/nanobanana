'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { PromptItem } from '@/lib/types';
import { generateBlurDataURL, formatNumber, getImageUrl } from '@/lib/utils';
import { CopyButton } from './CopyButton';

interface PromptCardProps {
  prompt: PromptItem;
  index?: number;
}

export function PromptCard({ prompt, index = 0 }: PromptCardProps) {
  const imageUrl = getImageUrl(prompt.coverUrl);
  const creatorName = prompt.creator.handle.replace(/^@/, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative"
    >
      <Link
        href={`/images/${prompt.slug}`}
        className="block relative rounded-[25px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        aria-label={`View details for ${prompt.title} by ${prompt.creator.handle}`}
      >
        {/* Image */}
        <div className="relative aspect-[10/11] w-full">
          <img
            src={imageUrl}
            alt={prompt.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Title Capsule - Top Left */}
          <div className="absolute top-3 left-3 z-10 max-w-[65%]">
            <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-2xl uppercase tracking-wide shadow-lg scale-90 origin-top-left truncate">
              {prompt.title}
            </div>
          </div>

          {/* Like Count - Top Right */}
          <div className="absolute top-3 right-3 z-10">
            <div className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center gap-1" aria-label={`${formatNumber(prompt.likes)} likes`}>
              <Heart className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              <span>{formatNumber(prompt.likes)}</span>
            </div>
          </div>

          {/* Gradient Overlay at Bottom */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-4 px-4">
            {/* Bottom Row: Copy Button and Creator */}
            <div className="flex items-center gap-2 mt-2">
              <CopyButton
                text={prompt.prompt}
                className="bg-transparent hover:bg-white/10 text-white border border-white/30"
              />
              <span className="text-white/80 text-xs text-right ml-auto">
                by {creatorName}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

