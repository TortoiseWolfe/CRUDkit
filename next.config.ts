import type { NextConfig } from 'next';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

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

// Content Security Policy
// Updated to allow Google Analytics 4 domains
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com;
  img-src 'self' data: https: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.tile.openstreetmap.org;
  font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com https://fonts.cdnfonts.com;
  connect-src 'self' https: https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.tile.openstreetmap.org;
  media-src 'self';
  object-src 'none';
  frame-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  },
];

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
