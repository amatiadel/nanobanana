"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", href: "/", label: "Home", disabled: false },
    { id: "images", href: "/images", label: "Images", disabled: false },
    { id: "videos", href: "#", label: "Videos", disabled: true },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${className || ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-yellow-400" />
              <span className="text-lg font-bold tracking-tight text-slate-900">
                PROMPT LIBRARY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) =>
              link.disabled ? (
                <div key={link.id} className="relative flex flex-col items-start">
                  <span className="text-sm font-medium text-slate-700">
                    Videos
                  </span>
                  <span className="absolute -bottom-3 left-0 inline-block rotate-2 transform rounded bg-yellow-400 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-slate-900 shadow-sm">
                    Soon
                  </span>
                </div>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button 
              asChild
              className="bg-slate-900 text-white hover:bg-slate-800"
            >
              <a 
                href="https://t.me/syntxaibot?start=aff_1111450588" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Generate Image
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) =>
                  link.disabled ? (
                    <div key={link.id} className="relative flex flex-col items-start">
                      <span className="text-lg font-medium text-slate-700">
                        Videos
                      </span>
                      <span className="mt-1 inline-block rotate-2 transform rounded bg-yellow-400 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-slate-900 shadow-sm">
                        Soon
                      </span>
                    </div>
                  ) : (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="text-lg font-medium text-slate-700 transition-colors hover:text-slate-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <Button 
                  asChild
                  className="mt-4 bg-slate-900 text-white hover:bg-slate-800"
                >
                  <a 
                    href="https://t.me/syntxaibot?start=aff_1111450588" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Generate Image
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
