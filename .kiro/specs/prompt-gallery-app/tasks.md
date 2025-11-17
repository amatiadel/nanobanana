# Implementation Plan

- [x] 1. Initialize Next.js project and configure tooling





  - Create Next.js 14+ project with TypeScript and App Router
  - Configure Tailwind CSS with custom theme (colors, shadows, fonts)
  - Set up ESLint and Prettier with project-specific rules
  - Install dependencies: framer-motion, lucide-react, @supabase/supabase-js
  - Initialize shadcn/ui and add Badge, Button, Input, Sheet components
  - Create .env.local with IMAGE_BASE_URL variable
  - _Requirements: 1.5, 9.1, 9.2, 9.3, 9.4, 12.1_

- [x] 2. Create type definitions and data utilities






  - [x] 2.1 Define TypeScript types in lib/types.ts

    - Create PromptItem interface with all required fields
    - Create PromptsResponse and PromptsQueryParams interfaces
    - Create Tag and TagCategory interfaces
    - Export all types for use across the application
    - _Requirements: 12.1, 12.2, 12.3, 12.4_
  

  - [x] 2.2 Implement tag taxonomy in lib/tags.ts

    - Define TAG_CATEGORIES constant with all five categories
    - Include all tags from requirements (Artistic Styles, Corporate & Professional, etc.)
    - Create utility functions: getTagLabel, getTagsByCategory, getAllTags
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_
  
  - [x] 2.3 Create utility functions in lib/utils.ts


    - Implement cn() for className merging
    - Create generateBlurDataURL() for image placeholders
    - Add debounce() function for search input
    - Create formatNumber() for stat display
    - _Requirements: 9.3, 11.1, 14.5_

- [x] 3. Generate seed data and implement JSON data layer







  - [x] 3.1 Create seed data generation script


    - Write seed/generate.ts to create 24+ realistic PromptItems
    - Include diverse titles, descriptions, and full prompt texts
    - Assign appropriate tags from taxonomy to each prompt
    - Generate varied like counts and premium status
    - Output to seed/prompts.json
    - _Requirements: 12.5, 13.1, 13.2, 13.3, 13.4, 13.5_
  
  - [x] 3.2 Implement JSON-based data access layer





    - Create lib/data.ts with getPrompts() function
    - Implement search filtering (title, creator, prompt text)
    - Implement tag filtering with AND logic
    - Implement sorting by likes and createdAt
    - Implement pagination logic
    - Create getPromptBySlug() function
    - Create getRelatedPrompts() function (by overlapping tags)
    - _Requirements: 3.2, 3.3, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 4. Build API route handlers






  - [x] 4.1 Create GET /api/prompts route

    - Implement app/api/prompts/route.ts
    - Parse and validate query parameters
    - Call getPrompts() with parsed parameters
    - Return PromptsResponse JSON
    - Handle errors with appropriate status codes
    - _Requirements: 8.1, 8.2, 8.4, 8.5_
  

  - [x] 4.2 Create GET /api/prompts/[slug] route

    - Implement app/api/prompts/[slug]/route.ts
    - Extract slug from URL parameters
    - Call getPromptBySlug() with slug
    - Return PromptItem JSON or 404
    - _Requirements: 8.3_

- [x] 5. Implement shared layout components




  - [x] 5.1 Create Header component


    - Build components/layout/Header.tsx
    - Implement logo with yellow dot and "BANANA PROMPTS" text
    - Add navigation links (Home, Images, Videos disabled, Studio disabled)
    - Add "Generate Image" CTA button with placeholder dialog
    - Style with white background, subtle shadow, max-width container
    - Make responsive with mobile menu if needed
    - _Requirements: 1.5, 2.1, 2.2, 2.3, 2.4_
  
  - [x] 5.2 Create root layout


    - Implement app/layout.tsx with Header
    - Set background color to #F6F8FB
    - Configure font (Inter or Geist)
    - Add metadata for SEO
    - Include Toaster component for notifications
    - _Requirements: 1.5, 9.1, 9.4, 10.4_
  
  - [x] 5.3 Create Footer component


    - Build components/layout/Footer.tsx with basic links
    - _Requirements: None (enhancement)_

