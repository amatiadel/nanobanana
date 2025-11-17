import { writeFileSync } from 'fs';
import { join } from 'path';
import { PromptItem } from '../lib/types';

/**
 * Seed data generation script for Banana Prompts
 * Generates realistic prompt items with diverse content
 */

const creators = [
  { id: '1', handle: '@artisan_ai' },
  { id: '2', handle: '@pixel_wizard' },
  { id: '3', handle: '@creative_mind' },
  { id: '4', handle: '@digital_dreams' },
  { id: '5', handle: '@prompt_master' },
  { id: '6', handle: '@vision_lab' },
  { id: '7', handle: '@style_forge' },
  { id: '8', handle: '@image_craft' },
];

const promptData = [
  {
    title: 'Urban Reflection',
    description: 'Dramatic, ultra-realistic close-up in black and white with high-contrast cinematic lighting from the side',
    prompt: 'dramatic, ultra-realistic close-up in black and white with high-contrast cinematic lighting from the side, highlighting the contours of his face and sunglasses, professional photography, 85mm lens, shallow depth of field',
    tags: ['realistic', 'cinematic', 'dark-moody'],
    premium: true,
  },
  {
    title: 'Honey & Fire',
    description: 'Portrait with warm golden tones and dramatic lighting, fashion photography style',
    prompt: 'fashion portrait photography, warm golden honey tones, dramatic side lighting, professional model, high-end beauty shot, 85mm f/1.4, studio lighting, editorial style',
    tags: ['realistic', 'elegant', 'vibrant-colorful'],
    premium: true,
  },
  {
    title: 'Black & White',
    description: 'Studio portrait of a confident man sitting on a modern beige armchair with wooden legs',
    prompt: 'black and white studio portrait, confident businessman sitting on modern beige armchair, professional corporate photography, clean background, dramatic lighting, medium format camera',
    tags: ['realistic', 'corporate', 'minimalist'],
    premium: true,
  },
  {
    title: 'Retrato Editorial Masculino',
    description: 'Studio portrait of a confident man sitting on a modern beige armchair with wooden legs',
    prompt: 'editorial portrait of confident man in navy blue suit, sitting on modern beige armchair, professional studio lighting, neutral background, corporate style, medium format photography',
    tags: ['realistic', 'corporate', 'modern', 'elegant'],
    premium: false,
  },
  {
    title: 'Monochrome Strength',
    description: 'Powerful portrait in monochrome with dramatic green tones and studio lighting',
    prompt: 'monochrome portrait with green color grading, man in dark green suit sitting in armchair, dramatic studio lighting, professional corporate photography, powerful composition',
    tags: ['realistic', 'corporate', 'dark-moody', 'modern'],
    premium: true,
  },
  {
    title: 'Blue Dreams of Morocco',
    description: 'Surreal portrait in vibrant blue Moroccan architecture with floating flowers',
    prompt: 'surreal portrait in blue Moroccan courtyard, woman in traditional dress, floating colorful flowers, vibrant blue walls, magical realism, artistic photography, dreamlike atmosphere',
    tags: ['realistic', 'vibrant-colorful', 'fantasy', 'elegant'],
    premium: true,
  },
  {
    title: 'Submerged',
    description: 'Hyper-realistic, ultra-detailed close-up portrait showing only the left half of my face submerged in water',
    prompt: 'hyper-realistic underwater portrait, half face submerged, water droplets, one eye in sharp focus, dramatic lighting, macro photography, ultra detailed, cinematic',
    tags: ['realistic', 'cinematic', 'dark-moody'],
    premium: false,
  },
  {
    title: 'Cinematic Portrait',
    description: 'Dramatic portrait with cinematic lighting and intense gaze',
    prompt: 'cinematic portrait, dramatic red lighting, intense gaze, professional photography, shallow depth of field, 85mm lens, moody atmosphere, high contrast',
    tags: ['cinematic', 'realistic', 'dark-moody'],
    premium: true,
  },
  {
    title: 'Vintage Watercolor Portrait',
    description: 'Elegant vintage-style portrait with watercolor effects and warm tones',
    prompt: 'vintage watercolor portrait, elegant woman in period dress, soft warm tones, artistic painting style, flowing brushstrokes, romantic atmosphere, detailed facial features',
    tags: ['watercolor', 'elegant', 'retro-vintage'],
    premium: true,
  },
  {
    title: 'Cyberpunk City',
    description: 'Neon-lit futuristic cityscape with flying vehicles and holographic advertisements',
    prompt: 'cyberpunk city at night, neon lights, flying cars, holographic billboards, rain-soaked streets, futuristic architecture, purple and blue color palette, highly detailed',
    tags: ['cyberpunk', 'sci-fi', 'neon', 'dark-moody'],
    premium: false,
  },
  {
    title: 'Abstract Geometry',
    description: 'Bold abstract composition with geometric shapes and vibrant colors',
    prompt: 'abstract geometric art, bold shapes, vibrant color palette, modern design, clean lines, minimalist composition, digital art, high contrast',
    tags: ['abstract', 'vibrant-colorful', 'modern', 'minimalist'],
    premium: false,
  },
  {
    title: 'Anime Character Design',
    description: 'Detailed anime character illustration with dynamic pose and vibrant colors',
    prompt: 'anime character design, dynamic pose, vibrant colors, detailed clothing, expressive eyes, professional illustration, cel shading, high quality',
    tags: ['anime', 'vibrant-colorful', 'concept-art'],
    premium: false,
  },
  {
    title: 'Modern Architecture',
    description: 'Minimalist modern building with clean lines and glass facades',
    prompt: 'modern architecture photography, minimalist building design, clean lines, glass facade, blue sky, professional architectural photography, wide angle lens',
    tags: ['architecture', 'modern', 'minimalist'],
    premium: false,
  },
  {
    title: 'Fantasy Landscape',
    description: 'Epic fantasy landscape with magical elements and dramatic lighting',
    prompt: 'epic fantasy landscape, magical floating islands, dramatic sunset, mystical atmosphere, detailed environment, concept art style, vibrant colors',
    tags: ['fantasy', 'vibrant-colorful', 'concept-art', 'cinematic'],
    premium: true,
  },
  {
    title: 'Corporate Headshot',
    description: 'Professional business headshot with clean background',
    prompt: 'professional corporate headshot, business attire, clean white background, confident expression, studio lighting, sharp focus, professional photography',
    tags: ['corporate', 'business', 'realistic', 'minimalist'],
    premium: false,
  },
  {
    title: 'Retro Poster Design',
    description: 'Vintage-inspired poster with retro typography and color palette',
    prompt: 'retro poster design, vintage typography, warm color palette, 1970s aesthetic, textured paper effect, bold graphics, nostalgic feel',
    tags: ['retro-vintage', 'poster', 'vibrant-colorful'],
    premium: false,
  },
  {
    title: 'Product Photography',
    description: 'Clean product shot with professional lighting and minimal background',
    prompt: 'product photography, clean white background, professional studio lighting, sharp details, commercial photography, high-end product shot',
    tags: ['product', 'minimalist', 'modern', 'corporate'],
    premium: false,
  },
  {
    title: 'Sci-Fi Character',
    description: 'Futuristic character design with advanced technology and armor',
    prompt: 'sci-fi character design, futuristic armor, advanced technology, detailed mechanical parts, concept art, dramatic lighting, cybernetic enhancements',
    tags: ['sci-fi', 'concept-art', 'cinematic'],
    premium: true,
  },
  {
    title: 'Oil Painting Landscape',
    description: 'Classical oil painting style landscape with rich textures',
    prompt: 'oil painting landscape, classical style, rich textures, visible brushstrokes, warm color palette, traditional art technique, detailed scenery',
    tags: ['oil-painting', 'elegant', 'retro-vintage'],
    premium: false,
  },
  {
    title: 'Neon Portrait',
    description: 'Portrait with vibrant neon lighting and cyberpunk aesthetic',
    prompt: 'portrait with neon lighting, cyberpunk aesthetic, vibrant pink and blue lights, urban night setting, cinematic photography, moody atmosphere',
    tags: ['neon', 'cyberpunk', 'vibrant-colorful', 'dark-moody'],
    premium: true,
  },
  {
    title: 'Minimalist Logo',
    description: 'Clean and simple logo design with modern typography',
    prompt: 'minimalist logo design, clean lines, modern typography, simple geometric shapes, professional branding, vector art, monochromatic or limited color palette',
    tags: ['logo', 'minimalist', 'modern', 'flat-design'],
    premium: false,
  },
  {
    title: 'Cartoon Character',
    description: 'Cute cartoon character with expressive features and bright colors',
    prompt: 'cute cartoon character design, expressive features, bright vibrant colors, simple shapes, friendly appearance, digital illustration, clean linework',
    tags: ['cartoon', 'vibrant-colorful', 'flat-design'],
    premium: false,
  },
  {
    title: 'Grunge Texture Art',
    description: 'Dark grunge artwork with distressed textures and urban feel',
    prompt: 'grunge art style, distressed textures, dark moody colors, urban aesthetic, rough edges, layered composition, alternative art',
    tags: ['grunge', 'dark-moody', 'abstract'],
    premium: false,
  },
  {
    title: 'Infographic Design',
    description: 'Clean and informative infographic with data visualization',
    prompt: 'professional infographic design, clean layout, data visualization, modern icons, corporate color scheme, clear hierarchy, business presentation style',
    tags: ['infographic', 'corporate', 'modern', 'flat-design'],
    premium: false,
  },
  {
    title: '3D Render Product',
    description: 'Photorealistic 3D product render with studio lighting',
    prompt: '3D product render, photorealistic materials, studio lighting setup, clean background, high detail, professional visualization, ray tracing',
    tags: ['3d-render', 'product', 'modern', 'realistic'],
    premium: true,
  },
  {
    title: 'Sketch Line Art',
    description: 'Detailed pencil sketch with clean line work',
    prompt: 'pencil sketch, detailed line art, clean linework, traditional drawing style, shading with hatching, artistic illustration, black and white',
    tags: ['sketch-line-art', 'minimalist'],
    premium: false,
  },
  {
    title: 'Vector Illustration',
    description: 'Colorful vector illustration with flat design style',
    prompt: 'vector illustration, flat design style, vibrant colors, clean shapes, modern aesthetic, scalable graphics, digital art',
    tags: ['vector', 'flat-design', 'vibrant-colorful', 'modern'],
    premium: false,
  },
  {
    title: 'Glitch Art Effect',
    description: 'Digital glitch art with distorted colors and scan lines',
    prompt: 'glitch art effect, digital distortion, RGB color shift, scan lines, corrupted data aesthetic, cyberpunk style, modern digital art',
    tags: ['glitch', 'cyberpunk', 'abstract', 'neon'],
    premium: false,
  },
];

// Generate full prompt items with unique IDs and slugs
const prompts: PromptItem[] = promptData.map((data, index) => {
  const creator = creators[index % creators.length];
  const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  
  return {
    id: `prompt-${index + 1}`,
    slug,
    title: data.title,
    creator,
    coverUrl: `/images/placeholder.svg`,
    fullImageUrl: `/images/placeholder.svg`,
    description: data.description,
    prompt: data.prompt,
    tags: data.tags,
    likes: Math.floor(Math.random() * 500) + 50,
    premium: data.premium,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
});

// Write to JSON file
const outputPath = join(__dirname, 'prompts.json');
writeFileSync(outputPath, JSON.stringify(prompts, null, 2));

console.log(`✅ Generated ${prompts.length} prompts and saved to ${outputPath}`);
