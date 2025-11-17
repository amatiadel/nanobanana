import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Banana Prompts',
    description: 'AI Image Prompt Gallery - Discover and share creative AI prompts',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.promptlibrary.space',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.promptlibrary.space'}/logo.png`,
    sameAs: [
      // Add your social media links here
      // 'https://twitter.com/bananaprompts',
      // 'https://facebook.com/bananaprompts',
    ],
  };

  return <StructuredData data={schema} />;
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Banana Prompts',
    description: 'AI Image Prompt Gallery',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.promptlibrary.space',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.promptlibrary.space'}/images?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <StructuredData data={schema} />;
}

// Blog Posting Schema
export function BlogPostingSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Banana Prompts',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.promptlibrary.space'}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return <StructuredData data={schema} />;
}

// Creative Work Schema (for prompts)
export function CreativeWorkSchema({
  title,
  description,
  image,
  datePublished,
  authorName,
  url,
  tags,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  authorName: string;
  url: string;
  tags: string[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description: description,
    image: image,
    datePublished: datePublished,
    creator: {
      '@type': 'Person',
      name: authorName,
    },
    keywords: tags.join(', '),
    url: url,
  };

  return <StructuredData data={schema} />;
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={schema} />;
}
