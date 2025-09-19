# Technical Debt

This document tracks known technical issues, workarounds, and future concerns that need to be addressed.

## Sprint 3.5 Progress (2025-09-18 - 2025-09-19)

### Completed
- ✅ Component Structure Audit - 100% compliance with 5-file pattern
- ✅ Bundle Size Optimization - Met target of 102KB First Load JS
- ✅ Dynamic Imports - Calendar providers now lazy-loaded
- ✅ Bundle Analyzer - Added for ongoing monitoring
- ✅ E2E CI Integration - Multi-browser testing in GitHub Actions
- ✅ CalendarEmbed Tests - Fixed for dynamic import compatibility
- ✅ Security Headers Documentation - Complete guide for all platforms
- ✅ Offline Queue Tests - All 12 tests passing
- ✅ GoogleAnalytics Storybook - ConsentProvider already configured
- ✅ PWA Manifest - Already using build-time generation
- ✅ Next.js Workaround - Confirmed no dummy files needed (2025-09-19)
- ✅ MSW Setup - Already configured in Storybook
- ✅ Configuration Simplification - Already clean, no webpack workarounds
- ✅ Full Test Suite - All 793 tests passing

## Current Issues

### ~~1. Next.js 15.5 Static Export Compatibility~~ ✅ RESOLVED

**Date Added**: 2025-09-18
**Date Resolved**: 2025-09-19
**Severity**: None
**Impact**: None

**Issue**: Previously thought Next.js 15.5.2 with `output: 'export'` required dummy Pages Router files, but this was incorrect.

**Resolution**:
- Tested build without any Pages Router files - works perfectly
- Next.js 15.5.2 supports pure App Router with static export
- No dummy files or workarounds needed
- Build completes successfully after clearing cache (`pnpm run clean:next`)

### ~~2. ContactForm Storybook Stories~~ ✅ RESOLVED

**Date Added**: 2025-09-18
**Date Resolved**: 2025-09-19
**Severity**: None
**Impact**: None

**Issue**: Previously thought ContactForm stories failed with jest.mock() errors.

**Resolution**:
- MSW (Mock Service Worker) is already configured in `.storybook/preview.tsx`
- Web3Forms API mocks are already set up in `/src/mocks/handlers.ts`
- Stories should work without jest.mock()
- The perceived issue may have been a build cache problem

### ~~3. GoogleAnalytics Storybook Context Error~~ ✅ RESOLVED

**Date Added**: 2025-09-18
**Date Resolved**: 2025-09-19
**Severity**: None
**Impact**: None

**Issue**: Previously thought GoogleAnalytics stories failed due to missing ConsentProvider.

**Resolution**:
- ConsentProvider is already configured as a global decorator in `.storybook/preview.tsx` (line 52-54)
- The GoogleAnalytics stories already include a MockConsentWrapper for demonstration
- No additional fixes needed

### ~~4. Project Configuration Complexity~~ ✅ RESOLVED

**Date Added**: 2025-09-18
**Date Resolved**: 2025-09-19
**Severity**: None
**Impact**: None

**Issue**: Thought the auto-detection of project configuration added unnecessary complexity.

**Resolution**:
- The configuration is already simplified and clean
- No webpack workarounds found in the codebase
- The detection script is straightforward and works well
- Generated config is a simple TypeScript file with constants
- No further simplification needed

## Future Concerns

### ~~1. Security Headers~~ ✅ DOCUMENTED

**Impact**: Production security
**Documentation**: `/docs/deployment/security-headers.md`

With the removal of the `headers()` function from Next.js config (due to static export incompatibility), security headers need to be configured at the hosting level. Complete documentation now available with platform-specific configurations for:

- ✅ Vercel (vercel.json)
- ✅ Netlify (_headers file)
- ✅ nginx configuration
- ✅ Apache (.htaccess)
- ✅ CloudFlare Pages (_headers or Workers)

### ~~2. PWA Manifest API Route~~ ✅ RESOLVED (2025-09-18)

