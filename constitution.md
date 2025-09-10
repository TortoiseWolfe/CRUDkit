# Universal PWA Meta-Template Constitution

## Core Principles

### I. Docker-First Infrastructure (NON-NEGOTIABLE)
- Every project MUST use Docker for all environments (dev, test, prod, storybook)
- Multi-stage Dockerfiles following Bret Fisher's best practices required
- Container security: non-root users, minimal Alpine images, proper permissions
- Proper signal handling with tini (FROM ARCHIVED VERSION)
- Health checks and graceful shutdowns mandatory
- Version compatibility verification BEFORE any implementation
- Consistent environments across all developers and CI/CD
- Service profiles for different use cases (dev, test, build, prod)

### II. Performance-First Design (MONITORED & ENFORCED)
- Sub-100ms operations for all user interactions
- Theme switching, navigation, and form submissions monitored
- CSS variables over CSS-in-JS for instant updates
- Bundle optimization with lazy loading mandatory
- Lighthouse CI performance gates (>90 score required)

### III. PRP→Spec→Implementation Pipeline
- Product Requirement Prompts (PRPs) lifecycle: Inbox → Queue → Active (max 2) → Spec-Ready → Implementing → Archive
- Spec-kit integration for specification generation
- Clear separation: PRPs define problems, Specs define solutions
- Code comments MUST reference original PRP/Spec requirements
- Living documentation: Code becomes the source of truth

#### PRP Methodology Standards (FROM 001_template)
- **Master Template**: Standardized PRP template for consistency
- **Atomic Organization**: PRPs organized by atoms/molecules/organisms/templates/system
- **Technical Specifications**: Detailed props, state, behavior, and edge cases
- **Acceptance Criteria**: Clear success metrics for each component
- **AI-Optimized**: Written specifically for AI-assisted development
- **Version Control**: PRPs versioned alongside code

### IV. Test-First Development (NON-NEGOTIABLE)
- TDD mandatory: Write tests → Get approval → Watch fail → Then implement
- Red-Green-Refactor cycle strictly enforced
- Test Pyramid: 60% Unit, 30% Integration, 10% E2E
- Vitest for speed (100x faster than Jest)
- Coverage gates: 80% minimum for PRs
- Visual regression testing with Chromatic (FROM ARCHIVED VERSION)
- E2E testing with Playwright for critical paths
- Monorepo-style package testing patterns supported

### V. PWA-First Architecture
- Offline-capable from day one
- Service worker with intelligent caching strategies
- Web app manifest with install prompts and shortcuts
- Background sync for form submissions
- Update notifications and version management

#### Service Worker Strategies (ADVANCED)
- **CacheFirst**: Static assets (fonts, images, CSS)
- **NetworkFirst**: API calls with fallback to cache
- **StaleWhileRevalidate**: Dynamic content updates
- **24-hour offline queue**: Failed API calls retry when online
- **Theme pre-caching**: All theme assets cached with versioning
- **Custom offline page**: User-friendly offline.html fallback
- **Auto-reload**: Page refresh when connection restored
- **Network timeout configuration**: Different timeouts for pages vs API

### VI. Accessibility Built-In (NOT AN AFTERTHOUGHT)
- ARIA labels and screen reader support required
- Keyboard navigation for ALL interactive elements
- Reduced motion preferences respected
- Color contrast ratios meeting WCAG AA standards
- Accessibility testing in Storybook
- Colorblind accessibility testing mandatory (FROM 000_Template)
- Testing for Deuteranopia, Protanopia, Tritanopia
- High contrast mode support and validation
- Pa11y CI integration with multiple scenarios

### VII. GitHub Pages Dual-Deployment
- Main app deployed to: `https://[username].github.io/[repo]/`
- Storybook deployed to: `https://[username].github.io/[repo]/storybook/`
- Automated cross-linking between deployments
- Static export optimization for performance
- PWA functionality preserved in static deployment

## Architecture Standards

### Component Design
- Atomic Design methodology (atoms → molecules → organisms → templates)
- TypeScript-first with strict configuration
- Compound components for complex UI patterns
- Theme-aware components supporting multiple themes
- Composition over configuration
- Monorepo-ready package structure (FROM ARCHIVED VERSION)

#### Component Documentation Standards (FROM 001_template)
- **Four Files Per Component**:
  - `Component.tsx`: Implementation with TypeScript
  - `Component.stories.tsx`: Storybook stories with all variants
  - `Component.test.tsx`: Unit and integration tests
  - `README.md`: Usage documentation and examples
