-- Test Blog Post
-- Run this in your Supabase SQL Editor to create a test blog post

INSERT INTO blog_posts (
  slug,
  title,
  excerpt,
  content,
  cover_image_url,
  author_name,
  author_avatar_url,
  tags,
  published,
  views
) VALUES (
  'getting-started-with-ai-prompts',
  'Getting Started with AI Prompts: A Comprehensive Guide',
  'Learn the fundamentals of crafting effective AI image prompts and unlock your creative potential with our step-by-step guide.',
  '<h2>Introduction to AI Prompts</h2>

<p>AI image generation has revolutionized the way we create visual content. Whether you''re an artist, designer, or hobbyist, understanding how to craft effective prompts is essential for getting the best results from AI image generators.</p>

<h2>What Makes a Good Prompt?</h2>

<p>A well-crafted prompt typically includes several key elements:</p>

<ul>
<li><strong>Subject:</strong> The main focus of your image (e.g., "a portrait of a woman")</li>
<li><strong>Style:</strong> The artistic style you want (e.g., "cinematic", "oil painting", "photorealistic")</li>
<li><strong>Lighting:</strong> How the scene is lit (e.g., "golden hour", "dramatic lighting", "soft ambient light")</li>
<li><strong>Composition:</strong> How elements are arranged (e.g., "close-up", "wide angle", "rule of thirds")</li>
<li><strong>Details:</strong> Specific attributes that enhance the image (e.g., "high detail", "8k resolution", "bokeh background")</li>
</ul>

<h2>Basic Prompt Structure</h2>

<p>Here''s a simple formula to get started:</p>

<p><code>[Subject] + [Style] + [Lighting] + [Composition] + [Details]</code></p>

<p>For example: "Portrait of a woman, cinematic style, golden hour lighting, close-up shot, high detail, bokeh background"</p>

<h2>Advanced Techniques</h2>

<h3>1. Use Descriptive Adjectives</h3>
<p>Instead of "a house", try "a cozy Victorian house with ivy-covered walls"</p>

<h3>2. Reference Art Styles</h3>
<p>Mention specific art movements or artists: "in the style of Van Gogh" or "cyberpunk aesthetic"</p>

<h3>3. Specify Camera Settings</h3>
<p>Add photography terms: "85mm lens, f/1.4, shallow depth of field"</p>

<h3>4. Control Mood and Atmosphere</h3>
<p>Include emotional descriptors: "melancholic", "joyful", "mysterious", "serene"</p>

<h2>Common Mistakes to Avoid</h2>

<ul>
<li><strong>Being too vague:</strong> "A nice picture" won''t give you good results</li>
<li><strong>Contradictory terms:</strong> "Bright dark scene" confuses the AI</li>
<li><strong>Too many concepts:</strong> Keep it focused on one main idea</li>
<li><strong>Ignoring negative prompts:</strong> Use negative prompts to exclude unwanted elements</li>
</ul>

<h2>Practice Examples</h2>

<p><strong>Example 1 - Portrait:</strong><br/>
"Cinematic portrait of a woman, dramatic lighting, shallow depth of field, 85mm lens, golden hour, professional photography, high detail, bokeh background"</p>

<p><strong>Example 2 - Landscape:</strong><br/>
"Majestic mountain landscape at sunset, dramatic clouds, vibrant colors, wide angle shot, highly detailed, 8k resolution, nature photography"</p>

<p><strong>Example 3 - Fantasy:</strong><br/>
"Mystical forest with glowing mushrooms, ethereal lighting, magical atmosphere, fantasy art style, detailed foliage, enchanted ambiance"</p>

<h2>Conclusion</h2>

<p>Mastering AI prompts takes practice, but with these fundamentals, you''re well on your way to creating stunning images. Start simple, experiment with different combinations, and don''t be afraid to iterate on your prompts.</p>

<p>Remember: the best way to learn is by doing. Try different variations, study what works, and build your own prompt library over time.</p>

<p>Happy prompting!</p>',
  '/images/blog-test-1.svg',
  'Sarah Johnson',
  NULL,
  ARRAY['tutorial', 'beginner', 'ai-art', 'guide', 'tips'],
  true,
  0
) ON CONFLICT (slug) DO NOTHING;

-- Verify the insert
SELECT 
  'Blog post created' as status,
  title,
  slug,
  author_name
FROM blog_posts 
WHERE slug = 'getting-started-with-ai-prompts';
