# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Docker Development (Preferred)

All commands should be run through Docker Compose for consistent builds:

```bash
# Start development environment
docker compose up

# Run commands in container
docker compose exec crudkit pnpm run dev       # Dev server on :3000
docker compose exec crudkit pnpm run build     # Production build
docker compose exec crudkit pnpm run storybook # Storybook on :6006
docker compose exec crudkit pnpm run lint      # Run ESLint
docker compose exec crudkit pnpm run format    # Format all files with Prettier
docker compose exec crudkit pnpm run format:check # Check formatting
docker compose exec crudkit pnpm test          # Run unit tests
docker compose exec crudkit pnpm test:coverage # Run tests with coverage
```

### Direct Commands (if not using Docker)

```bash
pnpm run dev              # Start Next.js dev server
pnpm run build            # Build for production
pnpm run start            # Start production server
pnpm run lint             # Run ESLint
pnpm run format           # Format all files with Prettier
pnpm run format:check     # Check formatting without changes
pnpm run test             # Run unit tests
pnpm run test:coverage    # Run tests with coverage
pnpm run storybook        # Start Storybook
pnpm run build-storybook  # Build Storybook
```

## Architecture

### Core Stack

- **Next.js 15.5.2** with App Router and static export for GitHub Pages
- **React 19.1.0** with TypeScript strict mode
- **Tailwind CSS 4** with DaisyUI beta for 32-theme system
- **PWA** features with Service Worker and offline support
- **Vitest** for unit testing with React Testing Library
- **Prettier** for code formatting with Tailwind CSS plugin
- **Husky** for git hooks and lint-staged for pre-commit checks

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with component showcase
│   ├── themes/            # Theme switcher page
│   ├── components/        # Component gallery page
│   ├── accessibility/     # Accessibility controls
│   ├── status/            # Real-time status dashboard
│   └── api/health/        # Health check endpoint for monitoring
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
- Health check endpoint at `/api/health` returns system status

### Component Development

- Follow atomic design pattern (subatomic → atomic → molecular)
- All components should be documented in Storybook
- Use TypeScript interfaces for all props
- Components use DaisyUI classes for theming consistency
- **Use the component generator**: `docker compose exec crudkit pnpm run generate:component`
- All components must follow the 4-file pattern (enforced by CI/CD)
- See [docs/CREATING_COMPONENTS.md](./docs/CREATING_COMPONENTS.md) for detailed guide

### Component Structure (4-File Pattern) ⚠️ REQUIRED

All components MUST follow the 4-file pattern:

```
ComponentName/
├── index.tsx              # Barrel export
├── ComponentName.tsx      # Main component
├── ComponentName.test.tsx # Tests (required)
└── ComponentName.stories.tsx # Storybook (required)
```

#### Component Management Commands

```bash
# Check component compliance
pnpm run audit:components

# Auto-fix non-compliant components
pnpm run migrate:components

# Validate for CI (exits with error if non-compliant)
pnpm run validate:structure

# Generate new component with proper structure
pnpm run generate:component
```

#### VSCode Snippets

Use these snippets for faster development:

- `rfc4` - Create React component with 4-file structure
- `rcindex` - Create index.tsx barrel export
- `rctest` - Create component test file
- `rcstory` - Create component story file

#### CI Enforcement

Pull requests will fail if components don't follow the 4-file pattern. The GitHub Actions workflow automatically validates structure on every PR.

### Testing & Quality

- Vitest testing framework with React Testing Library
- Test coverage reporting with configurable thresholds (currently 10%)
- Prettier code formatting with automatic formatting on pre-commit
- Husky pre-commit hooks running lint-staged (format, lint, test)
- GitHub Actions CI/CD pipeline for automated testing
- TypeScript strict mode enabled
- ESLint configuration via `eslint.config.mjs`
- Web Vitals monitoring integrated
- PWA test utilities in `/src/utils/pwa-test.ts`
- Testing documentation in `/TESTING.md`

### Important Notes for Modifications

1. **Dynamic Status Page**: After forking, users should update `/src/config/project-status.json` with their project details
2. **GitHub Pages URLs**: All hardcoded URLs reference `tortoisewolfe.github.io/CRUDkit` - these need updating after forking
3. **Docker-First Development**: Always use Docker Compose commands for consistency
4. **Build Verification**: Run `docker compose exec crudkit pnpm run build` before committing
5. **Code Formatting**: All code is formatted with Prettier - run `pnpm format` before committing
6. **CSP Headers**: Security headers are configured but may need adjustment for external resources
7. **PWA Icons**: Use SVG format to avoid Canvas dependency issues in Docker
8. **Package Manager**: Project uses pnpm exclusively - no npm or yarn
