/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CalendarEmbed from './CalendarEmbed';

// Mock the consent context
const mockUpdateConsent = vi.fn();
const mockConsent = { functional: true };

vi.mock('@/contexts/ConsentContext', () => ({
  useConsent: () => ({
    consent: mockConsent,
    updateConsent: mockUpdateConsent,
  }),
}));

// Mock the providers
vi.mock('../../calendar/providers/CalendlyProvider', () => ({
  CalendlyProvider: ({ mode, url }: { mode: string; url: string }) => (
    <div data-testid="calendly-provider">
      Calendly Provider - Mode: {mode} - URL: {url}
    </div>
  ),
}));

vi.mock('../../calendar/providers/CalComProvider', () => ({
  CalComProvider: ({ mode, calLink }: { mode: string; calLink: string }) => (
    <div data-testid="calcom-provider">
      Cal.com Provider - Mode: {mode} - URL: {calLink}
    </div>
  ),
}));

// Mock calendar consent component
vi.mock('../../calendar/CalendarConsent', () => ({
  default: ({
    provider,
    onAccept,
  }: {
    provider: string;
    onAccept: () => void;
  }) => (
    <div data-testid="calendar-consent">
      <p>Consent required for {provider}</p>
      <button onClick={onAccept}>Accept</button>
    </div>
  ),
}));

// Mock config
vi.mock('@/config/calendar.config', () => ({
  calendarConfig: {
    provider: 'calendly',
    url: 'https://calendly.com/default',
    utm: { source: 'test' },
    styles: { height: '700px' },
  },
}));

describe('CalendarEmbed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockConsent.functional = true;
  });

  it('renders Calendly provider when functional consent is granted', () => {
    render(
      <CalendarEmbed provider="calendly" url="https://calendly.com/test" />
    );
    expect(screen.getByTestId('calendly-provider')).toBeInTheDocument();
    expect(
      screen.getByText(/URL: https:\/\/calendly.com\/test/)
    ).toBeInTheDocument();
  });

  it('renders Cal.com provider when specified', () => {
    render(<CalendarEmbed provider="calcom" url="test/meeting" />);
    expect(screen.getByTestId('calcom-provider')).toBeInTheDocument();
    expect(screen.getByText(/URL: test\/meeting/)).toBeInTheDocument();
  });

  it('shows consent component when functional consent is not granted', () => {
    mockConsent.functional = false;
    render(<CalendarEmbed />);
    expect(screen.getByTestId('calendar-consent')).toBeInTheDocument();
    expect(screen.getByText(/Consent required/)).toBeInTheDocument();
  });

  it('shows warning when no URL is configured', () => {
    render(<CalendarEmbed url="" />);
    expect(screen.getByText(/Calendar URL not configured/)).toBeInTheDocument();
  });

  it('uses default config when props are not provided', () => {
    render(<CalendarEmbed />);
    expect(screen.getByTestId('calendly-provider')).toBeInTheDocument();
    expect(
      screen.getByText(/URL: https:\/\/calendly.com\/default/)
    ).toBeInTheDocument();
  });

  it('accepts inline mode', () => {
    render(<CalendarEmbed mode="inline" url="test" />);
    expect(screen.getByText(/Mode: inline/)).toBeInTheDocument();
  });

  it('accepts popup mode', () => {
    render(<CalendarEmbed mode="popup" url="test" />);
    expect(screen.getByText(/Mode: popup/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CalendarEmbed className="custom-class" url="test" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('custom-class');
  });

  it('applies inline mode styles', () => {
    const { container } = render(<CalendarEmbed mode="inline" url="test" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('w-full');
    expect(wrapper.className).toContain('rounded-lg');
    expect(wrapper.className).toContain('shadow-xl');
  });

  it('does not apply inline styles for popup mode', () => {
    const { container } = render(<CalendarEmbed mode="popup" url="test" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('w-full');
    expect(wrapper.className).not.toContain('rounded-lg');
  });
});
