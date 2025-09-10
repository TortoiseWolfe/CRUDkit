# CRUDkit Specification Document

## 1. Executive Summary

CRUDkit is a Universal PWA Meta-Template that serves as an evolutionary foundation for building production-ready web applications. It combines lessons learned from four reference implementations (Punk_Stack, 001_template, 000_Template, Punk_Stack_archived) to create a superior meta-template with 12 themes, offline-first PWA capabilities, enterprise-grade testing, and AI-optimized development patterns.

### Core Philosophy
- **Reference, Learn, Improve** - Don't just copy, evolve beyond the references
- **PRP→Spec→Implementation** - Problem definition before solution
- **Test-First Development** - Validation before implementation
- **Docker-First Infrastructure** - Consistency across all environments
- **Accessibility-First Design** - WCAG AA compliance from the start

## 2. System Architecture

### 2.1 High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                         CRUDkit                              │
├─────────────────────────────────────────────────────────────┤
│                    Presentation Layer                        │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js   │  │   Tailwind   │  │  Storybook   │      │
│  │  App Router │  │   + OKLCH    │  │ Component Lib│      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │Theme System │  │ Form System  │  │     PWA      │      │
│  │ 12 Themes   │  │ Multi-Email  │  │Service Worker│      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│                      Data Layer                              │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Zustand   │  │     Zod      │  │  IndexedDB   │      │
│  │State Mgmt   │  │  Validation  │  │Offline Store │      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
├─────────────────────────────────────────────────────────────┤
│                   Infrastructure Layer                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Docker    │  │GitHub Actions│  │GitHub Pages  │      │
│  │Multi-Stage  │  │    CI/CD     │  │  Deployment  │      │
│  └─────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Component Architecture (Atomic Design)
```
src/
├── components/
│   ├── atoms/                 # Basic building blocks
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── Button.module.css
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Icon/
│   │   ├── Typography/
│   │   └── Link/
│   ├── molecules/             # Combinations of atoms
│   │   ├── FormField/
│   │   ├── Card/
│   │   ├── Alert/
│   │   ├── Toast/
│   │   ├── Modal/
│   │   └── Dropdown/
│   ├── organisms/             # Complex components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Navigation/
│   │   ├── ContactForm/
│   │   ├── ThemeSwitcher/
│   │   └── DataTable/
│   └── templates/            # Page layouts
│       ├── DefaultLayout/
│       ├── DashboardLayout/
│       ├── LandingLayout/
│       └── AuthLayout/
```

## 3. Detailed Requirements

### 3.1 Theme System Requirements

#### 3.1.1 OKLCH Color System
```typescript
interface OKLCHColor {
  l: number;  // Lightness: 0-100
  c: number;  // Chroma: 0-0.4
  h: number;  // Hue: 0-360
  a?: number; // Alpha: 0-1
}

interface ThemeColors {
  // Primary palette
  primary: {
    50: OKLCHColor;
    100: OKLCHColor;
    200: OKLCHColor;
    300: OKLCHColor;
    400: OKLCHColor;
    500: OKLCHColor;  // Main
    600: OKLCHColor;
    700: OKLCHColor;
    800: OKLCHColor;
    900: OKLCHColor;
    950: OKLCHColor;
  };
  
  // Secondary palette
  secondary: {
    50: OKLCHColor;
    // ... same scale
    950: OKLCHColor;
  };
  
  // Accent colors
  accent: {
    50: OKLCHColor;
    // ... same scale
    950: OKLCHColor;
  };
  
  // Semantic colors
  success: OKLCHColor;
  warning: OKLCHColor;
  error: OKLCHColor;
  info: OKLCHColor;
  
  // Surface colors
  background: {
    primary: OKLCHColor;
    secondary: OKLCHColor;
    tertiary: OKLCHColor;
  };
  
  // Text colors
  text: {
    primary: OKLCHColor;
    secondary: OKLCHColor;
    disabled: OKLCHColor;
    inverse: OKLCHColor;
  };
}
```