- **Props Documentation**: JSDoc comments for all props
- **Accessibility Notes**: ARIA requirements documented
- **Performance Considerations**: Memo usage, lazy loading notes
- **Version History**: Breaking changes tracked in README

### Project Structure (ENHANCED FROM ARCHIVED VERSION)
- `/src` for application code when using frameworks
- `/config` for ALL configuration files (not scattered in root)
- `/packages` for extractable/reusable modules
- Clear separation of concerns between directories

### State Management
- Context API for theme and global state
- Local storage sync for persistence
- Cross-tab synchronization via storage events
- Optimistic UI updates with rollback

### SEO & Meta Tags
- OpenGraph tags for all pages
- Twitter Card configuration
- JSON-LD structured data
- Dynamic meta tag generation
- Social share preview testing

## Development Workflow

### Branch Strategy
- Feature branches from main
- Automated branch creation via scripts
- PR templates with checklists
- Squash and merge policy

### Quality Gates
- **Pre-commit**: Lint + Type Check
- **Pre-push**: Unit Tests
- **PR Checks**: Full Test Suite + Build + Visual Regression
- **Main Branch**: E2E + Deploy

### Validation Loops (FROM 000_Template)
- **Level 1 - Syntax**: `lint:fix && format`
- **Level 2 - Types**: `type-check`
- **Level 3 - Unit Tests**: `test:unit`
- **Level 4 - Integration**: `test:integration`
- **Level 5 - Accessibility**: `test:a11y && test:colorblind`
- **Level 6 - Performance**: `lighthouse`
- Must complete ALL levels before marking features complete

### CI/CD Pipeline (ENHANCED FROM ARCHIVED VERSION)
- Separate workflows for testing, deployment, preview, and visual regression
- Docker-based CI/CD for consistency
- Artifact management and caching
- Chromatic integration for visual testing
- Automated performance audits with Lighthouse CI

### Documentation Requirements
- Component stories in Storybook
- API documentation from TypeScript
- README with setup, deploy status, and links
- Architecture Decision Records (ADRs)
- PRP/Spec references in code comments
- Known issues tracking (FROM ARCHIVED VERSION)
- Rollback documentation for major changes
- Senior designer audit prompts for theme systems

#### AI Context Documentation (FROM 001_template + 000_Template)
- **CLAUDE.md Required**: Comprehensive AI context file for every project
- **Contents**: Project overview, tech stack, structure, patterns, commands
- **Development Guidelines**: Common tasks, troubleshooting, best practices
- **DO's and DON'Ts**: Explicit guidance for AI assistants
- **Confidence Scoring**: Rate documentation completeness (x/10)
- **Known Gotchas**: Framework-specific issues and solutions
- **Current Context**: Active features and technical debt tracking
- **Validation Loops**: All 6 levels must be documented
- **Version Tracking**: Keep synchronized with project changes
- **Error Solutions**: Document common issues and fixes
- **Command Reference**: All available scripts and their purposes

## Intake System Standards

### Form Requirements
- Progressive enhancement (works without JS)
- Client-side validation with server backup
- Offline queue with IndexedDB
- Accessibility-compliant form labels
- Anti-spam measures (honeypot, rate limiting)

#### Advanced Form Patterns (FROM 001_template)
- **React Hook Form + Zod**: Standard form validation stack
- **Multi-Step Forms**: Progress indicators and state persistence
- **Real-Time Validation**: Debounced field validation with user feedback
- **Error Recovery**: Form state restoration after errors
- **Honeypot Implementation**: Hidden fields for bot detection
- **Rate Limiting**: Client-side and server-side throttling
- **File Uploads**: Drag-and-drop with progress indicators
- **Conditional Fields**: Dynamic form structure based on user input

### Calendly Integration
- Lazy-loaded embed for performance
- Fallback link for blocked scripts
- Mobile-responsive integration
- Analytics event tracking

### Email Service Integration (FROM 001_template)
- **Multi-Provider Strategy**: Support Web3Forms, EmailJS, Resend, SendGrid
- **Privacy-First**: Prefer Web3Forms (no backend required, GDPR compliant)
- **Abstraction Layer**: Provider-agnostic email service interface
- **Fallback Chain**: Primary → Secondary → Tertiary providers
- **Rate Limiting**: Provider-specific limits respected
- **Template System**: Reusable email templates with variables
- **Testing Mode**: Local email capture for development

## Security Requirements

### Input Validation
- All user inputs sanitized
- Theme values validated against whitelist
- CSP headers configured
- XSS protection enabled

### Storage Security
- Sensitive data in HttpOnly cookies
- Local storage for non-sensitive preferences
- Encryption for queued form data

