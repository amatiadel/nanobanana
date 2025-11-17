# Blog Content Formatting Guide

## How to Format Your Blog Posts

The blog content field supports HTML, so you can use HTML tags to format your text.

## Text Formatting

### Bold Text
```html
<strong>This text is bold</strong>
or
<b>This text is also bold</b>
```

### Italic Text
```html
<em>This text is italic</em>
or
<i>This text is also italic</i>
```

### Underline
```html
<u>This text is underlined</u>
```

### Headings
```html
<h2>Main Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Smaller Heading</h4>
```

## Lists

### Bullet List
```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### Numbered List
```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

## Links
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Click here</a>
```

## Images

### Simple Image
```html
<img src="https://your-image-url.com/image.jpg" alt="Description" />
```

### Image with Styling
```html
<img 
  src="https://your-image-url.com/image.jpg" 
  alt="Description" 
  style="width: 100%; max-width: 600px; height: auto; border-radius: 8px; margin: 20px 0;"
/>
```

### Centered Image
```html
<div style="text-align: center; margin: 30px 0;">
  <img 
    src="https://your-image-url.com/image.jpg" 
    alt="Description" 
    style="max-width: 100%; height: auto; border-radius: 8px;"
  />
  <p style="font-size: 14px; color: #666; margin-top: 10px;">Image caption</p>
</div>
```

## Paragraphs
```html
<p>This is a paragraph of text.</p>
<p>This is another paragraph.</p>
```

## Blockquotes
```html
<blockquote style="border-left: 4px solid #f59e0b; padding-left: 20px; margin: 20px 0; font-style: italic; color: #666;">
  This is a quote or important note.
</blockquote>
```

## Code Blocks

### Inline Code
```html
<code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace;">code here</code>
```

### Code Block
```html
<pre style="background: #1f2937; color: #f3f4f6; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;">
<code>function example() {
  console.log("Hello World");
}</code>
</pre>
```

## Dividers
```html
<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 40px 0;" />
```

## Colored Text
```html
<span style="color: #f59e0b;">Orange text</span>
<span style="color: #ef4444;">Red text</span>
<span style="color: #10b981;">Green text</span>
```

## Highlighted Text
```html
<mark style="background-color: #fef3c7; padding: 2px 4px;">Highlighted text</mark>
```

## Complete Example

Here's a complete example of formatted blog content:

```html
<h2>Introduction</h2>
<p>Welcome to this <strong>amazing tutorial</strong> where you'll learn how to create stunning AI images!</p>

<h2>What You'll Need</h2>
<ul>
  <li>A computer or smartphone</li>
  <li>Internet connection</li>
  <li>Creativity and imagination</li>
</ul>

<h2>Step-by-Step Guide</h2>

<h3>Step 1: Choose Your Style</h3>
<p>First, decide what style you want. Here are some popular options:</p>

<div style="text-align: center; margin: 30px 0;">
  <img 
    src="https://example.com/style-examples.jpg" 
    alt="Different AI art styles" 
    style="max-width: 100%; height: auto; border-radius: 8px;"
  />
  <p style="font-size: 14px; color: #666; margin-top: 10px;">Various AI art styles</p>
</div>

<blockquote style="border-left: 4px solid #f59e0b; padding-left: 20px; margin: 20px 0; font-style: italic; color: #666;">
  <strong>Pro Tip:</strong> Start with simple prompts and gradually add more details!
</blockquote>

<h3>Step 2: Write Your Prompt</h3>
<p>Use this template:</p>

<pre style="background: #1f2937; color: #f3f4f6; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0;">
<code>[Subject] + [Style] + [Lighting] + [Details]</code>
</pre>

<p>For example: <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace;">cinematic portrait, dramatic lighting, 8k resolution</code></p>

<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 40px 0;" />

<h2>Conclusion</h2>
<p>Now you're ready to create <em>amazing</em> AI art! Visit <a href="https://example.com" target="_blank" rel="noopener noreferrer">our gallery</a> for more inspiration.</p>

<p><mark style="background-color: #fef3c7; padding: 2px 4px;">Happy creating!</mark> 🎨</p>
```

## Tips for Best Results

1. **Keep it readable**: Don't overuse formatting
2. **Use headings**: Break content into sections with `<h2>` and `<h3>`
3. **Add images**: Visual content makes posts more engaging
4. **Use lists**: They're easier to scan than long paragraphs
5. **Add spacing**: Use `<p>` tags and margins for breathing room
6. **Test your HTML**: Preview before publishing

## Image Best Practices

### Where to Host Images
- **Cloudflare R2**: If you have it configured
- **Supabase Storage**: Upload to your Supabase bucket
- **External CDN**: Imgur, Cloudinary, etc.
- **Direct URLs**: Any publicly accessible image URL

### Image Sizes
- **Full width**: `style="width: 100%; height: auto;"`
- **Fixed width**: `style="width: 600px; max-width: 100%; height: auto;"`
- **Thumbnail**: `style="width: 200px; height: auto;"`

### Responsive Images
Always include `max-width: 100%` to ensure images work on mobile:
```html
<img 
  src="your-image.jpg" 
  alt="Description" 
  style="width: 100%; max-width: 800px; height: auto; display: block; margin: 0 auto;"
/>
```

## Quick Reference

| Element | HTML |
|---------|------|
| Bold | `<strong>text</strong>` |
| Italic | `<em>text</em>` |
| Link | `<a href="url">text</a>` |
| Image | `<img src="url" alt="text" />` |
| Heading | `<h2>text</h2>` |
| Paragraph | `<p>text</p>` |
| List | `<ul><li>item</li></ul>` |
| Code | `<code>text</code>` |

## Need a Rich Text Editor?

For easier formatting, consider adding a rich text editor like:
- **TinyMCE** - Full-featured WYSIWYG editor
- **Quill** - Modern, lightweight editor
- **Tiptap** - Headless editor with React support

These can be added to the admin panel to make content creation easier!