- [x] 6. Build home page components






  - [x] 6.1 Create Hero component





    - Build components/home/Hero.tsx
    - Implement headline with highlighted "prompts" word using yellow background
    - Add subtitle paragraph
    - Style with large bold typography and tight tracking


    - _Requirements: 1.1, 9.5_
  
  - [x] 6.2 Create StatCard component





    - Build components/home/StatCard.tsx


    - Display large number and label
    - Style as white rounded-2xl card with shadow
    - _Requirements: 1.2_
  
  - [x] 6.3 Implement home page



    - Create app/page.tsx



    - Render Hero component
    - Display three StatCards with hardcoded stats
    - Fetch initial prompts sorted by likes
    - Render PromptGrid with initial data
    - Add section heading "See what the community is creating"
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 7. Build prompt card and grid components



  - [x] 7.1 Create PromptCard component








    - Build components/prompts/PromptCard.tsx
    - Implement card layout with Next.js Image
    - Add gradient overlay at bottom
    - Display title capsule (top-left), like count (top-right)


    - Show description (line-clamp-3), Copy button, creator handle
    - Add premium pill badge when applicable
    - Implement Framer Motion fade-up animation
    - Make entire card clickable to navigate to detail page
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 9.3, 11.1, 11.4_
  

  - [x] 7.2 Create CopyButton component



    - Build components/prompts/CopyButton.tsx
    - Implement clipboard copy using navigator.clipboard.writeText()
    - Show toast notification on success





    - Handle copy errors gracefully



    - Prevent event propagation to avoid navigation
    - _Requirements: 6.1, 6.2, 6.3_
  
  - [x] 7.3 Create PromptGrid component with infinite scroll





    - Build components/prompts/PromptGrid.tsx


    - Implement responsive grid (1/2/3/4 columns)
    - Set up Intersection Observer for infinite scroll
    - Trigger fetch when scrolled to 70% from bottom
    - Append new items to existing array
    - Show skeleton loaders during fetch

    - Implement staggered card animations

    - _Requirements: 1.4, 3.5, 4.1, 7.1, 7.2, 7.3, 7.4, 14.2, 14.3, 14.4_
  
  - [x] 7.4 Create skeleton loading components




    - Build components/ui/Skeletons.tsx
    - Create PromptCardSkeleton matching card dimensions
    - Create GridSkeleton with multiple card skeletons
    - _Requirements: 14.4_



- [x] 8. Build filter and search components







  - [x] 8.1 Create TagChip component


    - Build components/filters/TagChip.tsx
    - Implement toggleable chip with active/inactive states
    - Style with rounded-full, border, transitions
    - Active: dark background, white text
    - Inactive: white background, gray text with hover effect
    - _Requirements: 3.3, 4.1_
  
  - [x] 8.2 Create SearchBar component


    - Build components/filters/SearchBar.tsx
    - Implement search input with icon
    - Add debounce (300ms) to onChange handler
    - Style with shadcn Input component
    - _Requirements: 3.2, 14.5_
  
  - [x] 8.3 Create FilterPanel component


    - Build components/filters/FilterPanel.tsx
    - Render SearchBar at top
    - Display grouped TagChips by category
    - Implement filter state management
    - Call onFilterChange callback when filters update
    - Style as white rounded-2xl card
    - Make responsive (Sheet on mobile, always visible on desktop)
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 8.4 Create EmptyState component


    - Build components/ui/EmptyState.tsx
    - Display message when no results found
    - Include "Clear filters" button
    - _Requirements: 3.5, 3.6_

- [x] 9. Implement explore/images page



  - [x] 9.1 Create images page with filtering

    - Build app/images/page.tsx
    - Add page title "Keep exploring the prompts your peers are sharing"
    - Render FilterPanel component
    - Implement filter state management (search, tags)
    - Fetch prompts based on active filters
    - Render PromptGrid with filtered results
    - Show EmptyState when no results
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 7.3_


- [x] 10. Build prompt detail page




  - [x] 10.1 Create PromptDetail component

    - Build components/prompts/PromptDetail.tsx
    - Display large responsive image at top
    - Show title, creator handle, like count
    - Render full prompt text (expandable if very long)
    - Display all tags as chips
    - Add Copy button and "Copy with tags" button
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.4_
  

  - [x] 10.2 Implement detail page route

    - Create app/images/[slug]/page.tsx
    - Fetch prompt by slug
    - Fetch related prompts (3-6 items with overlapping tags)
    - Render PromptDetail component
    - Display "More like this" section with PromptGrid
    - Handle 404 for invalid slugs
    - Add metadata for SEO (title, description, OG image)
    - _Requirements: 2.5, 5.1, 5.2, 5.3, 5.4, 5.5, 10.4_

