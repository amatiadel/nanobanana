'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface LikeCardProps {
  promptSlug: string;
  initialLikes: number;
}

export function LikeCard({ promptSlug, initialLikes }: LikeCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setError(null);

    try {
      const response = await fetch(`/api/prompts/${encodeURIComponent(promptSlug)}/like`, {
        method: 'POST',
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Unable to like prompt');
      }

      const data = await response.json();
      setLikes(data.likes);
    } catch (err: any) {
      console.error('Like failed', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-slate-700">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Give this prompt a like"
        >
          <Heart className="h-4 w-4" />
          {isLiking ? 'Liking...' : `${formatNumber(likes)} likes`}
        </button>
        <p className="text-sm font-semibold text-slate-900">
          Total Likes: <span className="text-base">{formatNumber(likes)}</span>
        </p>
      </div>
      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
