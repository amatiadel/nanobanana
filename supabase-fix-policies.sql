-- Fix Row Level Security Policies for Prompts Table
-- Run this in Supabase SQL Editor to allow inserts/updates/deletes

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous insert" ON prompts;
DROP POLICY IF EXISTS "Allow anonymous update" ON prompts;
DROP POLICY IF EXISTS "Allow anonymous delete" ON prompts;

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

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'prompts';
