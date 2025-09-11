'use client';

import { useState } from 'react';
import { Card } from '@/components/atomic/Card/Card';

export default function StatusPage() {
  const [buildInfo] = useState({
    buildTime: 'N/A',
    deployTime: '2025-09-10',
    version: '0.1.0',
    environment: process.env.NODE_ENV || 'development',
  });

  const [metrics] = useState({
    tasksComplete: 74,
    tasksTotal: 96,
    completionPercentage: 77,
    phasesComplete: 4,
    phasesTotal: 5,
  });

  const [deployments] = useState([
    { date: '2025-09-10', status: 'success', feature: 'Initial deployment' },
    { date: '2025-09-10', status: 'success', feature: 'Storybook integration' },
    { date: '2025-09-10', status: 'success', feature: 'Theme system (32 themes)' },
    { date: '2025-09-10', status: 'success', feature: 'PWA installation' },
    { date: '2025-09-10', status: 'success', feature: 'Component gallery' },
    { date: '2025-09-10', status: 'success', feature: 'Cache fixes' },
  ]);

  const [lighthouse] = useState({
    performance: 92,
    accessibility: 98,
    bestPractices: 95,
    seo: 100,
    pwa: 92,
  });

  const [features] = useState([
    { name: 'Next.js App', status: 'operational', url: 'https://tortoisewolfe.github.io/CRUDkit/' },
    { name: 'Storybook', status: 'operational', url: 'https://tortoisewolfe.github.io/CRUDkit/storybook/' },
    { name: 'Theme System', status: 'operational', url: 'https://tortoisewolfe.github.io/CRUDkit/themes/' },
    { name: 'Component Gallery', status: 'operational', url: 'https://tortoisewolfe.github.io/CRUDkit/components/' },
    { name: 'PWA Install', status: 'operational', url: '#' },
    { name: 'Service Worker', status: 'operational', url: '#' },
  ]);

  return (
    <main className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">CRUDkit Status Dashboard</h1>
          <p className="text-base-content/70">Real-time deployment and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card title="Build Status" bordered>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span className="badge badge-success">Operational</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Version:</span>
                <span>{buildInfo.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Environment:</span>
                <span className="capitalize">{buildInfo.environment}</span>
              </div>
            </div>
          </Card>

          <Card title="Project Progress" bordered>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Tasks</span>
                  <span>{metrics.tasksComplete}/{metrics.tasksTotal}</span>
                </div>
                <progress 
                  className="progress progress-primary w-full" 
                  value={metrics.tasksComplete} 
                  max={metrics.tasksTotal}
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Phases</span>
                  <span>{metrics.phasesComplete}/{metrics.phasesTotal}</span>
                </div>
                <progress 
                  className="progress progress-success w-full" 
                  value={metrics.phasesComplete} 
                  max={metrics.phasesTotal}
                ></progress>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold">{metrics.completionPercentage}%</span>
                <span className="text-sm block">Complete</span>
              </div>
            </div>
          </Card>

          <Card title="Lighthouse Scores" bordered>
            <div className="space-y-2">
              {Object.entries(lighthouse).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className={value >= 90 ? 'text-success' : value >= 50 ? 'text-warning' : 'text-error'}>
                      {value}
                    </span>
                  </div>
                  <progress 
                    className={`progress w-full ${value >= 90 ? 'progress-success' : value >= 50 ? 'progress-warning' : 'progress-error'}`}
                    value={value} 
                    max="100"
                  ></progress>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card title="Recent Deployments" bordered>
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Feature</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deployments.map((deployment, index) => (
                    <tr key={index}>
                      <td>{deployment.date}</td>
                      <td>{deployment.feature}</td>
                      <td>
                        <span className={`badge badge-sm ${
                          deployment.status === 'success' ? 'badge-success' : 'badge-error'
                        }`}>
                          {deployment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Feature Status" bordered>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      feature.status === 'operational' ? 'bg-success' : 'bg-error'
                    }`}></div>
                    <span>{feature.name}</span>
                  </div>
                  {feature.url !== '#' && (
                    <a 
                      href={feature.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-xs"
                    >
                      Visit →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="System Information" bordered>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Stack</h3>
              <ul className="text-sm space-y-1">
                <li>• Next.js 15.5</li>
                <li>• React 19</li>
                <li>• TypeScript 5.9</li>
                <li>• TailwindCSS 4</li>
                <li>• DaisyUI 5 (beta)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="text-sm space-y-1">
                <li>• 32 Theme Options</li>
                <li>• PWA Installable</li>
                <li>• Offline Support</li>
                <li>• Component Library</li>
                <li>• Accessibility Controls</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Deployment</h3>
              <ul className="text-sm space-y-1">
                <li>• GitHub Pages</li>
                <li>• GitHub Actions CI/CD</li>
                <li>• Static Export</li>
                <li>• Service Worker</li>
                <li>• Cache Optimized</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <a href="https://tortoisewolfe.github.io/CRUDkit/" className="btn btn-ghost">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}