import Link from 'next/link';

export default function Home() {
  const storybookUrl = process.env.NODE_ENV === 'production' 
    ? 'https://tortoisewolfe.github.io/CRUDkit/storybook/' 
    : 'http://localhost:6006';

  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold mb-4">
            Hello CRUDkit! 🚀
          </h1>
          <div className="badge badge-success badge-lg mb-8">
            Deployment Pipeline: ✅ Working
          </div>
          <div className="space-y-2">
            <p className="text-base-content/70">Next.js 15.5 • React 19 • TypeScript 5.9</p>
            <p className="text-base-content/70">Deploy Early, Deploy Often</p>
          </div>
          <div className="flex gap-4 justify-center mt-8 flex-wrap">
            <Link href="/themes" className="btn btn-primary">
              Explore Themes
            </Link>
            <Link href="/accessibility" className="btn btn-accent">
              Accessibility
            </Link>
            <a href={storybookUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              View Storybook
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}