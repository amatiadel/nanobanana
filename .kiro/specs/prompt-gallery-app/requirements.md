# Requirements Document

## Introduction

Banana Prompts is a community-driven AI prompt gallery web application that enables users to discover, explore, and share AI-generated image prompts. The application provides a curated browsing experience with advanced filtering, search capabilities, and detailed prompt information. The system replicates a modern, clean design aesthetic with soft backgrounds, rounded cards, subtle shadows, and intuitive navigation.

## Glossary

- **Web_Application**: The Next.js-based frontend and API system serving the Banana Prompts gallery
- **User**: An anonymous visitor browsing the prompt gallery
- **Prompt_Item**: A data entity containing an AI image prompt, associated metadata, tags, and creator information
- **Tag**: A categorized label (e.g., "cinematic", "portrait") used to classify and filter Prompt_Items
- **Filter_Panel**: The UI component allowing Users to search and filter Prompt_Items by tags and keywords
- **Prompt_Card**: A visual card component displaying a Prompt_Item's cover image, title, description, and metadata
- **Detail_Page**: The page displaying full information for a single Prompt_Item
- **API_Handler**: Server-side route handler providing Prompt_Item data via HTTP endpoints
- **Infinite_Scroll**: A pagination pattern that automatically loads additional content when User scrolls near the bottom
- **Copy_Button**: An interactive element that copies prompt text to the User's clipboard

## Requirements

### Requirement 1: Home Page Display

**User Story:** As a User, I want to see a welcoming home page with featured prompts and community statistics, so that I understand the platform's value and can quickly access popular content.

#### Acceptance Criteria

1. THE Web_Application SHALL render a hero section containing a headline with highlighted text styling on the word "prompts"
2. THE Web_Application SHALL display three stat cards showing "Prompts shared this week", "Creators contributing", and "Total likes given" with numerical values
3. THE Web_Application SHALL present a grid of Prompt_Cards sorted by likes in descending order below the stat cards
4. WHEN the User scrolls to within 70 percent of the viewport height from the bottom, THE Web_Application SHALL load the next page of Prompt_Items
5. THE Web_Application SHALL display a navigation header containing the logo "BANANA PROMPTS", navigation links for Home and Images, and a "Generate Image" call-to-action button

### Requirement 2: Navigation and Routing

**User Story:** As a User, I want to navigate between different sections of the application, so that I can explore various features and content areas.

#### Acceptance Criteria

1. WHEN the User clicks the "Home" navigation link, THE Web_Application SHALL navigate to the root path "/"
2. WHEN the User clicks the "Images" navigation link, THE Web_Application SHALL navigate to the "/images" path
3. WHEN the User clicks the "Generate Image" button, THE Web_Application SHALL display a placeholder dialog
4. THE Web_Application SHALL render "Videos" and "Studio" navigation links in a disabled visual state
5. WHEN the User clicks on a Prompt_Card, THE Web_Application SHALL navigate to the Detail_Page at "/images/[slug]"

### Requirement 3: Explore Page with Filtering

**User Story:** As a User, I want to search and filter prompts by tags and keywords, so that I can find specific styles and techniques that match my interests.

#### Acceptance Criteria

1. THE Web_Application SHALL display a Filter_Panel containing a search input field and grouped Tag chips
2. WHEN the User enters text into the search input, THE Web_Application SHALL filter Prompt_Items where the title, creator handle, or prompt text contains the search term (case-insensitive)
3. WHEN the User clicks a Tag chip, THE Web_Application SHALL toggle the Tag's active state and filter Prompt_Items to include only those containing all selected Tags
4. THE Web_Application SHALL organize Tag chips into five groups: "Artistic Styles", "Corporate & Professional", "Genre & Themes", "Mood & Tone", and "Optional Add-ons"
5. WHEN no Prompt_Items match the active filters, THE Web_Application SHALL display an empty state with a "Clear filters" button
6. WHEN the User clicks the "Clear filters" button, THE Web_Application SHALL reset all search and Tag filters to their default state

### Requirement 4: Prompt Card Display

**User Story:** As a User, I want to see visually appealing cards with key information about each prompt, so that I can quickly assess whether a prompt interests me.

#### Acceptance Criteria

