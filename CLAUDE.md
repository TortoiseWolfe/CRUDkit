# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Development Principles

1. **Proper Solutions Over Quick Fixes** - Implement correctly the first time
2. **Root Cause Analysis** - Fix underlying issues, not symptoms
3. **Stability Over Speed** - This is a production template
4. **Clean Architecture** - Follow established patterns consistently
5. **No Technical Debt** - Never commit TODOs or workarounds

## Current Sprint: Technical Debt Reduction (Sprint 3.5)

**IMPORTANT**: See `/CONSTITUTION.md` for current sprint priorities. Focus on eliminating technical debt before adding new features.

## Component Structure Requirements ⚠️ MANDATORY

**CRITICAL**: Components must follow the 5-file pattern or CI/CD will fail:

```
ComponentName/
├── index.tsx                             # Barrel export
├── ComponentName.tsx                     # Main component
├── ComponentName.test.tsx                # Unit tests (REQUIRED)
├── ComponentName.stories.tsx             # Storybook (REQUIRED)
└── ComponentName.accessibility.test.tsx  # A11y tests (REQUIRED)
```

**Always use the generator**: `docker compose exec crudkit pnpm run generate:component`

## Essential Commands

### Docker Development (Preferred)

```bash
docker compose up                        # Start development
docker compose exec crudkit pnpm run dev # Dev server on :3000
docker compose exec crudkit pnpm test    # Run tests
pnpm run docker:clean                    # Clean start if issues
```

### Direct Development

```bash
pnpm run dev              # Start dev server
pnpm run build           # Production build
pnpm test                # Run unit tests
pnpm test:e2e           # Run E2E tests (local only)
pnpm run storybook      # Start Storybook
```

## PRP Workflow

The project uses Product Requirements Prompts for feature implementation:

```bash
# Step 1: Setup feature branch
./scripts/prp-to-feature.sh <prp-name> <number>

# Step 2: Generate plan (tell Claude)
"execute /plan"

# Step 3: Generate tasks (tell Claude)
"execute /tasks"
```

**Remaining PRPs** (0.3.0) - Priority Order:

- ~~PRP-010: EmailJS Integration~~ ✅ Completed
- ~~PRP-011: PWA Background Sync~~ ✅ Completed
- ~~PRP-013: Calendar Integration~~ ✅ Completed
- ~~PRP-014: Geolocation Map~~ ✅ Completed (2025-09-18)
- **Auto-Configuration System** ✅ Completed (2025-09-18) - Auto-detects project name from git remote (not a formal PRP)
- PRP-012: Visual Regression Testing (P2 - deferred until UI stable)
- PRP-001: PRP Methodology (P3 - document after implementation)

**Future PRPs** (0.4.0):

- PRP-015: Enhanced Geolocation Accuracy (P2 - hybrid desktop/mobile approach)

## Architecture Overview

- **Next.js 15.5.2** with App Router, static export
- **React 19.1.0** with TypeScript strict mode
- **Tailwind CSS 4** + DaisyUI (32 themes)
- **PWA** with Service Worker (offline support)
- **Testing**: Vitest (58% coverage), Playwright E2E
- **CI/CD**: GitHub Actions with Husky hooks

### Key Paths

```
src/
├── app/           # Next.js pages
├── components/    # Atomic design pattern
│   ├── subatomic/ # Primitives
│   ├── atomic/    # Basic components (includes CalendarEmbed)
│   ├── calendar/  # Calendar providers and consent
│   └── privacy/   # GDPR components
├── config/        # Project configuration
├── contexts/      # React contexts
└── utils/         # Utilities
```

## Testing Requirements

- **Unit Tests**: Vitest + React Testing Library (25% minimum)
- **E2E Tests**: Playwright (40+ tests, local only)
- **Accessibility**: Pa11y CI configured
- **Visual**: Chromatic package installed
- **Coverage**: Currently 58%, target 60%

## Configuration After Forking

**NEW: Auto-Configuration!** The project name is now automatically detected from your GitHub fork!

1. ~~Update `/src/config/project-status.json` with your project info~~ Auto-detected from git remote
2. ~~Replace GitHub Pages URLs in configs~~ Auto-configured
3. Create `.env` file with UID/GID for Docker (still required)
4. ~~Update `basePath` in `next.config.ts` if needed~~ Auto-detected

See `/docs/FORKING-GUIDE.md` for details on the auto-configuration system.

## Common Issues & Solutions

### Tailwind CSS Not Loading

If CSS styles aren't appearing:

1. Ensure Leaflet CSS import is NOT in `globals.css` (causes build issues)
2. Import Leaflet CSS only in map components that use it
3. Restart Docker container after CSS changes

### Webpack Cache Corruption

```bash
pnpm run docker:clean  # Or manually: rm -rf .next
```

### Docker Permission Issues

Create `.env` file:

```
UID=1000
GID=1000
```

### Port 3000 In Use

```bash
docker compose down
lsof -i :3000
kill -9 <PID>
```

### pnpm Version Mismatch

```bash
corepack enable
corepack prepare pnpm@10.16.1 --activate
```

## Sprint 4 (0.4.0) - Future Features

After completing remaining PRPs, these features from previous constitutions need implementation:

- **Advanced Tooling**: OKLCH color system scripts
- **Validation**: Multi-level validation patterns
- **Security**: Automated dependency scanning
- **Performance**: Bundle analysis dashboard
- **State Management**: Zustand/Jotai implementation
- **Animations**: Framer Motion integration
- **UI Components**: Command palette, DataTable, Modal system
- **Developer Tools**: Component generator CLI

See `/SPRINT-4-ROADMAP.md` for detailed planning.

## PRP-011 Implementation Notes

### PWA Background Sync (Completed 2025-09-17)

Successfully implemented offline form submission with automatic synchronization:

- **IndexedDB Queue**: Persistent storage for offline submissions
- **Service Worker Sync**: Background sync API integration
- **React Integration**: Custom `useOfflineQueue` hook
- **User Feedback**: Clear UI indicators for offline state

#### Known Test Issues

**4 integration tests fail** in `/src/tests/offline-integration.test.tsx` due to React Hook Form async validation timing in test environment. Production functionality works correctly.

**Root Cause**: Complex interaction between mocked hooks and form validation lifecycle. The submit button remains disabled in tests despite valid form data.

**Verification**: See `/docs/testing/KNOWN-TEST-ISSUES.md` for detailed analysis and manual verification steps.

**Future Fix**: Split into focused unit tests + Playwright E2E tests for real browser validation.

## PRP-014 Implementation Notes

### Geolocation Map (Completed 2025-09-18)

Successfully implemented interactive maps with geolocation support:

- **Leaflet.js Integration**: Open-source maps with OpenStreetMap tiles
- **GDPR Compliance**: Consent modal before location access
- **Dynamic Loading**: SSR disabled for map components
- **Known Limitation**: Desktop browsers use IP-based geolocation (city-level accuracy)
- **Future Enhancement**: See PRP-015 for desktop accuracy improvements

## Important Notes

- Never create components manually - use the generator
- All PRs must pass component structure validation
- Tests run on pre-push (Husky v9 shows deprecation warning - non-breaking)
- E2E tests are local-only, not in CI pipeline
- Docker-first development is mandatory for consistency
- PRP-011 has 4 known test failures that don't affect production - see test issues doc
