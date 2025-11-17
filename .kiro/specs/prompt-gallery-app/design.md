# Design Document

## Overview

Banana Prompts is built as a modern Next.js 14+ application using the App Router architecture with TypeScript for type safety. The application follows a component-based architecture with clear separation between presentation, data fetching, and business logic. The design prioritizes performance through static generation, incremental loading, and optimized image delivery.

### Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Badge, Button, Input, Sheet)
- **Icons**: lucide-react
- **Animation**: Framer Motion
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier

### Design Principles

1. **Progressive Enhancement**: Core functionality works without JavaScript; enhanced with client-side features
2. **Mobile-First**: Responsive design starting from mobile viewport
3. **Performance**: Static generation, lazy loading, optimized images
4. **Accessibility**: Keyboard navigation, ARIA labels, semantic HTML
5. **Type Safety**: Comprehensive TypeScript coverage
6. **Modularity**: Reusable components with clear interfaces

## Architecture

### Application Structure

```
app/
├── (routes)
│   ├── page.tsx                 # Home page
│   ├── images/
│   │   ├── page.tsx            # Explore/Library page
│   │   └── [slug]/
│   │       └── page.tsx        # Detail page
│   ├── layout.tsx              # Root layout
│   └── api/
│       └── prompts/
│           ├── route.ts        # GET /api/prompts
│           └── [slug]/
│               └── route.ts    # GET /api/prompts/[slug]
```

components/
├── layout/
│   ├── Header.tsx              # Navigation header
│   └── Footer.tsx              # Footer (optional)
├── home/
│   ├── Hero.tsx                # Hero section with highlighted text
│   └── StatCard.tsx            # Stat display card
├── prompts/
│   ├── PromptCard.tsx          # Individual prompt card
│   ├── PromptGrid.tsx          # Grid with infinite scroll
│   ├── PromptDetail.tsx        # Detail page layout
│   └── CopyButton.tsx          # Copy to clipboard button
├── filters/
│   ├── FilterPanel.tsx         # Search + tag filters
│   ├── TagChip.tsx             # Individual tag chip
│   └── SearchBar.tsx           # Search input
└── ui/
    ├── EmptyState.tsx          # No results state
    └── Skeletons.tsx           # Loading skeletons

lib/
├── types.ts                    # TypeScript type definitions
├── data.ts                     # Data access layer (JSON or Supabase)
├── utils.ts                    # Utility functions
├── tags.ts                     # Tag taxonomy and utilities
└── db.ts                       # Supabase client (optional)

seed/
├── prompts.json                # Seed data
└── generate.ts                 # Seed generation script

public/
└── images/                     # Static images
```

### Data Flow

```mermaid
graph TD
    A[User Browser] -->|HTTP Request| B[Next.js App Router]
    B -->|Static Pages| C[Home/Images Pages]
    B -->|API Routes| D[/api/prompts]
    D -->|Read| E[Data Source]
    E -->|JSON File| F[seed/prompts.json]
    E -->|Database| G[Supabase]
    C -->|Client Fetch| D
    C -->|Render| H[React Components]
    H -->|User Interaction| I[State Updates]
    I -->|Re-fetch| D
