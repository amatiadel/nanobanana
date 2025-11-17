# Fix R2 Images Not Loading

If images aren't loading, it's likely a public access or CORS issue. Follow these steps:

## Step 1: Enable Public Access on R2 Bucket

1. Go to Cloudflare Dashboard → R2
2. Click on your bucket (`nanobanana-prompts`)
3. Go to **Settings** tab
4. Scroll to **"Public access"** section
5. Click **"Allow Access"**
6. You'll see a **Public R2.dev Subdomain** like: `https://pub-xxxxxxxxxxxxx.r2.dev`
7. **Copy this URL** - this is your `R2_PUBLIC_URL`

## Step 2: Update R2_PUBLIC_URL in Vercel

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Find `R2_PUBLIC_URL`
3. Update it to your Public R2.dev URL (from Step 1)
4. Make sure it does NOT have a trailing slash
5. Example: `https://pub-abc123def456.r2.dev` ✅
6. NOT: `https://pub-abc123def456.r2.dev/` ❌

## Step 3: Configure CORS on R2 Bucket

1. In your R2 bucket, go to **Settings** tab
2. Scroll to **"CORS policy"**
3. Click **"Edit CORS policy"**
4. Paste this configuration:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

5. Click **"Save"**

## Step 4: Verify Image URL Format

Your images should be accessible at:
```
https://pub-xxxxxxxxxxxxx.r2.dev/images/filename.jpg
```

Test by opening this URL in your browser - you should see the image.

## Step 5: Redeploy Vercel

1. Go to Vercel → Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"

## Alternative: Use Custom Domain (Optional)

Instead of `pub-xxxxx.r2.dev`, you can use your own domain:

1. In R2 bucket → Settings → **Custom Domains**
2. Click **"Connect Domain"**
3. Enter: `cdn.yourdomain.com`
4. Add the CNAME record to your DNS:
   - Type: CNAME
   - Name: cdn
   - Target: (provided by Cloudflare)
5. Update `R2_PUBLIC_URL` in Vercel to: `https://cdn.yourdomain.com`

## Troubleshooting

**Images still not loading?**

Check the browser console (F12) for errors:

- **403 Forbidden**: Public access not enabled
- **CORS error**: CORS policy not configured
- **404 Not Found**: Wrong R2_PUBLIC_URL or bucket name

**Quick Test:**

Open browser console and run:
```javascript
fetch('https://pub-xxxxx.r2.dev/images/test.jpg')
  .then(r => console.log('Status:', r.status))
  .catch(e => console.error('Error:', e))
```

Replace with your actual R2 URL. Should return status 200 or 404 (not 403).
