# CRUDkit Implementation Plan with Iterative Deployment

Generated from spec.md - Deploy Early, Deploy Often strategy

## Executive Summary

CRUDkit follows a **Deploy Early, Deploy Often** philosophy with GitHub Pages deployment from Day 1. Every phase includes deployment milestones with smoke tests to ensure the build pipeline works throughout development, not just at the end.

### Key Principles

- **Day 1 Deployment**: Basic app live on GitHub Pages immediately
- **Dual Deployment**: Both app (/) and Storybook (/storybook) paths
- **Smoke Tests**: Build validation after each component phase
- **Iterative Feedback**: Stakeholder review every 3 days via live URLs
- **Progressive Features**: Feature flags control what's visible in production

## Phase 0: Project Initialization & First Deploy (Day 1)

### Morning: Environment Setup

```bash
# Create Next.js 15.5 project
npx create-next-app@latest crudkit \
  --typescript --tailwind --app --src-dir \
  --import-alias "@/*" --turbopack

cd crudkit

# Initialize Git and GitHub repo
git init
gh repo create crudkit --public
git remote add origin https://github.com/[username]/crudkit.git

# Enable GitHub Pages in repo settings
gh repo edit --enable-pages --pages-branch main
```

### Afternoon: First Deployment

```bash
# Create minimal "Hello CRUDkit" page
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Hello CRUDkit! 🚀</h1>
      <p className="mt-4">Deployment Pipeline: ✅ Working</p>
    </main>
  );
}
EOF

# Setup GitHub Actions for deployment
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run build
      - run: pnpm run export
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
EOF

# Configure for static export
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/crudkit' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
EOF

# Add export script
npm pkg set scripts.export="next build"

# Commit and deploy
git add .
git commit -m "Initial CRUDkit setup with GitHub Pages deployment"
git push -u origin main
```

### Evening: Verify Deployment

```bash
# Check deployment status
gh run list --workflow=deploy.yml

# Once deployed, test the live URL
curl https://[username].github.io/crudkit

# Run first smoke test
pnpm run test:smoke
```

**🎯 Day 1 Milestone**: App live at https://[username].github.io/crudkit

## Phase 1: Sub-Atomic Typography & Storybook Deploy (Days 2-4)

### Day 2: Setup Storybook with Deployment

```bash
# Initialize Storybook
pnpm dlx storybook@latest init

# Configure Storybook for GitHub Pages
cat > .storybook/main.ts << 'EOF'
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.base = '/crudkit/storybook/';
    }
    return config;
  },
};

export default config;
EOF

# Update deploy workflow for dual deployment
cat >> .github/workflows/deploy.yml << 'EOF'

  deploy-storybook:
    runs-on: ubuntu-latest
    needs: build-and-deploy
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run build-storybook
      - run: |
          mkdir -p storybook-deploy
          cp -r storybook-static/* storybook-deploy/
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./storybook-deploy
          destination_dir: storybook
EOF

# Create first Text component
mkdir -p src/components/subatomic/Text
# ... implement Text component ...

# Create Text stories
cat > src/components/subatomic/Text/Text.stories.tsx << 'EOF'
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'SubAtomic/Text',
  component: Text,
};

export default meta;

export const Default: StoryObj<typeof Text> = {
  args: {
    children: 'Hello from Text component!',
  },
};
EOF

# Commit and deploy
git add .
git commit -m "Add Storybook with Text component"
git push
```

**🎯 Day 2-4 Milestone**:

- Storybook live at https://[username].github.io/crudkit/storybook
- All sub-atomic text components visible and interactive

### Day 3-4: Complete Sub-Atomic Components

- Implement Heading, Paragraph, Caption, Code, List, Emphasis
- Add stories for each component
- Deploy updates daily
- Run smoke tests after each deployment

## Phase 2: Dual Theme System with Live Demo (Days 5-7)

### Day 5: Deploy Theme Switchers

```typescript
// Create theme demo page
// src/app/themes/page.tsx
export default function ThemesDemo() {
  return (
    <div>
      <h1>CRUDkit Theme Playground</h1>
      <div className="grid grid-cols-2 gap-4">
        <ColorThemeSwitcher />
        <FontThemeSwitcher />
      </div>
      <ThemePreview />
    </div>
  );
}
```

**🎯 Day 5 Milestone**: Live theme switching at https://[username].github.io/crudkit/themes

### Day 6: Typography Accessibility Controls

```typescript
// Add accessibility demo
// src/app/accessibility/page.tsx
export default function AccessibilityDemo() {
  return (
    <div>
      <h1>Typography Accessibility</h1>
      <TypographyControls />
      <ReadingAidsPanel />
      <FluidTypographyDemo />
    </div>
  );
}
```

**🎯 Day 6 Milestone**: Accessibility controls live at https://[username].github.io/crudkit/accessibility

### Day 7: Integration & Smoke Tests

