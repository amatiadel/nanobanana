'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PromptItem, PromptsQueryParams } from '@/lib/types';
import { PromptCard } from './PromptCard';
import { GridSkeleton } from '@/components/ui/Skeletons';

interface PromptGridProps {
  initialPrompts: PromptItem[];
  initialPage?: number;
  initialTotal?: number;
  filters?: PromptsQueryParams;
}

export function PromptGrid({ 
  initialPrompts, 
  initialPage = 1,
  initialTotal = 0,
  filters = {}
}: PromptGridProps) {
  const [prompts, setPrompts] = useState<PromptItem[]>(initialPrompts);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Reset prompts when filters change
  useEffect(() => {
    setPrompts(initialPrompts);
    setPage(initialPage);
    setHasMore(initialPrompts.length < initialTotal);
  }, [initialPrompts, initialPage, initialTotal]);

  // Fetch more prompts
  const fetchMorePrompts = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(page + 1));
      params.set('pageSize', '24');
      
      if (filters.search) params.set('search', filters.search);
      if (filters.tags) params.set('tags', filters.tags);
      if (filters.sort) params.set('sort', filters.sort);

      const response = await fetch(`/api/prompts?${params}`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setPrompts(prev => [...prev, ...data.items]);
        setPage(prev => prev + 1);
        setHasMore(prompts.length + data.items.length < data.total);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more prompts:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, filters, prompts.length]);

  // Set up Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trigger when scrolled to 70% from bottom
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchMorePrompts();
        }
      },
      {
        rootMargin: '0px 0px 300px 0px', // Trigger 300px before reaching the element
        threshold: 0.1,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchMorePrompts, hasMore, isLoading]);

  return (
    <div className="space-y-8">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6" role="list" aria-label="Prompt gallery">
        {prompts.map((prompt, index) => (
          <div key={prompt.id} role="listitem">
            <PromptCard prompt={prompt} index={index} />
          </div>
        ))}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div role="status" aria-live="polite" aria-label="Loading more prompts">
          <GridSkeleton count={8} />
          <span className="sr-only">Loading more prompts...</span>
        </div>
      )}

      {/* Intersection Observer Target */}
      <div ref={observerTarget} className="h-4" aria-hidden="true" />
    </div>
  );
}
