# CRUDkit Constitution

## Core Principles

### I. Component-First Architecture

Every feature starts as a self-contained component following the 4-file pattern (component.tsx, story.tsx, test.tsx, types.ts). Components must be independently testable, documented in Storybook, and follow atomic design principles (subatomic → atomic → molecular).

### II. Progressive Enhancement

Build for the web platform first, enhance with PWA capabilities second. Features must work without JavaScript where possible, provide offline functionality through service workers, and respect user preferences (themes, accessibility settings).

### III. Test-First Development (NON-NEGOTIABLE)

TDD mandatory: Tests written → Tests fail → Implementation → Tests pass. Testing hierarchy: E2E tests for user journeys, Integration tests for component interactions, Unit tests for business logic. Visual regression tests for UI consistency.

### IV. Accessibility by Default

WCAG AA compliance is baseline, not a feature. Every component must pass automated accessibility tests (Pa11y, axe-core), support keyboard navigation, work with screen readers, and provide colorblind-friendly modes.

### V. Privacy & Consent First

No tracking without explicit consent. Cookie consent required before analytics, user data exportable and deletable (GDPR), privacy-preserving defaults, transparent data usage policies.

## PRP Development Workflow

### Product Requirements Prompts (PRPs)

All features begin as PRPs following Cole Medlin's context engineering methodology. PRPs provide comprehensive implementation blueprints processed through the Specify system.

### Sequential Implementation

PRPs are processed in dependency order as documented in PRP-WORKFLOW.md:

1. Foundation Phase: Methodology, Structure, Testing
2. Compliance Phase: WCAG, Accessibility features
3. Privacy Phase: Consent, Analytics
4. Forms Phase: Contact forms, Background sync
5. Features Phase: Additional enhancements

### Specify System Integration

- `/plan`: Converts PRP to implementation plan
- `/specify`: Refines specifications
- `/tasks`: Generates executable task lists
- One feature branch per PRP (e.g., `001-prp-methodology`)

## Technology Standards

### Core Stack

- **Next.js 15.5.2** with App Router and static export
- **React 19.1.0** with TypeScript strict mode
- **Tailwind CSS 4** with DaisyUI for theming
- **Vitest** for testing with React Testing Library
- **Docker** for consistent development environment

### Required Tools

- **Prettier** for code formatting (enforced pre-commit)
- **ESLint** for code quality
- **Husky** for git hooks
- **Playwright** for E2E testing
- **Storybook** for component documentation

### Performance Requirements

- Lighthouse score > 90 for all metrics
- First Contentful Paint < 1.5s
- Cumulative Layout Shift < 0.1
- PWA installable with offline support

## Governance

### Constitution Authority

This constitution supersedes all other practices and conventions. Any deviation requires explicit documentation in the Complexity Tracking section of implementation plans.

### Amendment Process

1. Document proposed change with rationale
2. Test impact on existing features
3. Update version number (MAJOR.MINOR.PATCH)
4. Update all dependent documentation

### Compliance Verification

- All PRs must verify constitutional compliance
- Automated tests enforce principles where possible
- Code reviews check for adherence
- Use CLAUDE.md for runtime AI assistance guidance

**Version**: 1.0.0 | **Ratified**: 2025-09-13 | **Last Amended**: 2025-09-13
