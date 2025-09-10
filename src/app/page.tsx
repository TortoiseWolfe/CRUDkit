export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Hello CRUDkit! 🚀
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Deployment Pipeline: ✅ Working
        </p>
        <div className="space-y-2 text-gray-500 dark:text-gray-400">
          <p>Next.js 15.5 • React 19 • TypeScript 5.9</p>
          <p>Deploy Early, Deploy Often</p>
        </div>
      </div>
    </main>
  );
}