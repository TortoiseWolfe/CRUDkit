'use client';

import React from 'react';
import PrivacyControls from '@/components/privacy/PrivacyControls';
import Link from 'next/link';

export default function PrivacyControlsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Privacy Controls</h1>
      <div className="prose prose-lg mb-8 max-w-none">
        <p>
          Manage your privacy settings, export your data, and exercise your GDPR
          rights from this central control panel.
        </p>
      </div>
      <PrivacyControls />
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/privacy" className="btn btn-outline">
          Privacy Policy
        </Link>
        <Link href="/cookies" className="btn btn-outline">
          Cookie Policy
        </Link>
      </div>
    </div>
  );
}
