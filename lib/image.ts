import sharp from 'sharp';

interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

const DEFAULT_OPTIONS: Required<OptimizeOptions> = {
  maxWidth: 1600,
  maxHeight: 1600,
  quality: 82,
};

export async function optimizeImageBuffer(
  buffer: Buffer,
  filename: string,
  options: OptimizeOptions = {}
) {
  const { maxWidth, maxHeight, quality } = { ...DEFAULT_OPTIONS, ...options };

  const image = sharp(buffer, { failOnError: false }).rotate();
  const metadata = await image.metadata();

  const output = image
    .resize({
      width: maxWidth,
      height: maxHeight,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({
      quality,
      progressive: true,
      chromaSubsampling: '4:4:4',
    });

  const optimizedBuffer = await output.toBuffer();

  const baseName = filename
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'upload';

  const finalName = `${baseName}-${Date.now()}.jpg`;

  return {
    buffer: optimizedBuffer,
    filename: finalName,
    width: metadata.width,
    height: metadata.height,
  };
}