#### 3.1.2 12 Required Themes
1. **Velvet Cake** - Deep purples and pinks
2. **Forest Floor** - Earth tones and greens
3. **Neon Nights** - Cyberpunk neon colors
4. **Ocean Depths** - Deep blues and teals
5. **Sunset Boulevard** - Warm oranges and reds
6. **Moonlight** - Cool grays and blues
7. **Candy Shop** - Bright pastels
8. **Brutalist** - High contrast black/white
9. **Vintage Terminal** - Green phosphor on black
10. **Cotton Candy** - Soft pinks and blues
11. **Dark Mode Pro** - Professional dark theme
12. **Light Mode Pro** - Professional light theme

#### 3.1.3 Theme Implementation
```typescript
interface Theme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeight: {
      thin: number;
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };
    lineHeight: {
      none: number;
      tight: number;
      snug: number;
      normal: number;
      relaxed: number;
      loose: number;
    };
  };
  spacing: {
    px: string;
    0: string;
    0.5: string;
    1: string;
    // ... up to 96
  };
  borderRadius: {
    none: string;
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  shadows: {
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    none: string;
  };
  animations: {
    spin: string;
    ping: string;
    pulse: string;
    bounce: string;
    fadeIn: string;
    fadeOut: string;
    slideIn: string;
    slideOut: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  zIndex: {
    auto: string;
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    dropdown: string;
    sticky: string;
    modal: string;
    popover: string;
    tooltip: string;
  };
}
```

### 3.2 Progressive Web App Requirements

#### 3.2.1 Service Worker Implementation
```javascript
// Service Worker Caching Strategies
const CACHE_STRATEGIES = {
  // Network First (for API calls)
  networkFirst: {
    cacheName: 'api-cache-v1',
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 50
  },
  
  // Cache First (for static assets)
  cacheFirst: {
    cacheName: 'static-cache-v1',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxEntries: 100
  },
  
  // Stale While Revalidate (for dynamic content)
  staleWhileRevalidate: {
    cacheName: 'dynamic-cache-v1',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    maxEntries: 50
  }
};

// Background Sync for Forms
self.addEventListener('sync', event => {
  if (event.tag === 'form-submission') {
    event.waitUntil(submitPendingForms());
  }
});

// Push Notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('CRUDkit', options)
  );
});
```

#### 3.2.2 App Manifest
```json
{
  "name": "CRUDkit - Universal PWA Meta-Template",
  "short_name": "CRUDkit",
  "description": "Evolutionary meta-template with 12 themes, PWA, and AI-optimized patterns",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "categories": ["productivity", "developer", "utilities"],
  "lang": "en-US",
  "dir": "ltr",
  "prefer_related_applications": false,
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/desktop-home.png",
      "sizes": "1920x1080",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "/screenshots/mobile-home.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "shortcuts": [
    {
      "name": "Dashboard",
      "short_name": "Dashboard",
      "description": "View your dashboard",
      "url": "/dashboard",
      "icons": [{ "src": "/icons/dashboard.png", "sizes": "96x96" }]
    },
    {
      "name": "Create New",
      "short_name": "New",
      "description": "Create a new item",
      "url": "/create",
      "icons": [{ "src": "/icons/create.png", "sizes": "96x96" }]
    }
  ],
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [
        {
          "name": "media",
          "accept": ["image/*", "video/*", "audio/*"]
        }
      ]
    }
  }
}
```

### 3.3 Form System Requirements

