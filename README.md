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
- PWA feature testing
- Lighthouse score monitoring
- GitHub Actions CI/CD
- Status dashboard at `/status`

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
- **Testing**: PWA test utilities
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
pnpm lint            # Run ESLint
pnpm type-check      # Run TypeScript checks

# Deployment
pnpm deploy          # Deploy to GitHub Pages
```

## 🎯 Improvement Opportunities

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for detailed optimization tasks to achieve perfect Lighthouse scores.

### Quick Wins
- Add PWA icons (+4 points)
- Improve button accessibility (+1 point)
- Add Content Security Policy (+3 points)

## 🤝 Contributing

1. Fork the repository on [GitHub](https://github.com/TortoiseWolfe/CRUDkit/fork)
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for specific areas where contributions are welcome.

## 📈 Project Status

**Phase 4 Complete** (88% overall completion)
- ✅ Next.js app deployed
- ✅ Storybook integrated
- ✅ 32-theme system
- ✅ Component gallery
- ✅ PWA features
- ✅ Status dashboard
- ✅ Web Vitals monitoring

View detailed progress in [docs/spec-kit/TASKS.md](./docs/spec-kit/TASKS.md)

## 📄 License

MIT

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [DaisyUI](https://daisyui.com)
- Deployed on [GitHub Pages](https://pages.github.com)

---

**Note for Forkers**: This starter includes extensive monitoring and PWA features. Check [IMPROVEMENTS.md](./IMPROVEMENTS.md) for optimization opportunities specific to your use case.