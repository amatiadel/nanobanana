-- Banana Prompts - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Create prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  prompt TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  premium BOOLEAN DEFAULT FALSE,
  cover_url TEXT NOT NULL,
  full_image_url TEXT,
  creator_id TEXT NOT NULL,
  creator_handle TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS prompts_likes_idx ON prompts(likes DESC);
CREATE INDEX IF NOT EXISTS prompts_created_at_idx ON prompts(created_at DESC);
CREATE INDEX IF NOT EXISTS prompts_tags_idx ON prompts USING GIN(tags);
CREATE INDEX IF NOT EXISTS prompts_slug_idx ON prompts(slug);

-- Enable Row Level Security
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous read access
CREATE POLICY "Allow anonymous read access"
  ON prompts
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to insert prompts (for admin panel)
CREATE POLICY "Allow anonymous insert"
  ON prompts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to update prompts (for likes and admin edits)
CREATE POLICY "Allow anonymous update"
  ON prompts
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to delete prompts (for admin panel)
CREATE POLICY "Allow anonymous delete"
  ON prompts
  FOR DELETE
  TO anon
  USING (true);

-- Sample data insert (optional - for testing)
-- You can also use the seed data from seed/prompts.json
INSERT INTO prompts (slug, title, description, prompt, tags, likes, premium, cover_url, creator_id, creator_handle)
VALUES 
  (
    'cinematic-portrait',
    'Cinematic Portrait',
    'A stunning cinematic portrait with dramatic lighting and depth of field',
    'cinematic portrait of a woman, dramatic lighting, shallow depth of field, 85mm lens, golden hour, professional photography, high detail, bokeh background',
    ARRAY['cinematic', 'realistic', 'elegant'],
    342,
    true,
    '/images/placeholder.svg',
    'user-1',
    '@artisan_ai'
  ),
  (
    'cyberpunk-city',
    'Cyberpunk City',
    'Neon-lit futuristic cityscape with flying vehicles and holographic advertisements',
    'cyberpunk city at night, neon lights, flying cars, holographic billboards, rain-soaked streets, futuristic architecture, purple and blue color palette, highly detailed',
    ARRAY['cyberpunk', 'sci-fi', 'neon', 'dark-moody'],
    287,
    false,
    '/images/placeholder.svg',
    'user-2',
    '@pixel_wizard'
  )
ON CONFLICT (slug) DO NOTHING;

-- Verify the setup
SELECT 
  'Prompts table created' as status,
  COUNT(*) as sample_count 
FROM prompts;