```typescript
// tests/smoke/deployment.test.ts
describe('Deployment Smoke Tests', () => {
  const baseUrl = 'https://[username].github.io/crudkit';

  test('Main app is accessible', async () => {
    const response = await fetch(baseUrl);
    expect(response.status).toBe(200);
  });

  test('Storybook is accessible', async () => {
    const response = await fetch(`${baseUrl}/storybook`);
    expect(response.status).toBe(200);
  });

  test('Theme demo works', async () => {
    const page = await browser.newPage();
    await page.goto(`${baseUrl}/themes`);

    // Test color theme switching
    await page.click('[data-theme="forest-floor"]');
    const theme = await page.evaluate(
      () => document.documentElement.dataset.theme
    );
    expect(theme).toBe('forest-floor');

    // Test font theme switching
    await page.click('[data-font-theme="playful"]');
    const fontTheme = await page.evaluate(
      () => document.documentElement.dataset.fontTheme
    );
    expect(fontTheme).toBe('playful');
  });
});
```

**🎯 Day 7 Milestone**: All 72 theme combinations working live

## Phase 3: Atomic Components Showcase (Days 8-10)

### Day 8: Deploy Component Gallery

```typescript
// src/app/components/page.tsx
export default function ComponentGallery() {
  return (
    <div>
      <h1>CRUDkit Component Gallery</h1>
      <section>
        <h2>Atoms</h2>
        <ButtonShowcase />
        <InputShowcase />
        <LabelShowcase />
      </section>
    </div>
  );
}
```

**🎯 Day 8 Milestone**: Component gallery live at https://[username].github.io/crudkit/components

### Day 9-10: Progressive Component Deployment

- Deploy new components as they're built
- Update Storybook documentation
- Run visual regression tests
- Gather stakeholder feedback via live URLs

## Phase 4: PWA Features with Live Testing (Days 11-13)

### Day 11: Deploy PWA Shell

```bash
# Add PWA deployment test
cat > public/manifest.json << 'EOF'
{
  "name": "CRUDkit",
  "short_name": "CRUDkit",
  "start_url": "/crudkit",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
EOF

# Deploy and test installation
git add .
git commit -m "Add PWA manifest"
git push

# Test PWA installation
echo "Visit https://[username].github.io/crudkit on mobile to test PWA installation"
```

**🎯 Day 11 Milestone**: PWA installable from GitHub Pages

### Day 12-13: Offline Functionality

- Deploy service worker
- Test offline mode on live site
- Validate background sync
- Smoke test PWA features

## Continuous Deployment Schedule

### Daily Deployments

```yaml
# Automated daily deployment at 6 PM
on:
  schedule:
    - cron: '0 18 * * *' # 6 PM UTC daily
  push:
    branches: [main, develop]
```

### Deployment Checklist

- [ ] Build passes locally
- [ ] Smoke tests pass
- [ ] Storybook builds
- [ ] Lighthouse score >90
- [ ] Deploy to GitHub Pages
- [ ] Verify live URLs
- [ ] Run production smoke tests
- [ ] Share URLs for feedback

### Monitoring Dashboard

```typescript
// src/app/status/page.tsx
export default function StatusDashboard() {
  return (
    <div>
      <h1>CRUDkit Deployment Status</h1>
      <DeploymentHistory />
      <BuildMetrics />
      <LighthouseScores />
      <SmokeTestResults />
      <LiveURLs />
    </div>
  );
}
```

**🎯 Status Page**: https://[username].github.io/crudkit/status

## Success Metrics

### Deployment Milestones

- ✅ Day 1: Basic app deployed
- ✅ Day 2: Storybook deployed
- ✅ Day 5: Themes demo live
- ✅ Day 8: Component gallery live
- ✅ Day 11: PWA installable
- ✅ Day 14: Email integration demo
- ✅ Day 17: Forms playground
- ✅ Day 20: Full testing suite
- ✅ Day 23: Documentation complete
- ✅ Day 26: Performance optimized
- ✅ Day 30: Production ready

### Continuous Validation

- Deployment success rate: >95%
- Build time: <3 minutes
- Smoke test pass rate: 100%
- Lighthouse scores: >90 (maintained)
- Zero downtime deployments
- Stakeholder feedback incorporated

## Benefits of Deploy Early, Deploy Often

1. **Early Problem Detection**: Build issues found on Day 1, not Day 30
2. **Continuous Feedback**: Stakeholders see progress daily
3. **Real-World Testing**: Test on actual GitHub Pages environment
4. **Incremental Complexity**: Start simple, add features progressively
5. **Documentation by Default**: Live demos serve as documentation
6. **Confidence Building**: Every commit deploys successfully
7. **Portfolio Ready**: Project is showable from Day 1

---

**Generated from spec.md with Deploy Early, Deploy Often philosophy**
**Live URLs available from Day 1**
**Smoke tests validate every deployment**
