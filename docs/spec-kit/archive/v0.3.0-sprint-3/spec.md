# CRUDkit Sprint 3 Specification: Complete the Constitutional Vision

## Executive Summary

Sprint 3 focuses on completing the remaining 30% of constitutional requirements, transforming CRUDkit from a solid foundation (70% complete) into a fully compliant PWA meta-template. Building on Sprint 2's testing infrastructure and quality gates, this 8-week sprint prioritizes the missing core features that were identified in the constitutional gap analysis.

## Sprint Overview

**Duration**: 8 weeks (4 phases × 2 weeks each)  
**Priority**: Complete constitutional compliance  
**Current State**: 70% compliance, solid testing foundation  
**Target State**: 100% compliance, production-ready meta-template  
**Test Coverage Goal**: 16% → 40%

## Constitutional Gaps Addressed

### Critical Missing Features (Never Implemented)

- **PRP Methodology**: Problem-Requirements-Plan workflow
- **PWA Background Sync**: Offline form submission capability
- **WCAG AA Compliance**: Automated accessibility testing in CI
- **Colorblind Mode**: Accessibility enhancement
- **Forms Integration**: Web3Forms + EmailJS providers
- **Privacy Controls**: GDPR compliance features
- **Visual Regression**: Chromatic/Percy testing
- **E2E Testing**: Playwright framework

## Phase Breakdown

### Phase 1: Missing Core Features (Weeks 1-2)

#### Objectives

- Implement PRP methodology workflow
- Add PWA background sync capabilities
- Automate WCAG AA compliance testing
- Add colorblind accessibility mode

#### Deliverables

**1. PRP Methodology Implementation**

```typescript
// src/lib/prp/types.ts
export interface Problem {
  id: string;
  title: string;
  description: string;
  stakeholders: string[];
  constraints: string[];
  createdAt: Date;
}

export interface Requirements {
  problemId: string;
  functional: Requirement[];
  nonFunctional: Requirement[];
  acceptance: AcceptanceCriteria[];
}

export interface Plan {
  requirementsId: string;
  phases: Phase[];
  timeline: Timeline;
  resources: Resource[];
  risks: Risk[];
}
```

```typescript
// src/components/prp/ProblemDefiner.tsx
export const ProblemDefiner: React.FC = () => {
  const [problem, setProblem] = useState<Problem>();

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">Problem Statement</label>
        <textarea
          className="textarea textarea-bordered"
          placeholder="Describe the problem in detail..."
          required
        />
      </div>
      {/* Stakeholders, constraints, success criteria fields */}
    </form>
  );
};
```

**2. PWA Background Sync**

```typescript
// src/lib/background-sync.ts
export class BackgroundSync {
  private static readonly STORE_NAME = 'pendingActions';

  static async queueAction(action: SyncAction): Promise<void> {
    const db = await this.openDB();
    await db.add(this.STORE_NAME, {
      ...action,
      timestamp: Date.now(),
      retries: 0,
    });

    // Register background sync if supported
    if (
      'serviceWorker' in navigator &&
      'sync' in window.ServiceWorkerRegistration.prototype
    ) {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('background-sync');
    }
  }

  static async processQueue(): Promise<void> {
    const db = await this.openDB();
    const actions = await db.getAll(this.STORE_NAME);

    for (const action of actions) {
      try {
        await this.executeAction(action);
        await db.delete(this.STORE_NAME, action.id);
      } catch (error) {
        action.retries++;
        if (action.retries < 3) {
          await db.put(this.STORE_NAME, action);
        } else {
          await db.delete(this.STORE_NAME, action.id);
        }
      }
    }
  }
}
```

```javascript
// public/sw.js - Enhanced Service Worker
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Import BackgroundSync and process queue
      importScripts('/js/background-sync.js').then(() =>
        BackgroundSync.processQueue()
      )
    );
  }
});
```

**3. WCAG AA Compliance Automation**

```yaml
# .github/workflows/accessibility.yml
name: Accessibility Testing
on: [push, pull_request]

jobs:
  a11y-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build application
        run: pnpm run build

      - name: Start application
        run: pnpm run start &

      - name: Wait for app
        run: npx wait-on http://localhost:3000

      - name: Run Pa11y tests
        run: pnpm run test:a11y

      - name: Run axe-core tests
        run: pnpm run test:axe
```

