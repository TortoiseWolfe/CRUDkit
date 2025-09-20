import { ImageResponse } from 'next/og';

// App icon
// Configure for static export
export const dynamic = 'force-static';
export const revalidate = false;

// Image metadata - increased to 48x48 for better visibility
export const size = {
  width: 48,
  height: 48,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified version - just script tags and mallet, no ring */}
          <g transform="translate(50,50)">
            {/* Script tags - large and bold */}
            <text
              x="0"
              y="8"
              fontSize="48"
              fill="#333"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {'</>'}
            </text>
            {/* Small mallet accent */}
            <rect
              x="8"
              y="12"
              width="20"
              height="3"
              fill="#666"
              transform="rotate(-45)"
            />
            <rect
              x="24"
              y="8"
              width="8"
              height="8"
              fill="#666"
              transform="rotate(-45)"
            />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
