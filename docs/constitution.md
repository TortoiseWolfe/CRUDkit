# CRUDkit - Universal PWA Meta-Template Constitution v2.2.0

**Repository**: https://github.com/TortoiseWolfe/CRUDkit  
**Description**: Evolutionary meta-template with 12 themes, PWA, and AI-optimized patterns

## REFERENCE TEMPLATES
Learn from these implementations, improve upon them:
- **Punk_Stack**: Working app with 12 themes, modern stack (primary reference)
- **001_template**: PRP methodology, email providers, form patterns
- **000_Template**: Testing configs, validation loops, AI documentation
- **Punk_Stack_archived**: Advanced tooling, OKLCH scripts, monorepo patterns

## 1. FOUNDATION (Prerequisites)
- Docker-first infrastructure (see Punk_Stack docker-compose.yml)
- Spec-kit compatible structure
- Git-based version control
- Node.js 20+ and npm 9+

## 2. CORE PRINCIPLES (Non-negotiable)

### Infrastructure
- **Docker**: All environments with health checks **[✅ Docker, ❌ health checks]**
- **PWA**: Offline-first, service workers, background sync **[✅ SW/manifest, ❌ background sync]**
- **Accessibility**: WCAG AA, colorblind support, keyboard nav **[⚠️ Basic controls, ❌ WCAG testing]**

### Development Philosophy
- **PRP→Spec→Implementation**: Problem definition first (recommended for complex features) **[❌ NOT IMPLEMENTED]**
- **Test-First Development**: TDD strongly encouraged **[❌ ZERO TESTS - 0% coverage]**
- **Performance Gates**: <100ms interactions, >90 Lighthouse **[⚠️ Not enforced, manual only]**

## 3. DEVELOPMENT PIPELINE (Flexible by Feature Complexity)

1. **PRP Creation** - Define the problem (recommended for complex features) **[❌ Not implemented]**
2. **Spec Generation** - Design the solution **[⚠️ Partial - has spec.md]**
3. **Test Writing** - Validation first **[❌ No test framework]**
4. **Implementation** - Code second **[✅ Built without tests]**
5. **Validation** - Basic checks **[❌ Not implemented]**
6. **Documentation** - AI context, component docs **[⚠️ Storybook only]**

## 4. TECHNICAL STANDARDS

### Architecture
- **Atomic Design**: atoms → molecules → organisms → templates **[✅ Implemented]**
- **TypeScript-strict**: No any types, strict mode **[✅ Configured]**
- **Theme System**: Multiple themes, instant switching **[✅ 32 themes!]**
- **Component Structure**: 4 files per component **[⚠️ 2-3 files per component]**

### Quality Gates
- **Pre-commit**: Lint + Type check **[❌ No hooks configured]**
- **Pre-push**: Unit tests pass **[❌ No hooks, no tests]**
- **PR Checks**: Full test suite + Visual regression + Build **[⚠️ Build only]**
- **Main Branch**: E2E tests + Deploy **[⚠️ Deploy only]**

### Testing Strategy (Progressive Targets)
- **Initial Goal**: 25% coverage on critical paths **[❌ 0% - no framework]**
- **Next Goal**: 40% coverage **[❌ Not implemented]**
- **Long-term Goal**: 60% coverage **[❌ Future target]**
- **Accessibility**: Pa11y CI **[❌ Not configured]**
- **Visual**: Chromatic/Percy **[❌ Not setup]**

### Security Framework
- **Input Validation**: Zod schemas, sanitization **[❌ No Zod installed]**
- **CSP Headers**: Strict policies **[✅ Configured in next.config]**
- **Privacy-First**: GDPR compliant, minimal tracking **[❌ No privacy features]**
- **Scanning Schedule**: Daily deps, weekly static, monthly dynamic **[❌ No automation]**

## 5. IMPLEMENTATION GUIDANCE

When generating code:
1. **Start** with Punk_Stack project structure and configuration
2. **Enhance** with 001_template PRP methodology and forms
3. **Add** 000_Template testing rigor and validation loops
4. **Include** Punk_Stack_archived advanced tooling scripts
5. **Improve** upon all references - fix issues, update deps, optimize

