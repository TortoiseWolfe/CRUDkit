'use client';

export default function Home() {

  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-4">
            Hello CRUDkit! 🚀
          </h1>
          <div className="badge badge-success badge-lg mb-8">
            <span className="text-sm">Deployment Pipeline: ✅ Working</span>
          </div>
          <div className="space-y-2">
            <p className="text-base text-base-content/70">Next.js 15.5 • React 19 • TypeScript 5.9</p>
            <p className="text-base text-base-content/70">Deploy Early, Deploy Often</p>
          </div>
          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            <a href="https://tortoisewolfe.github.io/CRUDkit/themes/" className="btn btn-primary">
              Themes
            </a>
            <a href="https://tortoisewolfe.github.io/CRUDkit/components/" className="btn btn-secondary">
              Components
            </a>
            <a href="https://tortoisewolfe.github.io/CRUDkit/accessibility/" className="btn btn-accent">
              Accessibility
            </a>
            <a href="https://tortoisewolfe.github.io/CRUDkit/status/" className="btn btn-info">
              Status
            </a>
            <a href="https://tortoisewolfe.github.io/CRUDkit/storybook/" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              Storybook
            </a>
          </div>
          
          <div className="divider my-8">Source Code</div>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="https://github.com/TortoiseWolfe/CRUDkit" 
              className="btn btn-outline btn-primary gap-2"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
            <a 
              href="https://github.com/TortoiseWolfe/CRUDkit/fork" 
              className="btn btn-outline btn-secondary gap-2"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.559 8.855c.166 1.183.789 3.207 3.087 4.079C11 13.829 11 16.879 11 18v3c0 .549.428.997.951 1.01A11.955 11.955 0 0012 22c5.186 0 9.619-3.317 11.263-7.944l.009-.024.005-.014a11.907 11.907 0 00.352-1.962c.01-.131.017-.266.02-.402.002-.082.004-.165.004-.249 0-.084-.002-.167-.004-.249a12.15 12.15 0 00-.02-.405c-.013-.173-.03-.345-.048-.517H19.95c.026.218.05.437.05.661 0 2.684-2.342 4.856-5.23 4.856-2.887 0-5.229-2.172-5.229-4.856 0-.224.024-.443.05-.661h-3.93c-.103 1.189.052 4.148 2.918 5.107C11 16.879 11 14.829 11 13V12c-3-1-3.5-4-3.5-4S6.313 6.438 7.294 4.74c.195-.337.517-.571.879-.649a1.003 1.003 0 01.969.289l2.828 2.828 2.828-2.828a1.003 1.003 0 01.969-.289c.362.078.684.312.879.649.98 1.698-.207 3.26-.207 3.26z"/>
              </svg>
              Fork Repository
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}