```json
// .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 30000,
    "wait": 1000,
    "chromeLaunchConfig": {
      "args": ["--no-sandbox", "--disable-setuid-sandbox"]
    }
  },
  "urls": [
    "http://localhost:3000",
    "http://localhost:3000/themes",
    "http://localhost:3000/components",
    "http://localhost:3000/accessibility",
    "http://localhost:3000/status"
  ],
  "threshold": 0
}
```

**4. Colorblind Mode Implementation**

```typescript
// src/contexts/AccessibilityContext.tsx - Enhanced
export const AccessibilityContext = createContext<AccessibilityContextType>({
  fontSize: 'normal',
  spacing: 'normal',
  colorblindMode: 'none',
  highContrast: false,
  // ... existing context
});

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [colorblindMode, setColorblindMode] = useState<ColorblindMode>('none');

  useEffect(() => {
    document.documentElement.setAttribute('data-colorblind', colorblindMode);
  }, [colorblindMode]);

  // ... rest of provider
};
```

```css
/* src/styles/colorblind.css */
[data-colorblind='protanopia'] {
  filter: url(#protanopia-filter);
}

[data-colorblind='deuteranopia'] {
  filter: url(#deuteranopia-filter);
}

[data-colorblind='tritanopia'] {
  filter: url(#tritanopia-filter);
}

/* SVG filters for colorblind simulation */
```

### Phase 2: Forms & Integrations (Weeks 3-4)

#### Objectives

- Integrate Web3Forms as primary email provider
- Add EmailJS as backup email provider
- Implement calendar integration (Calendly/Cal.com)
- Create comprehensive contact form with validation

#### Deliverables

**1. Web3Forms Integration (Primary Provider)**

```typescript
// src/lib/email/web3forms.ts
export class Web3FormsProvider implements EmailProvider {
  private accessKey: string;

  constructor(accessKey: string) {
    this.accessKey = accessKey;
  }

  async sendEmail(data: ContactFormData): Promise<EmailResponse> {
    const formData = new FormData();
    formData.append('access_key', this.accessKey);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formData.append('subject', data.subject || 'New Contact Form Submission');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      return {
        success: result.success,
        message: result.message,
        provider: 'web3forms',
      };
    } catch (error) {
      throw new EmailError('Web3Forms submission failed', error);
    }
  }
}
```

**2. EmailJS Integration (Backup Provider)**

```typescript
// src/lib/email/emailjs.ts
import emailjs from '@emailjs/browser';

export class EmailJSProvider implements EmailProvider {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor(serviceId: string, templateId: string, publicKey: string) {
    this.serviceId = serviceId;
    this.templateId = templateId;
    this.publicKey = publicKey;
  }

  async sendEmail(data: ContactFormData): Promise<EmailResponse> {
    try {
      const result = await emailjs.send(
        this.serviceId,
        this.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          subject: data.subject,
        },
        this.publicKey
      );

      return {
        success: result.status === 200,
        message: 'Email sent successfully via EmailJS',
        provider: 'emailjs',
      };
    } catch (error) {
      throw new EmailError('EmailJS submission failed', error);
    }
  }
}
```

**3. Email Provider Manager with Fallback**

```typescript
// src/lib/email/manager.ts
export class EmailManager {
  private providers: EmailProvider[];

  constructor(providers: EmailProvider[]) {
    this.providers = providers;
  }

  async sendEmail(data: ContactFormData): Promise<EmailResponse> {
    let lastError: Error | null = null;

    for (const provider of this.providers) {
      try {
        const result = await provider.sendEmail(data);
        if (result.success) {
          return result;
        }
      } catch (error) {
        lastError = error as Error;
        console.warn(`Provider ${provider.constructor.name} failed:`, error);
      }
    }

    throw new EmailError('All email providers failed', lastError);
  }
}
```

**4. Calendar Integration**