### Key Files to Study
- Docker setup: `Punk_Stack/docker-compose.yml`
- PWA config: `Punk_Stack/src/app/manifest.ts`
- Theme system: `Punk_Stack/src/styles/themes/`
- Testing: `Punk_Stack/__tests__/` and `000_Template/.pa11yci`
- PRPs: `001_template/src/prp/`
- AI docs: `000_Template/ai_docs/claude.md`
- Security: `000_Template/SECURITY.md`

## 6. DEPLOYMENT

### GitHub Pages
- **Dual deployment**: App + Storybook (reference: Punk_Stack .github/workflows/)
- **Static optimization**: Next.js output export (reference: Punk_Stack next.config.ts)
- **Base path handling**: Subdirectory support (reference: Punk_Stack env setup)

### Other Targets
- **Vercel**: Edge functions, preview deployments
- **Docker**: Multi-stage builds, health checks
- **VPS**: Traditional hosting with PM2

### Feature Flags
- Environment-based toggling (reference: All templates' .env patterns)
- Build-time optimization (reference: Punk_Stack SKIP_PWA flag)
- Runtime configuration (reference: 001_template provider switching)

## 7. REQUIRED INTEGRATIONS

### Core Features
- **Storybook**: Component development and documentation
- **PWA**: Service worker, manifest, offline support
- **Forms**: Multi-provider email (Web3Forms, EmailJS, Resend)
- **Calendar**: Calendly or Cal.com integration
- **Analytics**: Privacy-first, opt-in only

### Developer Tools
- **Chromatic/Percy**: Visual regression testing
- **Lighthouse CI**: Performance monitoring
- **Sentry**: Error tracking (optional)
- **GitHub Actions**: CI/CD pipeline

## 8. COMPLETED FOUNDATION (CRUDkit v1.0)

### Established Infrastructure (~40% of Original Requirements)
- **Next.js 15.5.2**: App Router with static export for GitHub Pages
- **32-Theme System**: DaisyUI with localStorage persistence
- **PWA Implementation**: Service Worker, offline support, app install
- **Component Library**: Atomic design pattern (subatomic → atomic)
- **Status Dashboard**: Web Vitals, Lighthouse testing, PWA features
- **Docker Development**: Containerized with pnpm package manager
- **GitHub Pages**: Dual deployment (app + Storybook)
- **Accessibility**: Font size/spacing controls, ARIA support

### Reference Patterns to Extend
- **ThemeSwitcher** (`/src/components/theme/ThemeSwitcher.tsx`) → Foundation for FontSwitcher
- **PWAInstall** (`/src/components/PWAInstall.tsx`) → Pattern for permission-based features
- **Status Dashboard** (`/src/app/status/page.tsx`) → Integration point for Analytics
- **Atomic Components** (`/src/components/atomic/`) → Structure for new components
- **Docker Setup** (`Dockerfile` + `docker-compose.yml`) → Development harness

## 9. IMPLEMENTATION STATUS (Reality Check)

### ✅ What Was Actually Delivered (~40% of requirements)
- Docker setup (basic, no health checks)
- 32-theme system (exceeded 12 theme requirement) 
- PWA basics (manifest + service worker, no background sync)
- Atomic component structure with Storybook
- TypeScript with strict mode
- GitHub Pages deployment with Actions
- CSP headers in next.config.ts
- Basic accessibility controls (font size/spacing)
- pnpm package management

### ❌ What Fell Through the Cracks (~60% of requirements)

#### Critical Gaps
- **ZERO TESTING**: No test files, no test framework, 0% coverage
- **NO PRP METHODOLOGY**: Development philosophy not implemented
- **NO QUALITY GATES**: No pre-commit/pre-push hooks
- **NO VALIDATION**: No Zod schemas or input sanitization

#### Missing Infrastructure  
- Docker health checks
- PWA background sync
- WCAG AA compliance testing
- Colorblind support
- Spec-kit structure
- 6-level validation loops (overly complex - consider removing)
- AI context documentation
- Forms integration (Web3Forms, EmailJS, Resend)
- Calendar integration

#### Missing Security
- No SECURITY.md
- No dependency scanning
- No GDPR compliance features
- Input validation missing

### 📊 Compliance Score by Section
1. **FOUNDATION**: 75% ✅ (missing spec-kit)
2. **CORE PRINCIPLES**: 30% ⚠️ (missing most philosophy)
3. **DEVELOPMENT PIPELINE**: 15% ❌ (only implementation done)
4. **TECHNICAL STANDARDS**: 40% ⚠️ (no testing/quality)
5. **IMPLEMENTATION GUIDANCE**: 10% ❌ (didn't study references)
6. **DEPLOYMENT**: 60% ✅ (GitHub Pages works)

## 10. SPRINT 2: FIX THE FOUNDATION (10 Weeks Total)

### One Sprint, Five Phases - Before Adding ANY New Features:

#### Weeks 1-2: Minimal Testing Foundation
- [ ] Install Vitest and create one smoke test
- [ ] Add basic pre-commit hook for linting only
- [ ] GitHub Action for build verification
- [ ] Set up basic coverage reporting (target: 10%)

#### Weeks 3-4: Developer Experience
- [ ] Fix HMR issues in Docker environment
- [ ] Add Prettier for code formatting
- [ ] Configure Dependabot for dependency updates
- [ ] Improve error messages and logging

#### Weeks 5-6: First Simple Feature
- [ ] Create simple 2D dice component (no animations)
- [ ] Write basic unit test for dice logic
- [ ] Add Storybook story for dice component
- [ ] Document component pattern for future features

#### Weeks 7-8: Quality Baseline
- [ ] Add Zod for basic input validation
- [ ] Create minimal SECURITY.md
- [ ] Set up pre-push hook for type checking
- [ ] Reach 25% test coverage on critical paths

#### Weeks 9-10: Foundation Completion
- [ ] Add Docker health checks
- [ ] Basic accessibility testing setup
- [ ] Simple performance monitoring
- [ ] Documentation updates

### Only After Sprint 2 is Complete:
Then consider new features from Section 11

## 11. FUTURE FEATURES (Post-Sprint 2)

### Development Philosophy
- **Extend, Don't Replace**: Build upon CRUDkit foundation
- **Docker-First**: All development within containers using pnpm
- **Pattern Replication**: Mirror existing successful patterns
- **Live Documentation**: Document as we build
- **Start Simple**: MVP first, enhance iteratively

### Potential Features (After Foundation is Fixed)

#### 11.1 Google Analytics Integration
- **Foundation**: Extend Status Dashboard monitoring capabilities
- **Implementation**: 
  - Environment configuration via `.env` file
  - GA4 with measurement ID from environment
  - Consent modal using PWA install prompt pattern
  - Dashboard integration at `/status/analytics`
  - Privacy-first with opt-in tracking
- **Docker Config**: Pass env variables via docker-compose
- **Testing**: Consent flows, data collection, blocking scenarios

#### 11.2 Interactive Dice Component (Enhanced Version)
- **Foundation**: Follow atomic Card component structure
- **Implementation**:
  - Location: `/src/components/atomic/Dice/`
  - Files: `Dice.tsx`, `Dice.stories.tsx`, `index.ts`
  - Start with 2D SVG, add animations later
  - Theme-aware using DaisyUI classes
  - Configurable sides (d4, d6, d8, d10, d12, d20)
- **Accessibility**: Screen reader announcements for rolls
- **Testing**: Randomization fairness, animation performance

#### 11.3 Geolocated Map Component
- **Foundation**: Permission pattern from PWA install component
- **Implementation**:
  - Location: `/src/components/atomic/Map/`
  - Start with browser geolocation API + static image
  - Later: Leaflet or Mapbox integration
  - Progressive enhancement (works without location)
  - Graceful permission handling
  - Fallback to IP-based location
- **Docker**: Proxy configuration for tile servers
- **Testing**: Permission states, offline mode, accuracy levels

#### 11.4 Font Switcher System
- **Foundation**: Mirror ThemeSwitcher component exactly
- **Implementation**:
  - Location: `/src/components/theme/FontSwitcher.tsx`
  - Parallel localStorage key: `selectedFont`
  - Font families: System, Serif, Sans, Mono, Dyslexic
  - Dynamic font loading (Google Fonts API)
  - Integration with AccessibilityContext
- **Performance**: Lazy loading, local caching
- **Testing**: Font loading, fallbacks, persistence

## 12. IMPLEMENTATION TUTORIAL

### How We Extend CRUDkit (Live Documentation)

#### Understanding the Two-Container System
CRUDkit uses two separate Docker containers for different purposes:
1. **crudkit container** (root directory) - Application development with Next.js
2. **speckit container** (`docs/spec-kit/`) - Specification generation with GitHub Spec-Kit

#### Step 1: Pattern Recognition
```bash
# Study existing pattern
docker compose exec crudkit cat src/components/theme/ThemeSwitcher.tsx

# Identify structure
- Component location and naming
- State management approach
- localStorage keys
- UI patterns
```

#### Step 2: Docker Development Workflow
```bash
# Start development environment
docker compose up

# Install new dependencies
docker compose exec crudkit pnpm add <package>

# Development with hot reload
docker compose exec crudkit pnpm run dev

# Run tests in container
docker compose exec crudkit pnpm test

# Build for production
docker compose exec crudkit pnpm run build
```

#### Step 3: Spec-Kit Workflow (Sprint Planning)
```bash
# Navigate to spec-kit directory
cd docs/spec-kit

# Start the speckit container
docker compose up -d speckit

# Enter the speckit container
docker compose exec speckit bash

# Inside container, use specify commands:
# Generate spec from constitution
specify generate spec < ../constitution.md > spec-output.md

# Generate technical plan from spec
specify generate plan < spec.md > plan-output.md

# Generate task list from plan
specify generate tasks < PLAN.md > TASKS.md
```

**Important Files:**
- `docs/spec-kit/WORKFLOW.md` - Complete sprint methodology
- `docs/spec-kit/spec.md` - Current sprint specification
- `docs/spec-kit/PLAN.md` - Technical implementation plan
- `docs/spec-kit/TASKS.md` - Sprint task list
- `docs/spec-kit/archive/` - Historical sprint documents

#### Step 4: Sprint Workflow Integration
The full sprint workflow combines both containers:

1. **Sprint Planning** (speckit container):
   ```bash
   cd docs/spec-kit
   # Update spec.md based on constitution
   # Generate plan and tasks using specify
   ```

2. **Implementation** (crudkit container):
   ```bash
   cd ../..  # Back to root
   # Work through TASKS.md using crudkit container
   docker compose exec crudkit pnpm run dev
   ```

3. **Sprint Archive** (end of sprint):
   ```bash
   # Archive completed sprint documents
   mkdir -p docs/spec-kit/archive/sprint-XXX
   cp docs/spec-kit/{spec.md,PLAN.md,TASKS.md} \
      docs/spec-kit/archive/sprint-XXX/
   ```

#### Step 5: Component Development Process
1. **Planning**: Create spec using speckit, then implement in crudkit
2. **Scaffolding**: Follow atomic structure in `/src/components/`
3. **Implementation**: Build in Storybook first
4. **Integration**: Connect to main app
5. **Testing**: Unit → Integration → E2E
6. **Documentation**: Update as you code

#### Step 6: Environment Configuration
```bash
# Create .env.example
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MAP_API_KEY=your-api-key

# Docker compose with env
services:
  crudkit:
    env_file:
      - .env
```

#### Step 7: Real-Time Documentation
- Document decisions in ADRs (`/docs/decisions/`)
- Update CHANGELOG.md with each feature
- Add inline comments explaining "why" not "what"
- Create Storybook stories for all components

### Quick Reference: Spec-Kit Commands

**From root directory:**
```bash
# Start both containers
docker compose up -d
cd docs/spec-kit && docker compose up -d speckit && cd ../..
```

**Inside speckit container:**
```bash
# Initialize project (only needed once)
specify init crudkit --here

# Generate specifications
specify generate spec < ../constitution.md > new-spec.md
specify generate plan < spec.md > new-plan.md
specify generate tasks < PLAN.md > new-tasks.md
```

**Key Paths:**
- Constitution: `/docs/constitution.md`
- Spec-Kit Dir: `/docs/spec-kit/`
- Current Spec: `/docs/spec-kit/spec.md`
- Sprint Workflow: `/docs/spec-kit/WORKFLOW.md`
- App Development: Root directory with crudkit container

## 13. GOVERNANCE

### Evolution Principles
- Learn from references, don't just copy
- Each generation should improve upon the last
- Document what was improved and why
- Track metrics to prove improvements

### Review Cycles
- Quarterly constitution reviews
- Update reference templates as they improve
- Capture learnings in ADRs
- Version control all changes

### Success Metrics
- Setup time: <30 minutes from clone to running
- Performance: >90 Lighthouse scores (realistic target)
- Test coverage: Progressive targets (10% → 25% → 40%)
- Developer satisfaction: Measure and improve

## 14. PACKAGE MANAGEMENT STANDARD

### Official Package Manager: pnpm
- **Why pnpm**: Faster installs, disk-efficient, strict dependencies
- **Corepack**: Automatically manages pnpm version in Docker
- **Lock file**: Only `pnpm-lock.yaml` (no package-lock.json)
- **Store**: Shared package store reduces duplication

### Commands Reference
```bash
# Installation
pnpm install          # Install all dependencies
pnpm add <pkg>        # Add production dependency
pnpm add -D <pkg>     # Add dev dependency

# Scripts
pnpm run <script>     # Run package.json script
pnpm dev              # Shorthand for common scripts
pnpm build
pnpm test

# Updates
pnpm update           # Update dependencies
pnpm outdated         # Check for updates
```

### Docker Integration
- Dockerfile uses `corepack enable` for pnpm
- Volume mounts preserve pnpm store
- All CI/CD uses pnpm commands
- No npm or yarn commands in codebase

---

**Version**: 2.2.0  
**Updated**: 2025-01-11  
**Foundation Status**: ~40% compliant with original constitution
**Philosophy**: Fix the foundation before building higher

**Note**: Consider future split into HISTORY.md (what was built), STATUS.md (current state), and ROADMAP.md (future plans) for better clarity.

**What's New in v2.2.0**:
- Fixed duplicate section numbering (merged Section 8s)
- Reorganized sections for logical flow (1-14 sequential)
- Removed contradictory "100% Complete" claim
- Made Sprint 2 timeline realistic (3 weeks → 10 weeks, one sprint with 5 phases)
- Simplified requirements (PRP optional, lower test targets 60%→25%→40%→60%)
- Added DevX fundamentals to Sprint 2 Week 3-4 priorities
- Simplified feature complexity (2D dice first, basic geolocation)
- Moved Governance section to end for better flow
- Changed Development Philosophy from "mandatory" to "encouraged/recommended"

**What's New in v2.1.0**:
- Added honest implementation status tracking (Section 7)
- Marked all requirements with [✅/⚠️/❌] completion status
- Created Sprint 2 priorities to fix critical gaps (Section 10)
- Acknowledged testing debt (0% coverage, no framework)
- Separated "accomplished" from "aspirational"
- Moved new features to Section 10 (after foundation fixes)

**What's New in v2.0.0**:
- Documented completed v1.0 features as foundation (Section 9)
- Added future features building on existing patterns (Section 11)
- Created implementation tutorial with live examples (Section 11)
- Standardized on pnpm package manager (Section 12)
- Emphasized Docker-first development workflow
- Added environment configuration patterns
- Introduced parallel systems concept (Font ↔ Theme switchers)