/**
 * Cloudflare R2 Storage Client
 * S3-compatible object storage with zero egress fees
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Initialize R2 client (S3-compatible)
const r2Client = process.env.R2_ACCOUNT_ID
  ? new S3Client({
      region: 'auto',
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      },
    })
  : null;

const R2_BUCKET = process.env.R2_BUCKET_NAME || 'prompts';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || '';

/**
 * Upload a file to Cloudflare R2
 * @param buffer File buffer
 * @param filename Filename with extension
 * @param contentType MIME type
 * @returns Public URL of uploaded file
 */
export async function uploadToR2(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  if (!r2Client) {
    console.error('R2 client not configured. Check environment variables:');
    console.error('R2_ACCOUNT_ID:', process.env.R2_ACCOUNT_ID ? 'Set' : 'Missing');
    console.error('R2_ACCESS_KEY_ID:', process.env.R2_ACCESS_KEY_ID ? 'Set' : 'Missing');
    console.error('R2_SECRET_ACCESS_KEY:', process.env.R2_SECRET_ACCESS_KEY ? 'Set' : 'Missing');
    console.error('R2_BUCKET_NAME:', process.env.R2_BUCKET_NAME ? 'Set' : 'Missing');
    throw new Error('R2 client not configured - check environment variables');
  }

  const key = `images/${filename}`;

  console.log('Uploading to R2:', {
    bucket: R2_BUCKET,
    key,
    contentType,
    bufferSize: buffer.length,
  });

  try {
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await r2Client.send(command);

    // Return public URL
    // If you have a custom domain, use that, otherwise use R2.dev URL
    const publicUrl = R2_PUBLIC_URL
      ? `${R2_PUBLIC_URL}/${key}`
      : `https://${R2_BUCKET}.${process.env.R2_ACCOUNT_ID}.r2.dev/${key}`;

    console.log('R2 upload successful:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('R2 upload failed:', error);
    throw error;
  }
}

/**
 * Check if R2 is configured
 */
export function isR2Configured(): boolean {
  return !!(
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY &&
    process.env.R2_BUCKET_NAME
  );
}
