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
        </div>
      </div>
    </main>
  );
}