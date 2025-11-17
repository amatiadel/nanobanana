# Cloudflare R2 Storage Setup Guide

Cloudflare R2 is an S3-compatible object storage with **zero egress fees** - perfect for serving images!

## Why R2?
- ✅ **Zero egress fees** (unlike AWS S3)
- ✅ **$0.015/GB storage** (very affordable)
- ✅ **Fast global CDN**
- ✅ **S3-compatible API**
- ✅ **10GB free storage per month**

## Setup Steps

### 1. Create Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Sign up for a free account
3. Verify your email

### 2. Create R2 Bucket
1. In Cloudflare dashboard, click **R2** in the left sidebar
2. Click **"Create bucket"**
3. Bucket name: `nanobanana-prompts` (or any name you prefer)
4. Location: **Automatic** (recommended)
5. Click **"Create bucket"**

### 3. Enable Public Access
1. Click on your bucket
2. Go to **Settings** tab
3. Scroll to **"Public access"**
4. Click **"Allow Access"**
5. Copy the **Public R2.dev Subdomain** (e.g., `https://pub-xxxxx.r2.dev`)
6. Save this URL - you'll need it!

### 4. Create API Token
1. Go back to R2 overview page
2. Click **"Manage R2 API Tokens"** (top right)
3. Click **"Create API token"**
4. Settings:
   - **Token name**: `nanobanana-upload`
   - **Permissions**: 
     - ✅ Object Read & Write
   - **Specify bucket(s)**: Select your bucket
   - **TTL**: Leave blank (no expiration)
5. Click **"Create API Token"**
6. **IMPORTANT**: Copy these values (you won't see them again!):
   - **Access Key ID**
   - **Secret Access Key**
   - **Account ID** (also shown at the top)

### 5. Add Environment Variables to Vercel
1. Go to https://vercel.com/dashboard
2. Select your **nanobanana** project
3. Go to **Settings** → **Environment Variables**
4. Add these **4 variables**:

   **Variable 1:**
   - Name: `R2_ACCOUNT_ID`
   - Value: (your Account ID from step 4)
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 2:**
   - Name: `R2_ACCESS_KEY_ID`
   - Value: (your Access Key ID from step 4)
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 3:**
   - Name: `R2_SECRET_ACCESS_KEY`
   - Value: (your Secret Access Key from step 4)
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 4:**
   - Name: `R2_BUCKET_NAME`
   - Value: `nanobanana-prompts` (your bucket name)
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 5:**
   - Name: `R2_PUBLIC_URL`
   - Value: (your Public R2.dev URL from step 3, e.g., `https://pub-xxxxx.r2.dev`)
   - Environments: ✅ Production ✅ Preview ✅ Development

5. Click **"Save"** for each

### 6. Redeploy
1. In Vercel, go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

## Optional: Custom Domain (Recommended)

Instead of using `pub-xxxxx.r2.dev`, you can use your own domain:

1. In R2 bucket settings, go to **"Custom Domains"**
2. Click **"Connect Domain"**
3. Enter your domain (e.g., `cdn.nanobanana.com`)
4. Follow DNS setup instructions
5. Update `R2_PUBLIC_URL` in Vercel to your custom domain

## Testing

After setup:
1. Go to your admin panel: `https://your-site.vercel.app/adminconstantine`
2. Try adding a new prompt with an image
3. Image should upload to R2 successfully!

## Cost Estimate

For a typical prompt gallery:
- **Storage**: 1000 images × 500KB = 500MB = **$0.0075/month**
- **Egress**: **$0** (R2's main benefit!)
- **Operations**: ~10,000 reads/month = **$0.36/month**

**Total: ~$0.37/month** for 1000 images! 🎉

## Troubleshooting

**Error: "R2 client not configured"**
- Check all 4 environment variables are set in Vercel
- Make sure you redeployed after adding variables

**Error: "Access Denied"**
- Verify API token has "Object Read & Write" permissions
- Check bucket name matches exactly

**Images not loading**
- Verify bucket has public access enabled
- Check R2_PUBLIC_URL is correct
- Make sure URL doesn't have trailing slash

## Priority Order

The app will try storage in this order:
1. **Cloudflare R2** (if configured) ← Best option!
2. **Supabase Storage** (if configured)
3. **Base64 in database** (fallback)
4. **Local filesystem** (development only)
