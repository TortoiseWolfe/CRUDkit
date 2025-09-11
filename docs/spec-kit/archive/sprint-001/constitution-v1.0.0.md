# CRUDkit - Universal PWA Meta-Template Constitution v1.0.0

**Repository**: https://github.com/TortoiseWolfe/CRUDkit  
**Description**: Evolutionary meta-template with 12 themes, PWA, and AI-optimized patterns

## REFERENCE TEMPLATES
Learn from these implementations, improve upon them:
- **Punk_Stack**: Working app with 12 themes, modern stack (primary reference)
- **001_template**: PRP methodology, email providers, form patterns
- **000_Template**: Testing configs, validation loops, AI documentation
- **Punk_Stack_archived**: Advanced tooling, OKLCH scripts, monorepo patterns

## 1. FOUNDATION (Prerequisites)
- Docker-first infrastructure (see Punk_Stack docker-compose.yml)
- Spec-kit compatible structure
- Git-based version control
- Node.js 20+ and npm 9+

## 2. CORE PRINCIPLES (Non-negotiable)

### Infrastructure
- **Docker**: All environments with health checks (reference: Punk_Stack multi-profile setup)
- **PWA**: Offline-first, service workers, background sync (reference: Punk_Stack src/app/manifest.ts)
- **Accessibility**: WCAG AA, colorblind support, keyboard nav (reference: 000_Template .pa11yci)

### Development Philosophy
- **PRP→Spec→Implementation**: Problem definition first (reference: 001_template/src/prp/)
- **Test-First Development**: TDD mandatory (reference: Punk_Stack 265+ test files)
- **Performance Gates**: <100ms interactions, >90 Lighthouse (reference: Punk_Stack configs)

## 3. DEVELOPMENT PIPELINE (Order matters)

1. **PRP Creation** - Define the problem (study: 001_template PRP structure)
2. **Spec Generation** - Design the solution (use spec-kit)
3. **Test Writing** - Validation first (study: Punk_Stack __tests__/)
4. **Implementation** - Code second (reference: Punk_Stack src/)
5. **Validation Loops** - 6 levels (reference: 000_Template validation process)
6. **Documentation** - AI context, component docs (reference: 000_Template ai_docs/claude.md)

## 4. TECHNICAL STANDARDS

### Architecture
- **Atomic Design**: atoms → molecules → organisms → templates (reference: Punk_Stack components/)
- **TypeScript-strict**: No any types, strict mode (reference: Punk_Stack tsconfig.json)
- **Theme System**: Multiple themes, instant switching (reference: Punk_Stack 12 themes)
- **Component Structure**: 4 files per component (reference: 001_template pattern)

### Quality Gates
- **Pre-commit**: Lint + Type check
- **Pre-push**: Unit tests pass
- **PR Checks**: Full test suite + Visual regression + Build
- **Main Branch**: E2E tests + Deploy
(reference: All templates' package.json scripts)

### Testing Strategy
- **Unit**: 60% coverage minimum (reference: Punk_Stack vitest.config.ts)
- **Integration**: 30% critical paths (reference: Punk_Stack __tests__/integration/)
- **E2E**: 10% user journeys (reference: 000_Template playwright configs)
- **Accessibility**: Pa11y CI (reference: 000_Template .pa11yci)
- **Visual**: Chromatic/Percy (reference: Punk_Stack_archived storybook)

### Security Framework
- **Input Validation**: Zod schemas, sanitization (reference: 001_template forms)
- **CSP Headers**: Strict policies (reference: 000_Template SECURITY.md)
- **Privacy-First**: GDPR compliant, minimal tracking (reference: 001_template privacy)
- **Scanning Schedule**: Daily deps, weekly static, monthly dynamic (reference: 000_Template)

## 5. IMPLEMENTATION GUIDANCE

When generating code:
1. **Start** with Punk_Stack project structure and configuration
2. **Enhance** with 001_template PRP methodology and forms
3. **Add** 000_Template testing rigor and validation loops
4. **Include** Punk_Stack_archived advanced tooling scripts
5. **Improve** upon all references - fix issues, update deps, optimize

### Key Files to Study
- Docker setup: `Punk_Stack/docker-compose.yml`
- PWA config: `Punk_Stack/src/app/manifest.ts`
- Theme system: `Punk_Stack/src/styles/themes/`
- Testing: `Punk_Stack/__tests__/` and `000_Template/.pa11yci`
- PRPs: `001_template/src/prp/`
- AI docs: `000_Template/ai_docs/claude.md`
- Security: `000_Template/SECURITY.md`

## 6. DEPLOYMENT

### GitHub Pages
- **Dual deployment**: App + Storybook (reference: Punk_Stack .github/workflows/)
- **Static optimization**: Next.js output export (reference: Punk_Stack next.config.ts)
- **Base path handling**: Subdirectory support (reference: Punk_Stack env setup)

### Other Targets
- **Vercel**: Edge functions, preview deployments
- **Docker**: Multi-stage builds, health checks
- **VPS**: Traditional hosting with PM2

### Feature Flags
- Environment-based toggling (reference: All templates' .env patterns)
- Build-time optimization (reference: Punk_Stack SKIP_PWA flag)
- Runtime configuration (reference: 001_template provider switching)

## 7. REQUIRED INTEGRATIONS

### Core Features
- **Storybook**: Component development and documentation
- **PWA**: Service worker, manifest, offline support
- **Forms**: Multi-provider email (Web3Forms, EmailJS, Resend)
- **Calendar**: Calendly or Cal.com integration
- **Analytics**: Privacy-first, opt-in only

### Developer Tools
- **Chromatic/Percy**: Visual regression testing
- **Lighthouse CI**: Performance monitoring
- **Sentry**: Error tracking (optional)
- **GitHub Actions**: CI/CD pipeline

## 8. GOVERNANCE

### Evolution Principles
- Learn from references, don't just copy
- Each generation should improve upon the last
- Document what was improved and why
- Track metrics to prove improvements

### Review Cycles
- Quarterly constitution reviews
- Update reference templates as they improve
- Capture learnings in ADRs
- Version control all changes

### Success Metrics
- Setup time: <30 minutes from clone to running
- Performance: >95 Lighthouse scores
- Test coverage: >80% for critical paths
- Developer satisfaction: Measure and improve

---

**Version**: 1.0.0  
**Created**: 2025-09-09  
**Philosophy**: Reference, learn, improve - don't just copy

**What's New in v1.0.0**:
- Complete rewrite focused on referencing existing templates
- Reduced from 446 to ~170 lines (62% reduction)
- Clear learning path with specific file references
- Evolution-focused approach encouraging improvement
- Streamlined structure with clear dependencies
- Removed duplication and consolidated related concepts