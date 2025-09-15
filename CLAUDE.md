# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- All components must follow the 5-file pattern (enforced by CI/CD)
- See [docs/CREATING_COMPONENTS.md](./docs/CREATING_COMPONENTS.md) for detailed guide

### Component Structure (5-File Pattern) ⚠️ REQUIRED

All components MUST follow the 5-file pattern:

```
ComponentName/
├── index.tsx                             # Barrel export
├── ComponentName.tsx                     # Main component
├── ComponentName.test.tsx                # Unit tests (required)
├── ComponentName.stories.tsx             # Storybook (required)
└── ComponentName.accessibility.test.tsx  # Accessibility tests (required)
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

- `rfc5` - Create React component with 5-file structure
- `rcindex` - Create index.tsx barrel export
- `rctest` - Create component test file
- `rcstory` - Create component story file
- `rca11y` - Create accessibility test file

#### CI Enforcement

Pull requests will fail if components don't follow the 5-file pattern. The GitHub Actions workflow automatically validates structure on every PR.

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

### Important Notes for Modifications

1. **Dynamic Status Page**: After forking, users should update `/src/config/project-status.json` with their project details
2. **GitHub Pages URLs**: All hardcoded URLs reference `tortoisewolfe.github.io/CRUDkit` - these need updating after forking
3. **Docker-First Development**: Always use Docker Compose commands for consistency
4. **Build Verification**: Run `docker compose exec crudkit pnpm run build` before committing
5. **Code Formatting**: All code is formatted with Prettier - run `pnpm format` before committing
6. **CSP Headers**: Security headers are configured but may need adjustment for external resources
7. **PWA Icons**: Use SVG format to avoid Canvas dependency issues in Docker
8. **Package Manager**: Project uses pnpm 10.16.1 exclusively - enforced via packageManager field
9. **E2E Testing**: Tests are for local development only, not integrated with CI/CD

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

This error typically occurs when the `.next` build cache becomes corrupted or stale. The project now includes automatic cleanup, but if you encounter this:

**Quick Fix:**

```bash
pnpm run docker:clean  # Automated clean start
```

**Manual Fix:**

```bash
docker compose down
rm -rf .next
docker compose up
```

**Prevention:**

- The `docker-compose.override.yml` now uses tmpfs for `.next` directory (in-memory, no persistence)
- The development container automatically cleans stale artifacts on startup
- Use `pnpm run dev:clean` when running locally to ensure clean builds

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
