'use client';

import { useState, useEffect } from 'react';
import { FilterPanel, FilterState } from '@/components/filters/FilterPanel';
import { PromptGrid } from '@/components/prompts/PromptGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { PromptItem } from '@/lib/types';

// Note: Metadata cannot be exported from client components
// SEO metadata is provided via layout.tsx metadata configuration

export default function ImagesPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    tags: [],
  });

  // Fetch prompts based on filters
  useEffect(() => {
    const fetchPrompts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: '1',
          pageSize: '24',
        });

        if (filters.search) {
          params.append('search', filters.search);
        }

        if (filters.tags.length > 0) {
          params.append('tags', filters.tags.join(','));
        }

        const response = await fetch(`/api/prompts?${params}`);
        if (!response.ok) throw new Error('Failed to fetch prompts');

        const data = await response.json();
        setPrompts(data.items);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching prompts:', error);
        setPrompts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ search: '', tags: [] });
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
          Keep exploring the prompts your peers are sharing
        </h1>

        {/* Layout: Filter Panel + Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel - Sidebar on desktop */}
          <div className="lg:w-80 flex-shrink-0">
            <FilterPanel
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1" role="region" aria-label="Prompt results">
            {loading ? (
              <div className="text-center py-12 text-slate-500" role="status" aria-live="polite">
                <span>Loading prompts...</span>
              </div>
            ) : prompts.length === 0 ? (
              <EmptyState
                message="No prompts found matching your filters. Try adjusting your search or tags."
                onClearFilters={handleClearFilters}
              />
            ) : (
              <PromptGrid
                initialPrompts={prompts}
                initialPage={1}
                initialTotal={total}
                filters={{
                  search: filters.search || undefined,
                  tags: filters.tags.length > 0 ? filters.tags.join(',') : undefined,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
