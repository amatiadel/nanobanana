# Blog Feature - Testing Checklist

## 🚀 Quick Test (5 minutes)

### Step 1: Database Setup
```bash
# Open Supabase SQL Editor
# Copy and paste from: seed/blog-posts-sample.sql
# Click "Run" to create sample posts
```

### Step 2: Start Dev Server
```bash
pnpm dev
```

### Step 3: Test Pages
- [ ] Visit http://localhost:3000/blog
  - Should see 3 sample blog posts
  - Cards should display properly
  - Images should load

- [ ] Click on a blog post
  - Should navigate to detail page
  - Full content should display
  - View counter should work

- [ ] Visit http://localhost:3000/admin/blog
  - Should see admin panel
  - Table should show 3 posts
  - Stats should be visible

### Step 4: Create New Post
- [ ] Click "New Post" button
- [ ] Fill in form:
  - Title: "Test Post"
  - Excerpt: "This is a test"
  - Content: "Hello world!"
  - Tags: "test"
  - Author: "Your Name"
  - Upload any image
  - Check "Publish immediately"
- [ ] Click "Create Blog Post"
- [ ] Should see success message
- [ ] New post should appear in list

### Step 5: View New Post
- [ ] Click "View Blog" button
- [ ] Find your new post
- [ ] Click to open it
- [ ] Verify everything displays correctly

### Step 6: Delete Test Post
- [ ] Go back to admin panel
- [ ] Click trash icon on test post
- [ ] Confirm deletion
- [ ] Post should disappear

## ✅ All Tests Passed?

If yes, you're ready to:
1. Create real blog posts
2. Deploy to production (after adding auth!)

## ❌ Something Not Working?

### Common Issues

**"Blog posts not showing"**
- Check Supabase connection in .env.local
- Verify blog_posts table exists
- Check browser console for errors

**"Image upload failing"**
- Check file size (< 5MB recommended)
- Verify R2 or Supabase Storage config
- System will fallback to base64

**"Can't create posts"**
- Verify all form fields filled
- Check network tab for API errors
- Ensure Supabase policies are set

**"Page not found"**
- Restart dev server
- Clear Next.js cache: `rm -rf .next`
- Check file paths are correct

## 📝 Notes

- Sample posts have different view counts for testing
- Images use SVG placeholders
- No authentication on admin panel (add before production!)
- HTML content is supported in blog posts

## 🎯 Ready for Production?

Before deploying:
- [ ] Add authentication to admin panel
- [ ] Test with real content
- [ ] Verify image uploads work
- [ ] Check mobile responsiveness
- [ ] Add SEO meta tags
- [ ] Test on different browsers

## 📚 Documentation

- **Quick Start**: BLOG_QUICKSTART.md
- **Full Setup**: BLOG_SETUP.md
- **Summary**: BLOG_FEATURE_SUMMARY.md

Happy testing! 🎉