#### 3.3.1 Multi-Provider Email Integration
```typescript
// Email Provider Interface
interface EmailProvider {
  name: 'web3forms' | 'emailjs' | 'resend';
  sendEmail(data: EmailData): Promise<EmailResponse>;
  validateConfig(): boolean;
  getQuota(): Promise<QuotaInfo>;
}

// Email Data Structure
interface EmailData {
  to: string | string[];
  from: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  headers?: Record<string, string>;
  metadata?: Record<string, any>;
}

// Provider Implementations
class Web3FormsProvider implements EmailProvider {
  private apiKey: string;
  private endpoint = 'https://api.web3forms.com/submit';
  
  async sendEmail(data: EmailData): Promise<EmailResponse> {
    const formData = new FormData();
    formData.append('access_key', this.apiKey);
    formData.append('to', Array.isArray(data.to) ? data.to.join(',') : data.to);
    formData.append('subject', data.subject);
    formData.append('from_name', data.from);
    
    if (data.html) {
      formData.append('message', data.html);
    } else if (data.text) {
      formData.append('message', data.text);
    }
    
    const response = await fetch(this.endpoint, {
      method: 'POST',
      body: formData
    });
    
    return response.json();
  }
}

class EmailJSProvider implements EmailProvider {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;
  
  async sendEmail(data: EmailData): Promise<EmailResponse> {
    const templateParams = {
      to_email: Array.isArray(data.to) ? data.to.join(',') : data.to,
      from_email: data.from,
      subject: data.subject,
      message: data.html || data.text,
      reply_to: data.replyTo
    };
    
    return emailjs.send(
      this.serviceId,
      this.templateId,
      templateParams,
      this.publicKey
    );
  }
}

class ResendProvider implements EmailProvider {
  private apiKey: string;
  private endpoint = 'https://api.resend.com/emails';
  
  async sendEmail(data: EmailData): Promise<EmailResponse> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: data.html,
        text: data.text,
        cc: data.cc,
        bcc: data.bcc,
        reply_to: data.replyTo,
        headers: data.headers,
        attachments: data.attachments
      })
    });
    
    return response.json();
  }
}
```

#### 3.3.2 Form Validation with Zod
```typescript
import { z } from 'zod';

// Base validation schemas
const emailSchema = z.string().email('Invalid email address');
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');
const urlSchema = z.string().url('Invalid URL');

// Contact form schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: emailSchema,
  
  phone: phoneSchema.optional(),
  
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  
  consent: z.boolean()
    .refine(val => val === true, 'You must agree to the privacy policy'),
  
  honeypot: z.string().max(0, 'Bot detected'),
  
  attachments: z.array(
    z.object({
      name: z.string(),
      size: z.number().max(10 * 1024 * 1024, 'File must be less than 10MB'),
      type: z.string().regex(/^(image|application|text)\//, 'Invalid file type')
    })
  ).optional()
});

// Registration form schema
const registrationSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  
  email: emailSchema,
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  
  confirmPassword: z.string(),
  
  dateOfBirth: z.date()
    .min(new Date('1900-01-01'), 'Invalid date of birth')
    .max(new Date(), 'Date of birth cannot be in the future'),
  
  termsAccepted: z.boolean()
    .refine(val => val === true, 'You must accept the terms and conditions'),
  
  marketingConsent: z.boolean().optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});
```

### 3.4 Testing Requirements

#### 3.4.1 Unit Testing Configuration
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '*.config.ts',
        '*.config.js',
        '.next/',
        'coverage/',
        'dist/',
        'public/'
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60
      }
    },
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.next']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  }
});
```

#### 3.4.2 E2E Testing Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'junit.xml' }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000
  }
});
```

#### 3.4.3 Accessibility Testing
```json
// .pa11yci
{
  "defaults": {
    "chromeLaunchConfig": {
      "args": ["--no-sandbox"]
    },
    "timeout": 10000,
    "viewport": {
      "width": 1280,
      "height": 1024
    },
    "runners": ["axe", "htmlcs"],
    "standard": "WCAG2AA",
    "ignore": [
      "warning",
      "notice"
    ]
  },
  "urls": [
    {
      "url": "http://localhost:3000",
      "screenCapture": "pa11y-screenshots/home.png"
    },
    {
      "url": "http://localhost:3000/dashboard",
      "screenCapture": "pa11y-screenshots/dashboard.png"
    },
    {
      "url": "http://localhost:3000/contact",
      "screenCapture": "pa11y-screenshots/contact.png"
    }
  ],
  "reporters": [
    ["cli"],
    ["json", { "fileName": "./pa11y-results.json" }],
    ["html", { "fileName": "./pa11y-report.html" }]
  ]
}
```

### 3.5 Security Requirements

#### 3.5.1 Content Security Policy
```typescript
// next.config.js CSP Configuration
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.web3forms.com https://api.emailjs.com https://api.resend.com;
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  block-all-mixed-content;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspHeader.replace(/\n/g, '')
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  }
];
```

