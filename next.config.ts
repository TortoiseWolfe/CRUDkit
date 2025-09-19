import type { NextConfig } from 'next';
import { execSync } from 'child_process';

// Run project detection at build time
function detectProjectConfig() {
  try {
    // Run the detection script to generate .env.local
    execSync('node scripts/detect-project.js', { stdio: 'inherit' });
  } catch {
    console.warn('Could not run detection script');
  }

  // Use environment variable if set (from .env.local or CI/CD)
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }

  // Fallback - only use basePath in GitHub Actions CI/CD
  const isGithubActions = process.env['GITHUB_ACTIONS'] === 'true';
  return isGithubActions ? '/CRUDkit' : '';
}

const basePath = detectProjectConfig();

// Security headers removed - not compatible with static export
// See docs/deployment/security-headers.md for hosting-level configuration

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Headers don't work with static export, removed to fix build
  // Security headers should be set at the hosting level (nginx, Apache, etc.)
};

// Configure bundle analyzer conditionally
const configureAnalyzer = () => {
  if (process.env.ANALYZE === 'true') {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    });
    return withBundleAnalyzer(nextConfig);
  }
  return nextConfig;
};

export default configureAnalyzer();