### Privacy & Security Settings
- **Next.js Telemetry**: MUST be disabled (NEXT_TELEMETRY_DISABLED=1)
- **Content Security Policy**: Strict CSP headers required
- **API Retry Mechanisms**: Exponential backoff for failed requests
- **Background Sync Validation**: Verify queued requests before sending
- **Network Timeouts**: Different timeouts for pages (10s) vs API (30s)
- **Middleware Exclusions**: PWA routes excluded from middleware
- **CORS Configuration**: Strict origin validation
- **Rate Limiting**: API endpoint protection

### Security Policy Framework (FROM 000_Template)
- **Vulnerability Reporting**: Dedicated security email and process
- **Security Checklist**: Pre-production validation required
- **Compliance Standards**: OWASP ASVS, PCI DSS, GDPR, SOC 2
- **Scanning Schedule**:
  - Daily: Dependency vulnerability scanning
  - Weekly: Static code analysis
  - Monthly: Dynamic application security testing
  - Quarterly: Penetration testing
  - Annually: Full security audit
- **Built-in Protections**: CSRF tokens, secure sessions, input validation

#### Privacy-First Approach (FROM 001_template)
- **No Cookies Without Consent**: LocalStorage for anonymous users
- **Privacy-Focused Providers**: Web3Forms over Google Forms
- **Data Minimization**: Only collect essential information
- **Local-First**: Process data client-side when possible
- **Clear Privacy Policy**: Transparent data handling
- **GDPR Compliance**: Right to deletion, data portability
- **Analytics Opt-In**: Disabled by default, user choice
- **No Third-Party Tracking**: Self-hosted analytics preferred

### Deployment Security
- **PR Preview Isolation**: Separate preview environments
- **Secret Management**: GitHub secrets for tokens
- **Build-time Validation**: Environment variable checks
- **Static Asset Integrity**: Subresource integrity hashes

## Performance Standards

### Load Time Targets
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1
- Largest Contentful Paint: <2.5s

### Bundle Size Limits
- Main bundle: <200KB gzipped
- Route chunks: <50KB each
- Third-party scripts: Lazy loaded

### Build Optimizations
- **Turbopack Support**: Optional for 10x faster dev builds
- **CSS Optimization**: Experimental optimizeCss flag
- **Static Export**: Conditional configuration for GitHub Pages
- **Image Optimization**: Disabled for static deployments
- **Output Standalone**: Reduced Docker image sizes
- **Tree Shaking**: Aggressive dead code elimination
- **Code Splitting**: Automatic route-based splitting
- **Preact Compat**: Optional React replacement for smaller bundles

## Template Features

### Required Integrations
- Docker multi-environment setup
- GitHub Actions CI/CD
- Storybook with all addons
- PWA configuration
- SEO meta tag system
- Intake forms with Calendly
- Cross-deployment linking
- Visual regression testing (Chromatic)
- E2E testing (Playwright)

#### Storybook Advanced Configuration
- **Theme Toolbar**: Dropdown with all 12 punk themes
- **Navigation Header**: Back-to-app link with GitHub repo access
- **Theme Context**: Automatic theme switching in stories
- **Accessibility Addon**: Built-in a11y testing panel
- **Static Assets**: Public folder mounting for images/fonts
- **TypeScript Stories**: Full type support for stories
- **Component Documentation**: Auto-generated from props
- **Cross-linking**: Bidirectional navigation app ↔ Storybook

### Configuration Architecture (FROM ARCHIVED VERSION + 000_Template)
- Centralized `/config` directory structure
- `config/docker/`: All Docker configurations
- `config/testing/`: Jest/Vitest configurations
- `config/lint/`: ESLint/Prettier configurations
- `config/editor/`: EditorConfig and VS Code settings
- `config/framework/`: Next.js/Vite configurations
- `config/links.config.ts`: Centralized URL management
- `config/pa11y/`: Accessibility testing scenarios
- `config/lighthouse/`: Performance budget configurations

### Automation Scripts
- `initialize-template.sh`: Project setup
- `prp-to-spec.sh`: PRP conversion
- `rotate-prp.sh`: Lifecycle management
- `create-feature.sh`: Feature scaffolding
- `deploy.sh`: Deployment automation
- `audit-theme-colors.js`: OKLCH color analysis & WCAG compliance (FROM ARCHIVED)
- `update-agent-context.sh`: Dynamic context management (FROM ARCHIVED)

