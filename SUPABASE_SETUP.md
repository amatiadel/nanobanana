# Supabase Setup Guide for Banana Prompts

## Quick Setup Steps

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Sign up or login
3. Click **"New Project"**
4. Fill in:
   - **Name**: nanobanana
   - **Database Password**: (create a strong password and save it!)
   - **Region**: Choose closest to your users (e.g., US East, Europe West)
5. Click **"Create new project"**
6. Wait ~2 minutes for setup to complete

### 2. Run Database Schema
1. In Supabase dashboard, click **"SQL Editor"** in left sidebar
2. Click **"New Query"**
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste into the SQL editor
5. Click **"Run"** (or press Ctrl+Enter)
6. You should see "Success" message

### 3. Create Storage Bucket (for image uploads)
1. In Supabase dashboard, click **"Storage"** in left sidebar
2. Click **"New bucket"**
3. Name it: `prompts`
4. Make it **Public** (toggle the switch)
5. Click **"Create bucket"**

### 4. Get Your API Credentials
1. Click **Settings** (gear icon) in left sidebar
2. Go to **"API"** section
3. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

### 5. Add to Vercel
1. Go to https://vercel.com/dashboard
2. Select your **nanobanana** project
3. Go to **Settings** → **Environment Variables**
4. Add two variables:

   **First Variable:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (paste your Project URL)
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Second Variable:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (paste your anon public key)
   - Environments: ✅ Production ✅ Preview ✅ Development

5. Click **"Save"** for each

### 6. Redeploy
1. In Vercel, go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

### 7. Import Your Existing Data (Optional)
If you want to import your seed data into Supabase:

1. Go to SQL Editor in Supabase
2. Run this query to see your current data structure:
```sql
SELECT * FROM prompts LIMIT 5;
```

3. You can manually add prompts via the admin panel at:
   `https://your-site.vercel.app/adminconstantine`

## Testing

After setup, test these features:
- ✅ Browse prompts (should work)
- ✅ Search and filter (should work)
- ✅ Like a prompt (should persist!)
- ✅ Admin panel - add new prompt (should work)
- ✅ Admin panel - delete prompt (should work)

## Troubleshooting

**Error: "Failed to fetch prompts"**
- Check that environment variables are set correctly in Vercel
- Verify the Supabase URL and key are correct
- Make sure you ran the SQL schema

**Error: "Storage bucket not found"**
- Create the `prompts` bucket in Supabase Storage
- Make sure it's set to Public

**Admin panel not working**
- Username: `amati`
- Password: `adelamati2505`
- Make sure you're accessing `/adminconstantine`

## What Changed

Your app now:
- ✅ Uses Supabase when environment variables are set
- ✅ Falls back to JSON files in local development
- ✅ Supports persistent likes and data
- ✅ Allows image uploads to Supabase Storage
- ✅ Works perfectly on Vercel

## Local Development

For local development without Supabase:
1. Don't set the environment variables
2. App will use JSON files automatically
3. Data stored in `data/gallery-prompts.json`
