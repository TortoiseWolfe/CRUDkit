/**
 * Project Configuration
 * This module provides project-wide configuration with the following priority:
 * 1. Environment variables (highest priority)
 * 2. Default values (lowest priority)
 *
 * When forking this template:
 * - The scripts/detect-project.js script runs at build time to auto-detect settings
 * - Or set environment variables: NEXT_PUBLIC_PROJECT_NAME, NEXT_PUBLIC_PROJECT_OWNER
 */

// Default configuration
const defaultConfig = {
  projectName: 'CRUDkit',
  projectOwner: 'TortoiseWolfe',
  projectDescription:
    'Modern Next.js starter with PWA, theming, and interactive components',
  basePath: '',
};

// Environment variable overrides (highest priority)
const envConfig = {
  projectName: process.env.NEXT_PUBLIC_PROJECT_NAME,
  projectOwner: process.env.NEXT_PUBLIC_PROJECT_OWNER,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

/**
 * Get the current project configuration
 * Priority: Environment > Default
 */
export function getProjectConfig() {
  const config = {
    projectName: envConfig.projectName || defaultConfig.projectName,
    projectOwner: envConfig.projectOwner || defaultConfig.projectOwner,
    projectDescription: defaultConfig.projectDescription,
    basePath: envConfig.basePath ?? defaultConfig.basePath,
  };

  // Computed values
  const projectUrl = `https://github.com/${config.projectOwner}/${config.projectName}`;
  const deployUrl = config.basePath
    ? `https://${config.projectOwner.toLowerCase()}.github.io${config.basePath}`
    : 'http://localhost:3000';

  return {
    ...config,
    projectUrl,
    deployUrl,
    // Paths with basePath included
    manifestPath: `${config.basePath}/manifest.json`,
    swPath: `${config.basePath}/sw.js`,
    faviconPath: `${config.basePath}/favicon.svg`,
    appleTouchIconPath: `${config.basePath}/apple-touch-icon.svg`,
  };
}

// Export as a singleton for consistent access
export const projectConfig = getProjectConfig();

// Type export for TypeScript
export type ProjectConfig = ReturnType<typeof getProjectConfig>;

// Helper function to check if running in GitHub Pages
export function isGitHubPages(): boolean {
  return (
    process.env.GITHUB_ACTIONS === 'true' ||
    (process.env.NODE_ENV === 'production' && !!projectConfig.basePath)
  );
}

// Helper function to get the full asset URL
export function getAssetUrl(path: string): string {
  const config = getProjectConfig();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${config.basePath}${cleanPath}`;
}

// Helper function for dynamic manifest generation
export function generateManifest() {
  const config = getProjectConfig();
  const basePath = config.basePath || '';

  return {
    name: `${config.projectName} - Modern Web Starter`,
    short_name: config.projectName,
    description: config.projectDescription,
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#570df8',
    background_color: '#ffffff',
    categories: ['developer', 'productivity', 'utilities'],
    icons: [
      {
        src: `${basePath}/favicon.svg`,
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: `${basePath}/icon-192x192.svg`,
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: `${basePath}/icon-512x512.svg`,
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: `${basePath}/icon-maskable.svg`,
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: `${basePath}/screenshot-wide.png`,
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
      {
        src: `${basePath}/screenshot-narrow.png`,
        sizes: '720x1280',
        type: 'image/png',
        form_factor: 'narrow',
      },
    ],
    shortcuts: [
      {
        name: 'Themes',
        url: `${basePath}/themes/`,
        description: 'Browse and switch themes',
      },
      {
        name: 'Components',
        url: `${basePath}/components/`,
        description: 'View component gallery',
      },
      {
        name: 'Accessibility',
        url: `${basePath}/accessibility/`,
        description: 'Adjust reading preferences',
      },
    ],
  };
}
