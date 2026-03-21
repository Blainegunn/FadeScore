import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-fade-navy mb-4">Page not found</h1>
      <p className="text-fade-muted mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-fade-navy text-white font-semibold hover:bg-fade-navy/90"
        >
          Go Home
        </Link>
        <Link
          href="/search"
          className="px-5 py-2.5 rounded-full border border-fade-navy/15 bg-white font-medium text-fade-navy hover:bg-fade-canvas"
        >
          Search Barbers
        </Link>
      </div>
    </div>
  );
}
