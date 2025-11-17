import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Banana Prompts - AI Image Prompt Gallery',
    short_name: 'Banana Prompts',
    description: 'Discover and share AI image prompts from the community',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F8FB',
    theme_color: '#F59E0B',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
