"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            <span className="text-sm font-semibold text-slate-900">
              PROMPT LIBRARY
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/"
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              Home
            </Link>
            <Link
              href="/images"
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              Images
            </Link>
          </nav>

          <p className="text-sm text-slate-500">
            © {currentYear} PROMPT LIBRARY
          </p>
        </div>
      </div>
    </footer>
  );
}
