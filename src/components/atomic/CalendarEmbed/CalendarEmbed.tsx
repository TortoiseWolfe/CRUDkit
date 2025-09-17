'use client';

import { FC } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { CalendlyProvider } from '../../calendar/providers/CalendlyProvider';
import { CalComProvider } from '../../calendar/providers/CalComProvider';
import { calendarConfig } from '@/config/calendar.config';
import CalendarConsent from '../../calendar/CalendarConsent';

export interface CalendarEmbedProps {
  mode?: 'inline' | 'popup';
  url?: string;
  provider?: 'calendly' | 'calcom';
  prefill?: {
    name?: string;
    email?: string;
  };
  className?: string;
}

const CalendarEmbed: FC<CalendarEmbedProps> = ({
  mode = 'inline',
  url = calendarConfig.url,
  provider = calendarConfig.provider,
  prefill,
  className,
}) => {
  const { consent } = useConsent();

  // Require functional consent for calendar embedding
  if (!consent.functional) {
    return (
      <CalendarConsent
        provider={provider}
        onAccept={() => {
          // Update consent will trigger re-render
        }}
      />
    );
  }

  if (!url) {
    return (
      <div className="alert alert-warning">
        <span>
          Calendar URL not configured. Please add NEXT_PUBLIC_CALENDAR_URL to
          environment.
        </span>
      </div>
    );
  }

  const containerClasses = `
    ${mode === 'inline' ? 'w-full rounded-lg overflow-hidden shadow-xl' : ''}
    ${className || ''}
  `.trim();

  return (
    <div className={containerClasses}>
      {provider === 'calendly' ? (
        <CalendlyProvider
          url={url}
          mode={mode}
          utm={calendarConfig.utm}
          styles={calendarConfig.styles}
          prefill={prefill}
        />
      ) : (
        <CalComProvider
          calLink={url}
          mode={mode}
          config={prefill}
          styles={calendarConfig.styles}
        />
      )}
    </div>
  );
};

export default CalendarEmbed;
