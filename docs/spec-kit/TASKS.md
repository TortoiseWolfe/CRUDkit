# CRUDkit Implementation Tasks

Generated from PLAN.md - 2025-09-10 13:02
*Last Updated: 2025-09-11 19:00 (59% Complete - 95/161 Tasks)*

## Overall Progress Summary
- **Sprint 1**: ✅ Complete (95/96 tasks - 99%)
- **Sprint 2**: 🚧 Not Started (0/65 tasks - 0%)
- **Total Progress**: 95/161 tasks (59%)

---

## Sprint 1: Core Implementation ✅
*Completed 2025-09-11 (95/96 tasks)*

### Sprint 1 Summary
- ✅ **Phase 0 Complete**: Next.js app deployed to GitHub Pages
- ✅ **Phase 1 Complete**: Storybook deployed with Text component
- ✅ **Phase 2 Complete**: Theme system with 32 themes
- ✅ **Phase 3 Complete**: Component gallery deployed
- ✅ **Phase 4 Complete**: PWA features with testing and monitoring

### Key Accomplishments:
- Docker-first development environment with pnpm
- Next.js 15.5 app live at https://tortoisewolfe.github.io/CRUDkit/
- Storybook 9.1.5 live at https://tortoisewolfe.github.io/CRUDkit/storybook/
- 32 DaisyUI themes with persistent theme switcher
- PWA installable with service worker and offline support
- Status dashboard with Web Vitals and Lighthouse integration

---

## Sprint 2: Fix the Foundation 🚧

### Sprint 2 Overview
**Sprint 2 Tasks**: 65  
**Duration**: 10 weeks  
**Priority**: P0 (Critical Foundation)  
**Status**: Not Started  

## Phase 1: Testing Foundation (Weeks 1-2)
### Week 1 Tasks

**T001** 📦 Install Vitest and testing dependencies  
`pnpm add -D vitest @vitest/ui @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom`  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T002** 📝 Create vitest.config.ts  
Create configuration file with jsdom environment and coverage settings  
**Priority**: P0 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T003** 📁 Set up test directory structure  
Create `/src/test/setup.ts` with testing utilities and mocks  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T004** 🧪 Write first component test  
Create `/src/components/subatomic/Text/Text.test.tsx`  
**Priority**: P0 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T005** ✅ Verify test runner works  
Run `pnpm test` and ensure tests pass  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T006** 📊 Set up coverage reporting  
Configure coverage thresholds at 10% initially  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

### Week 2 Tasks

**T007** 🐶 Install and configure Husky  
`pnpm add -D husky lint-staged && pnpm exec husky install`  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T008** 🪝 Create pre-commit hook  
Set up `.husky/pre-commit` for linting  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T009** 📝 Update package.json scripts  
Add test, lint:staged, and type-check scripts  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T010** 🔄 Create GitHub Actions workflow  
Create `.github/workflows/ci.yml` for CI pipeline  
**Priority**: P0 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T011** 🧪 Add more component tests  
Test Button and Input components  
**Priority**: P1 | **Estimate**: 3hr | **Status**: [ ] Not Started

**T012** 📚 Document testing approach  
Create TESTING.md with guidelines  
**Priority**: P2 | **Estimate**: 1hr | **Status**: [ ] Not Started

## Phase 2: Developer Experience (Weeks 3-4)
### Week 3 Tasks

**T013** 🐳 Fix Docker HMR issues  
Update docker-compose.yml with polling and HMR port  
**Priority**: P0 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T014** 🔧 Add Docker health check  
Implement basic health check endpoint  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T015** 💅 Install Prettier  
`pnpm add -D prettier prettier-plugin-tailwindcss`  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T016** 📝 Configure Prettier  
Create `.prettierrc.json` and `.prettierignore`  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T017** 🎨 Format existing code  
Run `pnpm format` on entire codebase  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T018** 🪝 Add format check to pre-commit  
Update husky hook to include formatting  
**Priority**: P1 | **Estimate**: 30min | **Status**: [ ] Not Started

