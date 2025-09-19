import { ImageResponse } from 'next/og';
import { projectConfig } from '@/config/project.config';

export const runtime = 'edge';

export const alt = `${projectConfig.projectName} - Modern Web Starter`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // Fetch the SVG content
  const logoSvg = await fetch(
    new URL('../../public/favicon.svg', import.meta.url)
  ).then((res) => res.text());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Logo container */}
        <div
          style={{
            display: 'flex',
            marginBottom: 40,
            width: 120,
            height: 120,
            background: 'white',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60,
            }}
          >
            ⚙️
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
            lineHeight: 1,
            marginBottom: 20,
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {projectConfig.projectName}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            opacity: 0.95,
            marginTop: 10,
            marginBottom: 30,
            textAlign: 'center',
            maxWidth: '80%',
            lineHeight: 1.4,
          }}
        >
          {projectConfig.projectDescription}
        </div>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 20,
          }}
        >
          {['Next.js 15', 'TypeScript', 'PWA Ready', 'DaisyUI'].map(
            (feature) => (
              <div
                key={feature}
                style={{
                  fontSize: 20,
                  padding: '10px 20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '100px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {feature}
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 18,
            opacity: 0.8,
          }}
        >
          github.com/{projectConfig.projectOwner}/{projectConfig.projectName}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
