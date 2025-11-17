import { Tag, TagCategory } from './types';

/**
 * Complete tag taxonomy organized by categories
 */
export const TAG_CATEGORIES: TagCategory[] = [
  {
    id: 'artistic-styles',
    label: 'Artistic Styles',
    tags: [
      { slug: 'realistic', label: 'Realistic' },
      { slug: 'cinematic', label: 'Cinematic' },
      { slug: 'anime', label: 'Anime' },
      { slug: 'architecture', label: 'Architecture' },
      { slug: 'cartoon', label: 'Cartoon' },
      { slug: '3d-render', label: '3D Render' },
      { slug: 'vector', label: 'Vector' },
      { slug: 'watercolor', label: 'Watercolor' },
      { slug: 'sketch-line-art', label: 'Sketch/Line Art' },
      { slug: 'oil-painting', label: 'Oil Painting' },
      { slug: 'abstract', label: 'Abstract' },
    ],
  },
  {
    id: 'corporate-professional',
    label: 'Corporate & Professional',
    tags: [
      { slug: 'corporate', label: 'Corporate' },
      { slug: 'business', label: 'Business' },
      { slug: 'minimalist', label: 'Minimalist' },
      { slug: 'modern', label: 'Modern' },
      { slug: 'product', label: 'Product' },
      { slug: 'poster', label: 'Poster' },
      { slug: 'logo', label: 'Logo' },
      { slug: 'infographic', label: 'Infographic' },
      { slug: 'concept-art', label: 'Concept Art' },
    ],
  },
  {
    id: 'genre-themes',
    label: 'Genre & Themes',
    tags: [
      { slug: 'fantasy', label: 'Fantasy' },
      { slug: 'sci-fi', label: 'Sci-Fi' },
      { slug: 'cyberpunk', label: 'Cyberpunk' },
      { slug: 'retro-vintage', label: 'Retro/Vintage' },
      { slug: 'grunge', label: 'Grunge' },
    ],
  },
  {
    id: 'mood-tone',
    label: 'Mood & Tone',
    tags: [
      { slug: 'vibrant-colorful', label: 'Vibrant/Colorful' },
      { slug: 'dark-moody', label: 'Dark/Moody' },
      { slug: 'elegant', label: 'Elegant' },
    ],
  },
  {
    id: 'optional-addons',
    label: 'Optional Add-ons',
    tags: [
      { slug: 'glitch', label: 'Glitch' },
      { slug: 'neon', label: 'Neon' },
      { slug: 'flat-design', label: 'Flat Design' },
    ],
  },
];

/**
 * Get the display label for a tag slug
 * @param slug - The tag slug to look up
 * @returns The display label or the slug if not found
 */
export function getTagLabel(slug: string): string {
  for (const category of TAG_CATEGORIES) {
    const tag = category.tags.find((t) => t.slug === slug);
    if (tag) {
      return tag.label;
    }
  }
  return slug;
}

/**
 * Get all tags for a specific category
 * @param categoryId - The category ID to filter by
 * @returns Array of tags in the category, or empty array if not found
 */
export function getTagsByCategory(categoryId: string): Tag[] {
  const category = TAG_CATEGORIES.find((c) => c.id === categoryId);
  return category ? category.tags : [];
}

/**
 * Get all tags from all categories as a flat array
 * @returns Array of all available tags
 */
export function getAllTags(): Tag[] {
  return TAG_CATEGORIES.flatMap((category) => category.tags);
}