```

## Components and Interfaces

### Core Components

#### Header Component

**Purpose**: Global navigation with logo, links, and CTA button

**Props**:
```typescript
interface HeaderProps {
  className?: string;
}
```

**Styling**: Fixed or sticky positioning, white background with subtle shadow, max-width container

**Behavior**: 
- Logo links to home
- Active link highlighting
- "Generate Image" button opens dialog (placeholder)
- Disabled state for Videos/Studio links

#### Hero Component

**Purpose**: Landing page hero with highlighted headline

**Props**:
```typescript
interface HeroProps {
  title: string;
  highlightWord: string;
  subtitle: string;
}
```

**Styling**: Large bold typography, yellow rounded highlight on specific word using `<span>` with background

**Implementation**: Use `before:` pseudo-element or inline span with `bg-yellow-300 rounded-lg px-2`

#### StatCard Component

**Purpose**: Display numerical statistics

**Props**:
```typescript
interface StatCardProps {
  value: string | number;
  label: string;
}
```

**Styling**: White card, rounded-2xl, shadow, large number (text-4xl), smaller label (text-sm text-gray-600)

#### PromptCard Component

**Purpose**: Display prompt preview with image, metadata, and actions

**Props**:
```typescript
interface PromptCardProps {
  prompt: PromptItem;
  onCopy?: (text: string) => void;
}
```

**Styling**:
- Container: `rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.06)]`
- Image: Full width, aspect-ratio-square or 4:3
- Gradient overlay: `bg-gradient-to-t from-black/80 via-black/40 to-transparent`
- Title capsule: Top-left, small, white text on dark background
- Like count: Top-right, heart icon + number
- Bottom content: Description (line-clamp-3), Copy button, creator handle

**Animation**: Framer Motion fade-up on mount
```typescript
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

**Behavior**:
- Click card → navigate to detail page
- Click Copy button → copy prompt, show toast (prevent navigation)
- Hover → subtle scale or shadow increase

#### PromptGrid Component

**Purpose**: Responsive grid with infinite scroll

**Props**:
```typescript
interface PromptGridProps {
  initialPrompts: PromptItem[];
  filters?: FilterState;
}
```

**Styling**: 
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`
- Container: Max-width wrapper with padding

**Behavior**:
- Use Intersection Observer to detect scroll position
- When 70% from bottom, fetch next page
- Append new items to existing array
- Show loading skeletons during fetch
- Stagger card animations (delay based on index)

#### FilterPanel Component

**Purpose**: Search and tag filtering interface

**Props**:
```typescript
interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

interface FilterState {
  search: string;
  tags: string[];
  premium?: boolean;
}
```

**Styling**: White card container, rounded-2xl, padding, organized sections with headings

**Behavior**:
- Debounce search input (300ms)
- Tag chips toggle on/off
- Mobile: Use shadcn Sheet component for slide-in panel
- Desktop: Always visible sidebar or top panel

#### TagChip Component

**Purpose**: Toggleable tag filter

**Props**:
```typescript
interface TagChipProps {
  label: string;
  slug: string;
  active: boolean;
  onToggle: (slug: string) => void;
}
```

**Styling**:
- Base: `px-3 py-1.5 rounded-full text-sm border transition-all`
- Inactive: `bg-white border-gray-200 text-gray-700 hover:border-gray-300`
- Active: `bg-slate-900 border-slate-900 text-white`

**Behavior**: Click toggles active state, calls onToggle callback

#### CopyButton Component

**Purpose**: Copy text to clipboard with feedback

**Props**:
```typescript
interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: 'default' | 'with-tags';
  onCopy?: () => void;
}
```

**Behavior**:
- Use `navigator.clipboard.writeText()`
- Show toast notification on success
- Handle errors gracefully
- Optional: Show checkmark icon briefly after copy

#### PromptDetail Component

**Purpose**: Full prompt information layout

**Props**:
```typescript
interface PromptDetailProps {
  prompt: PromptItem;
  relatedPrompts: PromptItem[];
}
```

**Layout**:
- Large image at top (responsive, max-height)
- Title + creator + likes in row
- Copy buttons (standard + with tags)
- Full prompt text (expandable if very long)
- Tags section
- "More like this" grid (3-6 items)

## Data Models

### PromptItem Type

```typescript
export interface PromptItem {
  id: string;                    // UUID
  slug: string;                  // URL-friendly identifier
  title: string;                 // Display title
  creator: {
    id: string;
    handle: string;
    avatarUrl?: string;
  };
  coverUrl: string;              // Card thumbnail
  fullImageUrl?: string;         // Detail page image (defaults to coverUrl)
  description: string;           // Short description (2-3 lines)
  prompt: string;                // Full AI prompt text
  tags: string[];                // Array of tag slugs
  likes: number;                 // Like count
  premium?: boolean;             // Premium status
  createdAt: string;             // ISO 8601 timestamp
}
```

### Tag Taxonomy

```typescript
export interface TagCategory {
  id: string;
  label: string;
  tags: Tag[];
}

