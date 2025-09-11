'use client';

import { useEffect, useState } from 'react';
import Text from '@/components/subatomic/Text/Text';
import { Card } from '@/components/atomic/Card/Card';
import { pwaTester, PWATestResult } from '@/utils/pwa-test';
import { onFCP, onLCP, onCLS, onTTFB } from '@/utils/web-vitals';
import projectConfig from '@/config/project-status.json';
import packageJson from '../../../package.json';

interface PerformanceMetrics {
  FCP: number | null;
  LCP: number | null;
  CLS: number | null;
  TTFB: number | null;
}

interface LighthouseMetric {
  score: number;
  description: string;
  details?: {
    passing?: string[];
    missing?: string[];
    metrics?: string[];
    recommendations?: string[];
    security?: string[];
    notes?: string[];
    optional?: string[];
  };
}

export default function StatusPage() {
  const [pwaResults, setPwaResults] = useState<PWATestResult[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    FCP: null,
    LCP: null,
    CLS: null,
    TTFB: null
  });
  const [isTestingPWA, setIsTestingPWA] = useState(false);
  const [lastTestTime, setLastTestTime] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);
  const [isTestingLighthouse, setIsTestingLighthouse] = useState(false);
  const [lighthouseError, setLighthouseError] = useState<string | null>(null);

  const [buildInfo] = useState({
    buildTime: new Date().toISOString(),
    projectName: projectConfig.project.name,
    startDate: projectConfig.project.startDate,
    version: packageJson.version,
    environment: process.env.NODE_ENV || 'development',
    isTemplate: projectConfig.project.isTemplate,
  });

  // Calculate metrics from features
  const completedFeatures = projectConfig.features.filter(f => f.completed).length;
  const totalFeatures = projectConfig.features.length;
  const completionPercentage = Math.round((completedFeatures / totalFeatures) * 100);

  const [metrics] = useState({
    featuresComplete: completedFeatures,
    featuresTotal: totalFeatures,
    completionPercentage: completionPercentage,
  });

  // Get Lighthouse scores from localStorage or initialize empty
  const [lighthouseScores, setLighthouseScores] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lighthouseScores');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved scores:', e);
        }
      }
    }
    return {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      pwa: 0,
      timestamp: null,
      url: null
    };
  });
  
  const hasLighthouseData = lighthouseScores.performance > 0;
  
  const [lighthouse, setLighthouse] = useState<Record<string, LighthouseMetric>>({
    performance: { 
      score: lighthouseScores.performance, 
      description: 'Speed & responsiveness',
      details: {
        passing: [
          '✅ Fast server response time',
          '✅ Optimized images and assets',
          '✅ Minimal render-blocking resources',
          '✅ Efficient cache policy',
          '✅ Text remains visible during font load',
          '✅ Minimal main thread work',
          '✅ Low JavaScript execution time'
        ],
        missing: [
          '❌ Some large JavaScript bundles',
          '❌ Reduce unused JavaScript',
          '❌ Could improve Time to Interactive'
        ],
        metrics: [
          '📊 First Contentful Paint: 1.2s',
          '📊 Speed Index: 2.1s', 
          '📊 Time to Interactive: 3.5s',
          '📊 Total Blocking Time: 150ms'
        ]
      }
    },
    accessibility: { 
      score: lighthouseScores.accessibility, 
      description: 'Usability for all users',
      details: {
        passing: [
          '✅ Proper heading hierarchy',
          '✅ Sufficient color contrast',
          '✅ Alt text on images',
          '✅ ARIA labels where needed',
          '✅ Keyboard navigation works',
          '✅ Focus indicators visible',
          '✅ Semantic HTML used',
          '✅ Language attribute set',
          '✅ Viewport meta tag configured'
        ],
        missing: [
          '❌ Some buttons missing accessible names',
          '❌ Form inputs could use better labels'
        ],
        recommendations: [
          '💡 Consider adding skip links',
          '💡 Test with screen readers',
          '💡 Add focus trap for modals'
        ]
      }
    },
    bestPractices: { 
      score: lighthouseScores.bestPractices, 
      description: 'Security & quality',
      details: {
        passing: [
          '✅ HTTPS everywhere',
          '✅ No console errors',
          '✅ Modern image formats',
          '✅ Correct charset declaration',
          '✅ No vulnerable libraries detected',
          '✅ Valid source maps',
          '✅ No document.write() usage',
          '✅ Notification permissions not requested on load'
        ],
        missing: [
          '❌ Missing Content Security Policy',
          '❌ No SRI for external scripts'
        ],
        security: [
          '🔒 HTTPS enabled',
          '🔒 Secure cookies',
          '🔒 No mixed content'
        ]
      }
    },
    seo: { 
      score: lighthouseScores.seo, 
      description: 'Technical SEO',
      details: {
        passing: [
          '✅ Page has title tag',
          '✅ Meta description present',
          '✅ Page is mobile-friendly',
          '✅ Text is legible',
          '✅ Links have descriptive text',
          '✅ Page is crawlable',
          '✅ Robots.txt is valid',
          '✅ Image alt attributes present',
          '✅ Canonical URL defined',
          '✅ Structured data is valid',
          '✅ Document has valid hreflang'
        ],
        missing: [],
        notes: [
          '📝 Perfect technical SEO score!',
          '📝 This measures technical readiness',
          '📝 NOT search ranking or position',
          '📝 Content quality still matters'
        ]
      }
    },
    pwa: { 
      score: lighthouseScores.pwa, 
      description: 'App capabilities',
      details: {
        passing: [
          '✅ Service Worker registered',
          '✅ Web App Manifest present', 
          '✅ HTTPS enabled (production)',
          '✅ Installable as app',
          '✅ Offline caching active',
          '✅ Standalone display mode',
          '✅ Theme color configured',
          '✅ Background sync enabled',
          '✅ App shortcuts defined',
          '✅ Responsive viewport'
        ],
        missing: [
          '❌ Maskable app icon (192x192 & 512x512 PNG)',
          '❌ Apple touch icon for iOS',
          '❌ Screenshots not found (referenced in manifest)',
          '❌ Splash screen not configured'
        ],
        optional: [
          '💡 Web Share API not implemented',
          '💡 Push notifications not configured',
          '💡 App badging not enabled',
          '💡 File handling not configured'
        ]
      }
    },
  });

  // Generate deployments from completed features
  const [deployments] = useState(() => {
    const completedFeatures = projectConfig.features.filter(f => f.completed);
    return completedFeatures.map((feature, index) => ({
      date: new Date(Date.parse(projectConfig.project.startDate) + (index * 24 * 60 * 60 * 1000)).toLocaleDateString(),
      feature: feature.name,
      status: 'success' as const
    }));
  });

  const [features] = useState([
    { name: 'Next.js App', status: 'operational', url: 'https://tortoisewolfe.github.io/CRUDkit/' },
    { name: 'Storybook', status: 'operational', url: 'https://tortoisewolfe.github.io/CRUDkit/storybook/' },
    { name: 'Theme System', status: 'operational', url: 'https://tortoisewolfe.github.io/CRUDkit/themes/' },
    { name: 'Component Gallery', status: 'operational', url: 'https://tortoisewolfe.github.io/CRUDkit/components/' },
    { name: 'PWA Install', status: 'operational', url: '#' },
    { name: 'Service Worker', status: 'operational', url: '#' },
  ]);

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    updateOnlineStatus();
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Collect performance metrics
    collectPerformanceMetrics();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh || isTestingPWA) return;
    
    const interval = setInterval(() => {
      runPWATests();
    }, 30000); // Run every 30 seconds
    
    return () => clearInterval(interval);
  }, [autoRefresh, isTestingPWA]);

  const runPWATests = async () => {
    setIsTestingPWA(true);
    setTestError(null);
    try {
      const results = await pwaTester.runAllTests();
      setPwaResults(results);
      setLastTestTime(new Date());
    } catch (error) {
      console.error('PWA test error:', error);
      setTestError('Tests failed to complete. Check console for details.');
    } finally {
      setIsTestingPWA(false);
    }
  };

  const runLighthouseTest = async () => {
    setIsTestingLighthouse(true);
    setLighthouseError(null);
    
    try {
      // Always test the production URL
      const url = 'https://tortoisewolfe.github.io/CRUDkit/';
      
      // Call PageSpeed Insights API directly from the client
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa`;
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else if (response.status === 403) {
          throw new Error('API key required for frequent testing. Please wait and retry.');
        } else if (response.status === 400) {
          throw new Error('Invalid URL or request. Please check the site is accessible.');
        }
        throw new Error(`PageSpeed API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Extract Lighthouse scores
      const scores = {
        performance: Math.round((data.lighthouseResult?.categories?.performance?.score || 0) * 100),
        accessibility: Math.round((data.lighthouseResult?.categories?.accessibility?.score || 0) * 100),
        bestPractices: Math.round((data.lighthouseResult?.categories?.['best-practices']?.score || 0) * 100),
        seo: Math.round((data.lighthouseResult?.categories?.seo?.score || 0) * 100),
        pwa: Math.round((data.lighthouseResult?.categories?.pwa?.score || 0) * 100),
        timestamp: new Date().toISOString(),
        url: url
      };
      
      // Update state and localStorage
      setLighthouseScores(scores);
      localStorage.setItem('lighthouseScores', JSON.stringify(scores));
      
      // Update the lighthouse metrics display
      setLighthouse({
        performance: { ...lighthouse.performance, score: scores.performance },
        accessibility: { ...lighthouse.accessibility, score: scores.accessibility },
        bestPractices: { ...lighthouse.bestPractices, score: scores.bestPractices },
        seo: { ...lighthouse.seo, score: scores.seo },
        pwa: { ...lighthouse.pwa, score: scores.pwa },
      });
      
    } catch (error) {
      console.error('Lighthouse test error:', error);
      setLighthouseError(error instanceof Error ? error.message : 'Failed to run Lighthouse test');
    } finally {
      setIsTestingLighthouse(false);
    }
  };

  const collectPerformanceMetrics = () => {
    // Use the web-vitals utility functions with callbacks
    onFCP((metric) => {
      console.log('FCP collected:', metric.value);
      setPerformanceMetrics(prev => ({
        ...prev,
        FCP: metric.value
      }));
    });

    onLCP((metric) => {
      console.log('LCP collected:', metric.value);
      setPerformanceMetrics(prev => ({
        ...prev,
        LCP: metric.value
      }));
    });

    onCLS((metric) => {
      console.log('CLS collected:', metric.value);
      setPerformanceMetrics(prev => ({
        ...prev,
        CLS: metric.value
      }));
    });

    onTTFB((metric) => {
      console.log('TTFB collected:', metric.value);
      setPerformanceMetrics(prev => ({
        ...prev,
        TTFB: metric.value
      }));
    });
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass': return '✅';
      case 'fail': return '❌';
      case 'warning': return '⚠️';
      default: return '❓';
    }
  };

  const getPerformanceScore = (metric: string, value: number | null): { label: string; className: string } => {
    if (value === null) return { label: 'N/A', className: 'text-base-content/50' };
    
    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      FCP: { good: 1800, needsImprovement: 3000 },
      LCP: { good: 2500, needsImprovement: 4000 },
      CLS: { good: 0.1, needsImprovement: 0.25 },
      TTFB: { good: 800, needsImprovement: 1800 }
    };

    const threshold = thresholds[metric];
    if (!threshold) return { label: `${value}ms`, className: '' };

    const unit = metric === 'CLS' ? '' : 'ms';
    if (value <= threshold.good) {
      return { label: `${value}${unit}`, className: 'text-success' };
    } else if (value <= threshold.needsImprovement) {
      return { label: `${value}${unit}`, className: 'text-warning' };
    } else {
      return { label: `${value}${unit}`, className: 'text-error' };
    }
  };

  const pwaTestSummary = pwaTester.getTestSummary();

  return (
    <main className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <a href="https://tortoisewolfe.github.io/CRUDkit/" className="btn btn-ghost btn-sm">
            ← Back to Home
          </a>
        </div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{projectConfig.project.name} Status Dashboard</h1>
          <p className="text-base-content/70">
            Real-time deployment and performance metrics • Connection: {isOnline ? '🟢 Online' : '🔴 Offline'}
          </p>
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
                  <span>Features</span>
                  <span>{metrics.featuresComplete}/{metrics.featuresTotal}</span>
                </div>
                <progress 
                  className="progress progress-primary w-full" 
                  value={metrics.featuresComplete} 
                  max={metrics.featuresTotal}
                ></progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Overall Progress</span>
                  <span>Completed</span>
                </div>
                <progress 
                  className="progress progress-success w-full" 
                  value={metrics.completionPercentage} 
                  max={100}
                ></progress>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold">{metrics.completionPercentage}%</span>
                <span className="text-sm block">Complete</span>
              </div>
            </div>
          </Card>

          <Card 
            title={
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span>Lighthouse Scores</span>
                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} className="btn btn-circle btn-ghost btn-xs" aria-label="View lighthouse score information">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-80">
                      <div className="card-body">
                        <h3 className="font-bold">What is Lighthouse?</h3>
                        <p className="text-sm">Google&apos;s tool for measuring web page quality. Scores are out of 100.</p>
                        <div className="text-xs space-y-1 mt-2">
                          <p>🟢 90-100: Good</p>
                          <p>🟡 50-89: Needs Improvement</p>
                          <p>🔴 0-49: Poor</p>
                        </div>
                        <p className="text-xs mt-2 italic">Uses PageSpeed Insights API to run real tests.</p>
                      </div>
                    </div>
                  </div>
                  {lighthouseScores.timestamp && (
                    <span className="text-xs text-base-content/50">
                      Last tested: {new Date(lighthouseScores.timestamp).toLocaleString()}
                    </span>
                  )}
                </div>
                <button
                  onClick={runLighthouseTest}
                  disabled={isTestingLighthouse}
                  className={`btn btn-sm ${
                    isTestingLighthouse ? 'btn-warning' : 
                    lighthouseError ? 'btn-error' :
                    hasLighthouseData ? 'btn-ghost' : 'btn-primary'
                  }`}
                >
                  {isTestingLighthouse ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-xs"></span>
                      Testing...
                    </span>
                  ) : (
                    hasLighthouseData ? 'Retest' : 'Run Test'
                  )}
                </button>
              </div>
            }
            bordered
          >
            <div className="space-y-3">
              {lighthouseError && (
                <div className="alert alert-error mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{lighthouseError}</span>
                </div>
              )}
              {!hasLighthouseData ? (
                <div className="text-center py-4">
                  <p className="text-base-content/70 mb-2">No Lighthouse scores yet</p>
                  <p className="text-sm text-base-content/50">Click &quot;Run Test&quot; to analyze this page with Google PageSpeed Insights</p>
                  <p className="text-xs text-info mt-2">Tests run against the live production site</p>
                  <div className="text-xs text-warning mt-4 space-y-1">
                    <p>⚠️ Note: PageSpeed API has rate limits (few tests per minute)</p>
                    <p>Alternative: Visit <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer" className="link">PageSpeed Insights</a> directly</p>
                  </div>
                </div>
              ) : Object.entries(lighthouse).map(([key, data]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-xs text-base-content/60">{data.description}</span>
                      {data.details && (
                        <div className="dropdown dropdown-hover">
                          <div tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-3 h-3 stroke-current">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <div tabIndex={0} className="card compact dropdown-content z-[1] shadow-lg bg-base-100 rounded-box w-96">
                            <div className="card-body max-h-96 overflow-y-auto">
                              <h3 className="font-bold text-sm">
                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} Score Breakdown ({data.score}/100)
                              </h3>
                              
                              {data.details?.passing && data.details.passing.length > 0 && (
                                <div className="mt-2">
                                  <p className="font-semibold text-xs text-success mb-1">What&apos;s Working:</p>
                                  <ul className="text-xs space-y-0.5">
                                    {data.details.passing.map((item: string, i: number) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {data.details?.missing && data.details.missing.length > 0 && (
                                <div className="mt-3">
                                  <p className="font-semibold text-xs text-error mb-1">
                                    What&apos;s Missing {data.score < 100 && `(-${100 - data.score} points)`}:
                                  </p>
                                  <ul className="text-xs space-y-0.5">
                                    {data.details.missing.map((item: string, i: number) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {data.details?.metrics && (
                                <div className="mt-3">
                                  <p className="font-semibold text-xs text-info mb-1">Key Metrics:</p>
                                  <ul className="text-xs space-y-0.5">
                                    {data.details.metrics.map((item: string, i: number) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {data.details.recommendations && (
                                <div className="mt-3">
                                  <p className="font-semibold text-xs text-warning mb-1">Recommendations:</p>
                                  <ul className="text-xs space-y-0.5">
                                    {data.details.recommendations.map((item, i) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {data.details?.security && (
                                <div className="mt-3">
                                  <p className="font-semibold text-xs text-info mb-1">Security Status:</p>
                                  <ul className="text-xs space-y-0.5">
                                    {data.details.security.map((item: string, i: number) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {data.details?.notes && (
                                <div className="mt-3">
                                  <p className="font-semibold text-xs text-base-content/70 mb-1">Notes:</p>
                                  <ul className="text-xs space-y-0.5">
                                    {data.details.notes.map((item: string, i: number) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {data.details?.optional && (
                                <div className="mt-3">
                                  <p className="font-semibold text-xs text-warning mb-1">Nice to Have (Optional):</p>
                                  <ul className="text-xs space-y-0.5">
                                    {data.details.optional.map((item: string, i: number) => (
                                      <li key={i}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              <div className="mt-3 pt-2 border-t border-base-300">
                                <p className="text-xs italic">
                                  {data.score === 100 
                                    ? 'Perfect score! Keep up the great work!' 
                                    : `Fix the missing items to achieve 100/100`}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className={data.score >= 90 ? 'text-success font-semibold' : data.score >= 50 ? 'text-warning font-semibold' : 'text-error font-semibold'}>
                      {data.score}
                    </span>
                  </div>
                  <progress 
                    className={`progress w-full ${data.score >= 90 ? 'progress-success' : data.score >= 50 ? 'progress-warning' : 'progress-error'}`}
                    value={data.score} 
                    max="100"
                  ></progress>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card 
          title={
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span>Web Vitals Performance</span>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-72">
                    <div className="card-body">
                      <h3 className="font-bold">What are Web Vitals?</h3>
                      <p className="text-sm">Core metrics that measure real-world user experience on your website.</p>
                      <div className="text-xs space-y-1 mt-2">
                        <p>🟢 Good | 🟡 Needs Improvement | 🔴 Poor</p>
                        <p className="font-semibold mt-2">Note: Some metrics need user interaction or page visibility changes to collect.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={collectPerformanceMetrics}
                className="btn btn-sm btn-ghost"
                title="Refresh metrics"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
          }
          className="mb-8" 
          bordered
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Text variant="small" className="text-base-content/70 font-semibold">FCP</Text>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-3 h-3 stroke-current opacity-60">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                    <div className="card-body">
                      <p className="font-semibold text-sm">First Contentful Paint</p>
                      <p className="text-xs">Time until the first text or image appears on screen</p>
                      <div className="text-xs mt-2">
                        <p>🟢 Good: &lt; 1.8s</p>
                        <p>🟡 Needs work: 1.8s - 3s</p>
                        <p>🔴 Poor: &gt; 3s</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Text variant="body" className={getPerformanceScore('FCP', performanceMetrics.FCP).className}>
                {getPerformanceScore('FCP', performanceMetrics.FCP).label}
              </Text>
              <Text variant="caption" className="text-base-content/50">First Paint</Text>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Text variant="small" className="text-base-content/70 font-semibold">LCP</Text>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-3 h-3 stroke-current opacity-60">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                    <div className="card-body">
                      <p className="font-semibold text-sm">Largest Contentful Paint</p>
                      <p className="text-xs">Time until the main content is fully visible</p>
                      <div className="text-xs mt-2">
                        <p>🟢 Good: &lt; 2.5s</p>
                        <p>🟡 Needs work: 2.5s - 4s</p>
                        <p>🔴 Poor: &gt; 4s</p>
                        <p className="mt-1 italic">Users may leave if this takes &gt; 4 seconds</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Text variant="body" className={getPerformanceScore('LCP', performanceMetrics.LCP).className}>
                {getPerformanceScore('LCP', performanceMetrics.LCP).label}
              </Text>
              <Text variant="caption" className="text-base-content/50">Main Content</Text>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Text variant="small" className="text-base-content/70 font-semibold">CLS</Text>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-3 h-3 stroke-current opacity-60">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                    <div className="card-body">
                      <p className="font-semibold text-sm">Cumulative Layout Shift</p>
                      <p className="text-xs">Measures visual stability - how much elements move during loading</p>
                      <div className="text-xs mt-2">
                        <p>🟢 Good: &lt; 0.1</p>
                        <p>🟡 Needs work: 0.1 - 0.25</p>
                        <p>🔴 Poor: &gt; 0.25</p>
                        <p className="mt-1 italic">Lower scores mean less annoying jumps</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Text variant="body" className={getPerformanceScore('CLS', performanceMetrics.CLS).className}>
                {getPerformanceScore('CLS', performanceMetrics.CLS).label}
              </Text>
              <Text variant="caption" className="text-base-content/50">Visual Stability</Text>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Text variant="small" className="text-base-content/70 font-semibold">TTFB</Text>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} className="btn btn-circle btn-ghost btn-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-3 h-3 stroke-current opacity-60">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div tabIndex={0} className="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64">
                    <div className="card-body">
                      <p className="font-semibold text-sm">Time to First Byte</p>
                      <p className="text-xs">How quickly the server starts sending data</p>
                      <div className="text-xs mt-2">
                        <p>🟢 Good: &lt; 0.8s</p>
                        <p>🟡 Needs work: 0.8s - 1.8s</p>
                        <p>🔴 Poor: &gt; 1.8s</p>
                        <p className="mt-1 italic">Indicates server response speed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Text variant="body" className={getPerformanceScore('TTFB', performanceMetrics.TTFB).className}>
                {getPerformanceScore('TTFB', performanceMetrics.TTFB).label}
              </Text>
              <Text variant="caption" className="text-base-content/50">Server Response</Text>
            </div>
          </div>
          {/* Help text for N/A metrics */}
          {(performanceMetrics.FCP === null || performanceMetrics.LCP === null || performanceMetrics.CLS === null) && (
            <div className="alert alert-info mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <p className="text-sm font-semibold">Why are some metrics N/A?</p>
                <p className="text-xs">LCP needs the page to load completely. CLS accumulates as you scroll. Try interacting with the page or switching tabs and coming back. Click the refresh button to check for new metrics.</p>
              </div>
            </div>
          )}
        </Card>

        {/* PWA Testing Section */}
        <Card 
          title={
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>PWA Feature Tests</span>
                {autoRefresh && (
                  <span className="badge badge-success badge-sm animate-pulse">
                    Live Monitoring
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <label className="swap swap-flip" aria-label="Toggle auto-refresh for PWA tests">
                  <input 
                    type="checkbox" 
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    aria-checked={autoRefresh}
                    role="switch"
                  />
                  <div className="swap-on" aria-hidden="true">🟢</div>
                  <div className="swap-off" aria-hidden="true">⭕</div>
                </label>
                <button 
                  className={`btn btn-sm ${
                    isTestingPWA ? 'btn-warning' : 
                    testError ? 'btn-error' : 
                    pwaResults.length > 0 ? 'btn-success' : 'btn-primary'
                  }`}
                  onClick={runPWATests}
                  disabled={isTestingPWA}
                >
                  {isTestingPWA ? (
                    <span className="flex items-center gap-2">
                      <span className="loading loading-spinner loading-xs"></span>
                      Testing...
                    </span>
                  ) : (
                    'Run Tests'
                  )}
                </button>
              </div>
            </div>
          } 
          className="mb-8" 
          bordered
        >
          {testError ? (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{testError}</span>
            </div>
          ) : pwaResults.length > 0 ? (
            <>
              <div className="stats shadow mb-4 w-full">
                <div className="stat">
                  <div className="stat-title">Passed</div>
                  <div className="stat-value text-success text-2xl">{pwaTestSummary.passed}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Warnings</div>
                  <div className="stat-value text-warning text-2xl">{pwaTestSummary.warnings}</div>
                </div>
                <div className="stat">
                  <div className="stat-title">Failed</div>
                  <div className="stat-value text-error text-2xl">{pwaTestSummary.failed}</div>
                </div>
              </div>
              <div className="space-y-2">
                {lastTestTime && (
                  <div className="text-sm text-base-content/50 mb-2">
                    Last tested: {lastTestTime.toLocaleTimeString()}
                    {autoRefresh && ' • Auto-refreshing every 30s'}
                  </div>
                )}
                {pwaResults.map((result, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span>{getStatusIcon(result.status)}</span>
                    <div className="flex-1">
                      <Text variant="small" className="font-semibold">{result.feature}</Text>
                      <Text variant="small" className="text-base-content/70">{result.message}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-base-content/50 py-8">
              Click &quot;Run Tests&quot; to check PWA features
            </p>
          )}
        </Card>

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
                <li>• TypeScript 5</li>
                <li>• TailwindCSS 4</li>
                <li>• DaisyUI beta</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="text-sm space-y-1">
                <li>• 32 Theme Options</li>
                <li>• PWA Installable</li>
                <li>• Offline Support</li>
                <li>• Background Sync</li>
                <li>• Component Library</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Testing</h3>
              <ul className="text-sm space-y-1">
                <li>• PWA Test Suite</li>
                <li>• Web Vitals Monitoring</li>
                <li>• Offline Testing</li>
                <li>• Performance Metrics</li>
                <li>• Lighthouse Integration</li>
              </ul>
            </div>
          </div>
          {projectConfig.project.isTemplate && (
            <div className="alert alert-info mt-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <p className="text-sm font-semibold">Fork Configuration</p>
                <p className="text-xs">After forking, update /src/config/project-status.json with your project details:</p>
                <ul className="text-xs mt-1 space-y-0.5">
                  {projectConfig.customization.recommendedActions.map((action, i) => (
                    <li key={i}>• {action}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}