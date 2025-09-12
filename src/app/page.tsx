'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { parseTasksFile, TaskProgress } from '@/utils/tasks-parser';

export default function Home() {
  const [taskProgress, setTaskProgress] = useState<TaskProgress | null>(null);

  useEffect(() => {
    parseTasksFile().then(setTaskProgress).catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 btn btn-sm btn-primary">
        Skip to main content
      </a>

      {/* Floating Progress Badge */}
      {taskProgress && (
        <aside aria-label="Project completion status" className="fixed top-4 right-4 z-50">
          <Link 
            href="/status" 
            className="badge badge-success badge-lg gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
            aria-label={`Project ${taskProgress.percentage}% complete. Click to view detailed status.`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{taskProgress.percentage}% Complete</span>
          </Link>
        </aside>
      )}

      {/* Hero Section */}
      <section id="main-content" aria-label="Welcome hero" className="hero min-h-[70vh] relative overflow-hidden">
        <div className="hero-content text-center py-20">
          <div className="max-w-4xl">
            {/* Main Title */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CRUDkit
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-6 text-base-content/87">
              Modern Next.js Starter with Everything Built-In
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 justify-center mb-12" role="list" aria-label="Technology stack">
              <span role="listitem" className="badge badge-outline">Next.js 15.5</span>
              <span role="listitem" className="badge badge-outline">React 19</span>
              <span role="listitem" className="badge badge-outline">TypeScript</span>
              <span role="listitem" className="badge badge-outline">Tailwind CSS</span>
              <span role="listitem" className="badge badge-outline">PWA Ready</span>
            </div>

            {/* Primary Actions */}
            <nav aria-label="Primary navigation" className="flex gap-4 justify-center flex-wrap">
              <Link href="/components" className="btn btn-primary btn-lg group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                Explore Components
              </Link>
              <Link href="/themes" className="btn btn-secondary btn-lg group">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Browse Themes
              </Link>
              <a 
                href="https://github.com/TortoiseWolfe/CRUDkit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Source
              </a>
            </nav>

            {/* Quick Links */}
            <nav aria-label="Secondary navigation" className="mt-10 flex gap-4 justify-center text-sm">
              <Link href="/status" className="link link-hover opacity-87 hover:opacity-100 focus:opacity-100">
                Status Dashboard
              </Link>
              <span className="opacity-30" aria-hidden="true">•</span>
              <Link href="/accessibility" className="link link-hover opacity-87 hover:opacity-100 focus:opacity-100">
                Accessibility
              </Link>
              <span className="opacity-30" aria-hidden="true">•</span>
              <a href="https://tortoisewolfe.github.io/CRUDkit/storybook/" target="_blank" rel="noopener noreferrer" className="link link-hover opacity-87 hover:opacity-100 focus:opacity-100">
                Storybook
              </a>
              <span className="opacity-30" aria-hidden="true">•</span>
              <a href="https://github.com/TortoiseWolfe/CRUDkit/fork" target="_blank" rel="noopener noreferrer" className="link link-hover opacity-87 hover:opacity-100 focus:opacity-100">
                Fork on GitHub
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section aria-label="Key features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="sr-only">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all focus-within:ring-2 focus-within:ring-primary">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4" role="img" aria-label="Artist palette">
                  🎨
                </div>
                <h3 className="card-title text-lg">32 Themes</h3>
                <p className="text-sm text-base-content/87">
                  Light & dark variants with live switching
                </p>
              </div>
            </article>
            
            <article className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all focus-within:ring-2 focus-within:ring-primary">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4" role="img" aria-label="Mobile phone">
                  📱
                </div>
                <h3 className="card-title text-lg">PWA Ready</h3>
                <p className="text-sm text-base-content/87">
                  Installable with offline support
                </p>
              </div>
            </article>
            
            <article className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all focus-within:ring-2 focus-within:ring-primary">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4" role="img" aria-label="Wheelchair accessibility symbol">
                  ♿
                </div>
                <h3 className="card-title text-lg">Accessible</h3>
                <p className="text-sm text-base-content/87">
                  WCAG compliant with customization
                </p>
              </div>
            </article>
            
            <article className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all focus-within:ring-2 focus-within:ring-primary">
              <div className="card-body items-center text-center">
                <div className="text-5xl mb-4" role="img" aria-label="Rocket launch">
                  🚀
                </div>
                <h3 className="card-title text-lg">Production Ready</h3>
                <p className="text-sm text-base-content/87">
                  CI/CD, monitoring, and testing built-in
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {taskProgress && (
        <section aria-label="Project statistics" className="py-20 px-4 bg-base-200/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Project Progress</h2>
            <p className="text-center text-base-content/70 mb-8 max-w-2xl mx-auto">
              Generated from spec-kit → PLAN.md → TASKS.md
              <br />
              <span className="text-sm">
                Fork this project, edit the{' '}
                <a href="https://github.com/TortoiseWolfe/CRUDkit/blob/main/docs/constitution.md" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="link link-primary">
                  constitution
                </a>
                {' '}with your requirements, and run Docker to generate your custom project plan!
              </span>
            </p>
            
            <div className="flex justify-center mb-8">
              <div className="stats shadow-xl bg-base-100">
                <div className="stat">
                  <div className="stat-title">Tasks Completed</div>
                  <div className="stat-value text-primary">{taskProgress.completedTasks}</div>
                  <div className="stat-desc">of {taskProgress.totalTasks} total</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title">Project Status</div>
                  <div className="stat-value text-success">{taskProgress.percentage}%</div>
                  <div className="stat-desc">Complete</div>
                </div>
                
                <div className="stat">
                  <div className="stat-title">Phases Done</div>
                  <div className="stat-value text-secondary">{Object.keys(taskProgress.phases).length}</div>
                  <div className="stat-desc">Milestones reached</div>
                </div>
              </div>
            </div>

            {/* Spec-Kit Info Box - Centered and Clean */}
            <div className="max-w-4xl mx-auto">
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h3 className="text-2xl font-bold text-center mb-4">🚀 Built with GitHub Spec Kit<br />+ Claude Code</h3>
                  <p className="text-sm text-center text-base-content/80 mb-6">
                    Using <a href="https://github.com/github/spec-kit" target="_blank" rel="noopener noreferrer" className="link link-primary font-semibold">GitHub&apos;s Spec Kit</a> (released last week!) with Docker
                  </p>
                  
                  <div className="bg-base-200 p-4 rounded-lg">
                    <p className="font-semibold text-center mb-4">How We Built This:</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="badge badge-primary">1</span>
                        <div className="flex-1">
                          <code className="font-mono text-sm">docs/constitution.md</code>
                          <span className="text-xs text-base-content/70 ml-2">→ Project principles (edited with Claude Code)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="badge badge-primary">2</span>
                        <div className="flex-1">
                          <code className="font-mono text-sm">docs/spec-kit/spec.md</code>
                          <span className="text-xs text-base-content/70 ml-2">→ What to build (Claude wrote this)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="badge badge-primary">3</span>
                        <div className="flex-1">
                          <code className="font-mono text-sm">docs/spec-kit/PLAN.md</code>
                          <span className="text-xs text-base-content/70 ml-2">→ Technical plan (Claude generated)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="badge badge-primary">4</span>
                        <div className="flex-1">
                          <code className="font-mono text-sm">docs/spec-kit/TASKS.md</code>
                          <span className="text-xs text-base-content/70 ml-2">→ 161 tasks (59% complete)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-base-300">
                      <p className="text-xs text-center text-base-content/60">
                        💡 <strong>The Magic:</strong> Claude Code + Docker + Spec Kit = This entire project!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tutorial Section - Full Width */}
              <div id="tutorial" className="card bg-base-100 shadow-xl mt-4">
                <div className="card-body">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      🎯 Try it yourself with Claude Code + Docker (in THIS repo!):
                    </p>
                    
                    <details className="collapse collapse-arrow bg-base-200">
                      <summary className="collapse-title text-sm font-medium cursor-pointer hover:bg-base-300">
                        📖 How to Use Spec Kit with Claude Code (click to expand)
                      </summary>
                      <div className="collapse-content">
                        <div className="space-y-4 pt-4">
                          <div className="bg-warning/20 p-3 rounded">
                            <p className="text-sm font-bold mb-2">⚡ The Claude Code + Docker Workflow:</p>
                            <p className="text-xs">
                              You&apos;ll use <strong>Claude Code in your terminal</strong> to edit files in THIS repo,
                              then run Docker commands to generate each phase. Claude Code acts as your pair programmer!
                            </p>
                          </div>
                          
                          <div>
                            <p className="font-semibold text-sm mb-2">1. Fork this repo & setup Docker:</p>
                            <code className="block font-mono text-xs bg-base-300 p-2 rounded">
                              # In your terminal with Claude Code:<br/>
                              cd docs/spec-kit<br/>
                              docker compose build<br/>
                              docker compose up -d<br/>
                              docker compose exec speckit bash
                            </code>
                          </div>

                          <div className="bg-primary/20 p-3 rounded">
                            <p className="text-sm font-bold mb-2">🎁 You Already Have Everything!</p>
                            <p className="text-xs mb-2">
                              <strong>Claude Code can see ALL of CRUDkit&apos;s code!</strong> You don&apos;t build from scratch:
                            </p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• Keep the 32 themes, PWA, and testing infrastructure</li>
                              <li>• Modify existing components for YOUR needs</li>
                              <li>• Deploy to GitHub Pages in minutes (workflow included!)</li>
                              <li>• Use CRUDkit as your foundation for rapid prototyping</li>
                            </ul>
                            <p className="text-xs mt-2 font-semibold">
                              Example: &quot;Claude, turn the status page into a workout tracker&quot; - Claude modifies the existing page!
                            </p>
                          </div>
                              
                          <div>
                            <p className="font-semibold text-sm mb-2">2. Initialize YOUR project (or keep CRUDkit):</p>
                            <code className="block font-mono text-xs bg-base-300 p-2 rounded">
                              # Inside Docker container:<br/>
                              specify init YOUR_PROJECT --here
                            </code>
                            <p className="text-xs text-base-content/70 mt-1">Choose option 2 for Claude when prompted</p>
                          </div>
                              
                          <div>
                            <p className="font-semibold text-sm mb-2">3. Edit constitution.md with Claude Code:</p>
                            <div className="bg-info/20 p-3 rounded text-xs space-y-2">
                              <p className="font-bold">Ask Claude Code in your terminal:</p>
                              <code className="block font-mono bg-base-300 p-2 rounded mt-1">
                                &quot;Claude, edit docs/constitution.md to define<br/>
                                principles for my [YOUR APP IDEA] app&quot;<br/>
                              </code>
                              <p className="text-xs text-base-content/70 mt-2">
                                Claude Code will write your project&apos;s constitution directly in the file!
                              </p>
                              <div className="bg-warning/30 p-2 rounded mt-2">
                                <p className="text-xs font-bold">👁️ REVIEW CHECKPOINT:</p>
                                <p className="text-xs">Review and refine constitution.md before proceeding. This is YOUR project&apos;s foundation!</p>
                              </div>
                            </div>
                          </div>
                              
                          <div>
                            <p className="font-semibold text-sm mb-2">4. Generate Each Phase with Claude Code:</p>
                            <div className="space-y-3">
                              <div className="pl-2 border-l-2 border-primary">
                                <p className="text-xs font-bold">a) Generate Specification:</p>
                                <code className="block font-mono text-xs bg-base-300 p-2 rounded mt-1">
                                  # Ask Claude Code:<br/>
                                  &quot;Claude, create a spec.md for my app idea:<br/>
                                  [describe your app]. Save it to docs/spec-kit/spec.md&quot;<br/>
                                  <br/>
                                  # Then in Docker:<br/>
                                  specify generate spec &lt; spec.md &gt; spec-output.md
                                </code>
                                <p className="text-xs text-success mt-1">→ Spec Kit generates spec-output.md</p>
                                <div className="bg-warning/30 p-2 rounded mt-2">
                                  <p className="text-xs font-bold">👁️ HUMAN REVIEW:</p>
                                  <p className="text-xs">Read spec-output.md carefully. Edit it! Add missing features, remove unwanted ones. Then ask Claude to refine it further before moving to the plan phase.</p>
                                </div>
                              </div>
                              
                              <div className="pl-2 border-l-2 border-primary">
                                <p className="text-xs font-bold">b) Generate Plan:</p>
                                <code className="block font-mono text-xs bg-base-300 p-2 rounded mt-1">
                                  # Ask Claude Code:<br/>
                                  &quot;Claude, read spec-output.md and generate<br/>
                                  a technical PLAN.md with Next.js stack&quot;<br/>
                                  <br/>
                                  # Then in Docker:<br/>
                                  specify generate plan &lt; PLAN.md &gt; plan-output.md
                                </code>
                                <p className="text-xs text-success mt-1">→ Spec Kit generates plan-output.md</p>
                                <div className="bg-warning/30 p-2 rounded mt-2">
                                  <p className="text-xs font-bold">👁️ HUMAN REVIEW:</p>
                                  <p className="text-xs">Review plan-output.md. Adjust tech stack, add/remove components, refine architecture. This is YOUR technical blueprint!</p>
                                </div>
                              </div>
                              
                              <div className="pl-2 border-l-2 border-primary">
                                <p className="text-xs font-bold">c) Generate Tasks:</p>
                                <code className="block font-mono text-xs bg-base-300 p-2 rounded mt-1">
                                  # Ask Claude Code:<br/>
                                  &quot;Claude, break down plan-output.md into<br/>
                                  detailed TASKS.md with checkboxes&quot;<br/>
                                  <br/>
                                  # Then in Docker:<br/>
                                  specify generate tasks &lt; TASKS.md
                                </code>
                                <p className="text-xs text-success mt-1">→ Spec Kit generates TASKS.md</p>
                                <div className="bg-warning/30 p-2 rounded mt-2">
                                  <p className="text-xs font-bold">👁️ HUMAN REVIEW:</p>
                                  <p className="text-xs">Review TASKS.md. Reorder priorities, add missing tasks, remove unnecessary ones. These are YOUR implementation steps!</p>
                                </div>
                              </div>
                            </div>
                          </div>
                              
                          <div className="bg-info/20 p-3 rounded mb-3">
                            <p className="text-sm font-bold mb-2">⚠️ Important: This is an ITERATIVE Process!</p>
                            <p className="text-xs mb-2">
                              <strong>Each phase requires YOUR review and refinement.</strong> Spec Kit generates drafts, but YOU control the final output:
                            </p>
                            <ul className="text-xs space-y-1 ml-4">
                              <li>• Review each generated file before proceeding</li>
                              <li>• Edit directly or ask Claude Code to refine</li>
                              <li>• Iterate until YOU&apos;re satisfied</li>
                              <li>• Only move to the next phase when ready</li>
                            </ul>
                          </div>
                          
                          <div className="bg-success/20 p-3 rounded">
                            <p className="text-sm font-bold mb-1">💡 The Secret Sauce:</p>
                            <p className="text-xs">
                              <strong>Claude Code IS your development partner!</strong> You&apos;re not copying/pasting between tools.
                              Claude Code directly edits files in your repo, runs Docker commands, and iterates with you.
                              This is EXACTLY how CRUDkit was built - Claude Code + Spec Kit + Docker + Human Review!
                            </p>
                          </div>
                          
                          <div className="text-xs bg-base-200 p-2 rounded mt-3">
                            <strong>Example Claude Code conversation:</strong>
                            <div className="font-mono text-xs mt-1">
                              You: &quot;Build a recipe sharing app&quot;<br/>
                              Claude: &quot;I&apos;ll help you create that! Let me start by writing your constitution.md...&quot;<br/>
                              You: &quot;Now run specify generate spec&quot;<br/>
                              Claude: *runs Docker command and refines output*<br/>
                              You: &quot;Generate the plan&quot;<br/>
                              Claude: *creates PLAN.md with full tech stack*
                            </div>
                          </div>
                        </div>
                      </div>
                    </details>
                        
                    <p className="text-xs text-base-content/60 mt-3">
                      Quick start without Docker:
                    </p>
                    <code className="block mt-1 font-mono text-xs bg-base-300 p-2 rounded">
                      uvx --from git+https://github.com/github/spec-kit.git specify init YOUR_PROJECT
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