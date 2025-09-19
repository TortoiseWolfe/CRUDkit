import type { NextConfig } from 'next';
import { execSync } from 'child_process';

// Run project detection at build time
function detectProjectConfig() {
  try {
    // Run the detection script to generate config files
    execSync('node scripts/detect-project.js', { stdio: 'inherit' });
  } catch {
    console.warn('Could not run detection script');
  }

  // Use environment variable if set (from .env.local or CI/CD)
  if (process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }

  // In GitHub Actions, use the repository name for base path
  // Otherwise, use no base path for local development
  const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
  if (isGithubActions) {
    // Try to get repo name from GitHub environment
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
    return repoName ? `/${repoName}` : '';
  }

  return '';
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

export default nextConfig;
