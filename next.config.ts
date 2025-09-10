import type { NextConfig } from "next";

// Detect if we're building for GitHub Pages
const isGithubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.NODE_ENV === 'production';
const basePath = isGithubPages ? '/CRUDkit' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
