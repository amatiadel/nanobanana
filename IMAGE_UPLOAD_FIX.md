# Image Upload 413 Error Fix

## Problem

Getting `413 Content Too Large` error when uploading prompts with images.

## Cause

Vercel has a **4.5MB limit** on request body size for serverless functions. Large images exceed this limit.

## Solutions Implemented

### 1. Server-Side Optimization
- Images are automatically optimized using Sharp
- Resized to max 1600x1600px
- Compressed to 82% quality JPEG
- This happens in `lib/image.ts`

### 2. Configuration Updates
- Added `maxDuration: 60` to API routes
- Updated `next.config.js` with body size settings

### 3. Client-Side Compression (Recommended)

To prevent 413 errors, compress images BEFORE uploading:

```typescript
import { compressImage } from '@/lib/client-image-compress';

// In your upload handler:
const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    // Compress image before upload
    const compressedFile = await compressImage(file, {
      maxWidth: 1600,
      maxHeight: 1600,
      quality: 0.8,
      maxSizeMB: 2,
    });

    // Now upload the compressed file
    formData.append('image', compressedFile);
    // ... rest of upload logic
  } catch (error) {
    console.error('Image compression failed:', error);
  }
};
```

## Best Practices

1. **Compress on client** - Reduces upload time and prevents 413 errors
2. **Show file size** - Display original and compressed sizes to users
3. **Validate size** - Warn users if file is too large before uploading
4. **Use progress indicator** - Show upload progress for better UX

## File Size Limits

- **Vercel limit**: 4.5MB (hard limit)
- **Recommended max**: 2MB after compression
- **Target dimensions**: 1600x1600px or smaller

## Testing

To test if compression is working:

1. Try uploading a large image (5MB+)
2. Check browser console for compression logs
3. Verify the uploaded image is under 2MB
4. Confirm image quality is acceptable

## If Still Getting 413 Errors

1. Check image file size before upload
2. Ensure client-side compression is working
3. Try reducing quality setting (0.7 instead of 0.8)
4. Consider using a different hosting platform with higher limits