### Week 4 Tasks

**T019** 🤖 Set up Dependabot  
Create `.github/dependabot.yml`  
**Priority**: P0 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T020** 📦 Group dependency updates  
Configure Dependabot grouping strategy  
**Priority**: P1 | **Estimate**: 30min | **Status**: [ ] Not Started

**T021** 🛠 Create error handler utility  
Implement `/src/utils/error-handler.ts`  
**Priority**: P1 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T022** 📝 Add error boundary component  
Create React error boundary for app  
**Priority**: P1 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T023** 🔍 Improve TypeScript config  
Enable stricter type checking rules  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T024** 📚 Create CONTRIBUTING.md  
Document development workflow  
**Priority**: P2 | **Estimate**: 1hr | **Status**: [ ] Not Started

## Phase 3: First Simple Feature (Weeks 5-6)
### Week 5 Tasks

**T025** 📁 Create Dice component structure  
Set up `/src/components/atomic/Dice/` directory  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T026** 📝 Define Dice TypeScript types  
Create `types.ts` with interfaces  
**Priority**: P0 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T027** 🎲 Implement basic Dice component  
Create `Dice.tsx` with roll functionality  
**Priority**: P0 | **Estimate**: 3hr | **Status**: [ ] Not Started

**T028** 🎨 Add Dice styling  
Implement size and theme variants  
**Priority**: P1 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T029** ♿ Add ARIA attributes  
Ensure accessibility compliance  
**Priority**: P0 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T030** 🔄 Add roll animation  
Implement visual feedback during roll  
**Priority**: P2 | **Estimate**: 2hr | **Status**: [ ] Not Started

### Week 6 Tasks

**T031** 🧪 Write Dice component tests  
Create comprehensive test suite  
**Priority**: P0 | **Estimate**: 3hr | **Status**: [ ] Not Started

**T032** 📚 Create Dice Storybook story  
Add `Dice.stories.tsx` with variants  
**Priority**: P0 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T033** 📝 Document Dice usage  
Add JSDoc comments and README  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T034** 🎲 Add dice to main app  
Integrate component in pages  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T035** 🧪 Test coverage for Dice  
Ensure 80%+ coverage for component  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T036** 📋 Create component template  
Document pattern for future components  
**Priority**: P2 | **Estimate**: 1hr | **Status**: [ ] Not Started

## Phase 4: Quality Baseline (Weeks 7-8)
### Week 7 Tasks

**T037** 📦 Install Zod  
`pnpm add zod`  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T038** 📝 Create form schemas  
Implement `/src/schemas/forms.ts`  
**Priority**: P0 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T039** 🔒 Add input validation  
Apply Zod schemas to forms  
**Priority**: P0 | **Estimate**: 3hr | **Status**: [ ] Not Started

**T040** 🧪 Test validation logic  
Write tests for schemas  
**Priority**: P1 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T041** 📚 Create SECURITY.md  
Document security policies  
**Priority**: P0 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T042** 🔍 Security audit  
Run `pnpm audit` and fix issues  
**Priority**: P0 | **Estimate**: 2hr | **Status**: [ ] Not Started

### Week 8 Tasks

**T043** 🪝 Create pre-push hook  
Add `.husky/pre-push` for tests  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T044** 📊 Increase coverage target  
Update threshold to 25%  
**Priority**: P0 | **Estimate**: 30min | **Status**: [ ] Not Started

**T045** 🧪 Add integration tests  
Test component interactions  
**Priority**: P1 | **Estimate**: 4hr | **Status**: [ ] Not Started

**T046** 📝 Type-check in CI  
Add TypeScript checking to pipeline  
**Priority**: P0 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T047** 🔒 Add CSP headers  
Verify Content Security Policy  
**Priority**: P1 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T048** 📚 Update documentation  
Reflect new quality standards  
**Priority**: P2 | **Estimate**: 1hr | **Status**: [ ] Not Started

