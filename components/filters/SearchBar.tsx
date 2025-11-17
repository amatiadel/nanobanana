'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { debounce } from '@/lib/utils';
import { useCallback, useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search prompts...' }: SearchBarProps) {
  const [value, setValue] = useState('');

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
      <Input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-10"
        data-testid="search-input"
        aria-label="Search prompts by title, creator, or content"
      />
    </div>
  );
}
