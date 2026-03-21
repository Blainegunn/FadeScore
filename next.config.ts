import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*.(png|jpg|jpeg|svg|ico|webp|avif|woff2|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      // fallback rewrites only apply after all page routes are checked,
      // so existing routes like /best-barbers-in/[city] are NOT intercepted
      fallback: [
        {
          source: "/best-:specialty-in/:city",
          destination: "/specialty/:specialty/:city",
        },
        {
          source: "/best-barbers-for-:hairtype-in/:city",
          destination: "/hairtype/:hairtype/:city",
        },
      ],
    };
  },
};

export default nextConfig;
