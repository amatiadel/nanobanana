'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: 'default' | 'with-tags';
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function CopyButton({
  text,
  label = 'Copy',
  variant = 'default',
  className,
  onClick,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    // Prevent event propagation to avoid navigation when inside a link
    e.preventDefault();
    e.stopPropagation();

    // Call custom onClick handler if provided
    if (onClick) {
      onClick(e);
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Prompt copied to clipboard');

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      toast.error('Failed to copy prompt');
    }
  };

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={handleCopy}
      className={cn(
        'gap-2 bg-white/90 hover:bg-white text-slate-900 backdrop-blur-sm rounded-[25px]',
        className
      )}
      aria-label={copied ? 'Copied' : `Copy ${label.toLowerCase()}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span className="text-xs font-medium">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span className="text-xs font-medium">{label}</span>
        </>
      )}
    </Button>
  );
}
