import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateBlurDataURL(_url?: string): string {
  // Generate a simple blur placeholder SVG
  // The url parameter is available for future enhancements (e.g., color extraction)
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#f0f0f0"/></svg>`
  ).toString('base64')}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getImageUrl(path: string): string {
  // Get the base URL from environment variable, default to /images for local dev
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || '/images';
  
  // If path already starts with http:// or https://, return as-is (absolute URL)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If path already points to the public root (starts with /), respect it
  if (path.startsWith('/')) {
    return path;
  }
  
  // If path already starts with the base URL, return as-is
  if (path.startsWith(baseUrl)) {
    return path;
  }
  
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Ensure base URL doesn't end with slash to avoid double slashes
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBaseUrl}/${cleanPath}`;
}
