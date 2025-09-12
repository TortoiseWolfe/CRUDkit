# Component Development Template

This document provides a standardized template for creating new components in the CRUDkit project. Follow this pattern to ensure consistency across all components.

## Component Structure

### 1. Directory Structure

```
src/components/atomic/ComponentName/
├── ComponentName.tsx          # Main component file
├── ComponentName.test.tsx     # Test file
├── ComponentName.stories.tsx  # Storybook stories
└── index.ts                  # Export file (optional)
```

### 2. Component File Template

```tsx
// ComponentName.tsx
'use client';

import { useState, useEffect } from 'react';

interface ComponentNameProps {
  // Required props first
  id?: string;

  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;

  // Event handlers
  onChange?: (value: any) => void;
  onError?: (error: Error) => void;
}

export default function ComponentName({
  id,
  variant = 'primary',
  size = 'md',
  className = '',
  onChange,
  onError,
}: ComponentNameProps) {
  // State management
  const [state, setState] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Effects
  useEffect(
    () => {
      // Component logic
    },
    [
      /* dependencies */
    ]
  );

  // Event handlers
  const handleAction = () => {
    // Handler logic
  };

  // Render
  return (
    <div
      className={`component-base ${className}`}
      aria-label="Component description"
    >
      {/* Component content */}
    </div>
  );
}
```

### 3. Test File Template

```tsx
// ComponentName.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName />);
    expect(screen.getByLabelText('Component description')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const handleChange = vi.fn();
    render(<ComponentName onChange={handleChange} />);

    // Test interaction
    fireEvent.click(screen.getByRole('button'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(<ComponentName className="custom-class" />);
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  // Add more tests for:
  // - Different prop combinations
  // - Error states
  // - Loading states
  // - Accessibility
});
```

### 4. Storybook File Template

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs';
import ComponentName from './ComponentName';

const meta = {
  title: 'Atomic/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Visual variant of the component',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
```

## Development Checklist

When creating a new component, ensure you complete these steps:

### Setup

- [ ] Create component directory structure
- [ ] Create TypeScript interfaces for props
- [ ] Set up initial component file

### Implementation

- [ ] Implement core functionality
- [ ] Add proper TypeScript types
- [ ] Include error handling
- [ ] Add loading states where applicable

### Styling

- [ ] Use DaisyUI classes for theming
- [ ] Support all 32 themes
- [ ] Add responsive design
- [ ] Include hover/focus states

### Accessibility

- [ ] Add ARIA labels and roles
- [ ] Ensure keyboard navigation
- [ ] Test with screen readers
- [ ] Include focus indicators
- [ ] Add live regions for dynamic content

### Testing

- [ ] Write unit tests with Vitest
- [ ] Test all prop variations
- [ ] Test error scenarios
- [ ] Test accessibility
- [ ] Achieve >80% coverage

### Documentation

- [ ] Add JSDoc comments
- [ ] Create Storybook stories
- [ ] Write component documentation in `/docs/components/`
- [ ] Update README if significant

### Quality

- [ ] Run ESLint and fix issues
- [ ] Run Prettier formatting
- [ ] Run TypeScript check
- [ ] Test in development
- [ ] Test build process

## Best Practices

### State Management

- Use React hooks appropriately
- Keep state as local as possible
- Lift state only when necessary
- Use useCallback for expensive operations

### Performance

- Memoize expensive calculations
- Use React.memo for pure components
- Lazy load when appropriate
- Optimize re-renders

### Error Handling

```tsx
try {
  // Risky operation
} catch (error) {
  console.error('Component error:', error);
  onError?.(error as Error);
  // Graceful fallback
}
```

### TypeScript

- Use strict types
- Avoid `any` type
- Define interfaces for all props
- Export types when reusable

### Testing Strategy

1. **Unit Tests**: Test component in isolation
2. **Integration Tests**: Test with other components
3. **Accessibility Tests**: Ensure WCAG compliance
4. **Visual Tests**: Storybook for visual regression

## Example Components

Study these existing components for reference:

- `Dice`: Simple interactive component
- `DraggableDice`: Component with drag-and-drop
- `DiceTray`: Container managing multiple components
- `CaptainShipCrewWithNPC`: Complex game component

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [DaisyUI Components](https://daisyui.com/components/)
- [Vitest Documentation](https://vitest.dev)
- [Storybook Documentation](https://storybook.js.org/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

_This template is a living document. Update it as patterns evolve and best practices change._
