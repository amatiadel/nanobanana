# Blog Feature - Quick Start

## 🚀 Get Started in 3 Steps

### Step 1: Update Database
Run this SQL in your Supabase SQL Editor:

```sql
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

CREATE INDEX blog_posts_created_at_idx ON blog_posts(created_at DESC);
CREATE INDEX blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX blog_posts_published_idx ON blog_posts(published);
CREATE INDEX blog_posts_tags_idx ON blog_posts USING GIN(tags);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read published posts"
  ON blog_posts FOR SELECT TO anon USING (published = true);

CREATE POLICY "Allow anonymous insert blog posts"
  ON blog_posts FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous update blog posts"
  ON blog_posts FOR UPDATE TO anon USING (true) WITH CHECK (true);

CREATE POLICY "Allow anonymous delete blog posts"
  ON blog_posts FOR DELETE TO anon USING (true);
```

### Step 2: Add Sample Posts (Optional)
Run the SQL from `seed/blog-posts-sample.sql` to create 3 test blog posts.

### Step 3: Test Locally

```bash
# Start dev server
pnpm dev

# Visit these URLs:
# - http://localhost:3000/blog (view blog)
# - http://localhost:3000/admin/blog (create posts)
```

## 📝 Create Your First Post

1. Go to http://localhost:3000/admin/blog
2. Click "New Post"
3. Fill in:
   - Title: "My First Blog Post"
   - Excerpt: "A short description"
   - Content: "Your blog content here (HTML supported)"
   - Tags: "tutorial, test"
   - Author Name: "Your Name"
   - Upload a cover image
   - Check "Publish immediately"
4. Click "Create Blog Post"
5. View it at http://localhost:3000/blog

## ✅ What's Included

- ✅ Blog listing page (`/blog`)
- ✅ Individual post pages (`/blog/[slug]`)
- ✅ Admin panel (`/admin/blog`)
- ✅ Image upload (R2/Supabase/base64)
- ✅ Tags & categories
- ✅ View counter
- ✅ Draft/Published status
- ✅ Navigation link in header

## 🎨 Features

- Responsive design matching app theme
- Automatic image optimization
- SEO-friendly URLs (slugs)
- View tracking
- Tag filtering ready
- HTML content support

## 📚 Full Documentation

See `BLOG_SETUP.md` for complete documentation.

## 🚢 Deploy to Production

1. Test everything locally
2. Commit changes (when ready)
3. Push to GitHub
4. Deploy to Vercel
5. Run database migrations in production Supabase

## 🔒 Security Note

The admin panel has no authentication by default. Add authentication before deploying to production!

Consider using:
- Supabase Auth
- NextAuth.js
- Clerk
- Or simple password protection

## 🎯 Next Steps

- Add rich text editor
- Implement search
- Add comments
- Create RSS feed
- Add social sharing
- Implement authentication

Happy blogging! 🎉
