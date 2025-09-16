# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Philosophy

**This is a long-term stable template. Always prioritize:**

1. **Proper Solutions Over Quick Fixes** - Take time to implement things correctly the first time
2. **Permanent Fixes Over Workarounds** - Address root causes, not symptoms
3. **Stability Over Speed** - This template will be used by many projects; reliability is paramount
4. **Clean Architecture** - Follow established patterns and maintain consistency
5. **Future-Proof Code** - Consider long-term maintenance and scalability

**When encountering issues:**

- Investigate the root cause thoroughly
- Implement the correct solution, even if it takes longer
- Document the solution properly for future reference
- Test the solution across different environments
- Never leave TODO comments or temporary fixes in production code

## Component Structure Requirements ⚠️ MANDATORY

**CRITICAL**: This project enforces a strict 5-file component pattern. Components without all 5 files will FAIL CI/CD.

### The 5-File Pattern (Required)

```
ComponentName/
├── index.tsx                             # Barrel export
├── ComponentName.tsx                     # Main component
├── ComponentName.test.tsx                # Unit tests (REQUIRED)
├── ComponentName.stories.tsx             # Storybook (REQUIRED)
└── ComponentName.accessibility.test.tsx  # Accessibility tests (REQUIRED)
```

### Creating Components

**ALWAYS use the component generator:**

```bash
# Docker (required for consistency)
docker compose exec crudkit pnpm run generate:component

# The generator will prompt for:
# - Component name (PascalCase)
# - Category (subatomic/atomic/molecular/organisms/templates)
# - Props configuration
# - Custom hooks option
```

**NEVER create components manually** - the generator ensures:

- All 5 required files are created
- Proper TypeScript interfaces are exported
- Tests follow the correct patterns
- Storybook stories are properly configured
- Accessibility tests are included

### Component Validation & Enforcement

```bash
# Check compliance (run before committing)
pnpm run audit:components

# Auto-fix non-compliant components
pnpm run migrate:components

# CI validation (this runs on every PR)
pnpm run validate:structure
```

### VSCode Snippets (Reference Only)

The project includes VSCode snippets in `.vscode/component.code-snippets`:

- `rcindex` - Index barrel export pattern
- `rctest` - Test file pattern
- `rcstory` - Storybook story pattern
- `rcquick` - Reminder to use the generator

**Note**: These snippets are for reference only. Always use `pnpm run generate:component` to create new components.

### Why This Matters

- **CI/CD will reject** any PR with non-compliant components
- **Consistency** across the entire codebase
- **Quality assurance** through mandatory testing
- **Documentation** through required Storybook stories
- **Accessibility** through required a11y tests

For detailed documentation, see `/docs/CREATING_COMPONENTS.md`

## Commands

### Docker Development (Preferred)

All commands should be run through Docker Compose for consistent builds:

```bash
# Start development environment (with automatic cleanup)
docker compose up

# Alternative: Clean start (removes stale build artifacts)
pnpm run docker:clean  # or ./scripts/clean-start.sh

# Run commands in container
docker compose exec crudkit pnpm run dev       # Dev server on :3000
docker compose exec crudkit pnpm run build     # Production build
docker compose exec crudkit pnpm run storybook # Storybook on :6006
docker compose exec crudkit pnpm run lint      # Run ESLint
docker compose exec crudkit pnpm run format    # Format all files with Prettier
docker compose exec crudkit pnpm run format:check # Check formatting
docker compose exec crudkit pnpm test          # Run unit tests
docker compose exec crudkit pnpm test:coverage # Run tests with coverage

# Troubleshooting webpack/build issues
pnpm run docker:clean    # Clean start with fresh build
pnpm run docker:rebuild  # Rebuild containers from scratch
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

## PRP (Product Requirements Prompt) Workflow

### Quick Command Reference for PRPs

```bash
# Step 1: Setup feature branch from PRP
./scripts/prp-to-feature.sh <prp-name> <number>
# Example: ./scripts/prp-to-feature.sh e2e-testing-framework 003

# Step 2: Execute /plan command (creates plan.md + Phase 0/1 artifacts)
# Just tell Claude: "execute /plan"

