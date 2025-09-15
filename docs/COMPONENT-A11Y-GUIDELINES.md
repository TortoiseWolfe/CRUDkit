# Component Accessibility Guidelines

## Overview

This document provides comprehensive guidelines for ensuring all components in CRUDkit meet WCAG 2.1 AA standards. Every component must be accessible by default.

## Required Testing

### 1. Automated Testing

Every component must include:

```typescript
// ComponentName.accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ComponentName } from './ComponentName';

describe('ComponentName Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<ComponentName />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### 2. Storybook A11y Panel

All stories must be tested with the a11y addon:

- Zero violations in default state
- Zero violations in all interactive states
- Proper contrast ratios in all themes

## Component Requirements

### Semantic HTML

✅ **DO:**

- Use semantic elements (`button`, `nav`, `main`, `article`)
- Maintain proper heading hierarchy (`h1` → `h2` → `h3`)
- Use lists (`ul`, `ol`) for grouped items

❌ **DON'T:**

- Use `div` for clickable elements
- Skip heading levels
- Use generic containers when semantic elements exist

### ARIA Attributes

Required ARIA attributes by component type:

#### Buttons

```tsx
<button
  aria-label="Close dialog"      // For icon-only buttons
  aria-pressed={isPressed}        // For toggle buttons
  aria-disabled={isDisabled}      // For disabled state
>
```

#### Forms

```tsx
<input
  aria-label="Email address" // When no visible label
  aria-describedby="email-error" // For error messages
  aria-required="true" // For required fields
  aria-invalid={hasError} // For validation state
/>
```

#### Loading States

```tsx
<div role="status" aria-live="polite" aria-busy={isLoading}>
  <span className="sr-only">Loading...</span>
</div>
```

### Keyboard Navigation

All interactive elements must be keyboard accessible:

```typescript
// Required keyboard support
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      // Activate button
      break;
    case 'Escape':
      // Close modal/dropdown
      break;
    case 'ArrowDown':
      // Navigate to next item
      break;
    case 'ArrowUp':
      // Navigate to previous item
      break;
  }
};
```

### Focus Management

#### Focus Indicators

```css
/* Never remove focus indicators */
.component:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
```

#### Focus Trapping (Modals)

```tsx
import { FocusTrap } from '@/utils/focus-trap';

<FocusTrap active={isOpen}>
  <div role="dialog" aria-modal="true">
    {/* Modal content */}
  </div>
</FocusTrap>;
```

### Color Contrast

Minimum contrast ratios (WCAG AA):

- **Normal text**: 4.5:1
- **Large text** (18px+): 3:1
- **UI components**: 3:1

Use DaisyUI theme colors which are pre-validated for compliance.

### Screen Reader Support

#### Images

```tsx
// Informative images
<img src="chart.png" alt="Sales increased 25% in Q4" />

// Decorative images
<img src="decoration.png" alt="" role="presentation" />

// Complex images
<img
  src="complex-diagram.png"
  alt="System architecture"
  aria-describedby="diagram-description"
/>
<div id="diagram-description" className="sr-only">
  Detailed description of the diagram...
</div>
```

#### Visually Hidden Content

```tsx
// Use for screen reader only content
<span className="sr-only">Opens in new window</span>
```

### Motion and Animation

Respect user preferences:

```css
/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// Check motion preference in React
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

## Common Patterns

### Accessible Modal

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Modal description</p>
  <button aria-label="Close modal">×</button>
</div>
```

### Accessible Form

```tsx
<form>
  <div>
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      aria-required="true"
      aria-invalid={errors.email}
      aria-describedby={errors.email ? 'email-error' : undefined}
    />
    {errors.email && (
      <span id="email-error" role="alert">
        {errors.email}
      </span>
    )}
  </div>
</form>
```

### Accessible Data Table

```tsx
<table>
  <caption>User Statistics</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">John Doe</th>
      <td>Admin</td>
      <td>Active</td>
    </tr>
  </tbody>
</table>
```

## Testing Checklist

Before submitting a component:

- [ ] Passes jest-axe tests
- [ ] Zero violations in Storybook a11y panel
- [ ] Keyboard navigable
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] Contrast ratios meet WCAG AA
- [ ] Works with high contrast mode
- [ ] Respects reduced motion preference
- [ ] ARIA attributes properly used
- [ ] Semantic HTML used

## Tools and Resources

### Development Tools

- **Storybook A11y Addon**: Real-time accessibility feedback
- **jest-axe**: Automated testing in unit tests
- **Pa11y CI**: Page-level accessibility testing
- **axe DevTools**: Browser extension for manual testing

### Browser Extensions

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Screen Readers

- **macOS**: VoiceOver (Cmd + F5)
- **Windows**: NVDA (free) or JAWS
- **Linux**: Orca

### Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Getting Help

If you're unsure about accessibility requirements:

1. Check this guide first
2. Test with Storybook a11y addon
3. Run `pnpm test:a11y:dev` for page-level testing
4. Ask in team discussions
5. Consult WCAG documentation

Remember: **Accessibility is not optional**. Every user deserves equal access to our application.