#### 3.5.2 Input Sanitization
```typescript
import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// XSS Prevention
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}

// SQL Injection Prevention (for any future database integration)
export function sanitizeSqlInput(input: string): string {
  return input
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
      switch (char) {
        case "\0": return "\\0";
        case "\x08": return "\\b";
        case "\x09": return "\\t";
        case "\x1a": return "\\z";
        case "\n": return "\\n";
        case "\r": return "\\r";
        case "\"":
        case "'":
        case "\\":
        case "%":
          return "\\" + char;
        default:
          return char;
      }
    });
}

// Path Traversal Prevention
export function sanitizePath(path: string): string {
  return path
    .replace(/\.\./g, '')
    .replace(/\/+/g, '/')
    .replace(/^\//, '');
}

// Rate Limiting Implementation
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  constructor(private config: RateLimitConfig) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    const userRequests = this.requests.get(identifier) || [];
    const recentRequests = userRequests.filter(time => time > windowStart);
    
    if (recentRequests.length >= this.config.maxRequests) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    
    return true;
  }
}
```

### 3.6 Performance Requirements

#### 3.6.1 Performance Metrics
```typescript
interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number;  // Largest Contentful Paint < 2.5s
  fid: number;  // First Input Delay < 100ms
  cls: number;  // Cumulative Layout Shift < 0.1
  
  // Additional Metrics
  fcp: number;  // First Contentful Paint < 1.8s
  ttfb: number; // Time to First Byte < 800ms
  tti: number;  // Time to Interactive < 3.8s
  tbt: number;  // Total Blocking Time < 200ms
  
  // Custom Metrics
  bundleSize: {
    js: number;   // < 200KB gzipped
    css: number;  // < 50KB gzipped
    total: number; // < 300KB gzipped
  };
  
  // Lighthouse Scores
  lighthouse: {
    performance: number;  // > 95
    accessibility: number; // > 95
    bestPractices: number; // > 95
    seo: number;          // > 95
    pwa: number;          // > 95
  };
}
```

#### 3.6.2 Optimization Strategies
```javascript
// next.config.js optimizations
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  compress: true,
  
  poweredByHeader: false,
  
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = crypto.createHash('sha1');
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name(module, chunks) {
              const hash = crypto.createHash('sha1');
              hash.update(chunks.reduce((acc, chunk) => acc + chunk.name, ''));
              return hash.digest('hex').substring(0, 8);
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Minification
      config.optimization.minimize = true;
    }
    
    return config;
  },
};
```

## 4. Infrastructure Specifications

### 4.1 Docker Configuration

#### 4.1.1 Multi-Stage Production Dockerfile
```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY .npmrc* ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

# Install tini for proper signal handling
RUN apk add --no-cache tini

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set ownership
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port
EXPOSE 3000

# Environment variables
ENV PORT 3000
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Use tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

# Start application
CMD ["node", "server.js"]
```

#### 4.1.2 Docker Compose Configuration
```yaml
version: '3.9'

services:
  # Development environment
  dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
      args:
        - NODE_VERSION=20
    container_name: crudkit-dev
    ports:
      - "3000:3000"
      - "6006:6006"  # Storybook
      - "9229:9229"  # Node debug
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      - WATCHPACK_POLLING=true
      - NEXT_TELEMETRY_DISABLED=1
    command: npm run dev
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - crudkit-network

  # Test environment
  test:
    build:
      context: .
      dockerfile: Dockerfile.test
    container_name: crudkit-test
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=test
      - CI=true
    command: npm run test:all
    networks:
      - crudkit-network

  # Storybook
  storybook:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: crudkit-storybook
    ports:
      - "6006:6006"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run storybook
    networks:
      - crudkit-network

  # Production preview
  prod:
    build:
      context: .
      dockerfile: Dockerfile
      target: runner
    container_name: crudkit-prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "node", "healthcheck.js"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    networks:
      - crudkit-network
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

networks:
  crudkit-network:
    driver: bridge

volumes:
  node_modules:
  next_cache:
```

### 4.2 CI/CD Pipeline

#### 4.2.1 GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 0 * * 0'  # Weekly security scan

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '8'

