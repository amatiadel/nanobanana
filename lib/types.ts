/**
 * Type definitions for Banana Prompts application
 */

/**
 * Creator information for a prompt
 */
export interface Creator {
  id: string;
  handle: string;
  avatarUrl?: string;
}

/**
 * Main prompt item interface containing all prompt data
 */
export interface PromptItem {
  id: string;
  slug: string;
  title: string;
  creator: Creator;
  coverUrl: string;
  fullImageUrl?: string;
  description: string;
  prompt: string;
  tags: string[];
  likes: number;
  premium?: boolean;
  createdAt: string;
}

/**
 * Query parameters for fetching prompts
 */
export interface PromptsQueryParams {
  search?: string;
  tags?: string;
  sort?: 'likes' | 'new';
  page?: number;
  pageSize?: number;
}

/**
 * Response structure for prompts API
 */
export interface PromptsResponse {
  items: PromptItem[];
  page: number;
  pageSize: number;
  total: number;
}

/**
 * Individual tag definition
 */
export interface Tag {
  slug: string;
  label: string;
}

/**
 * Tag category grouping multiple tags
 */
export interface TagCategory {
  id: string;
  label: string;
  tags: Tag[];
}

/**
 * Blog post interface
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  authorName: string;
  authorAvatarUrl?: string;
  tags: string[];
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Query parameters for fetching blog posts
 */
export interface BlogPostsQueryParams {
  search?: string;
  tags?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Response structure for blog posts API
 */
export interface BlogPostsResponse {
  items: BlogPost[];
  page: number;
  pageSize: number;
  total: number;
}
