# CRUDkit - Modern Next.js Starter with PWA

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/TortoiseWolfe/CRUDkit)
[![Fork](https://img.shields.io/github/forks/TortoiseWolfe/CRUDkit?style=social)](https://github.com/TortoiseWolfe/CRUDkit/fork)
[![Stars](https://img.shields.io/github/stars/TortoiseWolfe/CRUDkit?style=social)](https://github.com/TortoiseWolfe/CRUDkit)

A comprehensive Next.js starter kit featuring 32 themes, PWA capabilities, component gallery, and extensive testing infrastructure.

## 🚀 Live Demos

- **Main App**: [https://tortoisewolfe.github.io/CRUDkit/](https://tortoisewolfe.github.io/CRUDkit/)
- **Storybook**: [https://tortoisewolfe.github.io/CRUDkit/storybook/](https://tortoisewolfe.github.io/CRUDkit/storybook/)
- **Status Dashboard**: [https://tortoisewolfe.github.io/CRUDkit/status](https://tortoisewolfe.github.io/CRUDkit/status)

## ✨ Key Features

- 🎨 **32 DaisyUI Themes** - Light/dark variants with persistent selection
- 📱 **Progressive Web App** - Installable with offline support
- 🧩 **Component Library** - Atomic design with Storybook documentation
- ♿ **Accessibility** - WCAG AA compliant, colorblind assistance
- 🔒 **Privacy Compliance** - GDPR-ready cookie consent system
- 🧪 **Testing Suite** - 680+ unit tests, 40+ E2E tests, 58% coverage
- 📊 **Real-time Monitoring** - Web Vitals, Lighthouse scores, health checks
- 🚀 **CI/CD Pipeline** - GitHub Actions with automated deployment

## 🛠️ Tech Stack

- **Next.js 15.5** / **React 19** / **TypeScript 5**
- **Tailwind CSS 4** + **DaisyUI** (beta)
- **Vitest** / **Playwright** / **Pa11y**
- **Docker** / **GitHub Actions** / **pnpm 10.16.1**

## 🚀 Quick Start

### For Template Users (Auto-Configuration) 🎯

When you fork this repo, your project name is **automatically detected** from your GitHub repository name!

```bash
# 1. Fork on GitHub (give it your project name)
# 2. Clone YOUR fork
git clone https://github.com/YOUR_USERNAME/YOUR_PROJECT_NAME.git
cd YOUR_PROJECT_NAME

# 3. Install and run - auto-detects your project info!
pnpm install
pnpm dev              # Your project name is used everywhere automatically
```

No configuration needed! See [docs/FORKING-GUIDE.md](./docs/FORKING-GUIDE.md) for details.

### For Contributors

```bash
# Clone the original repo
git clone https://github.com/TortoiseWolfe/CRUDkit.git
cd CRUDkit
pnpm install

# Development
pnpm dev              # Start dev server on localhost:3000
pnpm storybook        # Start Storybook on localhost:6006

# Docker (recommended)
docker compose up     # Start everything in containers

# Testing
pnpm test            # Run unit tests
pnpm test:e2e        # Run E2E tests (local only)
pnpm test:coverage   # Generate coverage report
```

## 📚 Documentation

- **Developer Guide**: See [CLAUDE.md](./CLAUDE.md) for comprehensive development documentation
- **Component Creation**: [docs/CREATING_COMPONENTS.md](./docs/CREATING_COMPONENTS.md)
- **PRP Workflow**: [docs/PRP-EXECUTION-GUIDE.md](./docs/PRP-EXECUTION-GUIDE.md)
- **Testing Guide**: [TESTING.md](./TESTING.md)

## 🎯 Project Status

**Version 0.3.5** - Sprint 3.5 Complete ✅ | 12 of 14 PRPs completed

| Category      | Completed                                         | Remaining         |
| ------------- | ------------------------------------------------- | ----------------- |
| Foundation    | Component Structure, E2E Testing                  | PRP Methodology   |
| Accessibility | WCAG AA, Colorblind Mode, Font Switcher           | -                 |
| Privacy       | Cookie Consent, Google Analytics                  | -                 |
| Forms         | Web3Forms Integration, EmailJS, PWA Sync          | -                 |
| Features      | Calendar Integration, Geolocation Map             | Visual Regression |
| Tech Debt     | Sprint 3.5: All 46 tasks complete (2025-09-19) ✨ | -                 |

See [docs/prp-docs/PRP-STATUS.md](./docs/prp-docs/PRP-STATUS.md) for detailed progress.

## 🏆 Lighthouse Scores

[![WCAG 2.1 AA Compliant](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-success)](https://www.w3.org/WAI/WCAG21/quickref/)

- **Performance**: 92/100
- **Accessibility**: 98/100
- **Best Practices**: 95/100
- **SEO**: 100/100
- **PWA**: 92/100

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Run tests (`pnpm test`)
4. Commit changes (`git commit -m 'Add feature'`)
5. Push and open a PR

## 📄 License

MIT - See [LICENSE](./LICENSE) for details

---

**For Forkers**: Your project name is automatically detected from your GitHub fork! No manual configuration needed. See [docs/FORKING-GUIDE.md](./docs/FORKING-GUIDE.md) for details.
