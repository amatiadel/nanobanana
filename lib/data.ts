/**
 * Data access layer for Banana Prompts
 * Provides functions to query and filter prompt data from JSON source
 */

import { PromptItem, PromptsQueryParams, PromptsResponse } from './types';

// Import prompts from seed data
// This will be populated after running the seed generation script
import promptsJson from '../seed/prompts.json';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const galleryPromptsPath = path.join(dataDir, 'gallery-prompts.json');
const legacyCustomPromptsPath = path.join(dataDir, 'custom-prompts.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

const basePrompts: PromptItem[] = [...(promptsJson as PromptItem[])];
let promptsData: PromptItem[] = [];
let promptsLastLoaded = 0;

function ensureDataDirectories() {
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (error) {
    console.warn('Failed to ensure data directories', error);
  }
}

function writePromptStoreToDisk() {
  ensureDataDirectories();
  fs.writeFileSync(
    galleryPromptsPath,
    JSON.stringify(promptsData, null, 2),
    'utf8'
  );
  promptsLastLoaded = fs.statSync(galleryPromptsPath).mtimeMs;
}

function loadLegacyCustomPrompts(): PromptItem[] {
  try {
    if (!fs.existsSync(legacyCustomPromptsPath)) {
      return [];
    }
    const raw = fs.readFileSync(legacyCustomPromptsPath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read legacy custom prompts file:', error);
    return [];
  }
}

function initializePromptStore() {
  ensureDataDirectories();
  if (fs.existsSync(galleryPromptsPath)) {
    try {
      const raw = fs.readFileSync(galleryPromptsPath, 'utf8');
      promptsData = JSON.parse(raw);
      promptsLastLoaded = fs.statSync(galleryPromptsPath).mtimeMs;
      return;
    } catch (error) {
      console.error('Failed to read gallery prompt store, rebuilding.', error);
    }
  }

  const legacyCustom = loadLegacyCustomPrompts();
  promptsData = [...legacyCustom, ...basePrompts];
  writePromptStoreToDisk();
}

function refreshPromptsFromDisk(force: boolean = false) {
  ensureDataDirectories();
  const exists = fs.existsSync(galleryPromptsPath);
  const lastModified = exists ? fs.statSync(galleryPromptsPath).mtimeMs : 0;

  if (!exists) {
    promptsData = [...basePrompts];
    writePromptStoreToDisk();
    return;
  }

  if (force || lastModified !== promptsLastLoaded) {
    try {
      const raw = fs.readFileSync(galleryPromptsPath, 'utf8');
      promptsData = JSON.parse(raw);
      promptsLastLoaded = lastModified;
    } catch (error) {
      console.error('Failed to refresh prompts from disk:', error);
    }
  } else if (!promptsData.length) {
    initializePromptStore();
  }
}

initializePromptStore();

interface NewPromptInput {
  title: string;
  projectTitle: string;
  prompt: string;
  tags: string[];
  imagePath: string;
  creatorHandle: string;
}

interface UpdatePromptInput {
  title?: string;
  projectTitle?: string;
  prompt?: string;
  tags?: string[];
  imagePath?: string;
  creatorHandle?: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'prompt';
}

function generateUniqueSlug(base: string) {
  let slug = base;
  let counter = 1;

  while (promptsData.some((prompt) => prompt.slug === slug)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }

  return slug;
}

export function addPrompt(input: NewPromptInput): PromptItem {
  const title = input.title.trim() || input.projectTitle.trim();
  const projectTitle = input.projectTitle.trim();
  const tags = input.tags.map((tag) => tag.trim()).filter(Boolean);
  const creatorHandle = input.creatorHandle.trim();
  const imagePath = input.imagePath.startsWith('/')
    ? input.imagePath
    : `/${input.imagePath}`;
  const createdAt = new Date().toISOString();

  const baseSlug = slugify(title || projectTitle || 'prompt');
  const slug = generateUniqueSlug(baseSlug);

  const promptItem: PromptItem = {
    id: `prompt-${createdAt}-${Math.random().toString(36).slice(2, 7)}`,
    slug,
    title: title || projectTitle,
    creator: {
      id: `creator-${creatorHandle || 'anonymous'}`,
      handle: creatorHandle || 'anonymous',
    },
    coverUrl: imagePath,
    fullImageUrl: imagePath,
    description: projectTitle || title,
    prompt: input.prompt.trim(),
    tags: tags.length ? tags : ['general'],
    likes: 0,
    premium: false,
    createdAt,
  };

  refreshPromptsFromDisk();
  promptsData = [promptItem, ...promptsData];
  writePromptStoreToDisk();

  return promptItem;
}

export function listPrompts(): PromptItem[] {
  refreshPromptsFromDisk();
  return [...promptsData];
}

export function getPromptById(id: string): PromptItem | null {
  refreshPromptsFromDisk();
  return promptsData.find((prompt) => prompt.id === id) || null;
}

export function updatePrompt(
  id: string,
  updates: UpdatePromptInput
): PromptItem | null {
  refreshPromptsFromDisk();
  const index = promptsData.findIndex((prompt) => prompt.id === id);
  if (index === -1) {
    return null;
  }

  const current = promptsData[index];
  const updated: PromptItem = {
    ...current,
    title: updates.title?.trim() || current.title,
    prompt: updates.prompt?.trim() || current.prompt,
    creator: {
      ...current.creator,
      handle: updates.creatorHandle?.trim() || current.creator.handle,
    },
    tags:
      updates.tags && updates.tags.length
        ? updates.tags.map((tag) => tag.trim()).filter(Boolean)
        : current.tags,
  };

  if (updates.projectTitle?.trim()) {
    updated.description = updates.projectTitle.trim();
  }

  if (updates.imagePath) {
    const imagePath = updates.imagePath.startsWith('/')
      ? updates.imagePath
      : `/${updates.imagePath}`;
    updated.coverUrl = imagePath;
    updated.fullImageUrl = imagePath;
  }

  promptsData[index] = updated;
  writePromptStoreToDisk();
  return updated;
}

export function deletePrompt(id: string): boolean {
  refreshPromptsFromDisk();
  const index = promptsData.findIndex((prompt) => prompt.id === id);
  if (index === -1) {
    return false;
  }

  promptsData.splice(index, 1);
  writePromptStoreToDisk();
  return true;
}

export function incrementPromptLikesById(id: string): PromptItem | null {
  refreshPromptsFromDisk();
  const index = promptsData.findIndex((prompt) => prompt.id === id);
  if (index === -1) {
    return null;
  }

  const current = promptsData[index];
  const updated = {
    ...current,
    likes: (current.likes || 0) + 1,
  };

  promptsData[index] = updated;
  writePromptStoreToDisk();
  return updated;
}

export function incrementPromptLikesBySlug(slug: string): PromptItem | null {
  refreshPromptsFromDisk();
  const index = promptsData.findIndex((prompt) => prompt.slug === slug);
  if (index === -1) {
    return null;
  }

  const current = promptsData[index];
  const updated = {
    ...current,
    likes: (current.likes || 0) + 1,
  };

  promptsData[index] = updated;
  writePromptStoreToDisk();
  return updated;
}

/**
 * Get prompts with filtering, sorting, and pagination
 * @param params Query parameters for filtering and pagination
 * @returns Paginated prompts response
 */
export async function getPrompts(
  params: PromptsQueryParams = {}
): Promise<PromptsResponse> {
  refreshPromptsFromDisk();

  let filtered = [...promptsData];

  // Apply search filter (case-insensitive search in title, creator handle, and prompt text)
  if (params.search) {
    const searchTerm = params.search.toLowerCase().trim();
    filtered = filtered.filter(
      (prompt) =>
        prompt.title.toLowerCase().includes(searchTerm) ||
        prompt.creator.handle.toLowerCase().includes(searchTerm) ||
        prompt.prompt.toLowerCase().includes(searchTerm)
    );
  }

  // Apply tag filter with AND logic (prompt must have all specified tags)
  if (params.tags) {
    const requiredTags = params.tags.split(',').map((tag) => tag.trim());
    filtered = filtered.filter((prompt) =>
      requiredTags.every((tag) => prompt.tags.includes(tag))
    );
  }

  // Sort prompts
  const sortField = params.sort === 'new' ? 'createdAt' : 'likes';
  filtered.sort((a, b) => {
    if (sortField === 'likes') {
      // Primary sort: likes descending
      if (b.likes !== a.likes) {
        return b.likes - a.likes;
      }
      // Secondary sort: createdAt descending
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // Sort by createdAt descending
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  // Pagination
  const page = params.page || 1;
  const pageSize = params.pageSize || 24;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = filtered.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    page,
    pageSize,
    total: filtered.length,
  };
}

/**
 * Get a single prompt by its slug
 * @param slug The unique slug identifier for the prompt
 * @returns The prompt item or null if not found
 */
export async function getPromptBySlug(
  slug: string
): Promise<PromptItem | null> {
  refreshPromptsFromDisk();
  const prompt = promptsData.find((p) => p.slug === slug);
  return prompt || null;
}

/**
 * Get related prompts based on overlapping tags
 * @param currentPrompt The prompt to find related items for
 * @param limit Maximum number of related prompts to return (default: 6)
 * @returns Array of related prompt items
 */
export async function getRelatedPrompts(
  currentPrompt: PromptItem,
  limit: number = 6
): Promise<PromptItem[]> {
  refreshPromptsFromDisk();

  // Filter out the current prompt and calculate overlap score
  const relatedWithScores = promptsData
    .filter((prompt) => prompt.id !== currentPrompt.id)
    .map((prompt) => {
      // Count overlapping tags
      const overlapCount = prompt.tags.filter((tag) =>
        currentPrompt.tags.includes(tag)
      ).length;

      return {
        prompt,
        score: overlapCount,
      };
    })
    .filter((item) => item.score > 0) // Only include prompts with at least one overlapping tag
    .sort((a, b) => {
      // Primary sort: overlap score descending
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      // Secondary sort: likes descending
      return b.prompt.likes - a.prompt.likes;
    });

  // Return top N related prompts
  return relatedWithScores.slice(0, limit).map((item) => item.prompt);
}

/**
 * Get all prompts (for sitemap generation, etc.)
 * @returns All prompt items
 */
export async function getAllPrompts(): Promise<PromptItem[]> {
  refreshPromptsFromDisk();
  return [...promptsData];
}
