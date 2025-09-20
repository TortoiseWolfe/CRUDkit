import { ImageResponse } from 'next/og';

// Apple touch icon
// Removed runtime = 'edge' for static export compatibility

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          borderRadius: '20%',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(50,50)">
            {/* Script tags - large and centered */}
            <text
              x="0"
              y="10"
              fontSize="60"
              fill="#333"
              textAnchor="middle"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {'</>'}
            </text>
            {/* Mallet - positioned nicely with script tags */}
            <rect
              x="12"
              y="18"
              width="35"
              height="5"
              fill="#555"
              transform="rotate(-45)"
            />
            <rect
              x="40"
              y="10"
              width="15"
              height="15"
              fill="#555"
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
