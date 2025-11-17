'use client';

interface TagChipProps {
  label: string;
  slug: string;
  active: boolean;
  onToggle: (slug: string) => void;
}

export function TagChip({ label, slug, active, onToggle }: TagChipProps) {
  return (
    <button
      onClick={() => onToggle(slug)}
      className={`
        px-3 py-1.5 rounded-full text-sm border transition-all
        focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2
        ${
          active
            ? 'bg-slate-900 border-slate-900 text-white'
            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
        }
      `}
      aria-pressed={active}
      aria-label={`${active ? 'Remove' : 'Add'} ${label} filter`}
      type="button"
    >
      {label}
    </button>
  );
}
