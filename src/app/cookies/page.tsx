'use client';

import React from 'react';
import Link from 'next/link';
import { useConsent } from '@/contexts/ConsentContext';

export default function CookiePolicyPage() {
  const { openModal } = useConsent();
  const lastUpdated = '2025-09-15';

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <header>
        <h1 className="mb-8 text-4xl font-bold">Cookie Policy</h1>
      </header>

      {/* Quick Actions */}
      <nav
        className="mb-8 flex flex-wrap gap-4"
        aria-label="Cookie policy actions"
      >
        <button
          onClick={openModal}
          className="btn btn-primary"
          aria-label="Manage cookie preferences"
        >
          Manage Cookie Preferences
        </button>
        <Link href="/privacy" className="btn btn-outline">
          View Privacy Policy
        </Link>
      </nav>

      <article className="prose prose-lg max-w-none">
        <p className="text-base-content/70 mb-6 text-sm">
          Last updated: {lastUpdated}
        </p>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">
            Updates to This Policy
          </h2>
          <p className="mb-4">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            updating the &ldquo;Last updated&rdquo; date at the top of this
            policy.
          </p>
        </section>
      </article>
    </main>
  );
}