# Step 3: Execute /tasks command (creates tasks.md)
# Just tell Claude: "execute /tasks" or "proceed with /tasks"
```

### What The Slash Commands Actually Do

**IMPORTANT**: The `/plan` and `/tasks` commands are **Claude instructions**, NOT shell scripts!

- **`/plan`** - Claude reads the spec and generates:
  - plan.md (implementation plan)
  - research.md (technology decisions)
  - data-model.md (entities and models)
  - contracts/ (API specifications)
  - quickstart.md (getting started guide)

- **`/tasks`** - Claude reads the plan artifacts and generates:
  - tasks.md (numbered tasks T001, T002, etc. following TDD)

### Common Mistakes to Avoid

❌ **DON'T** look for scripts that don't exist:

- `.specify/scripts/bash/setup-plan.sh` - DOESN'T EXIST
- `.specify/scripts/bash/check-task-prerequisites.sh` - DOESN'T EXIST

❌ **DON'T** try to use specify tool for plan/tasks:

- `uvx specify generate plan` - WRONG
- `uvx specify generate tasks` - WRONG

✅ **DO** just tell Claude to execute the commands:

- "execute /plan" - Claude generates the plan artifacts
- "execute /tasks" - Claude generates the task list

### Complete PRP Example

```bash
# List available PRPs
ls docs/prp-docs/*-prp.md

# Start PRP 003 (E2E Testing)
./scripts/prp-to-feature.sh e2e-testing-framework 003
# Creates branch: 003-e2e-testing-framework
# Copies PRP to: specs/003-e2e-testing-framework/spec.md

# Tell Claude: "execute /plan"
# Claude creates: plan.md, research.md, data-model.md, contracts/, quickstart.md

# Tell Claude: "execute /tasks"
# Claude creates: tasks.md with ~25 tasks

# Start implementing tasks in order
# Follow TDD: Write tests first (RED), then implement (GREEN)
```

### PRP Documentation

- **Workflow Guide**: `/docs/PRP-EXECUTION-GUIDE.md` - Detailed step-by-step guide
- **Command Reference**: `/.claude/commands/README.md` - What slash commands do
- **PRP Status**: `/docs/prp-docs/PRP-STATUS.md` - Track all PRPs

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
│   ├── privacy/           # Privacy policy page
│   ├── cookies/           # Cookie policy page
│   ├── privacy-controls/  # Privacy controls dashboard
│   ├── status/            # Real-time status dashboard
│   └── api/health/        # Health check endpoint for monitoring
├── components/            # Atomic design pattern
│   ├── subatomic/        # Text, Button, Input primitives
│   ├── atomic/           # Card, Form, Modal, ColorblindToggle, ColorblindFilters
│   ├── privacy/          # CookieConsent, ConsentModal, PrivacyControls
│   └── PWAInstall.tsx    # PWA installation prompt
├── config/
│   └── project-status.json # Dynamic configuration for forks
├── contexts/
│   ├── AccessibilityContext.tsx # Font size/spacing controls
│   └── ConsentContext.tsx       # Cookie consent management
└── utils/                # Web Vitals, PWA testing, consent utilities
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
- Color vision assistance with daltonization correction matrices
  - Located in `/src/components/atomic/ColorblindToggle` and `/src/components/atomic/ColorblindFilters`
  - Uses SVG filters for GPU-accelerated color correction (not simulation)
  - Supports 8 types of color vision deficiencies
  - Settings persist to localStorage
  - Optional pattern overlays for additional visual distinction

### Privacy & Compliance

- GDPR-compliant cookie consent system with granular control
- ConsentContext manages consent state across the application
- Cookie categories: essential, analytics, marketing, functional
- Consent UI appears on first visit, dismissible after choice
- Privacy controls dashboard at `/privacy-controls`
- Comprehensive privacy policy at `/privacy`
- Detailed cookie policy at `/cookies`
- All consent preferences persist via localStorage
- Analytics and tracking only activate after explicit user consent

### Status Dashboard Features

The `/status` page provides real-time monitoring:

- Web Vitals (FCP, LCP, CLS, TTFB) collection
- PWA feature testing suite
- **Lighthouse testing via PageSpeed Insights API** - Click "Run Test" to get real scores
- Project progress tracking from config
- Deployment history generated from features
- Results stored in localStorage for persistence
- Health check endpoint at `/api/health` returns system status

### Component Development Guidelines

- Follow atomic design pattern (subatomic → atomic → molecular → organisms → templates)
- All components must be documented in Storybook
- Use TypeScript interfaces for all props (must be exported)
- Components use DaisyUI classes for theming consistency
- **MANDATORY**: Use the component generator (see Component Structure Requirements above)
- **ENFORCED**: All components must follow the 5-file pattern or CI/CD will fail

### Testing & Quality

- Vitest testing framework with React Testing Library
- Test coverage reporting with configurable thresholds (currently 25% minimum, 58% actual)
- **E2E Testing**: Playwright framework for local development
  - Run with `pnpm test:e2e` (local only, not in CI)
  - 40+ tests with Page Object Model architecture
  - Full documentation in `/e2e/README.md`
- Prettier code formatting with automatic formatting on pre-commit
- Husky pre-commit hooks running lint-staged (format, lint, test)
- GitHub Actions CI/CD pipeline for automated testing
- TypeScript strict mode enabled
- ESLint configuration via `eslint.config.mjs`
- Web Vitals monitoring integrated
- PWA test utilities in `/src/utils/pwa-test.ts`
- Testing documentation in `/TESTING.md`

### Important Development Principles

1. **Quality Over Speed**: This is a stable template - implement solutions properly the first time
2. **Root Cause Analysis**: Always investigate and fix the underlying issue, not just symptoms
3. **Docker-First Development**: All development must work correctly in Docker containers
4. **Security by Default**: Run containers as non-root users, implement proper CSP headers
5. **Consistent Environment**: Use exact versions (pnpm 10.16.1, Node 22) to ensure reproducibility
6. **Proper Testing**: Write tests before implementing features (TDD approach)
7. **Clean Architecture**: Follow atomic design patterns and maintain the 5-file component structure
8. **Documentation**: Document solutions thoroughly for future maintainers
9. **No Technical Debt**: Never commit TODOs, workarounds, or temporary fixes

### Configuration Requirements After Forking

1. **Update project metadata** in `/src/config/project-status.json`
2. **Replace GitHub Pages URLs** from `tortoisewolfe.github.io/CRUDkit` to your domain
3. **Create `.env` file** with your system's UID/GID for Docker permissions
4. **Verify security headers** in `next.config.ts` for your specific needs
5. **Test the complete setup** in Docker before making any changes

### Troubleshooting Common Issues

#### Husky v10 Deprecation Warning

When running `git push`, you may see this warning:

```
husky - DEPRECATED
Please remove the following two lines from .husky/pre-push:
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
```

**Current Status**: The warning is non-breaking and tests still run correctly. The deprecated lines will need to be removed when upgrading to Husky v10.

**To fix (when ready to migrate to v10)**:

1. Remove lines 1-2 from `.husky/pre-push`
2. Keep only the actual command: `docker compose exec -T crudkit pnpm test:coverage`

**Note**: This is a known issue with Husky v9 preparing for v10 changes. No immediate action required.

#### Webpack "Cannot read properties of undefined" Errors

**Root Cause:**
This error occurs when Next.js webpack cache becomes corrupted, often due to interrupted builds, version mismatches, or file system issues.

**Proper Solution:**

Configure Next.js to handle cache more robustly in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  // ... existing config
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Use in-memory cache for development
      config.cache = {
        type: 'memory',
        maxGenerations: 1,
      };
    }
    return config;
  },
  // Disable SWC minification if causing issues
  swcMinify: true,
  // Configure proper cache handling
  experimental: {
    // Use proper cache invalidation
    incrementalCacheHandlerPath: undefined,
  },
};
```

**Implementation Steps:**

1. **Configure webpack cache properly** in next.config.ts
2. **Use tmpfs for .next in Docker** (already implemented in docker-compose.override.yml)
3. **Implement proper build lifecycle** in package.json:
   ```json
   "prebuild": "rm -rf .next",
   "build": "next build",
   "postbuild": "echo 'Build completed successfully'"
   ```
4. **Set proper Node.js memory limits** for builds in Docker:
   ```yaml
   environment:
     - NODE_OPTIONS="--max-old-space-size=4096"
   ```

**Why This Approach:**

- Addresses the root cause (cache corruption) not symptoms
- Provides consistent build behavior across environments
- Eliminates need for manual cleanup
- Follows Next.js best practices for cache management

#### .next Directory Permission Issues

**Root Cause:**
The `.next` directory permission issue occurs due to a UID/GID mismatch between the Docker container user and the host system user. When Docker creates files as root (UID 0) inside the container, those files become inaccessible to the host user (typically UID 1000).

**Proper Solution:**

The correct approach is to ensure the Docker container runs with the same UID/GID as the host user. This should be implemented in the base `docker-compose.yml`:

```yaml
services:
  crudkit:
    user: '${UID:-1000}:${GID:-1000}' # Uses environment variables with sensible defaults
    # ... rest of configuration
```

And users should set their UID/GID in a `.env` file (which is gitignored):

```bash
# .env file (create if it doesn't exist)
UID=1000
GID=1000
```

**Implementation Steps:**

1. **Update docker-compose.yml** to use the user directive with environment variables
2. **Create a .env.example** file documenting the required variables
3. **Ensure .env is in .gitignore** to prevent committing user-specific IDs
4. **Update Dockerfile** to create a non-root user that matches common UIDs:
   ```dockerfile
   RUN useradd -m -u 1000 -U appuser && \
       chown -R appuser:appuser /app
   USER appuser
   ```

**Why This Matters:**

- Eliminates permission issues permanently across all environments
- Follows Docker security best practices (never run as root)
- Ensures consistent behavior for all developers
- Prevents the need for cleanup scripts or workarounds

**Note:** The tmpfs mount in `docker-compose.override.yml` is a performance optimization, not a permission fix. The root cause must be addressed at the container user level.

#### Port Already in Use

If port 3000 is already in use:

```bash
docker compose down
lsof -i :3000  # Find process using port
kill -9 <PID>  # Kill the process
docker compose up
```

#### pnpm Version Mismatch

If you encounter lockfile errors about pnpm versions:

**Solution:**

- All CI/CD workflows use exact version pnpm 10.16.1
- The `packageManager` field in package.json enforces this version
- Docker container also uses pnpm 10.16.1

**If local version differs:**

```bash
corepack enable
corepack prepare pnpm@10.16.1 --activate
```
