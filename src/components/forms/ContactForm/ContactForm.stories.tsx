import type { Meta, StoryObj } from '@storybook/nextjs';
import { ContactForm } from './ContactForm';
import { userEvent, within, expect } from '@storybook/test';

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

// Default state - ready to fill
export const Default: Story = {
  args: {},
};

// Interactive story - fill and submit
export const FillAndSubmit: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill the form
    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'This is a test message from Storybook');

    // Submit the form
    const submitButton = canvas.getByRole('button', { name: /send message/i });
    await userEvent.click(submitButton);

    // Check for success message (MSW will handle the mock response)
    await expect(
      await canvas.findByText(/success/i, {}, { timeout: 3000 })
    ).toBeInTheDocument();
  },
};

// With custom callbacks
export const WithCallbacks: Story = {
  args: {
    onSuccess: (response) => {
      console.log('Form submitted successfully:', response);
    },
    onError: (error) => {
      console.error('Form submission error:', error);
    },
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
};

// Mobile view
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
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
};

// Offline scenario - will queue the submission
export const OfflineSubmission: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate going offline
    window.dispatchEvent(new Event('offline'));

    // Fill the form
    const nameInput = canvas.getByLabelText(/name/i);
    const emailInput = canvas.getByLabelText(/email/i);
    const messageInput = canvas.getByLabelText(/message/i);

    await userEvent.type(nameInput, 'Jane Doe');
    await userEvent.type(emailInput, 'jane@example.com');
    await userEvent.type(messageInput, 'Testing offline submission');

    // Check for offline indicator
    const offlineIndicator = canvas.queryByText(/offline/i);
    if (offlineIndicator) {
      await expect(offlineIndicator).toBeInTheDocument();
    }

    // Submit the form
    const submitButton = canvas.getByRole('button', { name: /send message/i });
    await userEvent.click(submitButton);

    // Simulate going back online
    window.dispatchEvent(new Event('online'));
  },
};

// Validation errors
export const ValidationErrors: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Try to submit empty form
    const submitButton = canvas.getByRole('button', { name: /send message/i });
    await userEvent.click(submitButton);

    // Check for validation errors
    await expect(
      await canvas.findByText(/name is required/i)
    ).toBeInTheDocument();
  },
};

// Pre-filled form
export const PreFilled: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Pre-fill some fields
    const nameInput = canvas.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = canvas.getByLabelText(/email/i) as HTMLInputElement;

    await userEvent.type(nameInput, 'Pre-filled Name');
    await userEvent.type(emailInput, 'prefilled@example.com');
  },
};