1. THE Web_Application SHALL render each Prompt_Card with a rounded-2xl border radius and a soft shadow effect
2. THE Web_Application SHALL display the Prompt_Item title in a small capsule overlay at the top-left of the Prompt_Card
3. THE Web_Application SHALL show a heart icon with the like count in the top-right corner of the Prompt_Card
4. THE Web_Application SHALL present a gradient overlay at the bottom of the Prompt_Card containing the description (clamped to 3 lines), Copy_Button, and creator handle
5. WHERE the Prompt_Item has premium status set to true, THE Web_Application SHALL display a "★ PREMIUM" pill badge on the Prompt_Card

### Requirement 5: Detail Page Information

**User Story:** As a User, I want to view complete details about a specific prompt including the full image and prompt text, so that I can understand and use the prompt effectively.

#### Acceptance Criteria

1. THE Web_Application SHALL display the full-resolution image for the Prompt_Item at the top of the Detail_Page
2. THE Web_Application SHALL show the Prompt_Item title, creator handle, and like count below the image
3. THE Web_Application SHALL render the complete prompt text in a multi-line text block
4. THE Web_Application SHALL display all associated Tags as chip elements below the prompt text
5. THE Web_Application SHALL present a "More like this" section containing 3 to 6 related Prompt_Items that share at least one Tag with the current Prompt_Item

### Requirement 6: Copy Prompt Functionality

**User Story:** As a User, I want to easily copy prompt text to my clipboard, so that I can use it in AI image generation tools.

#### Acceptance Criteria

1. WHEN the User clicks the Copy_Button on a Prompt_Card, THE Web_Application SHALL copy the full prompt text to the system clipboard
2. WHEN the User clicks the Copy_Button on the Detail_Page, THE Web_Application SHALL copy the full prompt text to the system clipboard
3. WHEN the prompt text is successfully copied, THE Web_Application SHALL display a toast notification with the message "Prompt copied"
4. THE Web_Application SHALL provide a "Copy with tags" option on the Detail_Page that copies the prompt text concatenated with all Tag labels

### Requirement 7: Responsive Grid Layout

**User Story:** As a User, I want the prompt gallery to adapt to my device screen size, so that I have an optimal viewing experience on desktop, tablet, and mobile.

#### Acceptance Criteria

1. WHEN the viewport width is greater than or equal to 1024 pixels, THE Web_Application SHALL display Prompt_Cards in a grid with 3 to 4 columns
2. WHEN the viewport width is between 768 and 1023 pixels, THE Web_Application SHALL display Prompt_Cards in a grid with 2 columns
3. WHEN the viewport width is less than 768 pixels, THE Web_Application SHALL display Prompt_Cards in a single column
4. THE Web_Application SHALL maintain consistent spacing and card proportions across all viewport sizes

### Requirement 8: API Data Retrieval

**User Story:** As a User, I want the application to load prompt data efficiently, so that I experience fast page loads and smooth interactions.

#### Acceptance Criteria

1. THE Web_Application SHALL provide an API_Handler at "/api/prompts" that accepts query parameters for search, tags, sort, page, and pageSize
2. WHEN the API_Handler receives a GET request, THE Web_Application SHALL return a JSON response containing items array, page number, pageSize, and total count
3. THE Web_Application SHALL provide an API_Handler at "/api/prompts/[slug]" that returns a single Prompt_Item matching the provided slug
4. THE Web_Application SHALL sort Prompt_Items by likes in descending order as the primary sort, and by createdAt in descending order as the secondary sort
5. THE Web_Application SHALL implement pagination with a default pageSize of 24 Prompt_Items per page

### Requirement 9: Visual Design and Styling

**User Story:** As a User, I want the application to have a polished, modern appearance, so that I enjoy using the platform and trust its quality.

#### Acceptance Criteria

1. THE Web_Application SHALL use a background color of #F6F8FB for page backgrounds
2. THE Web_Application SHALL apply a shadow style of "0 8px 30px rgba(0,0,0,0.06)" to card components
3. THE Web_Application SHALL implement fade-up animations on Prompt_Cards with initial opacity 0 and y-offset 10, animating to opacity 1 and y-offset 0
4. THE Web_Application SHALL use a sans-serif font family (Inter, Geist, or SF) for all typography
5. THE Web_Application SHALL highlight the word "prompts" in the hero headline with a rounded yellow background effect

