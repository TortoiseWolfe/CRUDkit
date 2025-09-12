import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import PWAInstall from '@/components/PWAInstall';
import ThemeScript from '@/components/ThemeScript';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' },
  ],
};

export const metadata: Metadata = {
  title: 'CRUDkit',
  description: 'Deploy Early, Deploy Often - A comprehensive starter kit',
  manifest: '/CRUDkit/manifest.json',
  icons: {
    icon: '/CRUDkit/favicon.svg',
    apple: '/CRUDkit/apple-touch-icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CRUDkit',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'CRUDkit',
    title: 'CRUDkit - Modern Web Starter',
    description:
      'A comprehensive starter kit with themes, components, and PWA features',
  },
  twitter: {
    card: 'summary',
    title: 'CRUDkit - Modern Web Starter',
    description:
      'A comprehensive starter kit with themes, components, and PWA features',
  },
  other: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AccessibilityProvider>
          {children}
          <PWAInstall />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
