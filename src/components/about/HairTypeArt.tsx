/** Simple inline illustrations for hair texture (not photos). */

export function StraightHairArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      {[16, 36, 56, 76, 96].map((x) => (
        <path
          key={x}
          d={`M${x} 12 L${x} 60`}
          className="stroke-fade-navy/55"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export function WavyHairArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      {[14, 34, 54, 74, 94].map((x, i) => (
        <path
          key={x}
          d={`M${x} 14 Q${x + 8} 28 ${x} 42 Q${x - 8} 56 ${x} 62`}
          className="stroke-fade-navy/55"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ opacity: 0.85 + (i % 2) * 0.1 }}
        />
      ))}
    </svg>
  );
}

export function CoilyHairArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="120" height="72" rx="12" className="fill-fade-canvas" />
      {[
        [26, 22, -12],
        [48, 26, 8],
        [70, 20, -6],
        [92, 24, 14],
      ].map(([cx, cy, rot]) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx="10"
          ry="14"
          transform={`rotate(${rot} ${cx} ${cy})`}
          className="stroke-fade-navy/48 fill-none"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
