import type { Meta, StoryObj } from '@storybook/nextjs';
import { Link } from './Link';

const meta = {
  title: 'Subatomic/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'accent', 'ghost', 'underline', 'hover-underline', 'nav'],
    },
    external: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/themes',
    children: 'Default Link',
  },
};

export const Primary: Story = {
  args: {
    href: '/themes',
    children: 'Primary Link',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    href: '/components',
    children: 'Secondary Link',
    variant: 'secondary',
  },
};

export const Accent: Story = {
  args: {
    href: '/accessibility',
    children: 'Accent Link',
    variant: 'accent',
  },
};

export const Ghost: Story = {
  args: {
    href: '/themes',
    children: 'Ghost Link',
    variant: 'ghost',
  },
};

export const Underline: Story = {
  args: {
    href: '/themes',
    children: 'Underlined Link',
    variant: 'underline',
  },
};

export const HoverUnderline: Story = {
  args: {
    href: '/themes',
    children: 'Hover to Underline',
    variant: 'hover-underline',
  },
};

export const Navigation: Story = {
  args: {
    href: '/themes',
    children: 'Navigation Link',
    variant: 'nav',
  },
};

export const External: Story = {
  args: {
    href: 'https://github.com',
    children: 'External Link to GitHub',
    external: true,
  },
};

export const AllVariants = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold mb-2">Internal Links</h3>
        <div className="space-y-2">
          <div><Link href="/themes">Default Link</Link></div>
          <div><Link href="/themes" variant="primary">Primary Link</Link></div>
          <div><Link href="/components" variant="secondary">Secondary Link</Link></div>
          <div><Link href="/accessibility" variant="accent">Accent Link</Link></div>
          <div><Link href="/themes" variant="ghost">Ghost Link</Link></div>
          <div><Link href="/themes" variant="underline">Underlined Link</Link></div>
          <div><Link href="/themes" variant="hover-underline">Hover Underline Link</Link></div>
          <div><Link href="/themes" variant="nav">Navigation Link</Link></div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-2">External Links</h3>
        <div className="space-y-2">
          <div><Link href="https://github.com" external>GitHub (External)</Link></div>
          <div><Link href="https://nextjs.org" external variant="primary">Next.js Docs (External)</Link></div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">Anchor Links</h3>
        <div className="space-y-2">
          <div><Link href="#top">Back to Top</Link></div>
          <div><Link href="#section" variant="accent">Jump to Section</Link></div>
        </div>
      </div>
    </div>
  ),
};