# CRUDkit Sprint 2 Specification: Fix the Foundation

## Executive Summary

Sprint 2 focuses on addressing critical technical debt and establishing foundational quality gates that were identified in the constitution's reality check. With the project currently at ~40% compliance with original requirements, this 10-week sprint prioritizes testing infrastructure, developer experience, and quality assurance before adding any new features.

## Sprint Overview

**Duration**: 10 weeks (5 phases × 2 weeks each)  
**Priority**: Fix foundation before features  
**Current State**: 0% test coverage, no quality gates, no validation  
**Target State**: 25% test coverage, basic quality gates, developer tooling

## Phase Breakdown

### Weeks 1-2: Minimal Testing Foundation

#### Objectives

- Establish basic testing infrastructure
- Create first working test
- Set up automated verification
- Enable coverage reporting

#### Deliverables

**1. Testing Framework Setup**

```typescript
// Install and configure Vitest
- Package: vitest @vitest/ui @testing-library/react @testing-library/jest-dom
- Config: vitest.config.ts with Next.js compatibility
- Coverage: c8 for coverage reporting
- Target: 10% initial coverage
```

**2. First Smoke Test**

```typescript
// src/components/subatomic/Text/Text.test.tsx
describe('Text Component', () => {
  it('renders without crashing', () => {
    // Basic render test
  });
  it('applies correct typography classes', () => {
    // Class application test
  });
});
```

**3. Pre-commit Hook**

```json
// .husky/pre-commit
{
  "hooks": {
    "pre-commit": "pnpm run lint"
  }
}
```

**4. GitHub Action for Build Verification**

```yaml
# .github/workflows/build.yml
name: Build Verification
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run build
      - run: pnpm run test:coverage
```

### Weeks 3-4: Developer Experience

#### Objectives

- Fix development environment issues
- Standardize code formatting
- Automate dependency management
- Improve debugging capabilities

#### Deliverables

**1. HMR Fix in Docker**

```dockerfile
# Update docker-compose.yml
environment:
  - WATCHPACK_POLLING=true
  - NEXT_HMR_PORT=3001
volumes:
  - .:/app
  - /app/node_modules
  - /app/.next
```

**2. Prettier Configuration**

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**3. Dependabot Setup**

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'weekly'
    groups:
      dependencies:
        patterns:
          - '*'
```

**4. Enhanced Error Messages**

```typescript
// src/utils/error-handler.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
```

### Weeks 5-6: First Simple Feature

#### Objectives

- Implement simple 2D dice component
- Establish component testing pattern
- Document component development process
- Create reusable component template

#### Deliverables

**1. Dice Component (2D, No Animation)**

```typescript
// src/components/atomic/Dice/Dice.tsx
interface DiceProps {
  sides: 4 | 6 | 8 | 10 | 12 | 20;
  value?: number;
  onRoll?: (value: number) => void;
  disabled?: boolean;
}

export const Dice: React.FC<DiceProps> = ({
  sides = 6,
  value,
  onRoll,
  disabled = false
}) => {
  const roll = () => {
    const result = Math.floor(Math.random() * sides) + 1;
    onRoll?.(result);
  };

  return (
    <button
      className="dice"
      onClick={roll}
      disabled={disabled}
      aria-label={`Roll ${sides}-sided dice`}
    >
      {value || '?'}
    </button>
  );
};
```

**2. Dice Component Test**

```typescript
// src/components/atomic/Dice/Dice.test.tsx
describe('Dice Component', () => {
  it('generates values within valid range', () => {
    // Test randomization bounds
  });

  it('calls onRoll with correct value', () => {
    // Test callback
  });

  it('respects disabled state', () => {
    // Test interaction blocking
  });
});
```

**3. Storybook Story**

```typescript
// src/components/atomic/Dice/Dice.stories.tsx
export default {
  title: 'Atomic/Dice',
  component: Dice,
  argTypes: {
    sides: {
      control: { type: 'select' },
      options: [4, 6, 8, 10, 12, 20],
    },
  },
};
```

**4. Component Pattern Documentation**

```markdown
# Component Development Pattern

## Structure

- Component file: Component.tsx
- Test file: Component.test.tsx
- Story file: Component.stories.tsx
- Index export: index.ts

## Process

1. Create story first (design in Storybook)
2. Implement component
3. Write tests
4. Document props
```

### Weeks 7-8: Quality Baseline

#### Objectives

- Add input validation
- Create security documentation
- Establish type checking gates
- Reach 25% test coverage

#### Deliverables

**1. Zod Validation Setup**

```typescript
// src/schemas/forms.ts
import { z } from 'zod';

