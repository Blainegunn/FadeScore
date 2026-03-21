"use client";

import Link from "next/link";
import Image from "next/image";

function LogoLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center shrink-0 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-fade-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-fade-canvas"
    >
      <Image
        src="/branding/logo.png"
        alt="FadeScore"
        width={192}
        height={128}
        priority
        className="h-9 sm:h-10 w-auto max-w-[min(100vw-8rem,220px)] object-contain object-left"
      />
    </Link>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-fade-navy/10 bg-fade-canvas/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <LogoLink href="/" />
        <nav className="flex items-center gap-1 sm:gap-2 text-sm flex-wrap justify-end">
          <Link
            href="/search"
            className="px-3 py-2 rounded-full text-fade-muted hover:text-fade-navy hover:bg-white/80 transition-colors"
          >
            Search
          </Link>
          <Link
            href="/hidden-gem-barbers"
            className="px-3 py-2 rounded-full text-fade-muted hover:text-fade-navy hover:bg-white/80 transition-colors"
          >
            Hidden Gems
          </Link>
          <Link
            href="/compare"
            className="px-3 py-2 rounded-full text-fade-muted hover:text-fade-navy hover:bg-white/80 transition-colors"
          >
            Compare
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-fade-navy/10 mt-auto py-10 bg-white/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-fade-muted mb-6">
          <Link
            href="/search"
            className="hover:text-fade-navy transition-colors"
          >
            Search
          </Link>
          <Link
            href="/hidden-gem-barbers"
            className="hover:text-fade-navy transition-colors"
          >
            Hidden Gems
          </Link>
          <Link
            href="/how-we-rank"
            className="hover:text-fade-navy transition-colors"
          >
            How we rank
          </Link>
          <Link
            href="/about"
            className="hover:text-fade-navy transition-colors"
          >
            About
          </Link>
          <Link
            href="/barber-intake"
            className="hover:text-fade-navy transition-colors"
          >
            Barber intake
          </Link>
        </nav>
        <p className="text-center text-sm text-fade-muted">
          &copy; {new Date().getFullYear()} FadeScore. Find the best barbers in
          your city.
        </p>
      </div>
    </footer>
  );
}

export function AppHeader() {
  return <SiteHeader />;
}

export function AppFooter() {
  return <SiteFooter />;
}