jobs:
  # Code Quality
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Get pnpm store directory
        id: pnpm-cache
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT
          
      - uses: actions/cache@v3
        name: Setup pnpm cache
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
            
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run ESLint
        run: pnpm run lint
        
      - name: Run Prettier
        run: pnpm run format:check
        
      - name: Type check
        run: pnpm run type-check

  # Unit Tests
  test-unit:
    name: Unit Tests
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run unit tests
        run: pnpm run test:unit
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unit
          name: unit-coverage

  # Integration Tests
  test-integration:
    name: Integration Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run integration tests
        run: pnpm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

  # E2E Tests
  test-e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps ${{ matrix.browser }}
        
      - name: Build application
        run: pnpm run build
        
      - name: Run E2E tests
        run: pnpm run test:e2e:${{ matrix.browser }}
        
      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-results-${{ matrix.browser }}
          path: test-results/

  # Accessibility Tests
  test-a11y:
    name: Accessibility Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build application
        run: pnpm run build
        
      - name: Start server
        run: |
          pnpm run start &
          sleep 10
          
      - name: Run Pa11y tests
        run: pnpm run test:a11y
        
      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: pa11y-results
          path: pa11y-results/

  # Performance Tests
  test-performance:
    name: Performance Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build application
        run: pnpm run build
        
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-results
          path: .lighthouseci/

  # Security Scan
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
          
      - name: Upload Trivy results to GitHub Security tab
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
          
      - name: Run npm audit
        run: npm audit --audit-level=moderate

  # Build Docker Image
  build-docker:
    name: Build Docker Image
    runs-on: ubuntu-latest
    needs: [lint, test-unit]
    if: github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        
      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:${{ github.sha }}
            ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

  # Deploy to GitHub Pages
  deploy-pages:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: [lint, test-unit, test-integration, test-e2e, test-a11y, security]
    if: github.ref == 'refs/heads/main'
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build application
        run: pnpm run build
        env:
          NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
          
      - name: Export static files
        run: pnpm run export
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2

  # Deploy Storybook
  deploy-storybook:
    name: Deploy Storybook
    runs-on: ubuntu-latest
    needs: [lint, test-unit]
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Build Storybook
        run: pnpm run build-storybook
        
      - name: Deploy to Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          storybookBuildDir: storybook-static
```

## 5. Development Workflow

### 5.1 PRP Methodology Implementation
```markdown
# Problem Requirements Plan (PRP) Template

## 1. Problem Statement
- **What problem are we solving?**
- **Who experiences this problem?**
- **What is the impact of not solving it?**
- **What are the success criteria?**

## 2. Requirements
### Functional Requirements
- List all functional requirements
- Define user stories
- Specify acceptance criteria

### Non-Functional Requirements
- Performance requirements
- Security requirements
- Accessibility requirements
- Compatibility requirements

### Constraints
- Technical constraints
- Business constraints
- Time constraints
- Resource constraints

## 3. Plan
### Technical Approach
- Architecture decisions
- Technology choices
- Implementation strategy

### Development Plan
- Sprint breakdown
- Task allocation
- Timeline estimates
- Risk mitigation

### Testing Plan
- Test scenarios
- Coverage targets
- Performance benchmarks

### Deployment Plan
- Deployment strategy
- Rollback plan
- Monitoring setup
```

### 5.2 Validation Loops
```typescript
enum ValidationLevel {
  SYNTAX = 1,      // Linting, formatting
  TYPE = 2,        // TypeScript compilation
  UNIT = 3,        // Unit tests
  INTEGRATION = 4, // Integration tests
  E2E = 5,         // End-to-end tests
  PRODUCTION = 6   // Production monitoring
}

interface ValidationLoop {
  level: ValidationLevel;
  tools: string[];
  frequency: 'onChange' | 'onSave' | 'onCommit' | 'onPush' | 'onMerge' | 'continuous';
  blocking: boolean;
}

