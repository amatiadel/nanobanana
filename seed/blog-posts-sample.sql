-- Sample Blog Posts for Testing
-- Run this in your Supabase SQL Editor to create multiple test blog posts

-- Post 1: Getting Started Guide
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
  'getting-started-with-ai-prompts',
  'Getting Started with AI Prompts: A Comprehensive Guide',
  'Learn the fundamentals of crafting effective AI image prompts and unlock your creative potential with our step-by-step guide.',
  '<h2>Introduction to AI Prompts</h2>
<p>AI image generation has revolutionized the way we create visual content. Whether you''re an artist, designer, or hobbyist, understanding how to craft effective prompts is essential for getting the best results from AI image generators.</p>

<h2>What Makes a Good Prompt?</h2>
<p>A well-crafted prompt typically includes several key elements:</p>
<ul>
<li><strong>Subject:</strong> The main focus of your image</li>
<li><strong>Style:</strong> The artistic style you want</li>
<li><strong>Lighting:</strong> How the scene is lit</li>
<li><strong>Composition:</strong> How elements are arranged</li>
<li><strong>Details:</strong> Specific attributes that enhance the image</li>
</ul>

<h2>Practice Examples</h2>
<p><strong>Example 1 - Portrait:</strong><br/>
"Cinematic portrait of a woman, dramatic lighting, shallow depth of field, 85mm lens, golden hour, professional photography, high detail, bokeh background"</p>

<p><strong>Example 2 - Landscape:</strong><br/>
"Majestic mountain landscape at sunset, dramatic clouds, vibrant colors, wide angle shot, highly detailed, 8k resolution, nature photography"</p>

<h2>Conclusion</h2>
<p>Mastering AI prompts takes practice, but with these fundamentals, you''re well on your way to creating stunning images. Happy prompting!</p>',
  '/images/blog-test-1.svg',
  'Sarah Johnson',
  ARRAY['tutorial', 'beginner', 'ai-art', 'guide', 'tips'],
  true,
  127
) ON CONFLICT (slug) DO NOTHING;

-- Post 2: Advanced Techniques
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
  'advanced-prompt-engineering-techniques',
  'Advanced Prompt Engineering Techniques',
  'Take your AI art to the next level with these advanced prompt engineering strategies used by professional creators.',
  '<h2>Beyond the Basics</h2>
<p>Once you''ve mastered the fundamentals, it''s time to explore advanced techniques that will set your AI-generated images apart from the crowd.</p>

<h2>Technique 1: Weighted Prompts</h2>
<p>Use parentheses and weights to emphasize certain elements:</p>
<p><code>(dramatic lighting:1.5), (soft focus:0.8), portrait</code></p>

<h2>Technique 2: Negative Prompts</h2>
<p>Tell the AI what you DON''T want:</p>
<p><code>Negative: blurry, low quality, distorted, ugly, bad anatomy</code></p>

<h2>Technique 3: Style Mixing</h2>
<p>Combine multiple artistic styles for unique results:</p>
<p><code>cyberpunk aesthetic mixed with art nouveau, neon colors, organic flowing lines</code></p>

<h2>Pro Tips</h2>
<ul>
<li>Experiment with different aspect ratios</li>
<li>Use specific artist names for style reference</li>
<li>Layer multiple concepts gradually</li>
<li>Keep a prompt journal of what works</li>
</ul>

<h2>Conclusion</h2>
<p>These advanced techniques will help you achieve more precise and creative results. Remember, experimentation is key!</p>',
  '/images/portrait-5.svg',
  'Alex Chen',
  ARRAY['advanced', 'techniques', 'ai-art', 'tips', 'professional'],
  true,
  89
) ON CONFLICT (slug) DO NOTHING;

-- Post 3: Trending Styles
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
  'top-5-trending-ai-art-styles-2024',
  'Top 5 Trending AI Art Styles in 2024',
  'Discover the most popular AI art styles dominating the creative scene this year and how to achieve them.',
  '<h2>The AI Art Landscape in 2024</h2>
<p>The world of AI-generated art is constantly evolving. Here are the top 5 styles that are trending right now.</p>

<h2>1. Cinematic Realism</h2>
<p>Photorealistic images with movie-quality lighting and composition. Perfect for portraits and dramatic scenes.</p>
<p><strong>Key terms:</strong> cinematic, dramatic lighting, 85mm lens, shallow depth of field, film grain</p>

<h2>2. Cyberpunk Aesthetics</h2>
<p>Neon-soaked futuristic scenes with a dark, gritty atmosphere.</p>
<p><strong>Key terms:</strong> cyberpunk, neon lights, futuristic, dark moody, rain-soaked streets</p>

<h2>3. Dreamy Surrealism</h2>
<p>Ethereal, otherworldly compositions that blend reality with fantasy.</p>
<p><strong>Key terms:</strong> surreal, dreamlike, ethereal, floating elements, soft pastel colors</p>

<h2>4. Minimalist Modern</h2>
<p>Clean, simple designs with bold colors and geometric shapes.</p>
<p><strong>Key terms:</strong> minimalist, clean lines, bold colors, geometric, modern design</p>

<h2>5. Vintage Analog</h2>
<p>Nostalgic imagery with film photography aesthetics.</p>
<p><strong>Key terms:</strong> vintage, analog film, grainy, warm tones, retro, 35mm film</p>

<h2>Try Them Out!</h2>
<p>Browse our prompt library to find examples of each style and start creating your own masterpieces.</p>',
  '/images/oil-painting-1.svg',
  'Maria Rodriguez',
  ARRAY['trends', 'styles', 'inspiration', '2024', 'popular'],
  true,
  203
) ON CONFLICT (slug) DO NOTHING;

-- Verify the inserts
SELECT 
  'Blog posts created' as status,
  COUNT(*) as total_posts,
  SUM(CASE WHEN published THEN 1 ELSE 0 END) as published_posts
FROM blog_posts;

-- Show all created posts
SELECT 
  title,
  slug,
  author_name,
  array_length(tags, 1) as tag_count,
  views,
  published,
  created_at
FROM blog_posts
ORDER BY created_at DESC;
