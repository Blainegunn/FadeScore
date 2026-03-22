"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
    <header className="hidden sm:block sticky top-0 z-10 border-b border-fade-navy/10 bg-fade-canvas/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <LogoLink href="/" />
        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden sm:flex items-center gap-2 text-sm">
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

const MOBILE_NAV_ITEMS = [
  { href: "/", label: "Home", icon: "/branding/logo.png", isLogo: true },
  { href: "/compare", label: "Compare", icon: "/icons/compare.png", isLogo: false },
  { href: "/hidden-gem-barbers", label: "Gems", icon: "/icons/diamond.png", isLogo: false },
  { href: "/search", label: "Search", icon: "/icons/search.png", isLogo: false },
] as const;

function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-50 border-t border-fade-navy/10 bg-fade-canvas/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-12">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-center w-12 h-12 transition-opacity"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className={`${item.isLogo ? "h-6 w-auto object-contain" : "h-6 w-6"}`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-fade-navy/10 mt-auto py-10 bg-white/50 pb-20 sm:pb-10">
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
  return (
    <>
      <SiteHeader />
      <MobileBottomNav />
    </>
  );
}

export function AppFooter() {
  return <SiteFooter />;
}
