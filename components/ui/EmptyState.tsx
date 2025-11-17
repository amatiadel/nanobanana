'use client';

import { SearchX } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  message?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  message = 'No prompts found matching your filters',
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center" role="status" aria-live="polite">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <SearchX className="h-12 w-12 text-gray-400" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      {onClearFilters && (
        <Button onClick={onClearFilters} variant="outline" aria-label="Clear all filters and show all prompts">
          Clear filters
        </Button>
      )}
    </div>
  );
}
