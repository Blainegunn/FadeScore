import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
