# CRUDkit - Modern Next.js Starter with PWA

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/TortoiseWolfe/CRUDkit)
[![Fork](https://img.shields.io/github/forks/TortoiseWolfe/CRUDkit?style=social)](https://github.com/TortoiseWolfe/CRUDkit/fork)
[![Stars](https://img.shields.io/github/stars/TortoiseWolfe/CRUDkit?style=social)](https://github.com/TortoiseWolfe/CRUDkit)

A comprehensive Next.js starter kit featuring 32 themes, PWA capabilities, component gallery, and extensive monitoring tools.

**GitHub Repository**: [https://github.com/TortoiseWolfe/CRUDkit](https://github.com/TortoiseWolfe/CRUDkit)  
**Fork this template**: [Click here to fork](https://github.com/TortoiseWolfe/CRUDkit/fork)

## 🚀 Live Demo

- **Main App**: [https://tortoisewolfe.github.io/CRUDkit/](https://tortoisewolfe.github.io/CRUDkit/)
- **Storybook**: [https://tortoisewolfe.github.io/CRUDkit/storybook/](https://tortoisewolfe.github.io/CRUDkit/storybook/)
- **Status Dashboard**: [https://tortoisewolfe.github.io/CRUDkit/status](https://tortoisewolfe.github.io/CRUDkit/status)

## ✨ Features

### 🎨 Theming System

- 32 DaisyUI themes (16 light + 16 dark)
- Persistent theme selection
- Smooth theme transitions
- Accessibility controls (font size, spacing)

### 📱 Progressive Web App

- Installable on desktop and mobile
- Offline support with Service Worker
- Background sync for forms
- App shortcuts
- 92/100 PWA Lighthouse score

### 🧩 Component Library

- Atomic design pattern
- Sub-atomic components (Text, Button, Input)
- Atomic components (Card, Form, Modal)
- Fully documented in Storybook

### 📊 Monitoring & Analytics

- Real-time Web Vitals tracking
- Dynamic Lighthouse testing via PageSpeed API
- PWA feature testing with comprehensive suite
- Docker health monitoring via main page check
- TASKS.md progress tracking (auto-updated)
- GitHub Actions CI/CD with automated testing
- Interactive status dashboard at `/status`

### 🧪 Testing & Quality

- Vitest unit testing framework
- React Testing Library for component tests
- Coverage reporting with thresholds
- Prettier code formatting with Tailwind CSS plugin
- Husky pre-commit hooks with lint-staged
- Automated CI/CD pipeline on GitHub Actions

### 🏆 Lighthouse Scores

- **Performance**: 92/100
- **Accessibility**: 98/100
- **Best Practices**: 95/100
- **SEO**: 100/100
- **PWA**: 92/100

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2
- **UI**: React 19.1.0
- **Styling**: Tailwind CSS + DaisyUI
- **TypeScript**: 5.x with strict mode
- **Testing**: Vitest, React Testing Library, @vitest/coverage-v8
- **Code Quality**: Prettier 3.6.2 with Tailwind plugin
- **CI/CD**: GitHub Actions, Husky pre-commit hooks
- **Deployment**: GitHub Pages
- **Documentation**: Storybook 9.1.5

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/TortoiseWolfe/CRUDkit.git
cd CRUDkit

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up

# App runs on http://localhost:3000
# Storybook runs on http://localhost:6006
```

## 📚 Documentation

### Testing Documentation

See [TESTING.md](./TESTING.md) for comprehensive testing guidelines, including:

- Component testing patterns
- Coverage requirements
- CI/CD integration
- Pre-commit hooks setup

### Key Pages

- `/` - Home with component showcase
- `/themes` - Theme switcher
- `/components` - Component gallery
- `/accessibility` - Accessibility controls
- `/status` - System status dashboard

### Development Commands

```bash
# Development
pnpm dev              # Start Next.js dev server
pnpm storybook       # Start Storybook

# Building
pnpm build           # Build for production
pnpm export          # Export static site

# Testing
pnpm test            # Run unit tests
pnpm test:watch      # Run tests in watch mode
pnpm test:coverage   # Generate coverage report
pnpm lint            # Run ESLint
pnpm type-check      # Run TypeScript checks
pnpm format          # Format all files with Prettier
pnpm format:check    # Check formatting without changes

# Deployment
pnpm deploy          # Deploy to GitHub Pages
```

## 🎯 Future Improvements

See [docs/IMPROVEMENTS.md](./docs/IMPROVEMENTS.md) for detailed optimization opportunities.

### Quick Wins (< 30 minutes)

- Add maskable PWA icons (192x192, 512x512)
- Add Apple touch icon for iOS
- Improve button accessibility labels
- Add form input labels
- Implement SRI for external resources

## 🤝 Contributing

1. Fork the repository on [GitHub](https://github.com/TortoiseWolfe/CRUDkit/fork)
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [docs/IMPROVEMENTS.md](./docs/IMPROVEMENTS.md) for specific areas where contributions are welcome.

## 📈 Project Status

**Overall Progress**: 74% Complete (119/161 tasks)

**Sprint 1**: ✅ Complete (95/96 tasks - 99%)

- ✅ **Phase 0**: Next.js app deployed to GitHub Pages
- ✅ **Phase 1**: Storybook integrated with Text component
- ✅ **Phase 2**: 32-theme system with accessibility controls
- ✅ **Phase 3**: Component gallery with atomic design
- ✅ **Phase 4**: PWA features with comprehensive testing

**Sprint 2**: 🚧 In Progress (24/65 tasks - 37%)

- ✅ **Phase 1**: Testing Foundation (Vitest, Husky, CI/CD)
- ✅ **Phase 2 Week 3**: Developer Experience (Prettier, Docker tools)
- ✅ **Phase 2 Week 4**: Dependabot and error handling
- ⏳ **Phase 3**: First Simple Feature (Dice component)
- ⏳ **Phase 4**: Quality Baseline (Zod validation, security)
- ⏳ **Phase 5**: Foundation Completion (health checks, Pa11y)

View detailed progress in [docs/spec-kit/TASKS.md](./docs/spec-kit/TASKS.md)

## 📄 License

MIT

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [DaisyUI](https://daisyui.com)
- Deployed on [GitHub Pages](https://pages.github.com)

---

**Note for Forkers**:

- TASKS.md automatically updates during build (`pnpm build`)
- Update your own tasks in `docs/spec-kit/TASKS.md`
- Status page dynamically tracks your project progress
- Check [docs/IMPROVEMENTS.md](./docs/IMPROVEMENTS.md) for optimization opportunities
