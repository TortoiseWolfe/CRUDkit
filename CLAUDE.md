# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Docker Development (Preferred)
All commands should be run through Docker Compose for consistent builds:
```bash
# Start development environment
docker compose up

# Run commands in container
docker compose exec crudkit npm run dev       # Dev server on :3000
docker compose exec crudkit npm run build     # Production build
docker compose exec crudkit npm run storybook # Storybook on :6006
docker compose exec crudkit npm run lint      # Run ESLint
```

### Direct Commands (if not using Docker)
```bash
npm run dev              # Start Next.js dev server
npm run build            # Build for production  
npm run start            # Start production server
npm run lint             # Run ESLint
npm run storybook        # Start Storybook
npm run build-storybook  # Build Storybook
```

## Architecture

### Core Stack
- **Next.js 15.5.2** with App Router and static export for GitHub Pages
- **React 19.1.0** with TypeScript strict mode
- **Tailwind CSS 4** with DaisyUI beta for 32-theme system
- **PWA** features with Service Worker and offline support

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with component showcase
│   ├── themes/            # Theme switcher page
│   ├── components/        # Component gallery page
│   ├── accessibility/     # Accessibility controls
│   └── status/            # Real-time status dashboard
├── components/            # Atomic design pattern
│   ├── subatomic/        # Text, Button, Input primitives
│   ├── atomic/           # Card, Form, Modal components
│   └── PWAInstall.tsx    # PWA installation prompt
├── config/
│   └── project-status.json # Dynamic configuration for forks
├── contexts/
│   └── AccessibilityContext.tsx # Font size/spacing controls
└── utils/                # Web Vitals, PWA testing utilities
```

### Key Configuration Files

#### next.config.ts
- Sets `basePath: '/CRUDkit'` for GitHub Pages deployment
- Configures `output: 'export'` for static site generation
- Implements comprehensive security headers and CSP
- Handles both local and production environments

#### src/config/project-status.json
Dynamic configuration for fork customization:
- Project metadata (name, repository, dates)
- Feature completion tracking
- Fork-specific customization instructions

### GitHub Pages Deployment
The project uses GitHub Actions for automated deployment:
- Static export with `basePath` configuration
- Deploys main app to `/CRUDkit/`
- Deploys Storybook to `/CRUDkit/storybook/`
- All asset paths must use relative URLs or the basePath

### PWA Implementation
- Service Worker at `/public/sw.js` for offline support
- Manifest at `/public/manifest.json` for installation
- Background sync for form submissions
- App shortcuts configuration
- Icons need to be in SVG format (PNG requires additional dependencies)

### Theme System
- 32 DaisyUI themes (16 light + 16 dark)
- Theme persistence via localStorage
- ThemeScript component prevents flash on load
- Accessibility controls for font size and spacing adjustments

### Status Dashboard Features
The `/status` page provides real-time monitoring:
- Web Vitals (FCP, LCP, CLS, TTFB) collection
- PWA feature testing suite
- **Lighthouse testing via PageSpeed Insights API** - Click "Run Test" to get real scores
- Project progress tracking from config
- Deployment history generated from features
- Results stored in localStorage for persistence

### Component Development
- Follow atomic design pattern (subatomic → atomic → molecular)
- All components should be documented in Storybook
- Use TypeScript interfaces for all props
- Components use DaisyUI classes for theming consistency

### Testing & Quality
- TypeScript strict mode enabled
- ESLint configuration via `eslint.config.mjs`
- Web Vitals monitoring integrated
- PWA test utilities in `/src/utils/pwa-test.ts`

### Important Notes for Modifications

1. **Dynamic Status Page**: After forking, users should update `/src/config/project-status.json` with their project details
2. **GitHub Pages URLs**: All hardcoded URLs reference `tortoisewolfe.github.io/CRUDkit` - these need updating after forking
3. **Docker-First Development**: Always use Docker Compose commands for consistency
4. **Build Verification**: Run `docker compose exec crudkit npm run build` before committing
5. **CSP Headers**: Security headers are configured but may need adjustment for external resources
6. **PWA Icons**: Use SVG format to avoid Canvas npm dependency issues in Docker