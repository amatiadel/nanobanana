-- Example Blog Post with Rich HTML Formatting
-- This shows how to use bold text, images, lists, and more in your blog content

INSERT INTO blog_posts (
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  author_name,
  tags,
  published,
  views
) VALUES (
  'how-to-format-blog-posts-with-images-and-styling',
  'How to Format Blog Posts with Images and Styling',
  'Learn how to create beautifully formatted blog posts with bold text, images, lists, and more using HTML formatting.',
  '<h2>Introduction</h2>
<p>Welcome to this comprehensive guide on <strong>formatting blog posts</strong>! In this tutorial, you''ll learn how to make your content stand out with proper formatting.</p>

<h2>Text Formatting Basics</h2>
<p>You can make text <strong>bold</strong>, <em>italic</em>, or <u>underlined</u>. You can also combine them: <strong><em>bold and italic</em></strong>!</p>

<h3>Using Headings</h3>
<p>Headings help organize your content. Use <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">&lt;h2&gt;</code> for main sections and <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">&lt;h3&gt;</code> for subsections.</p>

<h2>Adding Images</h2>
<p>Images make your posts more engaging. Here''s how to add them:</p>

<div style="text-align: center; margin: 30px 0;">
  <img 
    src="/images/portrait-5.svg" 
    alt="Example image" 
    style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
  />
  <p style="font-size: 14px; color: #666; margin-top: 10px; font-style: italic;">This is an image caption</p>
</div>

<blockquote style="border-left: 4px solid #f59e0b; padding-left: 20px; margin: 20px 0; font-style: italic; color: #666; background: #fef3c7; padding: 15px 20px; border-radius: 4px;">
  <strong>💡 Pro Tip:</strong> Always add alt text to your images for better accessibility and SEO!
</blockquote>

<h2>Creating Lists</h2>

<h3>Bullet Points</h3>
<p>Use bullet lists for unordered items:</p>
<ul style="margin: 15px 0; padding-left: 30px;">
  <li><strong>First item</strong> - This is important</li>
  <li><em>Second item</em> - This is emphasized</li>
  <li>Third item - Regular text</li>
</ul>

<h3>Numbered Lists</h3>
<p>Use numbered lists for steps or ordered items:</p>
<ol style="margin: 15px 0; padding-left: 30px;">
  <li>Open the admin panel</li>
  <li>Click "New Post"</li>
  <li>Add your content with HTML</li>
  <li>Click "Create Blog Post"</li>
</ol>

<hr style="border: none; border-top: 2px solid #e5e7eb; margin: 40px 0;" />

<h2>Code Examples</h2>
<p>You can show code snippets inline like <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace;">const x = 10;</code> or in blocks:</p>

<pre style="background: #1f2937; color: #f3f4f6; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 20px 0; font-family: monospace;">
<code>function createPrompt(subject, style) {
  return `${subject}, ${style}, high detail`;
}

const prompt = createPrompt("portrait", "cinematic");
console.log(prompt);</code>
</pre>

<h2>Highlighting Important Information</h2>
<p>You can <mark style="background-color: #fef3c7; padding: 2px 4px;">highlight important text</mark> or use <span style="color: #f59e0b; font-weight: bold;">colored text</span> to draw attention.</p>

<h2>Adding Links</h2>
<p>Create links to other pages: <a href="/blog" style="color: #f59e0b; text-decoration: underline;">View all blog posts</a> or external sites: <a href="https://example.com" target="_blank" rel="noopener noreferrer" style="color: #3b82f6; text-decoration: underline;">Visit Example.com</a></p>

<h2>Multiple Images in a Row</h2>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0;">
  <div style="text-align: center;">
    <img src="/images/oil-painting-1.svg" alt="Style 1" style="width: 100%; height: auto; border-radius: 8px;" />
    <p style="font-size: 12px; color: #666; margin-top: 8px;">Oil Painting Style</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/portrait-5.svg" alt="Style 2" style="width: 100%; height: auto; border-radius: 8px;" />
    <p style="font-size: 12px; color: #666; margin-top: 8px;">Portrait Style</p>
  </div>
</div>

<h2>Call-to-Action Box</h2>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%); padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0;">
  <h3 style="margin: 0 0 15px 0; color: #92400e;">Ready to Create Amazing Content?</h3>
  <p style="margin: 0 0 20px 0; color: #78350f;">Start formatting your blog posts like a pro today!</p>
  <a href="/admin/blog" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">Create New Post</a>
</div>

<h2>Conclusion</h2>
<p>Now you know how to create <strong>beautifully formatted blog posts</strong> with:</p>
<ul style="margin: 15px 0; padding-left: 30px;">
  <li>✅ Bold and italic text</li>
  <li>✅ Images with captions</li>
  <li>✅ Lists and headings</li>
  <li>✅ Code blocks</li>
  <li>✅ Highlighted text</li>
  <li>✅ Links and call-to-actions</li>
</ul>

<p style="margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px; text-align: center;">
  <strong>Happy blogging! 🎉</strong><br/>
  <em style="color: #666; font-size: 14px;">For more tips, check out BLOG_CONTENT_FORMATTING.md</em>
</p>',
  '/images/blog-test-1.svg',
  'Content Team',
  ARRAY['tutorial', 'formatting', 'guide', 'html', 'tips'],
  true,
  0
) ON CONFLICT (slug) DO NOTHING;

-- Verify the insert
SELECT 
  'Formatted blog post created' as status,
  title,
  slug
FROM blog_posts 
WHERE slug = 'how-to-format-blog-posts-with-images-and-styling';