const validationLoops: ValidationLoop[] = [
  {
    level: ValidationLevel.SYNTAX,
    tools: ['eslint', 'prettier'],
    frequency: 'onSave',
    blocking: false
  },
  {
    level: ValidationLevel.TYPE,
    tools: ['tsc'],
    frequency: 'onChange',
    blocking: false
  },
  {
    level: ValidationLevel.UNIT,
    tools: ['vitest'],
    frequency: 'onCommit',
    blocking: true
  },
  {
    level: ValidationLevel.INTEGRATION,
    tools: ['vitest', 'msw'],
    frequency: 'onPush',
    blocking: true
  },
  {
    level: ValidationLevel.E2E,
    tools: ['playwright'],
    frequency: 'onMerge',
    blocking: true
  },
  {
    level: ValidationLevel.PRODUCTION,
    tools: ['sentry', 'datadog', 'lighthouse'],
    frequency: 'continuous',
    blocking: false
  }
];
```

## 6. File Structure

### 6.1 Complete Project Structure
```
crudkit/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── cd.yml
│   │   ├── security.yml
│   │   └── codeql.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── prp_template.md
│   └── PULL_REQUEST_TEMPLATE.md
├── .husky/
│   ├── pre-commit
│   ├── pre-push
│   └── commit-msg
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── manager.ts
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
├── docker/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── Dockerfile.test
│   └── docker-compose.yml
├── docs/
│   ├── architecture/
│   │   ├── decisions/
│   │   ├── diagrams/
│   │   └── README.md
│   ├── api/
│   ├── components/
│   └── deployment/
├── e2e/
│   ├── fixtures/
│   ├── tests/
│   └── utils/
├── public/
│   ├── icons/
│   ├── screenshots/
│   ├── manifest.json
│   └── sw.js
├── scripts/
│   ├── generate-theme.ts
│   ├── analyze-bundle.ts
│   ├── check-deps.ts
│   └── prepare-release.ts
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── global.css
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useForm.ts
│   │   ├── useOffline.ts
│   │   └── useMediaQuery.ts
│   ├── lib/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── db/
│   │   └── utils/
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   ├── AuthProvider.tsx
│   │   └── PWAProvider.tsx
│   ├── schemas/
│   │   ├── forms/
│   │   ├── api/
│   │   └── validation/
│   ├── services/
│   │   ├── email/
│   │   ├── analytics/
│   │   └── storage/
│   ├── stores/
│   │   ├── theme.store.ts
│   │   ├── auth.store.ts
│   │   └── app.store.ts
│   ├── styles/
│   │   ├── themes/
│   │   ├── globals.css
│   │   └── variables.css
│   ├── types/
│   │   ├── api.d.ts
│   │   ├── theme.d.ts
│   │   └── global.d.ts
│   └── utils/
│       ├── cn.ts
│       ├── format.ts
│       └── validate.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── setup.ts
│   └── utils/
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .nvmrc
├── .prettierrc
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── commitlint.config.js
├── jest.config.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── playwright.config.ts
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

## 7. API Specifications

### 7.1 RESTful API Endpoints
```typescript
// API Route Structure
interface APIRoute {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  auth: boolean;
  rateLimit: number; // requests per minute
  cache?: {
    type: 'public' | 'private' | 'no-cache';
    maxAge: number;
  };
}

const apiRoutes: APIRoute[] = [
  // Health & Status
  {
    method: 'GET',
    path: '/api/health',
    auth: false,
    rateLimit: 100,
    cache: { type: 'no-cache', maxAge: 0 }
  },
  {
    method: 'GET',
    path: '/api/status',
    auth: false,
    rateLimit: 100,
    cache: { type: 'public', maxAge: 60 }
  },
  
  // Theme Management
  {
    method: 'GET',
    path: '/api/themes',
    auth: false,
    rateLimit: 60,
    cache: { type: 'public', maxAge: 3600 }
  },
  {
    method: 'POST',
    path: '/api/themes/switch',
    auth: false,
    rateLimit: 30
  },
  {
    method: 'GET',
    path: '/api/themes/:id',
    auth: false,
    rateLimit: 60,
    cache: { type: 'public', maxAge: 3600 }
  },
  
  // Email Service
  {
    method: 'POST',
    path: '/api/email/send',
    auth: false,
    rateLimit: 5
  },
  {
    method: 'GET',
    path: '/api/email/providers',
    auth: false,
    rateLimit: 60,
    cache: { type: 'public', maxAge: 3600 }
  },
  {
    method: 'POST',
    path: '/api/email/validate',
    auth: false,
    rateLimit: 30
  },
  
  // Form Submissions
  {
    method: 'POST',
    path: '/api/forms/submit',
    auth: false,
    rateLimit: 10
  },
  {
    method: 'GET',
    path: '/api/forms/:id/status',
    auth: false,
    rateLimit: 60
  },
  
  // Analytics
  {
    method: 'POST',
    path: '/api/analytics/event',
    auth: false,
    rateLimit: 100
  },
  {
    method: 'POST',
    path: '/api/analytics/pageview',
    auth: false,
    rateLimit: 100
  },
  
  // PWA
  {
    method: 'GET',
    path: '/api/pwa/manifest',
    auth: false,
    rateLimit: 60,
    cache: { type: 'public', maxAge: 86400 }
  },
  {
    method: 'POST',
    path: '/api/pwa/subscribe',
    auth: false,
    rateLimit: 10
  },
  {
    method: 'POST',
    path: '/api/pwa/sync',
    auth: false,
    rateLimit: 30
  }
];
```

