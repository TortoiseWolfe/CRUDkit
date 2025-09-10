import ThemeSwitcher from '@/components/theme/ThemeSwitcher';

export default function ThemesPage() {
  return (
    <main className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-base-content mb-4">
            CRUDkit Theme Playground
          </h1>
          <p className="text-xl text-base-content/70">
            Explore 32+ beautiful DaisyUI themes
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ThemeSwitcher />
        </div>

        <div className="divider my-12">Components Showcase</div>

        {/* Component Examples */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Cards */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card Example</h2>
              <p>This is how cards look in the current theme.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Action</button>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-2">
            <div className="alert alert-info">
              <span>Info alert</span>
            </div>
            <div className="alert alert-success">
              <span>Success alert</span>
            </div>
            <div className="alert alert-warning">
              <span>Warning alert</span>
            </div>
            <div className="alert alert-error">
              <span>Error alert</span>
            </div>
          </div>

          {/* Form Elements */}
          <div className="form-control space-y-4">
            <input type="text" placeholder="Text input" className="input input-bordered" />
            <select className="select select-bordered" defaultValue="">
              <option value="" disabled>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <textarea className="textarea textarea-bordered" placeholder="Textarea"></textarea>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              <button className="btn">Default</button>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-accent">Accent</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="btn btn-info">Info</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-error">Error</button>
            </div>
          </div>

          {/* Progress & Loading */}
          <div className="space-y-4">
            <progress className="progress progress-primary" value="70" max="100"></progress>
            <progress className="progress progress-secondary" value="50" max="100"></progress>
            <div className="flex gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              <span className="loading loading-spinner loading-md"></span>
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          </div>

          {/* Toggle & Checkbox */}
          <div className="space-y-4">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Toggle</span>
                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Checkbox</span>
                <input type="checkbox" className="checkbox checkbox-primary" defaultChecked />
              </label>
            </div>
            <div className="rating">
              <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" />
              <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" defaultChecked />
              <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" />
              <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" />
              <input type="radio" name="rating-1" className="mask mask-star bg-orange-400" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats shadow mt-8">
          <div className="stat">
            <div className="stat-title">Total Themes</div>
            <div className="stat-value text-primary">32</div>
            <div className="stat-desc">All built-in DaisyUI themes</div>
          </div>
          <div className="stat">
            <div className="stat-title">Components</div>
            <div className="stat-value text-secondary">50+</div>
            <div className="stat-desc">Ready to use</div>
          </div>
          <div className="stat">
            <div className="stat-title">Customizable</div>
            <div className="stat-value">100%</div>
            <div className="stat-desc">Full control over styling</div>
          </div>
        </div>
      </div>
    </main>
  );
}