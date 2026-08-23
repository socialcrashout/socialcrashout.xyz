import { useEffect, useState } from 'react'

// Swap this for your admin-panel data source once uploads are wired up.
const CATEGORIES = [
  { key: 'logos', label: 'Logo animations', count: 12 },
  { key: 'graphics', label: 'Graphics', count: 29 },
  { key: 'bots', label: 'Discord bots', count: 21 },
  { key: 'embeds', label: 'Embeds', count: 8 },
  { key: 'servers', label: 'Discord servers', count: 6 },
]

function CreationsPanel({ open, onClose }) {
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    if (!open) setActiveCategory(null)
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 backdrop-blur-sm animate-fall-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4 my-8 sm:my-0 max-h-[85vh] overflow-y-auto bg-white rounded-3xl border border-gray-200 shadow-2xl animate-card-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />

        <div className="relative px-6 sm:px-10 py-8 sm:py-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase mb-3">
                Featured Work
              </p>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-none">
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  CREATIONS
                </span>
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex-shrink-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/40 transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {!activeCategory ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="animate-card-in group text-left bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-accent/40 rounded-2xl p-5 transition-colors duration-300"
                >
                  <p className="font-semibold text-gray-900 group-hover:text-accent transition-colors duration-300 mb-1">
                    {cat.label}
                  </p>
                  <p className="text-sm text-gray-400">{cat.count} items</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="animate-card-in">
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors duration-200 mb-6"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                All categories
              </button>
              <p className="text-gray-500">
                {CATEGORIES.find((c) => c.key === activeCategory)?.label} items would render here —
                pull them from wherever your admin panel writes uploads to.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreationsPanel