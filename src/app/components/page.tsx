'use client';

import { useState } from 'react';

export default function ComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabActive, setTabActive] = useState(0);

  return (
    <main className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8">Component Gallery</h1>
        <p className="text-center text-xl mb-12 text-base-content/70">
          Explore all DaisyUI components with your selected theme
        </p>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Buttons</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Colors</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn">Default</button>
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-secondary">Secondary</button>
                <button className="btn btn-accent">Accent</button>
                <button className="btn btn-info">Info</button>
                <button className="btn btn-success">Success</button>
                <button className="btn btn-warning">Warning</button>
                <button className="btn btn-error">Error</button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-ghost">Ghost</button>
                <button className="btn btn-link">Link</button>
                <button className="btn btn-outline">Outline</button>
                <button className="btn btn-outline btn-primary">Outline Primary</button>
                <button className="btn btn-outline btn-secondary">Outline Secondary</button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-2 items-center">
                <button className="btn btn-xs">Tiny</button>
                <button className="btn btn-sm">Small</button>
                <button className="btn btn-md">Medium</button>
                <button className="btn btn-lg">Large</button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">States</h3>
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-active">Active</button>
                <button className="btn" disabled>Disabled</button>
                <button className="btn btn-square">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <button className="btn btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button className="btn loading">Loading</button>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Cards</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Basic Card</h2>
                <p>Simple card with text content and actions.</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Action</button>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <div className="rounded-xl bg-primary h-32 w-full"></div>
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Card with Figure</h2>
                <p>Card with image placeholder</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>

            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">Colored Card</h2>
                <p>Card with primary background</p>
                <div className="card-actions justify-end">
                  <button className="btn">Action</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Form Elements</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Text Input</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered" />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select</span>
                </label>
                <select className="select select-bordered">
                  <option disabled selected>Pick one</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Textarea</span>
                </label>
                <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>
              </div>
            </div>

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
                  <input type="checkbox" className="checkbox checkbox-primary" />
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Radio Buttons</span>
                </label>
                <div className="flex gap-4">
                  <label className="label cursor-pointer gap-2">
                    <input type="radio" name="radio-1" className="radio radio-primary" defaultChecked />
                    <span className="label-text">Option 1</span>
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <input type="radio" name="radio-1" className="radio radio-primary" />
                    <span className="label-text">Option 2</span>
                  </label>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Range</span>
                </label>
                <input type="range" min={0} max={100} defaultValue={40} className="range range-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Badges & Alerts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Badges & Alerts</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <div className="badge">default</div>
                <div className="badge badge-primary">primary</div>
                <div className="badge badge-secondary">secondary</div>
                <div className="badge badge-accent">accent</div>
                <div className="badge badge-ghost">ghost</div>
                <div className="badge badge-info">info</div>
                <div className="badge badge-success">success</div>
                <div className="badge badge-warning">warning</div>
                <div className="badge badge-error">error</div>
                <div className="badge badge-outline">outline</div>
                <div className="badge badge-lg">large</div>
                <div className="badge badge-sm">small</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Alerts</h3>
              <div className="space-y-2">
                <div className="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Default alert message</span>
                </div>
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Info: New update available</span>
                </div>
                <div className="alert alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Success: Your purchase has been confirmed!</span>
                </div>
                <div className="alert alert-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Warning: Invalid email address!</span>
                </div>
                <div className="alert alert-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Error: Task failed successfully!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading & Progress Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Loading & Progress</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-3">Loading Spinners</h3>
              <div className="flex gap-4">
                <span className="loading loading-spinner loading-xs"></span>
                <span className="loading loading-spinner loading-sm"></span>
                <span className="loading loading-spinner loading-md"></span>
                <span className="loading loading-spinner loading-lg"></span>
              </div>
              <div className="flex gap-4 mt-4">
                <span className="loading loading-dots loading-xs"></span>
                <span className="loading loading-dots loading-sm"></span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
              </div>
              <div className="flex gap-4 mt-4">
                <span className="loading loading-ring loading-xs"></span>
                <span className="loading loading-ring loading-sm"></span>
                <span className="loading loading-ring loading-md"></span>
                <span className="loading loading-ring loading-lg"></span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Progress Bars</h3>
              <div className="space-y-4">
                <progress className="progress w-full" value="0" max="100"></progress>
                <progress className="progress progress-primary w-full" value="10" max="100"></progress>
                <progress className="progress progress-secondary w-full" value="40" max="100"></progress>
                <progress className="progress progress-accent w-full" value="70" max="100"></progress>
                <progress className="progress progress-success w-full" value="100" max="100"></progress>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Navigation</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Breadcrumbs</h3>
              <div className="breadcrumbs">
                <ul>
                  <li><a>Home</a></li>
                  <li><a>Documents</a></li>
                  <li>Add Document</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Tabs</h3>
              <div className="tabs tabs-bordered">
                <a className={`tab ${tabActive === 0 ? 'tab-active' : ''}`} onClick={() => setTabActive(0)}>Tab 1</a>
                <a className={`tab ${tabActive === 1 ? 'tab-active' : ''}`} onClick={() => setTabActive(1)}>Tab 2</a>
                <a className={`tab ${tabActive === 2 ? 'tab-active' : ''}`} onClick={() => setTabActive(2)}>Tab 3</a>
              </div>
              <div className="p-4 border border-base-300 border-t-0">
                Content for Tab {tabActive + 1}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Pagination</h3>
              <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Page 1</button>
                <button className="join-item btn btn-active">Page 2</button>
                <button className="join-item btn">Page 3</button>
                <button className="join-item btn">»</button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Steps</h3>
              <ul className="steps">
                <li className="step step-primary">Register</li>
                <li className="step step-primary">Choose plan</li>
                <li className="step">Purchase</li>
                <li className="step">Receive Product</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Display Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Data Display</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Table</h3>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Job</th>
                      <th>Favorite Color</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    <tr className="hover">
                      <th>2</th>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Stats</h3>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Total Likes</div>
                  <div className="stat-value text-primary">25.6K</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
                
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Page Views</div>
                  <div className="stat-value text-secondary">2.6M</div>
                  <div className="stat-desc">21% more than last month</div>
                </div>
                
                <div className="stat">
                  <div className="stat-value">86%</div>
                  <div className="stat-title">Tasks done</div>
                  <div className="stat-desc text-secondary">31 tasks remaining</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Accordion</h3>
              <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="radio" name="my-accordion-4" defaultChecked />
                  <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                  </div>
                  <div className="collapse-content">
                    <p>hello</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                  </div>
                  <div className="collapse-content">
                    <p>hello</p>
                  </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title text-xl font-medium">
                    Click to open this one and close others
                  </div>
                  <div className="collapse-content">
                    <p>hello</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modals & Overlays Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Modals & Overlays</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Modal</h3>
              <button className="btn" onClick={() => setModalOpen(true)}>Open Modal</button>
              {modalOpen && (
                <div className="modal modal-open">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    <div className="modal-action">
                      <button className="btn" onClick={() => setModalOpen(false)}>Close</button>
                    </div>
                  </div>
                  <div className="modal-backdrop" onClick={() => setModalOpen(false)}></div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Tooltip</h3>
              <div className="flex gap-4">
                <div className="tooltip" data-tip="hello">
                  <button className="btn">Hover me</button>
                </div>
                <div className="tooltip tooltip-bottom" data-tip="hello">
                  <button className="btn">Bottom</button>
                </div>
                <div className="tooltip tooltip-left" data-tip="hello">
                  <button className="btn">Left</button>
                </div>
                <div className="tooltip tooltip-right" data-tip="hello">
                  <button className="btn">Right</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Other Components</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-3">Avatar</h3>
              <div className="flex gap-4">
                <div className="avatar">
                  <div className="w-24 rounded-full bg-primary text-primary-content">
                    <span className="text-3xl">JD</span>
                  </div>
                </div>
                <div className="avatar online">
                  <div className="w-24 rounded-full bg-secondary text-secondary-content">
                    <span className="text-3xl">AB</span>
                  </div>
                </div>
                <div className="avatar offline">
                  <div className="w-24 rounded-full bg-accent text-accent-content">
                    <span className="text-3xl">XY</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Rating</h3>
              <div className="space-y-2">
                <div className="rating">
                  <input type="radio" name="rating-1" className="mask mask-star" />
                  <input type="radio" name="rating-1" className="mask mask-star" defaultChecked />
                  <input type="radio" name="rating-1" className="mask mask-star" />
                  <input type="radio" name="rating-1" className="mask mask-star" />
                  <input type="radio" name="rating-1" className="mask mask-star" />
                </div>
                <div className="rating rating-lg">
                  <input type="radio" name="rating-2" className="mask mask-heart bg-red-400" />
                  <input type="radio" name="rating-2" className="mask mask-heart bg-orange-400" />
                  <input type="radio" name="rating-2" className="mask mask-heart bg-yellow-400" />
                  <input type="radio" name="rating-2" className="mask mask-heart bg-lime-400" defaultChecked />
                  <input type="radio" name="rating-2" className="mask mask-heart bg-green-400" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Countdown</h3>
              <div className="flex gap-5">
                <div>
                  <span className="countdown font-mono text-4xl">
                    <span style={{"--value": 15} as React.CSSProperties}></span>
                  </span>
                  days
                </div>
                <div>
                  <span className="countdown font-mono text-4xl">
                    <span style={{"--value": 10} as React.CSSProperties}></span>
                  </span>
                  hours
                </div>
                <div>
                  <span className="countdown font-mono text-4xl">
                    <span style={{"--value": 24} as React.CSSProperties}></span>
                  </span>
                  min
                </div>
                <div>
                  <span className="countdown font-mono text-4xl">
                    <span style={{"--value": 51} as React.CSSProperties}></span>
                  </span>
                  sec
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Kbd</h3>
              <div className="flex gap-2">
                <kbd className="kbd">⌘</kbd>
                <kbd className="kbd">⌥</kbd>
                <kbd className="kbd">⇧</kbd>
                <kbd className="kbd">⌃</kbd>
                <kbd className="kbd kbd-lg">Enter</kbd>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}