# Rich Text Editor Guide

## Overview

The blog admin now includes a rich text editor with formatting toolbar and image upload functionality. No more manual HTML or image URL management!

## Features

### Text Formatting Buttons

- **H1, H2, H3**: Create headings at different levels
- **Bold**: Make text bold
- **Italic**: Make text italic
- **Bullet List**: Create unordered lists
- **Numbered List**: Create ordered lists
- **Link**: Add hyperlinks

### Image Upload

- **Image Button**: Click to upload images directly into your content
- Images are automatically uploaded to Cloudflare R2
- No need to manually get URLs or write HTML

## How to Use

### 1. Formatting Text

1. Select the text you want to format
2. Click the appropriate button in the toolbar
3. The HTML tags will be added automatically

Example:
- Select "Important Title" → Click H1 → Result: `<h1>Important Title</h1>`
- Select "bold text" → Click Bold → Result: `<strong>bold text</strong>`

### 2. Adding Images

1. Click the image icon (📷) in the toolbar
2. Select an image from your computer
3. Wait for upload (you'll see a spinning icon)
4. The image HTML will be inserted automatically with proper styling

The inserted HTML looks like:
```html
<img src="https://your-r2-url.com/image.jpg" alt="Image" class="w-full rounded-lg my-4" />
```

### 3. Adding Links

1. Select the text you want to link
2. Click the link button
3. Replace "URL" with your actual link
4. Example: `<a href="https://example.com">Click here</a>`

### 4. Creating Lists

**Bullet List:**
```html
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>
```

**Numbered List:**
```html
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>
```

## Tips

- You can still write HTML directly if you prefer
- The editor shows the raw HTML so you have full control
- Images are automatically styled with Tailwind classes for responsive design
- All uploaded images are stored in Cloudflare R2 with unique filenames

## Example Blog Post Content

```html
<h1>Getting Started with AI Prompts</h1>

<p>Welcome to our comprehensive guide on AI prompts!</p>

<img src="https://your-r2-url.com/intro-image.jpg" alt="Image" class="w-full rounded-lg my-4" />

<h2>What You'll Learn</h2>

<ul>
  <li>How to write effective prompts</li>
  <li>Common mistakes to avoid</li>
  <li>Advanced techniques</li>
</ul>

<h2>Key Concepts</h2>

<p>Here are the <strong>most important</strong> things to remember:</p>

<ol>
  <li>Be specific and clear</li>
  <li>Provide context</li>
  <li>Iterate and refine</li>
</ol>

<p>For more information, visit <a href="https://example.com">our resources page</a>.</p>
```

## Troubleshooting

**Image upload fails:**
- Check that R2 is configured (see R2_SETUP.md)
- Verify environment variables are set
- Check browser console for errors

**Formatting doesn't work:**
- Make sure you select text before clicking format buttons
- Check that the HTML tags are properly closed

**Images don't display:**
- Verify R2 CORS settings (see R2_CORS_FIX.md)
- Check that R2_PUBLIC_URL is set correctly
