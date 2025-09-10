import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWAInstall from "@/components/PWAInstall";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRUDkit",
  description: "Deploy Early, Deploy Often - A comprehensive starter kit",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CRUDkit",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "CRUDkit",
    title: "CRUDkit - Modern Web Starter",
    description: "A comprehensive starter kit with themes, components, and PWA features",
  },
  twitter: {
    card: "summary",
    title: "CRUDkit - Modern Web Starter",
    description: "A comprehensive starter kit with themes, components, and PWA features",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AccessibilityProvider>
          {children}
          <PWAInstall />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
