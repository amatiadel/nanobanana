import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="text-[200px] font-black text-yellow-400 leading-none mb-8">
            404
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              href="/images"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Browse Images
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