## Phase 5: Foundation Completion (Weeks 9-10)
### Week 9 Tasks

**T049** 🏥 Create health endpoint  
Implement `/api/health` route  
**Priority**: P0 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T050** 🐳 Update Docker health check  
Configure proper health monitoring  
**Priority**: P0 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T051** ♿ Install Pa11y  
`pnpm add -D pa11y pa11y-ci`  
**Priority**: P1 | **Estimate**: 30min | **Status**: [ ] Not Started

**T052** 📝 Configure Pa11y  
Create `.pa11yci.json`  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T053** 🧪 Run accessibility tests  
Test all main routes  
**Priority**: P1 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T054** 🔧 Fix a11y issues  
Address any failures  
**Priority**: P1 | **Estimate**: 3hr | **Status**: [ ] Not Started

### Week 10 Tasks

**T055** 📊 Add Web Vitals  
`pnpm add web-vitals`  
**Priority**: P1 | **Estimate**: 30min | **Status**: [ ] Not Started

**T056** 📝 Implement performance monitoring  
Create `/src/utils/performance.ts`  
**Priority**: P1 | **Estimate**: 3hr | **Status**: [ ] Not Started

**T057** 🔄 Update CI/CD pipeline  
Add new checks to GitHub Actions  
**Priority**: P0 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T058** 📚 Create ADR template  
Set up Architecture Decision Records  
**Priority**: P2 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T059** 📝 Document Sprint 2 decisions  
Create ADRs for key choices  
**Priority**: P2 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T060** 🧹 Code cleanup  
Remove dead code and TODOs  
**Priority**: P2 | **Estimate**: 2hr | **Status**: [ ] Not Started

## Wrap-up Tasks

**T061** 🧪 Final test coverage check  
Ensure 25% coverage achieved  
**Priority**: P0 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T062** 📊 Performance baseline  
Record current metrics  
**Priority**: P1 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T063** 📚 Update all documentation  
README, CONTRIBUTING, etc.  
**Priority**: P1 | **Estimate**: 2hr | **Status**: [ ] Not Started

**T064** 🎉 Create Sprint 2 summary  
Document achievements  
**Priority**: P2 | **Estimate**: 1hr | **Status**: [ ] Not Started

**T065** 📋 Plan Sprint 3  
Identify next priorities  
**Priority**: P2 | **Estimate**: 2hr | **Status**: [ ] Not Started

## Task Statistics

| Phase | Tasks | Estimated Hours |
|-------|-------|-----------------|
| Phase 1: Testing Foundation | 12 | 14.5 hrs |
| Phase 2: Developer Experience | 12 | 14 hrs |
| Phase 3: First Simple Feature | 12 | 19 hrs |
| Phase 4: Quality Baseline | 12 | 18.5 hrs |
| Phase 5: Foundation Completion | 12 | 20 hrs |
| Wrap-up | 5 | 7 hrs |
| **Total** | **65** | **93 hrs** |

## Priority Breakdown

- **P0 (Critical)**: 32 tasks - Must complete for sprint success
- **P1 (Important)**: 24 tasks - Should complete for quality
- **P2 (Nice to have)**: 9 tasks - Complete if time permits

## Quick Start Commands

```bash
# Phase 1: Testing Setup
pnpm add -D vitest @vitest/ui @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom jsdom husky lint-staged

# Phase 2: DevEx
pnpm add -D prettier prettier-plugin-tailwindcss

# Phase 3: Feature (no new deps)

# Phase 4: Quality
pnpm add zod

# Phase 5: Monitoring
pnpm add web-vitals
pnpm add -D pa11y pa11y-ci
```

## Definition of Done

Each task is complete when:
- [ ] Code is written and tested
- [ ] Tests pass locally
- [ ] Code is formatted (Prettier)
- [ ] TypeScript has no errors
- [ ] Documentation is updated
- [ ] Committed with conventional message

---

*Sprint 2 begins with T001. Track progress by checking off completed tasks.*