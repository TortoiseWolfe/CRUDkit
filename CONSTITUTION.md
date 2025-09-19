# CRUDkit Constitution - Sprint 3.5: Technical Debt Reduction

**Version**: 0.3.5
**Sprint Focus**: Technical Debt Elimination
**Duration**: 2-3 weeks
**Start Date**: 2025-09-18

## Current Mission

Before advancing to Sprint 4 features, we must eliminate accumulated technical debt to ensure a stable foundation for future development.

## Sprint 3.5 Priorities

### 🔴 CRITICAL (Week 1 - Must Fix)

#### 1. Next.js 15.5 Static Export Workaround

**Location**: `/src/pages/_app.tsx`, `/src/pages/_document.tsx`
**Action**: Remove dummy Pages Router files once Next.js fixes the bug
**Impact**: Eliminates unnecessary files, cleaner build
**Verification**: Build succeeds without dummy files

#### 2. Security Headers Configuration

**Location**: `next.config.ts`
**Action**: Document hosting-level header configuration
**Impact**: Production security compliance
**Files to update**:

- Create `/docs/deployment/security-headers.md`
- Examples for Vercel, Netlify, nginx, CloudFlare

#### 3. Offline Queue Test Failures

**Location**: `/src/tests/offline-integration.test.tsx`
**Action**: Fix 4 failing tests or split into unit + E2E
**Impact**: Reliable test suite
**Known issue**: React Hook Form async validation timing

### 🟡 HIGH (Week 1-2 - Should Fix)

#### 4. ContactForm Storybook Stories

**Location**: `/src/components/atomic/ContactForm/ContactForm.stories.tsx`
**Action**: Fix jest.mock() initialization error
**Solution**: Use MSW or Storybook decorators
**Impact**: Complete Storybook coverage

#### 5. GoogleAnalytics Storybook Context

**Location**: `/src/components/privacy/GoogleAnalytics/GoogleAnalytics.stories.tsx`
**Action**: Add ConsentProvider decorator
**Impact**: Working component preview

#### 6. PWA Manifest Generation

**Location**: `/src/app/api/manifest/route.ts`
**Action**: Convert to build-time generation
**Impact**: PWA support with static export

#### 7. Component Structure Standardization

**Action**: Ensure ALL components follow 5-file pattern
**Required files**:

```
ComponentName/
├── index.tsx
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
└── ComponentName.accessibility.test.tsx
```

**Impact**: CI/CD compliance

### 🟢 MEDIUM (Week 2-3 - Nice to Have)

#### 8. Bundle Size Optimization

**Current**: ~102KB First Load JS
**Target**: <90KB
**Actions**:

- Analyze with `pnpm analyze`
- Implement code splitting
- Lazy load heavy components

#### 9. Heavy Component Lazy Loading

**Components**: Maps, Calendar embeds
**Action**: Dynamic imports with loading states
**Impact**: Faster initial page load

#### 10. Project Configuration Simplification

**Location**: `/src/config/project-detected.ts`
**Action**: Remove complex webpack workarounds
**Impact**: Simpler build process

#### 11. E2E Tests CI Integration

**Current**: Local only
**Action**: Add Playwright to GitHub Actions
**Impact**: Automated E2E testing

### 🔵 LOW (If Time Permits)

- Font loading optimization (reduce CLS)
- Remove deprecated code comments
- Update deployment documentation
- Clean up old webpack workarounds
- Document forking process improvements

## Success Metrics

✅ **Sprint 3.5 COMPLETE** (2025-09-19)

- [x] All CRITICAL items resolved
- [x] No dummy files in codebase
- [x] All tests passing (including offline)
- [x] Clean build without workarounds
- [x] Storybook stories 100% working
- [x] Documentation updated for all fixes
- [x] Test coverage maintained at 58%+
- [x] Lighthouse scores remain >90

## Technical Debt Tracking

**Source Document**: `/docs/TECHNICAL-DEBT.md`
**Update Frequency**: As items are discovered/resolved

## Development Guidelines

1. **Check technical debt first** - Review `/docs/TECHNICAL-DEBT.md` before starting work
2. **Fix before feature** - Resolve HIGH priority debt before adding features
3. **Document solutions** - Update debt doc with resolution details
4. **Test thoroughly** - Ensure fixes don't introduce new issues
5. **Clean as you go** - Remove TODOs, update comments

## Post-Sprint 3.5

After technical debt is cleared, proceed to Sprint 4:

- See `/SPRINT-4-ROADMAP.md` for feature planning
- Focus on advanced components and developer tools
- Target 80% test coverage
- Implement state management layer

## References

- **Technical Debt**: `/docs/TECHNICAL-DEBT.md`
- **Sprint History**: `/docs/SPRINT-HISTORY.md`
- **Sprint 4 Plan**: `/SPRINT-4-ROADMAP.md`
- **Archive**: `/docs/spec-kit/archive/CONSOLIDATED-ARCHIVE.md`
- **Claude Instructions**: `/CLAUDE.md`

## Current State

**Completed PRPs**: 11/14

- ✅ PRP-010: EmailJS Integration
- ✅ PRP-011: PWA Background Sync
- ✅ PRP-013: Calendar Integration
- ✅ PRP-014: Geolocation Map
- ⏳ PRP-012: Visual Regression (deferred)
- ⏳ PRP-001: PRP Methodology (documentation)
- ⏳ PRP-015: Enhanced Geolocation (future)

**Test Coverage**: 58%
**Component Compliance**: ~70% (need 5-file structure)
**Lighthouse Score**: 92+

---

_This constitution supersedes `/docs/constitution.md` for the duration of Sprint 3.5_
