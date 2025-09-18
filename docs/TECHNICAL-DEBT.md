# Technical Debt

This document tracks known technical issues, workarounds, and future concerns that need to be addressed.

## Current Issues

### 1. Next.js 15.5 Static Export Compatibility

**Date Added**: 2025-09-18
**Severity**: Medium
**Impact**: Build process complexity

**Issue**: Next.js 15.5.2 with `output: 'export'` has a bug where it tries to process Pages Router files even in pure App Router projects, causing build failures.

**Current Workaround**:

- Created dummy `src/pages/_app.tsx` and `src/pages/_document.tsx` files
- Removed `headers()` function from `next.config.ts` (incompatible with static export)

**Proper Fix**:

- Wait for Next.js to fix this issue in a future release
- Consider downgrading to Next.js 15.0.3 if the issue persists
- Remove dummy pages files once fixed

### 2. ContactForm Storybook Stories

**Date Added**: 2025-09-18
**Severity**: Low
**Impact**: Reduced Storybook coverage

**Issue**: ContactForm stories fail with "Cannot access 'ContactForm_stories' before initialization" error when using jest.mock() for mocking the useWeb3Forms hook.

**Current Workaround**:

- Removed stories that require mocking (Submitting, Success, Error states)
- Kept only basic stories that don't require mocking

**Proper Fix**:

- Set up proper Storybook decorators for providing mock context
- Consider using MSW (Mock Service Worker) for API mocking instead of jest.mock
- Investigate Storybook 8's new mocking capabilities

### 3. Project Configuration Complexity

**Date Added**: 2025-09-18
**Severity**: Low
**Impact**: Build complexity

**Issue**: Auto-detection of project configuration from git remote adds complexity to the build process and can cause webpack issues with dynamic imports.

**Current State**:

- Simplified to use environment variables primarily
- Auto-detection generates .env.local file
- Removed complex dynamic require() statements

**Future Improvement**:

- Consider moving all configuration to build-time environment variables
- Remove runtime configuration loading
- Simplify the detection script

## Future Concerns

### 1. Security Headers

**Impact**: Production security

With the removal of the `headers()` function from Next.js config (due to static export incompatibility), security headers need to be configured at the hosting level:

- Configure headers in nginx/Apache for self-hosted deployments
- Use `_headers` file for Netlify
- Configure headers in vercel.json for Vercel
- Use CloudFlare page rules or workers for CloudFlare Pages

### 2. PWA Manifest API Route

**Impact**: PWA functionality

The dynamic manifest generation via API route doesn't work with static export. Consider:

- Generating manifest.json at build time
- Using the static manifest file approach
- Implementing a build script to generate manifest based on configuration

### 3. Test Coverage for Offline Features

**Impact**: Test reliability

The offline queue integration tests have known issues with React Hook Form timing in the test environment. Need to:

- Split into focused unit tests
- Add Playwright E2E tests for real browser validation
- Fix async validation timing issues

## Deprecated Code to Remove

1. **Pages Router Dummy Files** (`src/pages/*`) - Remove once Next.js fixes the static export issue
2. **Unused security headers constants** in next.config.ts - Currently defined but not used
3. **Complex webpack workarounds** in project.config.ts - Simplified but old code comments remain

## Performance Optimizations Needed

1. **Bundle Size**: Current First Load JS is ~102KB, could be optimized
2. **Lazy Loading**: Consider lazy loading heavy components like maps and calendar embeds
3. **Font Loading**: Optimize font loading strategy to reduce CLS

## Testing Improvements

1. **Storybook Coverage**: Restore full story coverage for ContactForm
2. **E2E Tests**: Currently only running locally, need CI integration
3. **Visual Regression**: PRP-012 deferred but needed for UI stability

## Documentation Updates Needed

1. Update deployment guides for security headers configuration
2. Document the forking process with new auto-configuration system
3. Add troubleshooting guide for common build issues