### Critical NPM Scripts
- `dev`: Next.js development with hot reload
- `dev:turbo`: Development with Turbopack (faster)
- `build`: Production build
- `build:static`: GitHub Pages static export
- `test`: Run all tests
- `test:unit`: Unit tests only
- `test:e2e`: Playwright E2E tests
- `test:coverage`: Coverage reporting
- `test:a11y`: Pa11y accessibility testing
- `test:colorblind`: Colorblind accessibility validation
- `test:visual`: Visual regression with Playwright
- `typecheck`: TypeScript validation without emit
- `lint`: ESLint with flat config
- `lint:fix`: Auto-fix linting issues
- `format`: Prettier code formatting
- `storybook`: Component development
- `build-storybook`: Static Storybook build
- `chromatic`: Visual regression testing
- `analyze`: Bundle size analysis
- `validate`: Run all validation checks
- `validate:env`: Environment variable checking
- `validate:deps`: Dependency security audit
- `security:scan`: Trufflehog secret scanning
- `lighthouse`: Performance audit

## Environment Configuration & Feature Flags

### Required Environment Variables
- **SKIP_PWA**: Disable PWA for Storybook/testing
- **GITHUB_PAGES**: Enable static export optimizations
- **CHROMATIC_PROJECT_TOKEN**: Visual regression testing
- **GITHUB_REPOSITORY**: Repository metadata for links
- **NEXT_PUBLIC_BASE_PATH**: GitHub Pages path configuration
- **TURBOPACK**: Enable Turbopack for faster development

### Feature Flags Pattern
- Environment-based feature toggling
- Conditional module loading (PWA, analytics)
- Build-time optimization flags
- Runtime configuration switching

## Advanced Tooling (FROM ARCHIVED VERSION + 000_Template)

### Design System Tools
- Theme color audit script for OKLCH analysis
- WCAG compliance checking automation
- Professional design system validation
- Automated theme generation from base colors
- Colorblind simulation filters
- Contrast ratio validation tools

### Development Tools  
- Agent context updater for AI-assisted development
- Feature branch automation with numbered organization
- Template-driven code generation
- JSON output mode for programmatic integration

### Developer Experience Enhancements
- **ESLint Flat Config**: Modern configuration with Storybook plugin
- **TypeScript noEmit**: Fast type checking without compilation
- **WATCHPACK_POLLING**: Docker-compatible file watching
- **Hot Reload Websocket**: Port 3001 for instant updates
- **Git Hooks**: Pre-commit and pre-push validation
- **VS Code Integration**: Workspace settings and recommended extensions
- **EditorConfig**: Consistent code formatting across editors
- **Debug Configuration**: Launch configs for Node and browser

## Governance

### Constitution Authority
- This constitution supersedes all other practices
- Amendments require documentation and migration plan
- Version control for all constitution changes
- Regular review cycles (quarterly)

### Compliance Verification
- All PRs must verify constitution compliance
- Automated checks where possible
- Manual review checklist for subjective standards
- Non-compliance blocks deployment

### Knowledge Management
- Decisions documented in ADRs
- Learnings captured in `/docs/learnings/`
- Patterns extracted to templates
- Regular knowledge transfer sessions

**Version**: 0.0.5 | **Created**: 2025-09-09 | **Last Updated**: 2025-09-09

**v0.0.5 changes** (FROM 000_Template):
- Added validation loops methodology (6-level process)
- Enhanced colorblind accessibility testing requirements
- Expanded AI context documentation with DO's/DON'Ts and confidence scoring
- Added comprehensive security policy framework with compliance standards
- Extended NPM scripts for validation, security, and accessibility
- Added Pa11y CI integration for multi-scenario testing
- Enhanced Docker Compose patterns with service profiles

**v0.0.4 changes** (FROM 001_template):
- Added PRP methodology standards for AI-assisted development
- Added AI context documentation requirements (CLAUDE.md)
- Enhanced email service integration with multi-provider strategy
- Expanded form patterns with React Hook Form + Zod standards
- Added component documentation standards (4 files per component)
- Added privacy-first security approach with GDPR compliance

**v0.0.3 changes**: 
- Added advanced PWA service worker strategies with offline queue
- Added environment configuration and feature flags section  
- Enhanced Storybook configuration with theme toolbar and cross-linking
- Added critical NPM scripts for testing and development
- Expanded security with privacy settings and deployment security
- Added build optimizations including Turbopack support
- Added developer experience enhancements

**v0.0.2 changes**: 
- Incorporated patterns from Punk_Stack_archived including centralized config architecture, advanced tooling, visual regression testing, monorepo support, and enhanced Docker practices

**v0.0.1**: 
- Initial constitution with core principles from current Punk_Stack