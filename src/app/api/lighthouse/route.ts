import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Use Google PageSpeed Insights API (no API key needed for basic usage)
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`PageSpeed API error: ${response.statusText}`);
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
    
    return NextResponse.json(scores);
  } catch (error) {
    console.error('Lighthouse test error:', error);
    return NextResponse.json(
      { error: 'Failed to run Lighthouse test', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}