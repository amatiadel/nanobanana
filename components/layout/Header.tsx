"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
    { id: "studio", href: "#", label: "Studio", disabled: true },
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
                BANANA PROMPTS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) =>
              link.disabled ? (
                <span
                  key={link.id}
                  className="cursor-not-allowed text-sm font-medium text-slate-400"
                  aria-disabled="true"
                >
                  {link.label}
                </span>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-slate-900 text-white hover:bg-slate-800">
                  Generate Image
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Image</DialogTitle>
                  <DialogDescription>
                    This feature is coming soon! Stay tuned for AI image
                    generation capabilities.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
                    <span
                      key={link.id}
                      className="cursor-not-allowed text-lg font-medium text-slate-400"
                      aria-disabled="true"
                    >
                      {link.label}
                    </span>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 bg-slate-900 text-white hover:bg-slate-800">
                      Generate Image
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Generate Image</DialogTitle>
                      <DialogDescription>
                        This feature is coming soon! Stay tuned for AI image
                        generation capabilities.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
