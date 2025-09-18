# Technical Debt

This document tracks known technical issues, workarounds, and future concerns that need to be addressed.

## Current Issues

### ~~1. Next.js 15.5 Static Export Compatibility~~ ✅ RESOLVED

**Date Added**: 2025-09-18
**Date Resolved**: 2025-09-18
**Severity**: ~~Medium~~ None
**Impact**: ~~Build process complexity~~ None

**Issue**: ~~Next.js 15.5.2 with `output: 'export'` has a bug where it tries to process Pages Router files even in pure App Router projects, causing build failures.~~ This was a false assumption - the build works fine without dummy Pages Router files.

**Resolution**:

- Removed dummy `src/pages/_app.tsx` and `src/pages/_document.tsx` files
- Build succeeds with Next.js 15.5.2 and pure App Router setup
- No workaround needed - this was likely a project-specific configuration issue or has been fixed in Next.js

### 2. ContactForm Storybook Stories

**Date Added**: 2025-09-18
**Severity**: Low
**Impact**: Reduced Storybook coverage

**Issue**: ContactForm stories fail with "Cannot access 'ContactForm_stories' before initialization" error when using jest.mock() for mocking the useWeb3Forms hook.

**Current Workaround**:

- Stories still exist but fail in production Storybook build
- The component works correctly in the application

**Proper Fix**:

- Set up proper Storybook decorators for providing mock context
- Consider using MSW (Mock Service Worker) for API mocking instead of jest.mock
- Investigate Storybook 8's new mocking capabilities

### 3. GoogleAnalytics Storybook Context Error

**Date Added**: 2025-09-18
**Severity**: Low
**Impact**: Storybook component preview fails

**Issue**: GoogleAnalytics component stories fail with "useConsent must be used within a ConsentProvider" error because the component requires ConsentContext to be available.

**Current Workaround**:

- The component works correctly in the application where ConsentProvider wraps the app
- Storybook stories fail to render but don't affect production

**Proper Fix**:

- Add ConsentProvider as a global decorator in `.storybook/preview.tsx`
- Or add ConsentProvider decorator specifically to GoogleAnalytics stories
- Consider creating a mock ConsentProvider for Storybook that provides default values

### 4. Project Configuration Complexity

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

### ~~1. Security Headers~~ ✅ DOCUMENTED

**Impact**: Production security
**Documentation**: `/docs/deployment/security-headers.md`

With the removal of the `headers()` function from Next.js config (due to static export incompatibility), security headers need to be configured at the hosting level. Complete documentation now available with platform-specific configurations for:

- ✅ Vercel (vercel.json)
- ✅ Netlify (_headers file)
- ✅ nginx configuration
- ✅ Apache (.htaccess)
- ✅ CloudFlare Pages (_headers or Workers)

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

1. ~~**Pages Router Dummy Files** (`src/pages/*`)~~ - ✅ Removed (2025-09-18)
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
