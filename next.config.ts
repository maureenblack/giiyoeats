import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Hero source is 1200px. Keep every generated width at or under that so
  // the optimizer never enlarges it.
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [256, 328, 384, 480],
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/join",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
