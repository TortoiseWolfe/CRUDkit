# Tasks: Sprint 3.5 - Technical Debt Reduction

**Input**: Design documents from `/specs/016-sprint-3-5/`
**Prerequisites**: plan.md (✓), research.md (✓), data-model.md (✓), contracts/ (✓), quickstart.md (✓)

## Execution Flow (main)

```
1. Load plan.md from feature directory
   → Extracted: TypeScript/Next.js 15.5.2, React 19.1.0, Vitest, Storybook 8
   → Structure: Next.js App Router with static export
2. Load optional design documents:
   → data-model.md: No new entities (debt fixes only)
   → contracts/: No new contracts (maintaining existing)
   → research.md: Technical decisions for all 11 debt items
3. Generate tasks by category:
   → Critical fixes: Next.js workaround, security docs, test fixes
   → High priority: Storybook fixes, PWA manifest, component structure
   → Medium priority: Bundle optimization, lazy loading, CI integration
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Documentation tasks can be parallel
   → Test fixes must complete before related tasks
5. Number tasks sequentially (T001-T035)
6. Generate dependency graph
7. Create parallel execution examples
8. Return: SUCCESS (35 tasks ready for execution)
```

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Critical - Build & Test Infrastructure (Week 1)

### Next.js Workaround Check

- [ ] T001 Check Next.js changelog for fixes > 15.5.2 and test build without dummy files
- [ ] T002 Document Next.js workaround status in `/docs/TECHNICAL-DEBT.md`

### Security Headers Documentation

- [ ] T003 [P] Create `/docs/deployment/security-headers.md` with overview structure
- [ ] T004 [P] Add Vercel configuration example to security headers doc
- [ ] T005 [P] Add Netlify \_headers configuration example
- [ ] T006 [P] Add nginx server block configuration example
- [ ] T007 [P] Add CloudFlare Page Rules/Workers configuration example
- [ ] T008 Verify all security headers documented with verification steps

### Offline Queue Test Fixes

- [ ] T009 Analyze failing tests in `/src/tests/offline-integration.test.tsx`
- [ ] T010 Split offline queue tests into unit tests for queue operations
- [ ] T011 Create E2E tests for form submission with Playwright
- [ ] T012 Fix React Hook Form async validation timing issues
- [ ] T013 Verify all offline tests passing

## Phase 3.2: High Priority - Component & Build Fixes (Week 1-2)

### Storybook Fixes

- [ ] T014 [P] Install and configure MSW (Mock Service Worker) for Storybook
- [ ] T015 Fix ContactForm stories in `/src/components/atomic/ContactForm/ContactForm.stories.tsx` using MSW
- [ ] T016 [P] Add ConsentProvider to `.storybook/preview.tsx` as global decorator
- [ ] T017 Fix GoogleAnalytics stories in `/src/components/privacy/GoogleAnalytics/GoogleAnalytics.stories.tsx`
- [ ] T018 Verify all Storybook stories render without errors

### PWA Manifest Generation

- [ ] T019 Create `/scripts/generate-manifest.js` for build-time manifest generation
- [ ] T020 Update build process in `package.json` to generate manifest
- [ ] T021 Remove API route `/src/app/api/manifest/route.ts` if exists
- [ ] T022 Verify `public/manifest.json` generates correctly at build time

### Component Structure Standardization

- [ ] T023 Audit all components for 5-file pattern compliance
- [ ] T024 [P] Generate missing test files for non-compliant components
- [ ] T025 [P] Generate missing story files for non-compliant components
- [ ] T026 [P] Generate missing accessibility test files for components
- [ ] T027 Add ESLint custom rule to enforce 5-file component structure
- [ ] T028 Verify all components pass structure validation

## Phase 3.3: Medium Priority - Optimization & CI/CD (Week 2-3)

### Bundle Size Optimization

- [ ] T029 Run `pnpm analyze` to identify large dependencies
- [ ] T030 Implement code splitting for identified heavy modules
- [ ] T031 Verify bundle size reduced to <90KB First Load JS

### Heavy Component Lazy Loading

- [ ] T032 Convert Leaflet map imports to Next.js dynamic() with loading state
- [ ] T033 Convert calendar embed imports to dynamic() with loading state
- [ ] T034 Verify lazy loading works with proper loading indicators

### Configuration Simplification

- [ ] T035 Clean up `/src/config/project-detected.ts` removing webpack workarounds
- [ ] T036 Migrate complex config to environment variables
- [ ] T037 Simplify project detection script

### E2E Tests CI Integration

- [ ] T038 Create `.github/workflows/e2e.yml` for Playwright tests
- [ ] T039 Configure Playwright browser caching in CI
- [ ] T040 Add E2E tests to pull request checks
- [ ] T041 Verify E2E tests run successfully in GitHub Actions

## Phase 3.4: Validation & Cleanup

- [ ] T042 Run full test suite (`pnpm test`) and fix any failures
- [ ] T043 Run Lighthouse audit and verify scores >90
- [ ] T044 Update `/docs/TECHNICAL-DEBT.md` marking resolved items
- [ ] T045 Execute quickstart.md validation steps
- [ ] T046 Create PR description summarizing all fixes

## Dependencies

- T001-T002 must complete before any Next.js related tasks
- T009-T013 (test fixes) must complete before T042 (full test suite)
- T014 (MSW setup) blocks T015 (ContactForm fix)
- T016 (ConsentProvider) blocks T017 (GoogleAnalytics fix)
- T019-T020 (manifest generation) blocks T022 (verification)
- T023 (audit) blocks T024-T026 (generate missing files)
- T029 (analysis) blocks T030 (code splitting)
- All implementation tasks block T042-T046 (validation)

## Parallel Example

```bash
# Documentation tasks (can run simultaneously):
Task: "Create /docs/deployment/security-headers.md"
Task: "Add Vercel configuration to security headers"
Task: "Add Netlify configuration to security headers"
Task: "Add nginx configuration to security headers"
Task: "Add CloudFlare configuration to security headers"

# Component file generation (different components):
Task: "Generate missing test files for components"
Task: "Generate missing story files for components"
Task: "Generate missing accessibility test files"
```

## Success Metrics

- No dummy Next.js files needed (or documented if still required)
- All tests passing (100% success rate)
- All Storybook stories functional
- Bundle size < 90KB
- E2E tests in CI pipeline
- Lighthouse scores > 90
- Technical debt document updated

## Notes

- [P] tasks = different files, no shared dependencies
- Critical items take priority over all others
- Maintain backward compatibility throughout
- Test after each major change
- Document any remaining workarounds
- Update CLAUDE.md if Sprint 3.5 changes affect future development

## Validation Checklist

- [x] All 11 technical debt items have corresponding tasks
- [x] Critical items scheduled first (T001-T013)
- [x] High priority items next (T014-T028)
- [x] Medium priority items last (T029-T041)
- [x] Parallel tasks truly independent
- [x] Each task specifies exact file path where applicable
- [x] No parallel task modifies same file as another [P] task
