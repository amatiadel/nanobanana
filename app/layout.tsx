import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToasterProvider } from '@/components/providers/ToasterProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Banana Prompts - AI Image Prompt Gallery',
    template: '%s | Banana Prompts',
  },
  description: 'Discover and share AI image prompts from the community. Browse thousands of creative AI prompts with advanced filtering and search.',
  keywords: ['AI prompts', 'image generation', 'AI art', 'prompts gallery', 'creative prompts', 'midjourney', 'stable diffusion', 'dall-e'],
  authors: [{ name: 'Banana Prompts' }],
  creator: 'Banana Prompts',
  publisher: 'Banana Prompts',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Banana Prompts - AI Image Prompt Gallery',
    description: 'Discover and share AI image prompts from the community',
    url: '/',
    siteName: 'Banana Prompts',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Banana Prompts - AI Image Prompt Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banana Prompts - AI Image Prompt Gallery',
    description: 'Discover and share AI image prompts from the community',
    creator: '@bananaprompts',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#F6F8FB' }}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ToasterProvider />
      </body>
    </html>
  );
}
