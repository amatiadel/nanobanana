# Project Structure

## Organization

Banana Prompts follows Next.js 14 App Router conventions with a component-based architecture.

## Folder Structure

```
nanobanana/
├── .kiro/                    # Kiro configuration and steering rules
│   ├── specs/               # Feature specifications
│   │   └── prompt-gallery-app/
│   └── steering/            # AI assistant guidance documents
├── app/                     # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── images/             # Images route
│   └── api/                # API routes
│       └── prompts/        # Prompts API endpoints
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── home/               # Home page components
│   ├── prompts/            # Prompt-related components
│   └── filters/            # Filter components
├── lib/                     # Utility functions and data access
│   ├── utils.ts            # General utilities
│   ├── types.ts            # TypeScript type definitions
│   ├── data.ts             # Data access layer
│   ├── tags.ts             # Tag taxonomy
│   └── db.ts               # Supabase client (optional)
├── seed/                    # Seed data
│   ├── prompts.json        # Prompt data
│   └── generate.ts         # Seed generation script
├── public/                  # Static assets
│   └── images/             # Prompt images
└── [config files]          # Various configuration files
```

## Conventions

- **File Naming**: kebab-case for files, PascalCase for React components
- **Component Structure**: One component per file, co-located with related files
- **Import Aliases**: Use `@/` prefix for absolute imports from root
- **Styling**: Tailwind utility classes, custom theme in tailwind.config.ts
- **Type Safety**: All components and functions are fully typed with TypeScript
