// Stub file for Next.js static export compatibility with App Router
// This file is required by Next.js build but not actually used
// The actual app uses App Router in src/app/

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