export interface Tag {
  slug: string;
  label: string;
}

export const TAG_CATEGORIES: TagCategory[] = [
  {
    id: 'artistic-styles',
    label: 'Artistic Styles',
    tags: [
      { slug: 'realistic', label: 'Realistic' },
      { slug: 'cinematic', label: 'Cinematic' },
      { slug: 'anime', label: 'Anime' },
      // ... more tags
    ]
  },
  // ... more categories
];
```

### API Response Types

```typescript
export interface PromptsResponse {
  items: PromptItem[];
  page: number;
  pageSize: number;
  total: number;
}

export interface PromptsQueryParams {
  search?: string;
  tags?: string;        // Comma-separated
  sort?: 'likes' | 'new';
  page?: number;
  pageSize?: number;
}
```

## API Design

### GET /api/prompts

**Query Parameters**:
- `search` (optional): Search term for title, creator, prompt
- `tags` (optional): Comma-separated tag slugs (AND logic)
- `sort` (optional): 'likes' (default) or 'new'
- `page` (optional): Page number (default: 1)
- `pageSize` (optional): Items per page (default: 24)

**Response**: `PromptsResponse`

**Implementation**:
1. Load prompts from data source (JSON or Supabase)
2. Apply search filter (case-insensitive contains)
3. Apply tag filter (item must have all specified tags)
4. Sort by specified field
5. Paginate results
6. Return response with metadata

### GET /api/prompts/[slug]

**Parameters**: `slug` (URL parameter)

**Response**: `PromptItem` or 404

**Implementation**:
1. Load prompts from data source
2. Find prompt matching slug
3. Return prompt or 404 error

## Data Access Layer

### JSON Implementation (MVP)

```typescript
// lib/data.ts
import prompts from '@/seed/prompts.json';

