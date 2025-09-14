import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Text } from './Text';

describe('Text Accessibility', () => {
  it('should have no accessibility violations with default props', async () => {
    const { container } = render(<Text>Default text content</Text>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations with all text variants', async () => {
    const variants = [
      'body',
      'heading',
      'subheading',
      'caption',
      'label',
    ] as const;

    for (const variant of variants) {
      const { container } = render(<Text variant={variant}>Text content</Text>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have no violations with all sizes', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

    for (const size of sizes) {
      const { container } = render(<Text size={size}>Sized text</Text>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have no violations with all weights', async () => {
    const weights = ['light', 'normal', 'medium', 'bold'] as const;

    for (const weight of weights) {
      const { container } = render(<Text weight={weight}>Weighted text</Text>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should maintain proper heading hierarchy', async () => {
    const { container } = render(
      <div>
        <Text variant="heading" as="h1">
          Main Heading
        </Text>
        <Text variant="subheading" as="h2">
          Subheading
        </Text>
        <Text variant="body">Body text</Text>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have sufficient color contrast', async () => {
    const { container } = render(
      <div style={{ backgroundColor: 'white' }}>
        <Text color="primary">Primary color text</Text>
        <Text color="secondary">Secondary color text</Text>
        <Text color="accent">Accent color text</Text>
      </div>
    );

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true },
      },
    });

    expect(results).toHaveNoViolations();
  });

  it('should handle text alignment accessibly', async () => {
    const alignments = ['left', 'center', 'right', 'justify'] as const;

    for (const align of alignments) {
      const { container } = render(<Text align={align}>Aligned text</Text>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should handle truncation accessibly', async () => {
    const { container } = render(
      <Text truncate>
        This is a very long text that should be truncated when it exceeds the
        available width of its container
      </Text>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should use semantic HTML elements', () => {
    const { container: h1Container } = render(<Text as="h1">Heading 1</Text>);
    expect(h1Container.querySelector('h1')).toBeTruthy();

    const { container: pContainer } = render(<Text as="p">Paragraph</Text>);
    expect(pContainer.querySelector('p')).toBeTruthy();

    const { container: spanContainer } = render(
      <Text as="span">Span text</Text>
    );
    expect(spanContainer.querySelector('span')).toBeTruthy();
  });

  it('should handle emphasized text accessibly', async () => {
    const { container } = render(
      <div>
        <Text as="strong">Strong text</Text>
        <Text as="em">Emphasized text</Text>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should maintain readability with different styles', async () => {
    const { container } = render(
      <div>
        <Text italic>Italic text</Text>
        <Text underline>Underlined text</Text>
        <Text className="line-through">Strike-through text</Text>
      </div>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle long text content appropriately', async () => {
    const { container } = render(
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