### 7.2 WebSocket Events
```typescript
// WebSocket Event Definitions
interface WSEvent {
  event: string;
  payload: any;
  timestamp: number;
}

// Client to Server Events
interface ClientEvents {
  'theme:change': { themeId: string };
  'form:submit': { formId: string; data: any };
  'sync:request': { lastSync: number };
  'heartbeat': { timestamp: number };
}

// Server to Client Events
interface ServerEvents {
  'theme:changed': { themeId: string; userId?: string };
  'form:status': { formId: string; status: string };
  'sync:data': { updates: any[]; timestamp: number };
  'notification': { type: string; message: string };
  'heartbeat:ack': { timestamp: number };
}
```

## 8. Database Schema

### 8.1 Data Models (Future Database Integration)
```sql
-- Theme preferences
CREATE TABLE theme_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  theme_id VARCHAR(50) NOT NULL,
  custom_overrides JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Form submissions
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id VARCHAR(100) NOT NULL,
  data JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  provider VARCHAR(20),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP,
  error_message TEXT
);

-- Email logs
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider VARCHAR(20) NOT NULL,
  to_email VARCHAR(255) NOT NULL,
  from_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500),
  status VARCHAR(20) DEFAULT 'pending',
  provider_response JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sent_at TIMESTAMP,
  error_message TEXT
);

-- Analytics events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  session_id VARCHAR(100),
  user_id UUID REFERENCES users(id),
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PWA subscriptions
CREATE TABLE pwa_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint TEXT UNIQUE NOT NULL,
  keys JSONB NOT NULL,
  user_id UUID REFERENCES users(id),
  device_info JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used TIMESTAMP
);

-- Offline sync queue
CREATE TABLE offline_sync_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action_type VARCHAR(50) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(100),
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  synced_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending'
);
```

## 9. Monitoring & Observability

### 9.1 Logging Strategy
```typescript
// Structured Logging
interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  timestamp: string;
  message: string;
  context: {
    service: string;
    environment: string;
    version: string;
    requestId?: string;
    userId?: string;
    sessionId?: string;
  };
  metadata?: Record<string, any>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

// Logger Implementation
class Logger {
  private formatEntry(entry: LogEntry): string {
    return JSON.stringify(entry);
  }
  
  debug(message: string, metadata?: Record<string, any>) {
    this.log('debug', message, metadata);
  }
  
  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata);
  }
  
  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata);
  }
  
  error(message: string, error?: Error, metadata?: Record<string, any>) {
    this.log('error', message, metadata, error);
  }
  
  fatal(message: string, error?: Error, metadata?: Record<string, any>) {
    this.log('fatal', message, metadata, error);
    process.exit(1);
  }
  
  private log(
    level: LogEntry['level'],
    message: string,
    metadata?: Record<string, any>,
    error?: Error
  ) {
    const entry: LogEntry = {
      level,
      timestamp: new Date().toISOString(),
      message,
      context: {
        service: 'crudkit',
        environment: process.env.NODE_ENV || 'development',
        version: process.env.APP_VERSION || '0.0.0',
        requestId: this.getRequestId(),
        userId: this.getUserId(),
        sessionId: this.getSessionId()
      },
      metadata
    };
    
    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }
    
    console.log(this.formatEntry(entry));
  }
}
```

