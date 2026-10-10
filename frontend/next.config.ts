import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Only typecheck application source files; excluded test suites won't fail build
    ignoreBuildErrors: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
