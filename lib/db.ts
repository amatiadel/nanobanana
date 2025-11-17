/**
 * Supabase Database Client (Optional)
 * 
 * This file provides a Supabase-based data access layer as an alternative
 * to the JSON-based implementation in lib/data.ts
 * 
 * To use Supabase:
 * 1. Set up a Supabase project and run the SQL schema (see README.md)
 * 2. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
 * 3. Replace imports from lib/data.ts with this file in your API routes
 */

import { createClient } from '@supabase/supabase-js';
import { PromptItem, PromptsQueryParams, PromptsResponse } from './types';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch prompts from Supabase with filtering, search, and pagination
 */
export async function getPrompts(params: PromptsQueryParams): Promise<PromptsResponse> {
  const {
    search = '',
    tags,
    sort = 'likes',
    page = 1,
    pageSize = 24,
  } = params;

  // Start building the query
  let query = supabase
    .from('prompts')
    .select('*', { count: 'exact' });

  // Apply search filter (title, creator_handle, or prompt text)
  if (search) {
    query = query.or(`title.ilike.%${search}%,creator_handle.ilike.%${search}%,prompt.ilike.%${search}%`);
  }

  // Apply tag filters (AND logic - must contain all selected tags)
  if (tags) {
    const tagArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    if (tagArray.length > 0) {
      tagArray.forEach((tag: string) => {
        query = query.contains('tags', [tag]);
      });
    }
  }

  // Apply sorting
  if (sort === 'likes') {
    query = query.order('likes', { ascending: false });
  } else if (sort === 'new') {
    query = query.order('created_at', { ascending: false });
  }

  // Apply pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  // Execute query
  const { data, error, count } = await query;

  if (error) {
    console.error('Supabase query error:', error);
    throw new Error('Failed to fetch prompts');
  }

  // Map database rows to PromptItem type
  const items: PromptItem[] = (data || []).map(row => ({
    id: row.id || '',
    slug: row.slug || '',
    title: row.title || 'Untitled',
    creator: {
      id: row.creator_id || 'unknown',
      handle: row.creator_handle || 'anonymous',
    },
    coverUrl: row.cover_url || '/images/placeholder.svg',
    fullImageUrl: row.full_image_url || row.cover_url || '/images/placeholder.svg',
    description: row.description || '',
    prompt: row.prompt || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    likes: row.likes || 0,
    premium: row.premium || false,
    createdAt: row.created_at || new Date().toISOString(),
  }));

  return {
    items,
    page,
    pageSize,
    total: count || 0,
  };
}

/**
 * Fetch a single prompt by slug
 */
export async function getPromptBySlug(slug: string): Promise<PromptItem | null> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id || '',
    slug: data.slug || '',
    title: data.title || 'Untitled',
    creator: {
      id: data.creator_id || 'unknown',
      handle: data.creator_handle || 'anonymous',
    },
    coverUrl: data.cover_url || '/images/placeholder.svg',
    fullImageUrl: data.full_image_url || data.cover_url || '/images/placeholder.svg',
    description: data.description || '',
    prompt: data.prompt || '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    likes: data.likes || 0,
    premium: data.premium || false,
    createdAt: data.created_at || new Date().toISOString(),
  };
}

/**
 * Get related prompts based on overlapping tags
 */
export async function getRelatedPrompts(
  currentSlug: string,
  tags: string[],
  limit: number = 6
): Promise<PromptItem[]> {
  if (tags.length === 0) {
    return [];
  }

  // Query for prompts that share at least one tag
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .neq('slug', currentSlug)
    .overlaps('tags', tags)
    .order('likes', { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map(row => ({
    id: row.id || '',
    slug: row.slug || '',
    title: row.title || 'Untitled',
    creator: {
      id: row.creator_id || 'unknown',
      handle: row.creator_handle || 'anonymous',
    },
    coverUrl: row.cover_url || '/images/placeholder.svg',
    fullImageUrl: row.full_image_url || row.cover_url || '/images/placeholder.svg',
    description: row.description || '',
    prompt: row.prompt || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    likes: row.likes || 0,
    premium: row.premium || false,
    createdAt: row.created_at || new Date().toISOString(),
  }));
}