- [x] 11. Implement SEO and accessibility features














  - [x] 11.1 Add metadata and SEO tags


    - Configure metadata in app/layout.tsx
    - Add page-specific metadata in page.tsx files


    - Include OpenGraph tags for social sharing
    - _Requirements: 10.4_
  
  - [x] 11.2 Create sitemap and robots.txt


    - Implement app/sitemap.ts to generate sitemap
    - Implement app/robots.ts for robots.txt
    - Include all prompt detail pages in sitemap
    - _Requirements: 10.4_
  
  - [x] 11.3 Enhance accessibility


    - Add aria-labels to icon buttons
    - Ensure keyboard focus indicators on all interactive elements
    - Use semantic HTML throughout

    - Add alt text to all images using prompt titles
    - Test keyboard navigation flow
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 12. Configure image optimization






  - [x] 12.1 Set up Next.js Image configuration


    - Configure next.config.js with image domains
    - Set up IMAGE_BASE_URL environment variable
    - Implement image URL builder utility
    - _Requirements: 11.2, 11.3_
  

  - [x] 12.2 Add placeholder images


    - Create or source sample images for seed data
    - Place images in public/images/ directory
    - Ensure images match seed data coverUrl paths
    - _Requirements: 11.1, 11.3_

- [ ] 13. Add animations and polish

  - [ ] 13.1 Implement Framer Motion animations
    - Add fade-up animations to PromptCards
    - Implement stagger effect in PromptGrid
    - Add subtle hover effects to interactive elements
    - _Requirements: 9.3_
  
  - [ ] 13.2 Add toast notifications
    - Install and configure toast library (sonner or react-hot-toast)
    - Implement toast for copy success
    - Style toasts to match design system
    - _Requirements: 6.3_
  
  - [ ] 13.3 Polish UI details
    - Add loading states for all async operations
    - Implement error boundaries for graceful error handling
    - Add smooth transitions between states
    - Ensure consistent spacing and alignment
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ] 14. Create Supabase variant (optional)


  - [ ] 14.1 Set up Supabase schema
    - Create SQL schema for prompts table
    - Add indexes for performance (tags, likes, created_at)
    - Configure Row Level Security policies
    - _Requirements: 15.1, 15.2_
  
  - [ ] 14.2 Implement Supabase data layer
    - Create lib/db.ts with Supabase client
    - Implement getPrompts() using Supabase queries
    - Implement getPromptBySlug() using Supabase
    - Map database columns to PromptItem type
    - _Requirements: 15.3, 15.5_
  
  - [ ] 14.3 Add environment configuration
    - Document Supabase environment variables
    - Create .env.example with all required variables
    - Update README with Supabase setup instructions
    - _Requirements: 15.4_

- [ ] 15. Write tests
  - [ ] 15.1 Write unit tests
    - Test data access layer functions (search, filter, pagination)
    - Test utility functions (debounce, tag matching)
    - Test copy to clipboard functionality
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ] 15.2 Write E2E tests with Playwright
    - Test home page loads and displays prompts
    - Test search filters results correctly
    - Test tag filtering works with multiple tags
    - Test detail page renders prompt information
    - Test copy button copies to clipboard
    - Test infinite scroll loads more items
    - _Requirements: 1.3, 1.4, 3.2, 3.3, 5.1, 5.2, 5.3, 6.1, 14.3_

- [ ] 16. Documentation and deployment preparation
  - [ ] 16.1 Write comprehensive README
    - Document quick start instructions
    - Explain environment variables
    - Provide Supabase migration guide
    - Include Cloudflare R2 / image CDN setup instructions
    - Add development and build commands
    - _Requirements: All_
  
  - [ ] 16.2 Configure deployment
    - Create vercel.json with image domain configuration
    - Set up production environment variables
    - Test production build locally
    - _Requirements: 11.2_
  
  - [ ] 16.3 Create design documentation
    - Document CSS approach and Tailwind customizations
    - Explain how components match reference screenshots
    - List design tokens (colors, spacing, typography)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
