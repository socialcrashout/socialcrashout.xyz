import { useState, useEffect } from 'react'
import Cursor from './Cursor'

// Swap this for real data once uploads are wired to a backend.
const MOCK_WORK = [
  { id: 1, title: 'Neon logo intro', category: 'Logo animations' },
  { id: 2, title: 'Banner set vol. 3', category: 'Graphics' },
  { id: 3, title: 'Moderation bot', category: 'Discord bots' },
]

function Admin() {
  const [unlocked, setUnlocked] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setUnlocked(localStorage.getItem('is_admin') === 'true')
    setChecked(true)
  }, [])

  if (!checked) return null

  if (!unlocked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Cursor />
        <p className="text-gray-400">Nothing here.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <Cursor />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
            Admin panel
          </p>
        </div>

        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black tracking-tight">Manage work</h1>

          <a
            href="/admin/add"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-accent-dark)] transition-colors duration-200"
          >
            + Add work
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden">
          {MOCK_WORK.length === 0 ? (
            <p className="text-gray-400 text-sm px-6 py-8 text-center">
              No work uploaded yet.
            </p>
          ) : (
            MOCK_WORK.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.category}</p>
                </div>
                <button className="text-sm text-gray-400 hover:text-red-500 transition-colors duration-200">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin