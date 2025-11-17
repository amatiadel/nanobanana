'use client';

import { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { TagChip } from './TagChip';
import { TAG_CATEGORIES } from '@/lib/tags';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export interface FilterState {
  search: string;
  tags: string[];
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

function FilterContent({
  filters,
  onSearchChange,
  onTagToggle,
}: {
  filters: FilterState;
  onSearchChange: (query: string) => void;
  onTagToggle: (slug: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <SearchBar onSearch={onSearchChange} />
      </div>

      {TAG_CATEGORIES.map((category) => (
        <section key={category.id} aria-labelledby={`category-${category.id}`}>
          <h3 id={`category-${category.id}`} className="text-sm font-semibold text-gray-900 mb-3">
            {category.label}
          </h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label={`${category.label} filters`}>
            {category.tags.map((tag) => (
              <TagChip
                key={tag.slug}
                label={tag.label}
                slug={tag.slug}
                active={filters.tags.includes(tag.slug)}
                onToggle={onTagToggle}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function FilterPanel({ onFilterChange, initialFilters }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>(
    initialFilters || { search: '', tags: [] }
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleSearchChange = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
  };

  const handleTagToggle = (slug: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(slug)
        ? prev.tags.filter((t) => t !== slug)
        : [...prev.tags, slug],
    }));
  };

  return (
    <>
      {/* Mobile: Sheet with trigger button */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full" aria-label={`Open filters${filters.tags.length > 0 ? `, ${filters.tags.length} active` : ''}`}>
              <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
              Filters
              {filters.tags.length > 0 && (
                <span className="ml-2 bg-slate-900 text-white text-xs px-2 py-0.5 rounded-full" aria-label={`${filters.tags.length} active filters`}>
                  {filters.tags.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent
                filters={filters}
                onSearchChange={handleSearchChange}
                onTagToggle={handleTagToggle}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop: Always visible sidebar */}
      <aside className="hidden lg:block bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-6" aria-label="Filter prompts">
        <h2 className="text-lg font-bold text-gray-900 mb-6">Filters</h2>
        <FilterContent
          filters={filters}
          onSearchChange={handleSearchChange}
          onTagToggle={handleTagToggle}
        />
      </aside>
    </>
  );
}