export async function getPrompts(params: PromptsQueryParams): Promise<PromptsResponse> {
  let filtered = [...prompts];
  
  // Apply search
  if (params.search) {
    const term = params.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.creator.handle.toLowerCase().includes(term) ||
      p.prompt.toLowerCase().includes(term)
    );
  }
  
  // Apply tag filter
  if (params.tags) {
    const requiredTags = params.tags.split(',');
    filtered = filtered.filter(p =>
      requiredTags.every(tag => p.tags.includes(tag))
    );
  }
  
  // Sort
  const sortField = params.sort === 'new' ? 'createdAt' : 'likes';
  filtered.sort((a, b) => {
    if (sortField === 'likes') return b.likes - a.likes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Paginate
  const page = params.page || 1;
  const pageSize = params.pageSize || 24;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  
  return { items, page, pageSize, total: filtered.length };
}

export async function getPromptBySlug(slug: string): Promise<PromptItem | null> {
  return prompts.find(p => p.slug === slug) || null;
}
```

### Supabase Implementation (Optional)

```typescript
// lib/db.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getPrompts(params: PromptsQueryParams): Promise<PromptsResponse> {
  let query = supabase.from('prompts').select('*', { count: 'exact' });
  
  // Apply search
  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,creator_handle.ilike.%${params.search}%,prompt.ilike.%${params.search}%`);
  }
  
  // Apply tag filter
  if (params.tags) {
    const tags = params.tags.split(',');
    query = query.contains('tags', tags);
  }
  
  // Sort
  const sortField = params.sort === 'new' ? 'created_at' : 'likes';
  query = query.order(sortField, { ascending: false });
  
  // Paginate
  const page = params.page || 1;
  const pageSize = params.pageSize || 24;
  const start = (page - 1) * pageSize;
  query = query.range(start, start + pageSize - 1);
  
  const { data, count, error } = await query;
  
  if (error) throw error;
  
  return {
    items: data.map(mapDbToPromptItem),
    page,
    pageSize,
    total: count || 0
  };
}
```

**SQL Schema**:
```sql
create table prompts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  prompt text not null,
  likes int default 0,
  premium boolean default false,
  cover_url text not null,
  full_image_url text,
  creator_handle text not null,
  tags text[] not null default '{}',
  created_at timestamptz default now()
);

-- Enable RLS
alter table prompts enable row level security;

-- Allow anonymous reads
create policy "Allow anonymous select" on prompts
  for select using (true);

-- Index for performance
create index prompts_tags_idx on prompts using gin(tags);
create index prompts_likes_idx on prompts(likes desc);
create index prompts_created_at_idx on prompts(created_at desc);
```

## Error Handling

### Client-Side Errors

1. **Network Failures**: Show toast notification, retry button
2. **404 Not Found**: Redirect to 404 page with link to home
3. **Empty Results**: Display EmptyState component with "Clear filters" action
4. **Image Load Failures**: Show placeholder image, log error

### Server-Side Errors

1. **Invalid Query Parameters**: Return 400 with error message
2. **Database Errors**: Return 500, log error details
3. **Missing Resources**: Return 404 with appropriate message

### Error Boundaries

Implement React Error Boundary for component-level error handling:

```typescript
// components/ErrorBoundary.tsx
export class ErrorBoundary extends React.Component {
  // Catch rendering errors, show fallback UI
}
```

## Testing Strategy

### Unit Tests

- Utility functions (search, filter, tag matching)
- Data access layer functions
- Component logic (copy to clipboard, filter state)

### Integration Tests

- API route handlers
- Page rendering with data
- Filter and search functionality

### E2E Tests (Playwright)

**Critical Paths**:
1. Home page loads with prompts
2. Search filters results correctly
3. Tag filtering works
4. Detail page renders prompt
5. Copy button copies to clipboard
6. Infinite scroll loads more items

**Test Structure**:
```typescript
test('home page displays prompts', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-testid="prompt-card"]')).toHaveCount(24);
});

test('search filters prompts', async ({ page }) => {
  await page.goto('/images');
  await page.fill('[data-testid="search-input"]', 'portrait');
  await expect(page.locator('[data-testid="prompt-card"]')).toContainText('portrait');
});
```

## Performance Optimizations

### Image Optimization

1. **Next.js Image Component**: Automatic format selection (WebP/AVIF), responsive sizes
2. **Lazy Loading**: Images load as they enter viewport
3. **Blur Placeholder**: Show blur-up effect during load
4. **CDN Ready**: IMAGE_BASE_URL env var for easy CDN integration

```typescript
<Image
  src={`${IMAGE_BASE_URL}${prompt.coverUrl}`}
  alt={prompt.title}
  width={600}
  height={600}
  className="object-cover"
  placeholder="blur"
  blurDataURL={generateBlurDataURL(prompt.coverUrl)}
/>
```

### Code Splitting

- Route-based splitting (automatic with App Router)
- Dynamic imports for heavy components (e.g., FilterPanel on mobile)
- Lazy load Framer Motion animations

### Caching Strategy

1. **Static Generation**: Home page pre-rendered at build time
2. **ISR (Incremental Static Regeneration)**: Revalidate every 60 seconds
3. **Client-Side Caching**: SWR or React Query for API responses
4. **HTTP Caching**: Set appropriate Cache-Control headers on API routes

### Bundle Optimization

- Tree-shaking unused code
- Minimize third-party dependencies
- Use production builds
- Analyze bundle with `@next/bundle-analyzer`

## Styling Implementation

### Tailwind Configuration

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: '#F6F8FB',
        'banana-yellow': '#FDE047',
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0,0,0,0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

### Design Tokens

**Colors**:
- Background: `#F6F8FB` (slate-50)
- Card background: `#FFFFFF`
- Primary text: `#0F172A` (slate-900)
- Secondary text: `#64748B` (slate-500)
- Highlight: `#FDE047` (yellow-300)
- Border: `#E2E8F0` (slate-200)

**Spacing**:
- Container max-width: `1280px`
- Section padding: `py-12 md:py-16`
- Card gap: `gap-6`

**Typography**:
- Hero: `text-5xl md:text-6xl font-bold tracking-tight`
- Heading: `text-3xl font-bold`
- Body: `text-base text-slate-600`
- Small: `text-sm text-slate-500`

**Animations**:
```typescript
// Framer Motion variants
export const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};
```

## Accessibility Features

1. **Keyboard Navigation**: All interactive elements focusable, logical tab order
2. **Focus Indicators**: Visible focus rings on all interactive elements
3. **ARIA Labels**: Descriptive labels for icon buttons and controls
4. **Alt Text**: Meaningful alt text for all images
5. **Color Contrast**: WCAG AA compliant contrast ratios
6. **Screen Reader Support**: Semantic HTML, proper heading hierarchy
7. **Skip Links**: "Skip to main content" link

## SEO Implementation

### Metadata

```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: 'Banana Prompts - AI Image Prompt Gallery',
  description: 'Discover and share AI image prompts...',
  openGraph: {
    title: 'Banana Prompts',
    description: '...',
    images: ['/og-image.jpg'],
  },
};
```

### Sitemap

```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const prompts = getAllPrompts();
  return [
    { url: 'https://example.com', lastModified: new Date() },
    { url: 'https://example.com/images', lastModified: new Date() },
    ...prompts.map(p => ({
      url: `https://example.com/images/${p.slug}`,
      lastModified: new Date(p.createdAt),
    })),
  ];
}
```

### Robots.txt

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
```

