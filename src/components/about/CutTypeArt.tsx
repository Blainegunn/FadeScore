/** Small SVG accents paired with icons for cut / service types. */

export function FadeSilhouetteArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      <path
        d="M24 52 L24 28 C24 20 32 14 42 14 C52 14 58 18 60 24 C62 18 70 14 80 14 C92 14 98 22 98 32 L98 52"
        className="stroke-fade-navy/35"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M28 52 L28 34 C28 26 36 20 44 20 C52 20 58 26 60 34 C62 26 70 20 80 20 C90 20 94 28 94 38 L94 52"
        className="stroke-fade-accent/90"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LineupArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      <path
        d="M28 24 L92 24"
        className="stroke-fade-navy/50"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 38 L88 38"
        className="stroke-fade-accent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 5"
      />
      <path
        d="M30 52 L90 52"
        className="stroke-fade-navy/35"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BeardOutlineArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      <ellipse
        cx="60"
        cy="34"
        rx="22"
        ry="26"
        className="stroke-fade-navy/30"
        strokeWidth="2"
      />
      <path
        d="M42 38 Q60 62 78 38"
        className="stroke-fade-accent/85"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function LocsArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      {[22, 38, 54, 70, 86].map((x) => (
        <path
          key={x}
          d={`M${x} 12 C${x + 6} 24 ${x - 6} 36 ${x + 4} 48 C${x - 2} 56 ${x + 2} 62 ${x} 68`}
          className="stroke-fade-navy/50"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function RazorArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      <path
        d="M28 48 L88 20"
        className="stroke-fade-navy/45"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 46 L84 22"
        className="stroke-fade-accent"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="90" cy="18" r="4" className="fill-fade-navy/25" />
    </svg>
  );
}

export function BraidsArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      {[26, 46, 66].map((x, i) => (
        <path
          key={x}
          d={`M${x} 14 C${x + 10 + i * 2} 26 ${x - 10} 40 ${x + 8} 54 C${x - 4} 62 ${x + 2} 68 ${x} 70`}
          className="stroke-fade-navy/48"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function ColorSwatchArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      <rect x="22" y="20" width="22" height="36" rx="4" className="fill-fade-navy/20" />
      <rect x="49" y="20" width="22" height="36" rx="4" className="fill-fade-accent/40" />
      <rect x="76" y="20" width="22" height="36" rx="4" className="fill-fade-navy/35" />
    </svg>
  );
}
