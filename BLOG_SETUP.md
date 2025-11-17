# Blog Feature Setup Guide

This guide will help you set up and use the new blog feature in Banana Prompts.

## Features

- ✅ Blog post listing page with cards
- ✅ Individual blog post pages with full content
- ✅ Admin panel for creating and managing posts
- ✅ Image upload support (R2, Supabase Storage, or base64 fallback)
- ✅ Tags and categorization
- ✅ View counter
- ✅ Published/Draft status
- ✅ Responsive design matching the app theme

## Setup Instructions

### 1. Update Database Schema

Run the updated SQL schema in your Supabase SQL Editor:

```bash
# The schema has been updated in supabase-schema.sql
# It now includes the blog_posts table
```

Open your Supabase project and run the SQL from `supabase-schema.sql` or just the blog-specific part:

```sql
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_avatar_url TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN DEFAULT TRUE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts(published);
CREATE INDEX IF NOT EXISTS blog_posts_tags_idx ON blog_posts USING GIN(tags);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anonymous read published posts"
  ON blog_posts FOR SELECT TO anon USING (published = true);

CREATE POLICY "Allow anonymous insert blog posts"
  ON blog_posts FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous update blog posts"
  ON blog_posts FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous delete blog posts"
  ON blog_posts FOR DELETE TO anon USING (true);
```

### 2. Create Test Blog Post (Optional)

To create a test blog post with sample content, run the SQL from `seed/test-blog-post.sql` in your Supabase SQL Editor.

### 3. Access the Blog

- **Public Blog**: Visit `/blog` to see all published posts
- **Admin Panel**: Visit `/admin/blog` to create and manage posts
- **Individual Post**: Visit `/blog/[slug]` to read a specific post

## Usage

### Creating a Blog Post

1. Navigate to `/admin/blog`
2. Click "New Post" button
3. Fill in the form:
   - **Title**: The main heading of your post
   - **Excerpt**: A short summary (shown on listing page)
   - **Content**: Full blog post content (supports HTML)
   - **Tags**: Comma-separated tags (e.g., "tutorial, ai, tips")
   - **Author Name**: Your name or pen name
   - **Cover Image**: Upload an image (will be optimized automatically)
   - **Published**: Check to publish immediately, uncheck to save as draft
4. Click "Create Blog Post"

### Managing Posts

From the admin panel (`/admin/blog`), you can:
- View all posts (published and drafts)
- See post statistics (views, date, status)
- Delete posts
- Click on post titles to view them

### Content Formatting

The content field supports HTML. You can use:

```html
<h2>Section Heading</h2>
<p>Paragraph text</p>
<ul>
  <li>List item</li>
</ul>
<strong>Bold text</strong>
<em>Italic text</em>
<code>Inline code</code>
```

## File Structure

```
app/
├── blog/
│   ├── page.tsx              # Blog listing page
│   └── [slug]/
│       └── page.tsx          # Individual blog post page
├── admin/
│   └── blog/
│       └── page.tsx          # Admin panel for blog management
└── api/
    ├── blog/
    │   ├── route.ts          # Public blog API (GET posts)
    │   └── [slug]/
    │       └── route.ts      # Get single post + increment views
    └── admin/
        └── blog/
            ├── route.ts      # Admin API (GET all, POST new)
            └── [id]/
                └── route.ts  # Delete post

lib/
└── types.ts                  # BlogPost interface

seed/
└── test-blog-post.sql        # Sample blog post

public/
└── images/
    └── blog-test-1.svg       # Sample blog cover image
```

## Image Upload

The blog supports multiple image storage options (same as prompts):

1. **Cloudflare R2** (if configured)
2. **Supabase Storage** (if R2 not available)
3. **Base64 fallback** (if both fail)

Images are automatically optimized before upload.

## Navigation

The blog link has been added to the main navigation header, making it easily accessible from any page.

## Testing Locally

1. Make sure your Supabase credentials are in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Visit:
   - http://localhost:3000/blog - View blog
   - http://localhost:3000/admin/blog - Manage posts

4. Create a test post and verify everything works

## Deployment

Once tested locally:

1. Commit your changes (when ready)
2. Push to your repository
3. Deploy to Vercel
4. Run the database migrations in your production Supabase instance

## Customization

### Styling
- Blog pages use the same theme as the rest of the app (orange/yellow gradient)
- Modify Tailwind classes in the page components to customize appearance

### Content
- Add more fields to the blog_posts table if needed
- Update the BlogPost interface in `lib/types.ts`
- Modify the API routes and components accordingly

## Troubleshooting

**Posts not showing up?**
- Check that posts are marked as `published: true`
- Verify Supabase connection in `.env.local`
- Check browser console for errors

**Image upload failing?**
- Check R2 or Supabase Storage configuration
- System will fallback to base64 if storage fails
- Check file size (large files may timeout)

**Can't access admin panel?**
- Admin panel has no authentication by default
- Add authentication if deploying to production
- Consider using Supabase Auth or NextAuth.js

## Next Steps

Consider adding:
- Rich text editor (TinyMCE, Quill, or Tiptap)
- Authentication for admin panel
- Comments system
- Related posts suggestions
- Search functionality
- RSS feed
- Social sharing buttons
- Reading time estimate
