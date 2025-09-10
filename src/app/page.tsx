import Link from 'next/link';

export default function Home() {
  const storybookUrl = process.env.NODE_ENV === 'production' 
    ? 'https://tortoisewolfe.github.io/CRUDkit/storybook/' 
    : 'http://localhost:6006';

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
            <Link href="themes/" className="btn btn-primary">
              <span className="text-base">Explore Themes</span>
            </Link>
            <Link href="components/" className="btn btn-secondary">
              <span className="text-base">Components</span>
            </Link>
            <Link href="accessibility/" className="btn btn-accent">
              <span className="text-base">Accessibility</span>
            </Link>
            <a href={storybookUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              <span className="text-base">View Storybook</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}