import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    exclude: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'scripts/**/*.test.js', // Exclude Node.js test runner tests
      'scripts/__tests__/**', // Exclude all script tests
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '**/*.stories.tsx',
        '**/*.config.*',
        '.next/**',
        'out/**',
        'public/**',
        '.storybook/**',
      ],
      thresholds: {
        statements: 15,
        branches: 15,
        functions: 15,
        lines: 15,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
