# CRUDkit Sprint 3 Technical Implementation Plan

## Overview

This plan outlines the technical implementation strategy for Sprint 3, which aims to complete the remaining 30% of constitutional requirements over 8 weeks.

## Architecture Decisions

### Core Architecture Principles

1. **Progressive Enhancement**: All features must work without JavaScript first
2. **Offline-First**: PWA features with background sync for resilience
3. **Privacy by Design**: GDPR compliance built-in, not bolted-on
4. **Component Isolation**: Each component self-contained with 4-file structure
5. **Test Coverage**: Minimum 40% coverage with focus on critical paths

## Phase 1: Missing Core Features (Weeks 1-2)

### PRP Methodology Implementation

**Architecture**: Client-side state management with localStorage persistence

```typescript
// State management using Zustand
interface PRPStore {
  problems: Problem[];
  requirements: Requirements[];
  plans: Plan[];
  currentWorkflow: WorkflowState;
}
```

**Technology Stack**:

- Zustand for state management
- React Hook Form for data entry
- Zod for validation
- localStorage for persistence

### PWA Background Sync

**Architecture**: Service Worker with IndexedDB queue

```javascript
// Service Worker architecture
- IndexedDB for offline queue storage
- Background Sync API for retry logic
- Fallback to periodic sync for older browsers
```

**Implementation**:

1. Enhance existing service worker
2. Add IndexedDB wrapper utilities
3. Implement sync event handlers
4. Add retry logic with exponential backoff

### WCAG AA Compliance Automation

**Architecture**: Multi-layer testing approach

```yaml
# CI/CD Pipeline
1. Static analysis (eslint-plugin-jsx-a11y)
2. Unit tests (jest-axe)
3. Integration tests (Pa11y CI)
4. E2E tests (Playwright with axe-core)
```

**Tools**:

- Pa11y for automated testing
- axe-core for runtime checks
- GitHub Actions for CI integration

### Colorblind Mode

**Architecture**: CSS filter-based approach with SVG filters

```css
/* CSS Custom Properties for filters */
--colorblind-protanopia: url(#protanopia-filter)
  --colorblind-deuteranopia: url(#deuteranopia-filter)
  --colorblind-tritanopia: url(#tritanopia-filter);
```

## Phase 2: Forms & Integrations (Weeks 3-4)

### Email Provider Architecture

**Pattern**: Strategy pattern with fallback chain

```typescript
interface EmailProvider {
  send(data: FormData): Promise<Result>;
  isAvailable(): Promise<boolean>;
}

class EmailManager {
  providers: EmailProvider[];
  async send(data): Promise<Result> {
    // Try each provider in order
  }
}
```

**Providers**:

1. Web3Forms (primary) - No backend required
2. EmailJS (backup) - Template-based
3. Background sync queue (offline)

### Calendar Integration

**Architecture**: Iframe-based embedding with message passing

```typescript
// Calendar wrapper component
- Iframe sandboxing for security
- PostMessage API for communication
- Prefill data via URL parameters
```

**Supported Platforms**:

- Calendly (primary)
- Cal.com (alternative)
- Google Calendar (future)

### Contact Form Implementation

**Architecture**: Progressive enhancement approach

```
HTML Form (works without JS)
  ↓
React Hook Form (enhanced UX)
  ↓
Zod Validation (client-side)
  ↓
Email Provider Manager
  ↓
Background Sync (offline support)
```

## Phase 3: Privacy & Testing (Weeks 5-6)

### GDPR Compliance Implementation

**Architecture**: Consent-first design

```typescript
// Privacy Manager
class PrivacyManager {
  consentStore: ConsentStore;
  dataExporter: DataExporter;
  dataDeletion: DataDeletion;
  auditLog: AuditLog;
}
```

**Components**:

1. Cookie consent modal
2. Privacy dashboard
3. Data export utility
4. Data deletion service
5. Audit logging

### Visual Regression Testing

**Architecture**: Storybook + Chromatic

```yaml
# Workflow
1. Build Storybook
2. Upload to Chromatic
3. Detect visual changes
4. Review and approve
5. Update baselines
```

**Implementation**:

- Chromatic for hosting
- GitHub Actions integration
- Approval workflow
- Baseline management

### E2E Testing Framework

**Architecture**: Playwright with Page Object Model

```typescript
// Page Object structure
class ContactPage {
  async fillForm(data: FormData);
  async submitForm();
  async verifySuccess();
}
```

**Test Categories**:

1. Critical user journeys
2. Form submissions
3. Offline scenarios
4. Accessibility flows
5. Privacy controls

### Test Coverage Strategy

**Approach**: Focus on high-value areas

```
Priority 1 (Must test):
- Form validations
- Email sending
- Privacy controls
- Accessibility features

Priority 2 (Should test):
- UI components
- Navigation
- Theme switching
- Data persistence

Priority 3 (Nice to have):
- Edge cases
- Browser compatibility
- Performance scenarios
```

