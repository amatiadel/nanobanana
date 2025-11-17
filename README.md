# 🍌 Banana Prompts

A modern, production-ready web application for discovering and sharing AI image prompts. Built with Next.js 14, TypeScript, and Tailwind CSS.

![Banana Prompts](./docs/screenshot-placeholder.png)

## ✨ Features

- **Home Page**: Hero section with highlighted text, stat cards, and trending prompts grid
- **Explore/Library**: Advanced filtering by tags, search functionality, and infinite scroll
- **Detail Pages**: Full prompt display with copy functionality and related prompts
- **Responsive Design**: Mobile-first approach with beautiful UI matching reference screenshots
- **Performance**: Optimized images, static generation, and incremental pagination
- **Accessibility**: Keyboard navigation, ARIA labels, and semantic HTML
- **SEO Ready**: Metadata, OpenGraph tags, sitemap, and robots.txt

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nanobanana
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Generate seed data:
```bash
pnpm seed
```

5. Start the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
nanobanana/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API route handlers
│   │   └── prompts/          # Prompts API endpoints
│   ├── images/               # Images explore and detail pages
│   ├── layout.tsx            # Root layout with header
│   └── page.tsx              # Home page
├── components/               # React components
│   ├── filters/              # Search and filter components
│   ├── home/                 # Home page components (Hero, StatCard)
│   ├── layout/               # Layout components (Header, Footer)
│   ├── prompts/              # Prompt-related components
│   └── ui/                   # shadcn/ui components
├── lib/                      # Utilities and data access
│   ├── data.ts               # JSON-based data layer
│   ├── tags.ts               # Tag taxonomy and utilities
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Helper functions
├── public/                   # Static assets
│   └── images/               # Image files
├── seed/                     # Seed data generation
│   ├── generate.ts           # Seed script
│   └── prompts.json          # Generated prompt data
└── .kiro/                    # Kiro configuration
    ├── specs/                # Feature specifications
    └── steering/             # AI assistant guidance
```

## 🎨 Design System

### Colors
- Background: `#F6F8FB` (slate-50)
- Cards: White with `shadow-[0_8px_30px_rgba(0,0,0,.06)]`
- Accent: Yellow-300 for highlights
- Text: Slate-900 (primary), Slate-600 (secondary)

### Typography
- Font: Inter/Geist Sans
- Hero: 5xl-6xl, bold, tight tracking
- Body: Base-lg, regular

### Components
- Card radius: `rounded-2xl`
- Chips: `rounded-full` with subtle borders
- Buttons: Slate-900 background with hover states
- Animations: Framer Motion fade-up with stagger

## 🔧 Configuration

### Environment Variables

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Image Storage
IMAGE_BASE_URL=/images

# Supabase (Optional)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Image Storage Options

#### Local Development (Default)
Images are served from `/public/images`. No additional configuration needed.

#### Cloudflare R2
1. Upload images to R2 bucket
2. Set up public access or presigned URLs
3. Update `IMAGE_BASE_URL` in `.env.local`:
```env
IMAGE_BASE_URL=https://your-bucket.r2.dev
```

#### Supabase Storage
1. Create a storage bucket in Supabase
2. Upload images and set public access
3. Update `IMAGE_BASE_URL`:
```env
IMAGE_BASE_URL=https://your-project.supabase.co/storage/v1/object/public/prompts
```

## 🗄️ Database Options

### JSON-based (Default)
The app uses a simple JSON file (`seed/prompts.json`) for data storage. Perfect for MVP and demos.

### Supabase (Optional)

1. Create a Supabase project at [supabase.com](https://supabase.com)

2. Run the following SQL in the Supabase SQL editor:

```sql
-- Create prompts table
create table prompts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  prompt text not null,
  likes int default 0,
  premium boolean default false,
  cover_url text not null,
  full_image_url text,
  creator_id text not null,
  creator_handle text not null,
  tags text[] not null default '{}',
  created_at timestamptz default now()
);

-- Create indexes for performance
create index prompts_likes_idx on prompts(likes desc);
create index prompts_created_at_idx on prompts(created_at desc);
create index prompts_tags_idx on prompts using gin(tags);

-- Enable Row Level Security
alter table prompts enable row level security;

-- Create policy for anonymous read access
create policy "Allow anonymous read access"
  on prompts for select
  to anon
  using (true);
```

3. Add Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Update `lib/data.ts` to use Supabase client (implementation provided in `lib/db.ts`)

## 📝 Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript compiler check

# Data
pnpm seed         # Generate seed data
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Home page loads with hero, stats, and prompts grid
- [ ] Infinite scroll loads more prompts
- [ ] Search filters prompts by title, creator, and prompt text
- [ ] Tag filters work with multi-select AND logic
- [ ] Detail page displays full prompt and related items
- [ ] Copy button copies prompt to clipboard
- [ ] Mobile responsive design works correctly
- [ ] Keyboard navigation functions properly

### Automated Tests (Coming Soon)
Playwright tests will cover:
- Home page rendering
- Search and filter functionality
- Detail page navigation
- Copy to clipboard interaction

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

Vercel will automatically:
- Optimize images with Next.js Image
- Generate static pages where possible
- Set up edge caching
- Configure custom domains

### Other Platforms

The app is compatible with any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Prompt submission and moderation
- [ ] Like/favorite functionality
- [ ] Collections and bookmarks
- [ ] Advanced search with filters
- [ ] AI image generation integration
- [ ] Video prompts support
- [ ] Community features (comments, ratings)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Design inspired by modern prompt-sharing platforms
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

---

Built with ❤️ using Kiro AI Assistant
