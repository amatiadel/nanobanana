import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for PROMPT LIBRARY - Your privacy matters to us.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FB] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your privacy matters to us.
          </p>
          <p className="text-gray-700 mb-8">
            This Privacy Policy explains how PROMPT LIBRARY collects, uses, and protects your personal information. We believe in transparency and giving you control over your data.
          </p>
          <p className="text-sm text-gray-500 mb-12">
            <strong>Effective date:</strong> October 12, 2025
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you use PROMPT LIBRARY, we collect information to provide and improve our services. This includes information you provide directly and data collected automatically.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Account information:</strong> email address, username, and authentication credentials (via Google OAuth)</li>
              <li><strong>Content you submit:</strong> AI-generated images, prompts, tags, and metadata</li>
              <li><strong>Usage data:</strong> pages visited, features used, and interactions with content</li>
              <li><strong>Device information:</strong> browser type, IP address, and operating system</li>
              <li><strong>Payment information:</strong> processed securely through Creem (we do not store credit card details)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect to operate, maintain, and improve PROMPT LIBRARY. Your data helps us provide a better experience for the entire community.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Authentication and account management</li>
              <li>Storing and displaying your submitted content in the gallery</li>
              <li>Processing payments and managing subscriptions</li>
              <li>Analyzing usage patterns to improve features and performance</li>
              <li>Communicating important updates about the service</li>
              <li>Preventing abuse, spam, and security threats</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PROMPT LIBRARY integrates with trusted third-party services to provide core functionality. These services have their own privacy policies and data practices.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Supabase:</strong> Authentication, database, and user management</li>
              <li><strong>Cloudflare R2:</strong> Image storage and content delivery</li>
              <li><strong>Creem:</strong> Payment processing and subscription management</li>
              <li><strong>OpenAI:</strong> AI video generation via Sora 2 API</li>
              <li><strong>Vercel:</strong> Web hosting and infrastructure</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal information. We only share data in limited circumstances necessary to operate the service or comply with legal obligations.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Public content:</strong> Images and prompts you submit are visible to all users</li>
              <li><strong>Service providers:</strong> Third-party services listed above that help operate the platform</li>
              <li><strong>Legal compliance:</strong> When required by law or to protect our rights and users</li>
              <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Encrypted connections (HTTPS) for all data transmission</li>
              <li>Secure authentication via OAuth 2.0</li>
              <li>Regular security updates and monitoring</li>
              <li>Limited employee access to personal data</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have control over your data and how it&apos;s used on PROMPT LIBRARY. You can exercise these rights at any time through your account settings or by contacting us.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Access:</strong> View and download your personal information</li>
              <li><strong>Correction:</strong> Update inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request removal of your account and associated data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from promotional communications</li>
              <li><strong>Portability:</strong> Export your data in a structured format</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use cookies and similar technologies to maintain your session, remember preferences, and analyze site usage. Most browsers allow you to control cookie settings.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Authentication cookies:</strong> Keep you logged in across sessions</li>
              <li><strong>Preference cookies:</strong> Remember your theme and display settings</li>
              <li><strong>Analytics:</strong> Understand how users interact with the platform</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              PROMPT LIBRARY is not intended for children under 13. We do not knowingly collect personal information from children. If we learn we have collected data from a child under 13, we will delete it promptly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy to reflect changes in our practices or legal requirements. When we make significant changes, we will update the effective date and notify users through the platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or how we handle your data, please reach out to us. We&apos;re committed to addressing your privacy concerns.
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:adelamati7@gmail.com" className="text-orange-600 hover:text-orange-700 underline">adelamati7@gmail.com</a>
            </p>
          </section>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Summary</h3>
            <p className="text-gray-700 leading-relaxed">
              We collect information necessary to operate PROMPT LIBRARY and provide you with a great experience. Your submitted content is public, but we never sell your personal data. You can request access, correction, or deletion of your information at any time. Questions? Contact us at <a href="mailto:adelamati7@gmail.com" className="text-blue-600 hover:text-blue-700 underline">adelamati7@gmail.com</a>.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex gap-4">
            <Link href="/terms" className="text-orange-600 hover:text-orange-700 font-medium">
              Terms of Service →
            </Link>
            <Link href="/faq" className="text-orange-600 hover:text-orange-700 font-medium">
              FAQ →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
