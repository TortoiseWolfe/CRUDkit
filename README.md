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
- 🧪 **Testing Suite** - 620+ unit tests, 40+ E2E tests, 58% coverage
- 📊 **Real-time Monitoring** - Web Vitals, Lighthouse scores, health checks
- 🚀 **CI/CD Pipeline** - GitHub Actions with automated deployment

## 🛠️ Tech Stack

- **Next.js 15.5** / **React 19** / **TypeScript 5**
- **Tailwind CSS 4** + **DaisyUI** (beta)
- **Vitest** / **Playwright** / **Pa11y**
- **Docker** / **GitHub Actions** / **pnpm 10.16.1**

## 🚀 Quick Start

```bash
# Clone and install
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

**Version 0.3.0** - 8 of 14 PRPs completed

| Category      | Completed                               | Remaining                      |
| ------------- | --------------------------------------- | ------------------------------ |
| Foundation    | Component Structure, E2E Testing        | -                              |
| Accessibility | WCAG AA, Colorblind Mode, Font Switcher | -                              |
| Privacy       | Cookie Consent, Google Analytics        | -                              |
| Forms         | Web3Forms Integration                   | EmailJS, PWA Sync              |
| Features      | -                                       | Visual Testing, Calendar, Maps |

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

**For Forkers**: Update `/src/config/project-status.json` with your project details and replace GitHub Pages URLs in configuration files.
