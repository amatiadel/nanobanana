import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description: 'Everything you need to know about PROMPT LIBRARY & Nano Banana prompts.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is PROMPT LIBRARY?',
      answer: 'PROMPT LIBRARY is a free community platform where creators share and discover AI-generated art prompts optimized for Google Gemini\'s Nano Banana model as well as other image models such as Midjourney, Stable Diffusion, DALL-E, ChatGPT with GPT-4o integration, Leonardo, Adobe Firefly, Ideogram, and Craiyon. The gallery spotlights aesthetics like fashion, portraits, urban streetwear, and photorealistic imagery so artists can experiment and inspire one another across tools.',
    },
    {
      question: 'How do I share a prompt on PROMPT LIBRARY?',
      answer: 'Head to the submission page, paste your prompt, optionally upload the generated image, add descriptive tags like \'Fashion\' or \'Portrait\', and mention any models the prompt was tuned for (Nano Banana, Midjourney, Stable Diffusion, DALL-E, etc.). Submissions are reviewed daily and the most helpful ones are featured on the homepage.',
    },
    {
      question: 'What is Google Gemini\'s Nano Banana model?',
      answer: 'Nano Banana is a specialized variant of Google\'s Gemini AI designed for high-quality image generation. It excels at vibrant, detailed visuals—think fashion lookbooks, stylised portraits, and scenic artwork—making it a strong companion to Midjourney, Stable Diffusion, DALL-E, GPT-4o image features, Leonardo, Adobe Firefly, Ideogram, and Craiyon.',
    },
    {
      question: 'How can I create effective Nano Banana prompts?',
      answer: 'Start with descriptive language that covers style, subject, lighting, palette, and composition. Example: "A close-up portrait of a teenage girl with curly hair in golden hour lighting, Nano Banana style." Test variations across Nano Banana, Midjourney, Stable Diffusion, DALL-E, ChatGPT, Leonardo, Firefly, Ideogram, or Craiyon and share the best versions back to the community for feedback.',
    },
    {
      question: 'Is PROMPT LIBRARY free to use?',
      answer: 'Yes for prompts. Browsing and sharing prompts is free.',
    },
    {
      question: 'What are popular prompt categories on PROMPT LIBRARY?',
      answer: 'Fashion and streetwear looks, expressive portraits, vaporwave and minimalist aesthetics, fantasy landscapes, and experimental lighting setups dominate the trending list. You can adapt prompts for Gemini Nano Banana or remix them in Midjourney, Stable Diffusion, ChatGPT, Leonardo, Firefly, Ideogram, Craiyon, and more.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FB] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Everything you need to know about PROMPT LIBRARY & Nano Banana prompts.
          </p>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed">
              Learn how to share, remix, and adapt AI art prompts for Google Gemini&apos;s Nano Banana model, Midjourney, Stable Diffusion, DALL-E, ChatGPT, Leonardo, Adobe Firefly, Ideogram, Craiyon, and more.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {faq.question}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-700 mb-4">
              Can&apos;t find the answer you&apos;re looking for? Please reach out to our support team.
            </p>
            <a
              href="mailto:adelamati7@gmail.com"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Contact Support
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex gap-4">
            <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
              Terms of Service →
            </Link>
            <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
