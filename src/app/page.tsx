'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseTasksFile, TaskProgress } from '@/utils/tasks-parser';
import CaptainShipCrewWithNPC from '@/components/atomic/CaptainShipCrewWithNPC/CaptainShipCrewWithNPC';

export default function Home() {
  const [taskProgress, setTaskProgress] = useState<TaskProgress | null>(null);

  useEffect(() => {
    parseTasksFile().then(setTaskProgress).catch(console.error);
  }, []);

  return (
    <main className="from-base-200 via-base-100 to-base-200 min-h-screen bg-gradient-to-br">
      {/* Skip to main content for accessibility */}
      <a
        href="#game-demo"
        className="btn btn-sm btn-primary sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Skip to game demo
      </a>

      {/* Floating Progress Badge */}
      {taskProgress && (
        <aside
          aria-label="Project completion status"
          className="fixed top-4 right-4 z-50"
        >
          <Link
            href="/status"
            className="badge badge-success badge-lg cursor-pointer gap-2 shadow-lg transition-transform hover:scale-105"
            aria-label={`Project ${taskProgress.percentage}% complete. Click to view detailed status.`}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{taskProgress.percentage}% Complete</span>
          </Link>
        </aside>
      )}

      {/* Interactive Demo Section - TOP OF PAGE */}
      <section
        id="game-demo"
        aria-label="Interactive game demo"
        className="from-primary/10 to-base-200/50 relative bg-gradient-to-b px-4 py-8"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="mb-4 text-center">
            <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent">
              🎲 Captain, Ship & Crew Tournament
            </h1>
            <p className="mt-2 text-sm opacity-75">
              🎯 Tournament Mode • 🤖 3 AI Opponents • 🏆 First to 50 Points
              Wins
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <CaptainShipCrewWithNPC
                playerCount={4}
                gameMode="target"
                targetScore={50}
                className="shadow-2xl"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="mx-auto max-w-2xl text-base opacity-87">
              Experience our interactive components! Play this classic dice game
              against AI opponents. Roll for Ship (6), Captain (5), and Crew (4)
              in sequence, then score with cargo dice!
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section
        id="main-content"
        aria-label="Welcome hero"
        className="hero relative min-h-[70vh] overflow-hidden"
      >
        <div className="hero-content py-20 text-center">
          <div className="max-w-4xl">
            {/* Main Title */}
            <h1 className="from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
              CRUDkit
            </h1>

            {/* Subtitle */}
            <p className="text-base-content/87 mb-6 text-xl md:text-2xl">
              Modern Next.js Starter with Everything Built-In
            </p>

            {/* Tech Stack */}
            <div
              className="mb-12 flex flex-wrap justify-center gap-2"
              role="list"
              aria-label="Technology stack"
            >
              <span role="listitem" className="badge badge-outline">
                Next.js 15.5
              </span>
              <span role="listitem" className="badge badge-outline">
                React 19
              </span>
              <span role="listitem" className="badge badge-outline">
                TypeScript
              </span>
              <span role="listitem" className="badge badge-outline">
                Tailwind CSS
              </span>
              <span role="listitem" className="badge badge-outline">
                PWA Ready
              </span>
            </div>

            {/* Primary Actions */}
            <nav
              aria-label="Primary navigation"
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/components" className="btn btn-primary btn-lg group">
                <svg
                  className="mr-2 h-5 w-5 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                Explore Components
              </Link>
              <Link href="/themes" className="btn btn-secondary btn-lg group">
                <svg
                  className="mr-2 h-5 w-5 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                Browse Themes
              </Link>
              <a
                href="https://github.com/TortoiseWolfe/CRUDkit"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg group"
              >
                <svg
                  className="mr-2 h-5 w-5 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Source
              </a>
            </nav>

            {/* Quick Links */}
            <nav
              aria-label="Secondary navigation"
              className="mt-10 flex justify-center gap-4 text-sm"
            >
              <Link
                href="/status"
                className="link link-hover opacity-87 hover:opacity-100 focus:opacity-100"
              >
                Status Dashboard
              </Link>
              <span className="opacity-30" aria-hidden="true">
                •
              </span>
              <Link
                href="/accessibility"
                className="link link-hover opacity-87 hover:opacity-100 focus:opacity-100"
              >
                Accessibility
              </Link>
              <span className="opacity-30" aria-hidden="true">
                •
              </span>
              <a
                href="https://tortoisewolfe.github.io/CRUDkit/storybook/"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover opacity-87 hover:opacity-100 focus:opacity-100"
              >
                Storybook
              </a>
              <span className="opacity-30" aria-hidden="true">
                •
              </span>
              <a
                href="https://github.com/TortoiseWolfe/CRUDkit/fork"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover opacity-87 hover:opacity-100 focus:opacity-100"
              >
                Fork on GitHub
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section aria-label="Key features" className="px-4 py-20">
        <div className="container mx-auto">
          <h2 className="sr-only">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <article className="card bg-base-100 focus-within:ring-primary shadow-xl transition-all focus-within:ring-2 hover:-translate-y-1 hover:shadow-2xl">
              <div className="card-body items-center text-center">
                <div
                  className="mb-4 text-5xl"
                  role="img"
                  aria-label="Artist palette"
                >
                  🎨
                </div>
                <h3 className="card-title text-lg">32 Themes</h3>
                <p className="text-base-content/87 text-sm">
                  Light & dark variants with live switching
                </p>
              </div>
            </article>

            <article className="card bg-base-100 focus-within:ring-primary shadow-xl transition-all focus-within:ring-2 hover:-translate-y-1 hover:shadow-2xl">
              <div className="card-body items-center text-center">
                <div
                  className="mb-4 text-5xl"
                  role="img"
                  aria-label="Mobile phone"
                >
                  📱
                </div>
                <h3 className="card-title text-lg">PWA Ready</h3>
                <p className="text-base-content/87 text-sm">
                  Installable with offline support
                </p>
              </div>
            </article>

            <article className="card bg-base-100 focus-within:ring-primary shadow-xl transition-all focus-within:ring-2 hover:-translate-y-1 hover:shadow-2xl">
              <div className="card-body items-center text-center">
                <div
                  className="mb-4 text-5xl"
                  role="img"
                  aria-label="Wheelchair accessibility symbol"
                >
                  ♿
                </div>
                <h3 className="card-title text-lg">Accessible</h3>
                <p className="text-base-content/87 text-sm">
                  WCAG compliant with customization
                </p>
              </div>
            </article>

            <article className="card bg-base-100 focus-within:ring-primary shadow-xl transition-all focus-within:ring-2 hover:-translate-y-1 hover:shadow-2xl">
              <div className="card-body items-center text-center">
                <div
                  className="mb-4 text-5xl"
                  role="img"
                  aria-label="Rocket launch"
                >
                  🚀
                </div>
                <h3 className="card-title text-lg">Production Ready</h3>
                <p className="text-base-content/87 text-sm">
                  CI/CD, monitoring, and testing built-in
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {taskProgress && (
        <section
          aria-label="Project statistics"
          className="bg-base-200/50 px-4 py-20"
        >
          <div className="container mx-auto">
            <h2 className="mb-4 text-center text-3xl font-bold">
              Project Progress
            </h2>
            <p className="text-base-content/70 mx-auto mb-8 max-w-2xl text-center">
              Generated from spec-kit → PLAN.md → TASKS.md
              <br />
              <span className="text-sm">
                Fork this project, edit the{' '}
                <a
                  href="https://github.com/TortoiseWolfe/CRUDkit/blob/main/docs/constitution.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  constitution
                </a>{' '}
                with your requirements, and run Docker to generate your custom
                project plan!
              </span>
            </p>

            <div className="mb-8 flex justify-center">
              <div className="stats bg-base-100 shadow-xl">
                <div className="stat">
                  <div className="stat-title">Tasks Completed</div>
                  <div className="stat-value text-primary">
                    {taskProgress.completedTasks}
                  </div>
                  <div className="stat-desc">
                    of {taskProgress.totalTasks} total
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title">Project Status</div>
                  <div className="stat-value text-success">
                    {taskProgress.percentage}%
                  </div>
                  <div className="stat-desc">Complete</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Phases Done</div>
                  <div className="stat-value text-secondary">
                    {Object.keys(taskProgress.phases).length +
                      Object.values(taskProgress.sprint2Phases || {}).filter(
                        (phase) => phase.complete
                      ).length}
                  </div>
                  <div className="stat-desc">Milestones reached</div>
                </div>
              </div>
            </div>

            {/* Spec-Kit Info Box - Centered and Clean */}
            <div className="mx-auto max-w-4xl">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="mb-4 text-center text-2xl font-bold">
                    🚀 Built with GitHub Spec Kit
                    <br />+ Claude Code
                  </h3>
                  <p className="text-base-content/80 mb-6 text-center text-sm">
                    Using{' '}
                    <a
                      href="https://github.com/github/spec-kit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary font-semibold"
                    >
                      GitHub&apos;s Spec Kit
                    </a>{' '}
                    (released last week!) with Docker
                  </p>

                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="mb-4 text-center font-semibold">
                      How We Built This:
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="badge badge-primary">1</span>
                        <div className="flex-1">
                          <code className="font-mono text-sm">
                            docs/constitution.md
                          </code>
                          <span className="text-base-content/70 ml-2 text-xs">
                            → Project principles (edited with Claude Code)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="badge badge-primary">2</span>
                        <div className="flex-1">
                          <code className="font-mono text-sm">
                            docs/spec-kit/spec.md
                          </code>
                          <span className="text-base-content/70 ml-2 text-xs">
                            → What to build (Claude wrote this)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="badge badge-primary">3</span>
                        <div className="flex-1">
                          <code className="font-mono text-sm">
                            docs/spec-kit/PLAN.md
                          </code>
                          <span className="text-base-content/70 ml-2 text-xs">
                            → Technical plan (Claude generated)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="badge badge-primary">4</span>
                        <div className="flex-1">
                          <code className="font-mono text-sm">
                            docs/spec-kit/TASKS.md
                          </code>
                          <span className="text-base-content/70 ml-2 text-xs">
                            → 161 tasks (59% complete)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-base-300 mt-4 border-t pt-4">
                      <p className="text-base-content/60 text-center text-xs">
                        💡 <strong>The Magic:</strong> Claude Code + Docker +
                        Spec Kit = This entire project!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tutorial Section - Full Width */}
              <div id="tutorial" className="card bg-base-100 mt-4 shadow-xl">
                <div className="card-body">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <p className="mb-2 text-sm font-medium">
                      🎯 Try it yourself with Claude Code + Docker (in THIS
                      repo!):
                    </p>

                    <details className="collapse-arrow bg-primary/10 border-primary collapse border-2">
                      <summary className="collapse-title hover:bg-primary/20 text-primary animate-pulse cursor-pointer text-base font-bold">
                        ✨ 📖 How to Use Spec Kit with Claude Code (START HERE!
                        👈 Click to expand)
                      </summary>
                      <div className="collapse-content">
                        <div className="space-y-4 pt-4">
                          <div className="bg-warning/20 rounded p-3">
                            <p className="mb-2 text-sm font-bold">
                              ⚡ The Claude Code + Docker Workflow:
                            </p>
                            <p className="text-xs">
                              You&apos;ll use{' '}
                              <strong>Claude Code in your terminal</strong> to
                              edit files in THIS repo, then run Docker commands
                              to generate each phase. Claude Code acts as your
                              pair programmer!
                            </p>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-semibold">
                              1. Fork this repo & setup Docker:
                            </p>
                            <code className="bg-base-300 block rounded p-2 font-mono text-xs">
                              # In your terminal with Claude Code:
                              <br />
                              cd docs/spec-kit
                              <br />
                              docker compose build
                              <br />
                              docker compose up -d
                              <br />
                              docker compose exec speckit bash
                            </code>
                          </div>

                          <div className="bg-primary/20 rounded p-3">
                            <p className="mb-2 text-sm font-bold">
                              🎁 You Already Have Everything!
                            </p>
                            <p className="mb-2 text-xs">
                              <strong>
                                Claude Code can see ALL of CRUDkit&apos;s code!
                              </strong>{' '}
                              You don&apos;t build from scratch:
                            </p>
                            <ul className="ml-4 space-y-1 text-xs">
                              <li>
                                • Keep the 32 themes, PWA, and testing
                                infrastructure
                              </li>
                              <li>
                                • Modify existing components for YOUR needs
                              </li>
                              <li>
                                • Deploy to GitHub Pages in minutes (workflow
                                included!)
                              </li>
                              <li>
                                • Use CRUDkit as your foundation for rapid
                                prototyping
                              </li>
                            </ul>
                            <p className="mt-2 text-xs font-semibold">
                              Example: &quot;Claude, turn the status page into a
                              workout tracker&quot; - Claude modifies the
                              existing page!
                            </p>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-semibold">
                              2. Initialize YOUR project (or keep CRUDkit):
                            </p>
                            <code className="bg-base-300 block rounded p-2 font-mono text-xs">
                              # Inside Docker container:
                              <br />
                              specify init YOUR_PROJECT --here
                            </code>
                            <p className="text-base-content/70 mt-1 text-xs">
                              Choose option 2 for Claude when prompted
                            </p>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-semibold">
                              3. Edit constitution.md with Claude Code:
                            </p>
                            <div className="bg-info/20 space-y-2 rounded p-3 text-xs">
                              <p className="font-bold">
                                Ask Claude Code in your terminal:
                              </p>
                              <code className="bg-base-300 mt-1 block rounded p-2 font-mono">
                                &quot;Claude, edit docs/constitution.md to
                                define
                                <br />
                                principles for my [YOUR APP IDEA] app&quot;
                                <br />
                              </code>
                              <p className="text-base-content/70 mt-2 text-xs">
                                Claude Code will write your project&apos;s
                                constitution directly in the file!
                              </p>
                              <div className="bg-warning/30 mt-2 rounded p-2">
                                <p className="text-xs font-bold">
                                  👁️ REVIEW CHECKPOINT:
                                </p>
                                <p className="text-xs">
                                  Review and refine constitution.md before
                                  proceeding. This is YOUR project&apos;s
                                  foundation!
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-semibold">
                              4. Generate Each Phase with Claude Code:
                            </p>
                            <div className="space-y-3">
                              <div className="border-primary border-l-2 pl-2">
                                <p className="text-xs font-bold">
                                  a) Generate Specification:
                                </p>
                                <code className="bg-base-300 mt-1 block rounded p-2 font-mono text-xs">
                                  # Ask Claude Code:
                                  <br />
                                  &quot;Claude, create a spec.md for my app
                                  idea:
                                  <br />
                                  [describe your app]. Save it to
                                  docs/spec-kit/spec.md&quot;
                                  <br />
                                  <br />
                                  # Then in Docker:
                                  <br />
                                  specify generate spec &lt; spec.md &gt;
                                  spec-output.md
                                </code>
                                <p className="text-success mt-1 text-xs">
                                  → Spec Kit generates spec-output.md
                                </p>
                                <div className="bg-warning/30 mt-2 rounded p-2">
                                  <p className="text-xs font-bold">
                                    👁️ HUMAN REVIEW:
                                  </p>
                                  <p className="text-xs">
                                    Read spec-output.md carefully. Edit it! Add
                                    missing features, remove unwanted ones. Then
                                    ask Claude to refine it further before
                                    moving to the plan phase.
                                  </p>
                                </div>
                              </div>

                              <div className="border-primary border-l-2 pl-2">
                                <p className="text-xs font-bold">
                                  b) Generate Plan:
                                </p>
                                <code className="bg-base-300 mt-1 block rounded p-2 font-mono text-xs">
                                  # Ask Claude Code:
                                  <br />
                                  &quot;Claude, read spec-output.md and generate
                                  <br />
                                  a technical PLAN.md with Next.js stack&quot;
                                  <br />
                                  <br />
                                  # Then in Docker:
                                  <br />
                                  specify generate plan &lt; PLAN.md &gt;
                                  plan-output.md
                                </code>
                                <p className="text-success mt-1 text-xs">
                                  → Spec Kit generates plan-output.md
                                </p>
                                <div className="bg-warning/30 mt-2 rounded p-2">
                                  <p className="text-xs font-bold">
                                    👁️ HUMAN REVIEW:
                                  </p>
                                  <p className="text-xs">
                                    Review plan-output.md. Adjust tech stack,
                                    add/remove components, refine architecture.
                                    This is YOUR technical blueprint!
                                  </p>
                                </div>
                              </div>

                              <div className="border-primary border-l-2 pl-2">
                                <p className="text-xs font-bold">
                                  c) Generate Tasks:
                                </p>
                                <code className="bg-base-300 mt-1 block rounded p-2 font-mono text-xs">
                                  # Ask Claude Code:
                                  <br />
                                  &quot;Claude, break down plan-output.md into
                                  <br />
                                  detailed TASKS.md with checkboxes&quot;
                                  <br />
                                  <br />
                                  # Then in Docker:
                                  <br />
                                  specify generate tasks &lt; TASKS.md
                                </code>
                                <p className="text-success mt-1 text-xs">
                                  → Spec Kit generates TASKS.md
                                </p>
                                <div className="bg-warning/30 mt-2 rounded p-2">
                                  <p className="text-xs font-bold">
                                    👁️ HUMAN REVIEW:
                                  </p>
                                  <p className="text-xs">
                                    Review TASKS.md. Reorder priorities, add
                                    missing tasks, remove unnecessary ones.
                                    These are YOUR implementation steps!
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-info/20 mb-3 rounded p-3">
                            <p className="mb-2 text-sm font-bold">
                              ⚠️ Important: This is an ITERATIVE Process!
                            </p>
                            <p className="mb-2 text-xs">
                              <strong>
                                Each phase requires YOUR review and refinement.
                              </strong>{' '}
                              Spec Kit generates drafts, but YOU control the
                              final output:
                            </p>
                            <ul className="ml-4 space-y-1 text-xs">
                              <li>
                                • Review each generated file before proceeding
                              </li>
                              <li>
                                • Edit directly or ask Claude Code to refine
                              </li>
                              <li>• Iterate until YOU&apos;re satisfied</li>
                              <li>• Only move to the next phase when ready</li>
                            </ul>
                          </div>

                          <div className="bg-success/20 rounded p-3">
                            <p className="mb-1 text-sm font-bold">
                              💡 The Secret Sauce:
                            </p>
                            <p className="text-xs">
                              <strong>
                                Claude Code IS your development partner!
                              </strong>{' '}
                              You&apos;re not copying/pasting between tools.
                              Claude Code directly edits files in your repo,
                              runs Docker commands, and iterates with you. This
                              is EXACTLY how CRUDkit was built - Claude Code +
                              Spec Kit + Docker + Human Review!
                            </p>
                          </div>

                          <div className="bg-base-200 mt-3 rounded p-2 text-xs">
                            <strong>Example Claude Code conversation:</strong>
                            <div className="mt-1 font-mono text-xs">
                              You: &quot;Build a recipe sharing app&quot;
                              <br />
                              Claude: &quot;I&apos;ll help you create that! Let
                              me start by writing your constitution.md...&quot;
                              <br />
                              You: &quot;Now run specify generate spec&quot;
                              <br />
                              Claude: *runs Docker command and refines output*
                              <br />
                              You: &quot;Generate the plan&quot;
                              <br />
                              Claude: *creates PLAN.md with full tech stack*
                            </div>
                          </div>
                        </div>
                      </div>
                    </details>

                    <p className="text-base-content/60 mt-3 text-xs">
                      Quick start without Docker:
                    </p>
                    <code className="bg-base-300 mt-1 block rounded p-2 font-mono text-xs">
                      uvx --from git+https://github.com/github/spec-kit.git
                      specify init YOUR_PROJECT
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
