# Testing Guidelines

## Overview

CRUDkit uses a comprehensive testing strategy to ensure code quality and reliability. Our testing stack includes:

- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **Coverage Reports**: Track test coverage metrics
- **CI/CD Integration**: Automated testing on every push

## Testing Stack

### Core Dependencies
- `vitest`: Test runner and assertion library
- `@testing-library/react`: React component testing
- `@testing-library/jest-dom`: Custom DOM matchers
- `@vitest/ui`: Interactive test UI
- `@vitest/coverage-v8`: Coverage reporting
- `jsdom`: Browser environment simulation

## Running Tests

### Basic Commands

```bash
# Run all tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Generate coverage report
pnpm test:coverage
```

### Docker Commands

```bash
# Run tests in Docker container
docker compose exec crudkit pnpm test

# Run tests with coverage
docker compose exec crudkit pnpm test:coverage
```

## Writing Tests

### Component Testing

Components should be tested for:
1. **Rendering**: Component renders without errors
2. **Props**: Props are handled correctly
3. **User Interactions**: Click, type, focus events work
4. **States**: Different states display correctly
5. **Accessibility**: ARIA attributes and roles are present

#### Example Component Test

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Best Practices

1. **Use Testing Library Queries**: Prefer queries that reflect how users interact
   - Good: `getByRole`, `getByLabelText`, `getByPlaceholderText`
   - Avoid: `getByTestId` (unless necessary)

2. **Test User Behavior**: Focus on what users see and do
   ```typescript
   // Good: Test user-visible behavior
   expect(screen.getByRole('button')).toHaveTextContent('Submit');
   
   // Avoid: Test implementation details
   expect(component.state.isSubmitting).toBe(true);
   ```

3. **Keep Tests Isolated**: Each test should be independent
   ```typescript
   describe('Component', () => {
     // Reset mocks after each test
     afterEach(() => {
       vi.clearAllMocks();
     });
   });
   ```

4. **Use Descriptive Names**: Test names should explain what's being tested
   ```typescript
   // Good
   it('displays error message when email is invalid')
   
   // Avoid
   it('test email validation')
   ```

## Test Structure

### File Organization

```
src/
├── components/
│   ├── subatomic/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx  # Component test
│   │   │   └── Button.stories.tsx
│   │   └── Input/
│   │       ├── Input.tsx
│   │       └── Input.test.tsx
│   └── atomic/
│       └── Card/
│           ├── Card.tsx
│           └── Card.test.tsx
├── utils/
│   ├── theme.ts
│   └── theme.test.ts  # Utility test
└── test/
    └── setup.ts  # Test configuration
```

### Test Configuration

The test environment is configured in `vitest.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      thresholds: {
        statements: 10,
        branches: 10,
        functions: 10,
        lines: 10,
      },
    },
  },
});
```

## Coverage Requirements

### Current Thresholds
- **Statements**: 10%
- **Branches**: 10%
- **Functions**: 10%
- **Lines**: 10%

These thresholds will increase as the project matures:
- Sprint 2: 10% (current)
- Sprint 3: 25%
- Sprint 4: 50%
- Sprint 5: 75%

### Viewing Coverage

```bash
# Generate and open coverage report
pnpm test:coverage

# Coverage report is generated in /coverage directory
open coverage/index.html
```

## CI/CD Integration

Tests run automatically on:
- Every push to `main` or `develop`
- Every pull request

The CI pipeline (`/.github/workflows/ci.yml`) runs:
1. Linting
2. Type checking
3. Unit tests
4. Coverage check
5. Build verification

## Pre-commit Hooks

Husky runs tests on staged files before commit:

```bash
# .husky/pre-commit
pnpm lint-staged
```

Lint-staged configuration:
- **JS/TS files**: ESLint + related tests
- **CSS/MD/JSON**: Prettier formatting

## Debugging Tests

### Interactive Mode

```bash
# Open Vitest UI for debugging
pnpm test:ui
```

### VSCode Integration

Install the Vitest extension for:
- Run tests from editor
- Debug with breakpoints
- See inline coverage

### Common Issues

1. **Module not found**: Check import paths and aliases
2. **DOM not available**: Ensure `jsdom` environment is set
3. **Async issues**: Use `waitFor` for async operations
4. **React hooks errors**: Wrap in `renderHook` from testing library

## Testing Checklist

Before committing:
- [ ] All tests pass locally
- [ ] New features have tests
- [ ] Coverage hasn't decreased
- [ ] No console errors in tests
- [ ] Tests follow naming conventions
- [ ] Mocks are properly cleaned up

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

---

*Last Updated: Sprint 2, Phase 1 - Testing Foundation Complete*