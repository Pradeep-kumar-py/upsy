import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    // ⚠️ Build will pass even if ESLint finds errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