export const emailSchema = z.string().email();
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: emailSchema,
  message: z.string().min(10).max(1000),
});

// Usage in component
const validateForm = (data: unknown) => {
  return contactFormSchema.safeParse(data);
};
```

**2. SECURITY.md**

```markdown
# Security Policy

## Reporting Vulnerabilities

Report to: security@example.com

## Security Measures

- Input validation: Zod schemas
- CSP headers: Configured in next.config.ts
- Dependencies: Weekly Dependabot scans
- No secrets in code: Use environment variables

## Known Issues

- [ ] CSRF protection not implemented
- [ ] Rate limiting not configured
```

**3. Pre-push Hook**

```bash
# .husky/pre-push
#!/bin/sh
pnpm run type-check
pnpm run test
```

**4. Coverage Improvement**

- Target: 25% coverage on critical paths
- Focus areas:
  - Component rendering
  - User interactions
  - Form validation
  - Theme switching

### Weeks 9-10: Foundation Completion

#### Objectives

- Add Docker health checks
- Basic accessibility testing
- Performance monitoring setup
- Documentation updates

#### Deliverables

**1. Docker Health Checks**

```yaml
# docker-compose.yml
services:
  crudkit:
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/api/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

**2. Accessibility Testing**

```json
// .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 10000
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/themes",
    "http://localhost:3000/components"
  ]
}
```

**3. Performance Monitoring**

```typescript
// src/utils/performance.ts
export const measureWebVitals = () => {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};
```

**4. Updated Documentation**

- Updated README with testing instructions
- CONTRIBUTING.md with quality standards
- Architecture Decision Records (ADRs) for key choices

## Success Criteria

### Must Have (Sprint 2 Complete)

- [ ] Vitest installed and configured
- [ ] At least 1 working test
- [ ] Pre-commit hooks functional
- [ ] GitHub Actions CI pipeline
- [ ] Prettier configured
- [ ] Dependabot active
- [ ] HMR working in Docker
- [ ] Simple dice component implemented
- [ ] 25% test coverage achieved
- [ ] Zod validation integrated
- [ ] SECURITY.md created
- [ ] Docker health checks added

### Should Have (If Time Permits)

- [ ] Component generator script
- [ ] Visual regression testing setup
- [ ] E2E test framework installed
- [ ] Performance budgets configured

### Could Have (Future Sprint)

- [ ] Full PRP methodology
- [ ] 40% test coverage
- [ ] Playwright E2E tests
- [ ] Chromatic visual testing

## Technical Constraints

### Package Manager

- Use pnpm exclusively
- No npm or yarn commands

### Docker Requirements

- All development in containers
- Both crudkit and speckit containers maintained
- Volume mounts for hot reload

### Code Standards

- TypeScript strict mode
- No `any` types
- ESLint rules enforced
- Prettier formatting required

### Git Workflow

- Feature branches
- Conventional commits
- PR reviews required
- CI must pass before merge

## Risk Mitigation

### Risk: Testing Framework Conflicts

**Mitigation**: Start with Vitest only, add other tools incrementally

### Risk: Docker Performance Issues

**Mitigation**: Optimize volume mounts, use .dockerignore

### Risk: Coverage Goals Too Ambitious

**Mitigation**: Focus on critical paths first, UI components second

### Risk: Developer Resistance to Quality Gates

**Mitigation**: Implement gradually, provide clear documentation

## Dependencies

### New Packages Required

```json
{
  "devDependencies": {
    "vitest": "^1.2.0",
    "@vitest/ui": "^1.2.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "prettier": "^3.2.0",
    "husky": "^9.0.0",
    "zod": "^3.22.0",
    "pa11y": "^6.2.0",
    "web-vitals": "^3.5.0"
  }
}
```

## Timeline Summary

| Weeks | Phase                | Key Deliverables                   |
| ----- | -------------------- | ---------------------------------- |
| 1-2   | Testing Foundation   | Vitest, first test, pre-commit, CI |
| 3-4   | Developer Experience | HMR fix, Prettier, Dependabot      |
| 5-6   | First Feature        | Dice component with tests          |
| 7-8   | Quality Baseline     | Zod, SECURITY.md, 25% coverage     |
| 9-10  | Foundation Complete  | Health checks, a11y, monitoring    |

## Definition of Done

Sprint 2 is complete when:

1. All "Must Have" items are checked
2. Test coverage reaches 25% minimum
3. All tests pass in CI
4. Documentation is updated
5. No critical security issues
6. Docker development is stable
7. Team can develop with confidence

---

_This specification addresses the ~60% gap identified in the constitution's reality check, focusing on foundational improvements before feature development._