## Phase 4: Enhanced Features (Weeks 7-8)

### Google Analytics Integration

**Architecture**: Consent-based loading

```typescript
// Analytics Manager
class AnalyticsManager {
  async initialize() {
    if (hasConsent('analytics')) {
      loadGoogleAnalytics();
    }
  }

  trackEvent(event: AnalyticsEvent) {
    if (hasConsent('analytics')) {
      gtag('event', event);
    }
  }
}
```

### Font Switcher Architecture

**Pattern**: Mirror ThemeSwitcher implementation

```typescript
// Font management
- CSS custom properties for font families
- localStorage persistence
- Preload optimization
- FOUT prevention
```

### Geolocation Implementation

**Architecture**: Permission-first approach

```typescript
// Location Manager
class LocationManager {
  async requestPermission();
  async getCurrentLocation();
  handlePermissionDenied();
  fallbackToIPGeolocation();
}
```

### Component Standardization

**Structure**: 4-file pattern enforcement

```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.types.ts  # TypeScript interfaces
├── ComponentName.styles.css # Styles (or .module.css)
└── ComponentName.stories.tsx # Storybook stories
```

**Tooling**:

- Component generator script
- ESLint rule enforcement
- Pre-commit validation

## Performance Considerations

### Bundle Size Management

- Code splitting by route
- Dynamic imports for heavy features
- Tree shaking optimization
- Bundle analyzer monitoring

### Runtime Performance

- React.memo for expensive components
- useMemo/useCallback optimization
- Virtual scrolling for lists
- Image lazy loading

### Metrics Monitoring

- Web Vitals tracking
- Lighthouse CI checks
- Bundle size budgets
- Performance regression alerts

## Security Measures

### Input Validation

- Zod schemas for all forms
- XSS prevention via React
- CSRF protection headers
- Rate limiting consideration

### Data Protection

- Encryption for sensitive data
- Secure cookie flags
- Content Security Policy
- Subresource Integrity

### Third-party Security

- Dependency scanning
- License compliance
- Version pinning
- Security advisories

## Migration Strategy

### Incremental Adoption

1. Feature flags for new features
2. Parallel implementation
3. Gradual rollout
4. A/B testing capability

### Data Migration

- localStorage migration utilities
- Backward compatibility
- Data transformation scripts
- Rollback procedures

## Rollback Procedures

### Feature Rollback

```bash
# Quick rollback via feature flags
NEXT_PUBLIC_FEATURE_PRP=false
NEXT_PUBLIC_FEATURE_PRIVACY=false
```

### Deployment Rollback

```bash
# GitHub Pages rollback
git revert --no-commit HEAD~1
git commit -m "Rollback to previous version"
git push origin main
```

### Data Rollback

- Backup before migration
- Versioned data structures
- Rollback scripts ready
- Testing rollback procedures

## Risk Management

### Technical Risks

| Risk                     | Impact | Mitigation                   |
| ------------------------ | ------ | ---------------------------- |
| Email provider limits    | High   | Multiple providers, queueing |
| Browser compatibility    | Medium | Progressive enhancement      |
| Performance regression   | Medium | Performance budgets          |
| Security vulnerabilities | High   | Regular scanning, updates    |

### Schedule Risks

| Risk               | Impact | Mitigation                 |
| ------------------ | ------ | -------------------------- |
| Scope creep        | High   | Strict phase boundaries    |
| Technical debt     | Medium | Refactoring time allocated |
| Testing delays     | Medium | Parallel test development  |
| Integration issues | High   | Early integration testing  |

## Success Metrics

### Technical Metrics

- 40% test coverage achieved
- All Lighthouse scores >90
- WCAG AA compliance pass
- Zero critical vulnerabilities
- <5% performance regression

### Functional Metrics

- All constitutional requirements met
- All user stories completed
- All integrations functional
- Privacy controls working
- Offline capabilities verified

## Timeline

| Week | Focus             | Deliverables                     |
| ---- | ----------------- | -------------------------------- |
| 1    | PRP & PWA Setup   | PRP components, Service Worker   |
| 2    | Accessibility     | WCAG automation, Colorblind mode |
| 3    | Email Integration | Web3Forms, EmailJS setup         |
| 4    | Forms & Calendar  | Contact form, Calendar widget    |
| 5    | Privacy Controls  | GDPR compliance, Cookie consent  |
| 6    | Testing Setup     | Chromatic, Playwright, Coverage  |
| 7    | Analytics & Fonts | GA integration, Font switcher    |
| 8    | Location & Polish | Geolocation, 4-file structure    |

## Next Steps

1. Set up development environment
2. Create feature branches
3. Begin Phase 1 implementation
4. Daily progress tracking
5. Weekly review meetings

---

_This plan provides the technical roadmap for completing CRUDkit's constitutional vision in Sprint 3._