### Requirement 10: Accessibility and SEO

**User Story:** As a User with accessibility needs, I want the application to be keyboard-navigable and screen-reader friendly, so that I can access all features regardless of my abilities.

#### Acceptance Criteria

1. THE Web_Application SHALL provide keyboard focus indicators for all interactive elements
2. THE Web_Application SHALL include aria-label attributes on icon buttons and interactive elements without visible text
3. THE Web_Application SHALL use the Prompt_Item title as alt text for all Prompt_Card images
4. THE Web_Application SHALL generate metadata tags including title, description, and OpenGraph properties for each page
5. THE Web_Application SHALL provide a sitemap.xml file and robots.txt file for search engine crawlers

### Requirement 11: Image Optimization

**User Story:** As a User, I want images to load quickly and efficiently, so that I can browse the gallery without delays.

#### Acceptance Criteria

1. THE Web_Application SHALL use Next.js Image component for all Prompt_Item images
2. THE Web_Application SHALL configure an IMAGE_BASE_URL environment variable that prefixes all image paths
3. THE Web_Application SHALL serve images from the "/public/images" directory during local development
4. THE Web_Application SHALL implement lazy loading for images outside the initial viewport
5. THE Web_Application SHALL provide appropriate image sizes and formats based on device capabilities

### Requirement 12: Data Model and Type Safety

**User Story:** As a developer, I want a well-defined TypeScript data model, so that I can work with type-safe code and easily swap data sources.

#### Acceptance Criteria

1. THE Web_Application SHALL define a PromptItem TypeScript type containing id, slug, title, creator, coverUrl, fullImageUrl, description, prompt, tags, likes, premium, and createdAt fields
2. THE Web_Application SHALL store creator information as an object with id, handle, and optional avatarUrl fields
3. THE Web_Application SHALL represent tags as an array of normalized slug strings
4. THE Web_Application SHALL format createdAt timestamps as ISO 8601 strings
5. THE Web_Application SHALL provide seed data containing at least 24 Prompt_Items with realistic content

### Requirement 13: Tag Taxonomy

**User Story:** As a User, I want prompts to be organized with consistent, meaningful tags, so that I can discover content through logical categories.

#### Acceptance Criteria

1. THE Web_Application SHALL support tags from the "Artistic Styles" category including realistic, cinematic, anime, architecture, cartoon, 3d-render, vector, watercolor, sketch-line-art, oil-painting, and abstract
2. THE Web_Application SHALL support tags from the "Corporate & Professional" category including corporate, business, minimalist, modern, product, poster, logo, infographic, and concept-art
3. THE Web_Application SHALL support tags from the "Genre & Themes" category including fantasy, sci-fi, cyberpunk, retro-vintage, and grunge
4. THE Web_Application SHALL support tags from the "Mood & Tone" category including vibrant-colorful, dark-moody, and elegant
5. THE Web_Application SHALL support tags from the "Optional Add-ons" category including glitch, neon, and flat-design

### Requirement 14: Performance and Optimization

**User Story:** As a User, I want pages to load quickly and respond smoothly to my interactions, so that I have a seamless browsing experience.

#### Acceptance Criteria

1. THE Web_Application SHALL use static generation for the home page where possible
2. THE Web_Application SHALL implement incremental pagination to load additional Prompt_Items without full page reloads
3. WHEN the User scrolls to within 70 percent of the viewport height from the bottom, THE Web_Application SHALL trigger loading of the next page of results
4. THE Web_Application SHALL display skeleton loading states while fetching Prompt_Items
5. THE Web_Application SHALL debounce search input changes by at least 300 milliseconds before triggering API requests

### Requirement 15: Supabase Integration (Optional)

**User Story:** As a developer, I want the option to use Supabase as a backend database, so that I can scale beyond static JSON data.

#### Acceptance Criteria

1. THE Web_Application SHALL provide SQL schema definitions for a "prompts" table with appropriate columns and data types
2. THE Web_Application SHALL configure Row Level Security policies allowing anonymous SELECT operations on the prompts table
3. THE Web_Application SHALL provide a data access layer module at "/lib/db.ts" using the @supabase/supabase-js client
4. THE Web_Application SHALL read Supabase connection credentials from environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
5. THE Web_Application SHALL maintain API compatibility between JSON-based and Supabase-based data sources
