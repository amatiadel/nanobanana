import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for PROMPT LIBRARY - Understand the rules that keep our community collaborative.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FB] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Understand the rules that keep PROMPT LIBRARY collaborative.
          </p>
          <p className="text-gray-700 mb-8">
            These Terms describe your rights and responsibilities while using PROMPT LIBRARY. Please review them carefully so we can maintain a respectful, inspiring space for AI artists everywhere.
          </p>
          <p className="text-sm text-gray-500 mb-12">
            <strong>Effective date:</strong> September 25, 2025
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing PROMPT LIBRARY you agree to follow these Terms of Service and all applicable laws and regulations. If you disagree with any term, you should stop using the site immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility & Accounts</h2>
            <p className="text-gray-700 leading-relaxed">
              You must be at least 13 years old to create an account. When you register, provide accurate information and keep your credentials secure. You are responsible for all activity that occurs under your account.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Community Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PROMPT LIBRARY is a collaborative gallery. Use the service to share and learn—not to spam, harass, or otherwise disrupt the community. We reserve the right to suspend accounts that violate these rules or applicable laws.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Respect other creators and refrain from hateful, discriminatory, or explicit material.</li>
              <li>Do not post content that infringes copyrights, trademarks, or other third-party rights.</li>
              <li>Avoid automated scraping or attempts to circumvent security measures.</li>
              <li>Do not monetize prompts or charge other users for access.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Submissions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of the artwork, prompts, and metadata you submit. By uploading content you grant PROMPT LIBRARY a worldwide, non-exclusive license to host, display, and share your submission for the purpose of operating and promoting the platform.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Community prompts are free to browse and share on-platform</li>
              <li>Users may not sell prompts or gate access for payment</li>
              <li>We may remove submissions that violate these Terms or applicable laws</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Credits, Premium Prompts & Payments</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PROMPT LIBRARY sells credits that are consumed when generating images (and, in the future, videos). Community prompts are free. Some paid plans include access to premium prompts curated and authored by PROMPT LIBRARY.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Credits are non-transferable and cannot be exchanged between users</li>
              <li>We respond to all refund requests within 3 business days</li>
              <li>No refunds for unused credits or partial subscription periods</li>
              <li>Subscription prices may change with 30 days notice</li>
              <li>All payments are to PROMPT LIBRARY only - no peer-to-peer transactions</li>
              <li>Creem may issue refunds within 60 days of purchase at their discretion to prevent chargebacks</li>
              <li>Chargeback fees (25 USD/EUR per dispute, applied by providers) may be deducted from merchant balance</li>
              <li>For refund requests, email <a href="mailto:adelamati7@gmail.com" className="text-orange-600 hover:text-orange-700 underline">adelamati7@gmail.com</a> with your account email and order details</li>
              <li>Premium prompts are produced by PROMPT LIBRARY (admins) and included with paid plans where noted; users may not sell prompts</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Because PROMPT LIBRARY provides instant access to digital credits and services, refunds are limited.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Cancel subscriptions anytime in the Customer Portal; we don&apos;t prorate partial periods</li>
              <li>Duplicate charges or unauthorized transactions are refunded once verified</li>
              <li>Credit packs are generally non‑refundable once delivered</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All site design, copy, and code remain the property of PROMPT LIBRARY or our licensors. Except for content you submit, you may not copy, modify, distribute, or reverse engineer platform assets without prior written consent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers</h2>
            <p className="text-gray-700 leading-relaxed">
              PROMPT LIBRARY is provided &quot;as is.&quot; We do not guarantee uninterrupted service, accuracy of prompts, or suitability of gallery assets for your projects. Use your own judgment before applying shared prompts and workflows.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law, PROMPT LIBRARY and its contributors are not liable for any indirect, incidental, or consequential damages arising from your use of the platform or reliance on community submissions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms to reflect new features or legal requirements. When changes are significant we will post the revised version and update the effective date. Continued use of the platform signifies acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Have questions about these Terms or need to report a problem? Reach out to us so we can help keep the gallery healthy for everyone.
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> <a href="mailto:adelamati7@gmail.com" className="text-orange-600 hover:text-orange-700 underline">adelamati7@gmail.com</a>
            </p>
          </section>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Need a quick summary?</h3>
            <p className="text-gray-700 leading-relaxed">
              PROMPT LIBRARY exists to help artists learn from each other. Play fair, credit fellow creators, and use prompts at your own discretion. We can remove content that breaks the spirit of collaboration or infringes on others. Questions? Reach out and we will do our best to resolve them quickly.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex gap-4">
            <Link href="/privacy" className="text-orange-600 hover:text-orange-700 font-medium">
              Privacy Policy →
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