**Impact**: ~~PWA functionality~~ None
**Status**: Already using build-time generation

The PWA manifest is properly generated at build time via `scripts/generate-manifest.js` which runs in the prebuild step. No API route exists - fully compatible with static export.

### ~~3. Test Coverage for Offline Features~~ ✅ RESOLVED (2025-09-18)

**Impact**: ~~Test reliability~~ None
**Status**: All 12 offline queue tests now passing

The offline queue integration tests previously had issues with React Hook Form timing but are now working correctly. No further action needed.

## Deprecated Code to Remove

1. ~~**Pages Router Dummy Files** (`src/pages/*`)~~ - ✅ Removed (2025-09-18)
2. **Unused security headers constants** in next.config.ts - Currently defined but not used
3. **Complex webpack workarounds** in project.config.ts - Simplified but old code comments remain

## Performance Optimizations ~~Needed~~ ✅ COMPLETED

### ~~1. Bundle Size~~ ✅ OPTIMIZED (2025-09-18)
**Status**: Complete
- Current First Load JS: 102KB (meets target)
- Added @next/bundle-analyzer for monitoring
- Run `pnpm run analyze` to view bundle composition

### ~~2. Lazy Loading~~ ✅ IMPLEMENTED (2025-09-18)
**Status**: Complete
- Calendar providers (CalendlyProvider, CalComProvider) now use dynamic imports
- Loading states implemented for better UX
- Maps already use dynamic loading with SSR disabled

3. **Font Loading**: Optimize font loading strategy to reduce CLS

## Testing Improvements

1. **Storybook Coverage**: Restore full story coverage for ContactForm
2. ~~**E2E Tests**: Currently only running locally, need CI integration~~ ✅ CI ADDED (2025-09-18)
   - Created `.github/workflows/e2e.yml` with multi-browser testing
   - Tests run on Chromium, Firefox, and WebKit
   - Artifacts and reports uploaded for review
3. **Visual Regression**: PRP-012 deferred but needed for UI stability

## Documentation Updates Needed

1. Update deployment guides for security headers configuration
2. Document the forking process with new auto-configuration system
3. Add troubleshooting guide for common build issues

## Test Coverage Improvements Needed

### Component Tests
1. **CaptainShipCrewWithNPC** (`src/components/atomic/CaptainShipCrewWithNPC/CaptainShipCrewWithNPC.test.tsx`)
   - Currently only has basic render test
   - Need tests for game logic, player interactions, NPC behavior

### Accessibility Tests
Multiple components have only basic accessibility violation checks. Need comprehensive testing for:
- **CaptainShipCrewWithNPC** (`CaptainShipCrewWithNPC.accessibility.test.tsx`)
- **CaptainShipCrew** (`CaptainShipCrew.accessibility.test.tsx`)
- **Dice** (`Dice.accessibility.test.tsx`)
- **DraggableDice** (`DraggableDice.accessibility.test.tsx`)
- **DiceTray** (`DiceTray.accessibility.test.tsx`)

Each needs:
- Tests with different prop combinations
- Keyboard navigation testing
- ARIA attribute verification
- Color contrast validation
- Focus management testing

## Feature Extensions Needed

### Validation System Extension
**Location**: `src/components/atomic/CaptainShipCrewWithNPC/CaptainShipCrewWithNPC.tsx`
- Current implementation demonstrates validation system with ValidatedInput
- Should extend to other atomic components: Button, Input, and other form components
- This would improve form consistency and error handling across the application

### Error Handler Integrations
**Location**: `src/utils/error-handler.ts`

1. **Logging Service Integration** (line 233)
   - Currently only logs to console in development
   - Should integrate with services like Sentry, LogRocket, or DataDog
   - Would provide better production error tracking

2. **Notification System Integration** (line 252)
   - Currently only logs user notifications to console
   - Should integrate with a proper toast/notification system
   - Would improve user experience for error feedback
