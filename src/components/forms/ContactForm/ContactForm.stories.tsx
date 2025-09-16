import type { Meta, StoryObj } from '@storybook/nextjs';
import { ContactForm } from './ContactForm';
import { useWeb3Forms } from '@/hooks/useWeb3Forms';

// Mock the useWeb3Forms hook
jest.mock('@/hooks/useWeb3Forms');

const meta = {
  title: 'Forms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-base-100 min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state
export const Default: Story = {
  args: {},
  beforeEach: () => {
    (useWeb3Forms as jest.Mock).mockReturnValue({
      submitForm: jest.fn(),
      validateBeforeSubmit: jest.fn(),
      reset: jest.fn(),
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      error: null,
      successMessage: null,
    });
  },
};

// Loading state
export const Submitting: Story = {
  args: {},
  beforeEach: () => {
    (useWeb3Forms as jest.Mock).mockReturnValue({
      submitForm: jest.fn(),
      validateBeforeSubmit: jest.fn(),
      reset: jest.fn(),
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      error: null,
      successMessage: null,
    });
  },
};

// Success state
export const Success: Story = {
  args: {},
  beforeEach: () => {
    (useWeb3Forms as jest.Mock).mockReturnValue({
      submitForm: jest.fn(),
      validateBeforeSubmit: jest.fn(),
      reset: jest.fn(),
      isSubmitting: false,
      isSuccess: true,
      isError: false,
      error: null,
      successMessage:
        "Your message has been sent successfully! We'll get back to you soon.",
    });
  },
};

// Error state
export const Error: Story = {
  args: {},
  beforeEach: () => {
    (useWeb3Forms as jest.Mock).mockReturnValue({
      submitForm: jest.fn(),
      validateBeforeSubmit: jest.fn(),
      reset: jest.fn(),
      isSubmitting: false,
      isSuccess: false,
      isError: true,
      error: 'Network error. Please check your connection and try again.',
      successMessage: null,
    });
  },
};

// With custom callbacks
export const WithCallbacks: Story = {
  args: {
    onSuccess: (response) => {
      console.log('Form submitted successfully:', response);
      alert('Success callback triggered!');
    },
    onError: (error) => {
      console.error('Form submission error:', error);
      alert('Error callback triggered!');
    },
  },
  beforeEach: () => {
    (useWeb3Forms as jest.Mock).mockReturnValue({
      submitForm: jest.fn(),
      validateBeforeSubmit: jest.fn(),
      reset: jest.fn(),
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      error: null,
      successMessage: null,
    });
  },
};

// Dark theme
export const DarkTheme: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="bg-base-100 min-h-screen p-8" data-theme="dark">
        <Story />
      </div>
    ),
  ],
  beforeEach: () => {
    (useWeb3Forms as jest.Mock).mockReturnValue({
      submitForm: jest.fn(),
      validateBeforeSubmit: jest.fn(),
      reset: jest.fn(),
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      error: null,
      successMessage: null,
    });
  },
};

// Mobile view
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  beforeEach: () => {
    (useWeb3Forms as jest.Mock).mockReturnValue({
      submitForm: jest.fn(),
      validateBeforeSubmit: jest.fn(),
      reset: jest.fn(),
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      error: null,
      successMessage: null,
    });
  },
};

// Tablet view
export const Tablet: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  beforeEach: () => {
    (useWeb3Forms as jest.Mock).mockReturnValue({
      submitForm: jest.fn(),
      validateBeforeSubmit: jest.fn(),
      reset: jest.fn(),
      isSubmitting: false,
      isSuccess: false,
      isError: false,
      error: null,
      successMessage: null,
    });
  },
};