### 9.2 Metrics Collection
```typescript
// Application Metrics
interface Metrics {
  // Performance Metrics
  performance: {
    pageLoadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
  };
  
  // Business Metrics
  business: {
    formSubmissions: number;
    emailsSent: number;
    themeSwitches: number;
    pwaInstalls: number;
    activeUsers: number;
  };
  
  // Technical Metrics
  technical: {
    errorRate: number;
    apiLatency: Record<string, number>;
    cacheHitRate: number;
    bundleSize: number;
    memoryUsage: number;
    cpuUsage: number;
  };
  
  // User Engagement
  engagement: {
    sessionDuration: number;
    pageViews: number;
    bounceRate: number;
    returnRate: number;
    featureAdoption: Record<string, number>;
  };
}

// Metrics Collector
class MetricsCollector {
  private metrics: Partial<Metrics> = {};
  private interval: NodeJS.Timer;
  
  start() {
    this.collectPerformanceMetrics();
    this.collectBusinessMetrics();
    this.collectTechnicalMetrics();
    this.collectEngagementMetrics();
    
    // Send metrics every 60 seconds
    this.interval = setInterval(() => {
      this.flush();
    }, 60000);
  }
  
  stop() {
    clearInterval(this.interval);
    this.flush();
  }
  
  private flush() {
    // Send metrics to monitoring service
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.metrics)
    });
    
    // Reset metrics
    this.metrics = {};
  }
}
```

## 10. Deployment Configuration

### 10.1 Environment Variables
```bash
# .env.example

# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=CRUDkit
NEXT_PUBLIC_APP_VERSION=1.0.0

# API Keys
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_ANALYTICS_DOMAIN=

# Calendar
NEXT_PUBLIC_CALENDLY_URL=

# Security
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Database (Future)
DATABASE_URL=

# Redis (Future)
REDIS_URL=

# Monitoring
SENTRY_DSN=
SENTRY_AUTH_TOKEN=
NEXT_PUBLIC_SENTRY_DSN=

# Feature Flags
NEXT_PUBLIC_FEATURE_PWA=true
NEXT_PUBLIC_FEATURE_ANALYTICS=true
NEXT_PUBLIC_FEATURE_CALENDAR=true
NEXT_PUBLIC_FEATURE_EMAIL=true

# Build
SKIP_PWA=false
ANALYZE=false
```

### 10.2 Production Checklist
```markdown
## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (unit, integration, E2E)
- [ ] No TypeScript errors
- [ ] ESLint warnings resolved
- [ ] Code coverage > 80%
- [ ] Bundle size < 300KB

### Security
- [ ] Environment variables secured
- [ ] CSP headers configured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] HTTPS enforced
- [ ] Security scan passed

### Performance
- [ ] Lighthouse score > 95
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Caching configured
- [ ] CDN setup

### Accessibility
- [ ] WCAG AA compliant
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] Focus indicators visible

### Documentation
- [ ] README updated
- [ ] API documented
- [ ] Deployment guide complete
- [ ] Changelog updated
- [ ] License verified

### Monitoring
- [ ] Error tracking configured
- [ ] Analytics enabled
- [ ] Uptime monitoring active
- [ ] Log aggregation setup
- [ ] Alerts configured

### Backup & Recovery
- [ ] Backup strategy defined
- [ ] Rollback plan documented
- [ ] Disaster recovery tested
- [ ] Data retention policy set
```

## 11. Conclusion

This specification document defines a comprehensive, production-ready Universal PWA Meta-Template that serves as an evolutionary foundation for modern web applications. By learning from and improving upon the reference implementations, CRUDkit provides:

- **12 professionally designed themes** with OKLCH color system
- **Complete PWA functionality** with offline support
- **Enterprise-grade testing** across all levels
- **Robust security** implementation
- **Optimized performance** exceeding industry standards
- **Full accessibility** compliance
- **Comprehensive documentation** and tooling
- **Scalable architecture** following best practices

The specification ensures that developers can go from clone to running in under 30 minutes while maintaining the flexibility to extend and customize for specific needs. This meta-template represents the evolution of web development practices, incorporating lessons learned from multiple successful projects into a single, cohesive solution.