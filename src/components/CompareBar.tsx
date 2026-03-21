"use client";

import { useCompare } from "@/context/CompareContext";
import { useRouter } from "next/navigation";

export function CompareBar() {
  const { selectedBarbers, toggle, clear } = useCompare();
  const router = useRouter();

  function handleCompareNow() {
    const slugs = selectedBarbers.map((b) => b.slug).join(",");
    router.push(`/compare?barbers=${slugs}`);
  }

  const isOpen = selectedBarbers.length > 0;

  return (
    <>
      {/* Spacer to prevent content from being hidden behind the fixed bar */}
      {isOpen && <div className="h-20" />}
      {isOpen && (
        <div className="fixed bottom-0 inset-x-0 z-50">
          <div className="mx-auto max-w-4xl px-4 pb-4">
            <div className="flex items-center gap-3 rounded-2xl border border-fade-navy/10 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-lg shadow-fade-navy/10">
              <span className="shrink-0 text-sm font-medium text-fade-muted">
                {selectedBarbers.length} of 4
              </span>

              <div className="flex flex-1 flex-wrap items-center gap-2 min-w-0">
                {selectedBarbers.map((b) => (
                  <span
                    key={b.slug}
                    className="inline-flex items-center gap-1.5 rounded-full bg-fade-canvas px-3 py-1 text-sm font-medium text-fade-navy border border-fade-navy/8"
                  >
                    <span className="truncate max-w-[120px]">{b.name}</span>
                    <button
                      onClick={() => toggle(b)}
                      className="ml-0.5 text-fade-muted hover:text-red-500 transition-colors"
                      aria-label={`Remove ${b.name}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={clear}
                  className="text-xs text-fade-muted hover:text-fade-navy transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={handleCompareNow}
                  disabled={selectedBarbers.length < 2}
                  className="rounded-full bg-fade-accent px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-fade-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