```typescript
// src/components/atomic/CalendarBooking/CalendarBooking.tsx
interface CalendarBookingProps {
  provider: 'calendly' | 'cal';
  url: string;
  prefill?: {
    name?: string;
    email?: string;
  };
}

export const CalendarBooking: React.FC<CalendarBookingProps> = ({
  provider,
  url,
  prefill
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const embedUrl = useMemo(() => {
    const baseUrl = provider === 'calendly'
      ? `https://calendly.com/embed/${url}`
      : `https://cal.com/${url}`;

    if (prefill) {
      const params = new URLSearchParams();
      if (prefill.name) params.set('name', prefill.name);
      if (prefill.email) params.set('email', prefill.email);
      return `${baseUrl}?${params.toString()}`;
    }

    return baseUrl;
  }, [provider, url, prefill]);

  return (
    <div className="calendar-booking">
      {isLoading && (
        <div className="loading loading-spinner loading-lg mx-auto"></div>
      )}
      <iframe
        src={embedUrl}
        width="100%"
        height="630"
        frameBorder="0"
        onLoad={() => setIsLoading(false)}
        className={isLoading ? 'hidden' : 'block'}
      />
    </div>
  );
};
```

**5. Comprehensive Contact Form**

```typescript
// src/components/forms/ContactForm/ContactForm.tsx
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine(val => val === true, 'You must accept the privacy policy')
});

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const emailManager = useMemo(() => {
    const providers = [
      new Web3FormsProvider(process.env.NEXT_PUBLIC_WEB3FORMS_KEY!),
      new EmailJSProvider(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
    ];
    return new EmailManager(providers);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Try online submission first
      if (navigator.onLine) {
        await emailManager.sendEmail(data);
        setSubmitStatus('success');
        reset();
      } else {
        // Queue for background sync
        await BackgroundSync.queueAction({
          type: 'SEND_EMAIL',
          data,
          id: crypto.randomUUID()
        });
        setSubmitStatus('success');
        reset();
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Form fields with validation */}
    </form>
  );
};
```

### Phase 3: Privacy & Testing (Weeks 5-6)

#### Objectives

- Implement GDPR-compliant cookie consent
- Add privacy controls (data export/deletion)
- Set up visual regression testing
- Implement E2E testing with Playwright
- Increase test coverage to 40%

#### Deliverables

**1. GDPR Cookie Consent**

```typescript
// src/components/privacy/CookieConsent/CookieConsent.tsx
interface CookieConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [consent, setConsent] = useState<CookieConsentState>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (!savedConsent) {
      setIsOpen(true);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setConsent(allConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(allConsent));
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setConsent(minimalConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(minimalConsent));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-base-100 shadow-lg z-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Cookie Preferences</h3>
        <p className="text-sm mb-4">
          We use cookies to enhance your experience. You can customize your preferences below.
        </p>

        <div className="flex gap-2 mb-4">
          <button onClick={handleAcceptAll} className="btn btn-primary">
            Accept All
          </button>
          <button onClick={handleRejectAll} className="btn btn-outline">
            Reject All
          </button>
          <button onClick={() => setIsOpen(false)} className="btn btn-ghost">
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};
```

**2. Privacy Controls (GDPR Rights)**

```typescript
// src/components/privacy/PrivacyControls/PrivacyControls.tsx
export const PrivacyControls: React.FC = () => {
  const exportData = async () => {
    const userData = {
      preferences: localStorage.getItem('theme-preference'),
      accessibility: localStorage.getItem('accessibility-settings'),
      consent: localStorage.getItem('cookie-consent'),
      formSubmissions: localStorage.getItem('form-history') || '[]',
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(userData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `crudkit-data-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteData = async () => {
    if (confirm('Are you sure you want to delete all your data? This cannot be undone.')) {
      // Clear all localStorage
      const keysToKeep = ['theme']; // Keep essential functionality
      const allKeys = Object.keys(localStorage);

      allKeys.forEach(key => {
        if (!keysToKeep.includes(key)) {
          localStorage.removeItem(key);
        }
      });

      // Clear any IndexedDB data
      if ('indexedDB' in window) {
        // Clear background sync queue
        await BackgroundSync.clearQueue();
      }

      alert('Your data has been deleted successfully.');
    }
  };

  return (
    <div className="privacy-controls space-y-4">
      <h2 className="text-2xl font-bold">Your Data Rights</h2>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Data Export</h3>
          <p>Download all your data stored in this application.</p>
          <div className="card-actions">
            <button onClick={exportData} className="btn btn-primary">
              Export My Data
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Data Deletion</h3>
          <p>Permanently delete all your data from this application.</p>
          <div className="card-actions">
            <button onClick={deleteData} className="btn btn-error">
              Delete My Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

**3. Visual Regression Testing (Chromatic)**

```yaml
# .github/workflows/chromatic.yml
name: Chromatic Deployment
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build Storybook
        run: pnpm run build-storybook

      - name: Publish to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
          exitZeroOnChanges: true
          autoAcceptChanges: main
```

**4. E2E Testing with Playwright**

```typescript
// tests/e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit form successfully', async ({ page }) => {
    await page.goto('/contact');

    // Fill out form
    await page.fill('[data-testid="name-input"]', 'John Doe');
    await page.fill('[data-testid="email-input"]', 'john@example.com');
    await page.fill('[data-testid="subject-input"]', 'Test Subject');
    await page.fill('[data-testid="message-input"]', 'This is a test message');
    await page.check('[data-testid="consent-checkbox"]');

    // Submit form
    await page.click('[data-testid="submit-button"]');

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });

  test('should work offline with background sync', async ({
    page,
    context,
  }) => {
    // Go offline
    await context.setOffline(true);

    await page.goto('/contact');

    // Fill and submit form while offline
    await page.fill('[data-testid="name-input"]', 'Jane Doe');
    await page.fill('[data-testid="email-input"]', 'jane@example.com');
    await page.fill('[data-testid="subject-input"]', 'Offline Test');
    await page.fill(
      '[data-testid="message-input"]',
      'Testing offline submission'
    );
    await page.check('[data-testid="consent-checkbox"]');

    await page.click('[data-testid="submit-button"]');

    // Should show queued message
    await expect(page.locator('[data-testid="queued-message"]')).toBeVisible();

    // Go back online
    await context.setOffline(false);

    // Trigger service worker sync (simplified)
    await page.reload();

    // Verify sync occurred (would need backend verification in real test)
  });
});
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'pnpm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### Phase 4: Enhanced Features (Weeks 7-8)

#### Objectives

- Integrate Google Analytics with consent management
- Implement font switcher mirroring ThemeSwitcher
- Add geolocation map with permission handling
- Standardize 4-file component structure

#### Deliverables

**1. Google Analytics with Consent Management**

```typescript
// src/lib/analytics/google-analytics.ts
export class GoogleAnalytics {
  private measurementId: string;
  private hasConsent: boolean = false;

  constructor(measurementId: string) {
    this.measurementId = measurementId;
  }

  initialize(hasConsent: boolean = false): void {
    this.hasConsent = hasConsent;

    if (typeof window === 'undefined') return;

    // Load gtag script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag =
      window.gtag ||
      function (...args) {
        (window.gtag.q = window.gtag.q || []).push(args);
      };

    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      send_page_view: hasConsent,
      anonymize_ip: true,
      allow_google_signals: hasConsent,
      allow_ad_personalization_signals: hasConsent,
    });
  }

  updateConsent(hasConsent: boolean): void {
    this.hasConsent = hasConsent;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: hasConsent ? 'granted' : 'denied',
        ad_storage: hasConsent ? 'granted' : 'denied',
      });
    }
  }

  trackEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.hasConsent || typeof window === 'undefined' || !window.gtag) {
      return;
    }

    window.gtag('event', eventName, parameters);
  }
}
```

**2. Font Switcher Component**

```typescript
// src/components/atomic/FontSwitcher/FontSwitcher.tsx
const FONT_OPTIONS = [
  { id: 'inter', name: 'Inter', class: 'font-inter' },
  { id: 'roboto', name: 'Roboto', class: 'font-roboto' },
  { id: 'opensans', name: 'Open Sans', class: 'font-opensans' },
  { id: 'poppins', name: 'Poppins', class: 'font-poppins' },
  { id: 'sourcesans', name: 'Source Sans Pro', class: 'font-sourcesans' },
  { id: 'lato', name: 'Lato', class: 'font-lato' },
] as const;

export const FontSwitcher: React.FC = () => {
  const [currentFont, setCurrentFont] = useState('inter');

  useEffect(() => {
    const savedFont = localStorage.getItem('font-preference') || 'inter';
    setCurrentFont(savedFont);
    document.documentElement.className = document.documentElement.className
      .replace(/font-\w+/g, '')
      .trim() + ` ${FONT_OPTIONS.find(f => f.id === savedFont)?.class || 'font-inter'}`;
  }, []);

  const handleFontChange = (fontId: string) => {
    setCurrentFont(fontId);
    localStorage.setItem('font-preference', fontId);

    const fontClass = FONT_OPTIONS.find(f => f.id === fontId)?.class || 'font-inter';
    document.documentElement.className = document.documentElement.className
      .replace(/font-\w+/g, '')
      .trim() + ` ${fontClass}`;
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <span className="sr-only">Change font</span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.5 5.999l-.707.707 L16.086 6H17.5V5.999zM11 13V16H7V13H11zM12 12H6V17H12V12z" />
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {FONT_OPTIONS.map((font) => (
          <li key={font.id}>
            <button
              onClick={() => handleFontChange(font.id)}
              className={`${font.class} ${currentFont === font.id ? 'active' : ''}`}
            >
              {font.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

**3. Geolocation Map Component**

```typescript
// src/components/atomic/LocationMap/LocationMap.tsx
interface LocationMapProps {
  defaultCenter?: [number, number];
  zoom?: number;
  showUserLocation?: boolean;
  onLocationChange?: (location: { lat: number; lng: number }) => void;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  defaultCenter = [40.7128, -74.0060], // NYC
  zoom = 10,
  showUserLocation = true,
  onLocationChange
}) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [isLoading, setIsLoading] = useState(false);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoading(true);

    try {
      // Check permission first
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionStatus(permission.state);

      if (permission.state === 'denied') {
        alert('Location permission is denied. Please enable it in your browser settings.');
        return;
      }

      // Get current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: [number, number] = [
            position.coords.latitude,
            position.coords.longitude
          ];
          setUserLocation(location);
          onLocationChange?.({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setPermissionStatus('granted');
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please try again.');
          setPermissionStatus('denied');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } catch (error) {
      console.error('Permission query failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="location-map">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Location</h3>
        {showUserLocation && (
          <button
            onClick={requestLocation}
            disabled={isLoading || permissionStatus === 'denied'}
            className="btn btn-primary btn-sm"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              'Use My Location'
            )}
          </button>
        )}
      </div>

      {permissionStatus === 'denied' && (
        <div className="alert alert-warning mb-4">
          <span>Location access is disabled. Enable it in your browser settings to use this feature.</span>
        </div>
      )}

      {/* Map implementation would go here - using React Leaflet or similar */}
      <div className="bg-base-200 h-64 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">🗺️</div>
          <p className="text-sm">Interactive map component</p>
          {userLocation && (
            <p className="text-xs mt-2">
              Location: {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
```

**4. Standardized 4-File Component Structure**

```typescript
// Component Generator Script
// scripts/generate-component.js
const fs = require('fs');
const path = require('path');

const generateComponent = (name, type = 'atomic') => {
  const componentDir = path.join('src', 'components', type, name);

  // Create directory
  fs.mkdirSync(componentDir, { recursive: true });

  // 1. Main component file
  const componentContent = `import React from 'react';
import { ${name}Props } from './${name}.types';
import './${name}.styles.css';

export const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div className="${name.toLowerCase()}">
      {/* Component implementation */}
    </div>
  );
};

export default ${name};
`;

  // 2. Types file
  const typesContent = `export interface ${name}Props {
  // Define component props here
  className?: string;
  children?: React.ReactNode;
}

export interface ${name}State {
  // Define component state if needed
}
`;

  // 3. Styles file
  const stylesContent = `.${name.toLowerCase()} {
  /* Component-specific styles */
}
`;

  // 4. Stories file
  const storiesContent = `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: '${type}/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Playground: Story = {
  args: {},
};
`;

  // Write files
  fs.writeFileSync(path.join(componentDir, `${name}.tsx`), componentContent);
  fs.writeFileSync(path.join(componentDir, `${name}.types.ts`), typesContent);
  fs.writeFileSync(
    path.join(componentDir, `${name}.styles.css`),
    stylesContent
  );
  fs.writeFileSync(
    path.join(componentDir, `${name}.stories.tsx`),
    storiesContent
  );

  console.log(`Generated ${name} component in ${componentDir}`);
};

// Usage: node scripts/generate-component.js ComponentName atomic
const [, , name, type] = process.argv;
if (name) {
  generateComponent(name, type || 'atomic');
} else {
  console.log(
    'Usage: node scripts/generate-component.js ComponentName [atomic|molecular|organisms]'
  );
}
```

## Testing Strategy

### Coverage Increase Plan (16% → 40%)

**Week 1-2**: Core features testing

- PRP methodology components
- Background sync utilities
- Accessibility enhancements

**Week 3-4**: Forms integration testing

- Email provider tests
- Form validation tests
- Calendar integration tests

**Week 5-6**: Privacy and E2E testing

- Cookie consent tests
- Privacy controls tests
- Critical user journeys E2E

**Week 7-8**: Enhanced features testing

- Analytics integration tests
- Font switcher tests
- Geolocation tests

## Success Criteria

### Must Have (Sprint 3 Complete)

- [ ] PRP methodology fully implemented and documented
- [ ] PWA background sync working for forms
- [ ] WCAG AA compliance automated in CI
- [ ] Colorblind mode functional
- [ ] Web3Forms + EmailJS integration working
- [ ] Calendar booking component implemented
- [ ] GDPR cookie consent modal
- [ ] Privacy controls (export/delete data)
- [ ] Visual regression testing with Chromatic
- [ ] E2E testing with Playwright
- [ ] 40% test coverage achieved
- [ ] Google Analytics with consent management
- [ ] Font switcher component
- [ ] Geolocation map component
- [ ] 4-file component structure standardized

### Should Have (If Time Permits)

- [ ] Advanced PRP workflow automation
- [ ] Additional email providers
- [ ] Enhanced calendar customization
- [ ] Advanced privacy dashboard
- [ ] Cross-browser E2E testing

### Could Have (Future Sprint)

- [ ] PRP project templates
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Real-time collaboration features

## Risk Mitigation

### Risk: Email Provider Rate Limits

**Mitigation**: Implement proper fallback chain, rate limiting, and queueing

### Risk: GDPR Compliance Complexity

**Mitigation**: Use established libraries, legal review checklist, documentation

### Risk: Performance Impact of New Features

**Mitigation**: Code splitting, lazy loading, performance budgets

### Risk: Testing Infrastructure Complexity

**Mitigation**: Incremental setup, thorough documentation, fallback plans

## Technical Constraints

### Package Manager

- Continue using pnpm exclusively
- Docker-first development maintained

### Performance Requirements

- Lighthouse scores must remain >90
- No regression in Web Vitals
- Bundle size increase <20%

### Accessibility Requirements

- WCAG AA compliance mandatory
- Keyboard navigation for all features
- Screen reader compatibility

### Privacy Requirements

- GDPR compliance for EU users
- No tracking without consent
- Data minimization principles

## Dependencies

### New Packages Required

```json
{
  "dependencies": {
    "@emailjs/browser": "^3.11.0",
    "react-hook-form": "^7.47.0",
    "@hookform/resolvers": "^3.3.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@axe-core/playwright": "^4.8.0",
    "chromatic": "^7.0.0",
    "@storybook/test-runner": "^0.15.0"
  }
}
```

## Timeline Summary

| Weeks | Phase                 | Key Deliverables                                               |
| ----- | --------------------- | -------------------------------------------------------------- |
| 1-2   | Missing Core Features | PRP methodology, PWA sync, WCAG automation, colorblind mode    |
| 3-4   | Forms & Integrations  | Web3Forms, EmailJS, calendar integration, contact form         |
| 5-6   | Privacy & Testing     | Cookie consent, privacy controls, visual regression, E2E tests |
| 7-8   | Enhanced Features     | Google Analytics, font switcher, geolocation, 4-file structure |

## Definition of Done

Sprint 3 is complete when:

1. All constitutional requirements are implemented (100% compliance)
2. Test coverage reaches 40% minimum
3. All new tests pass in CI/CD
4. WCAG AA compliance verified
5. Privacy features are GDPR compliant
6. Performance benchmarks maintained
7. All documentation updated
8. E2E tests cover critical user journeys
9. Visual regression testing operational
10. Production deployment successful

---

_This specification completes the CRUDkit constitutional vision, transforming it from a solid foundation into a production-ready PWA meta-template that serves as the gold standard for future projects._