## Deployment Configuration

### Environment Variables

```bash
# .env.local
IMAGE_BASE_URL=/images/          # Local development
# IMAGE_BASE_URL=https://cdn.example.com/  # Production CDN

# Optional: Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

### Vercel Configuration

```json
// vercel.json
{
  "images": {
    "domains": ["cdn.example.com", "xxx.supabase.co"],
    "formats": ["image/avif", "image/webp"]
  }
}
```

### Build Scripts

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "seed": "tsx seed/generate.ts",
    "test": "playwright test",
    "type-check": "tsc --noEmit"
  }
}
```

## Migration Path: JSON to Supabase

1. **Create Supabase project** and run SQL schema
2. **Seed database** with existing JSON data
3. **Update environment variables** with Supabase credentials
4. **Switch data layer**: Import from `lib/db.ts` instead of `lib/data.ts`
5. **Test thoroughly**: Ensure API responses match expected format
6. **Deploy**: Update production environment variables

## Migration Path: Local Images to CDN

1. **Upload images** to Cloudflare R2 or Supabase Storage
2. **Update IMAGE_BASE_URL** environment variable
3. **Update seed data** with new image URLs
4. **Configure Next.js** image domains in `next.config.js`
5. **Test image loading** in all environments
6. **Deploy**: Update production environment variables

## Design Decisions and Rationale

### Why App Router?

- Modern Next.js architecture with better performance
- Server Components reduce client bundle size
- Simplified data fetching with async components
- Better streaming and loading states

### Why JSON for MVP?

- Zero infrastructure setup
- Fast development iteration
- Easy to understand and debug
- Simple migration path to database

### Why Framer Motion?

- Declarative animation API
- Excellent TypeScript support
- Performance optimized
- Small bundle size for basic animations

### Why shadcn/ui?

- Copy-paste components (no dependency bloat)
- Full customization control
- Tailwind-based styling
- Accessible by default

### Why Infinite Scroll?

- Better UX for browsing large collections
- Reduces initial load time
- Matches modern gallery expectations
- Easy to implement with Intersection Observer

## Future Enhancements

1. **User Authentication**: Allow users to create accounts and save favorites
2. **Upload Prompts**: Let users contribute their own prompts
3. **Advanced Search**: Full-text search with highlighting
4. **Collections**: Curated prompt collections
5. **Social Features**: Comments, ratings, follows
6. **Analytics**: Track popular prompts and search terms
7. **AI Integration**: Generate images directly in the app
8. **Export Options**: Download prompts as JSON/CSV
