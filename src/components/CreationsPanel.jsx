import { useEffect, useState } from 'react'
import { getWork, getCounts, subscribeToWork, CATEGORIES } from '../utils/workStore'

function CreationsPanel({ open, onClose }) {
  const [activeCategory, setActiveCategory] = useState(null)
  const [counts, setCounts] = useState({})
  const [work, setWork] = useState([])
  const [lightboxItem, setLightboxItem] = useState(null)

  useEffect(() => {
    function refresh() {
      setCounts(getCounts())
      setWork(getWork())
    }
    refresh()
    return subscribeToWork(refresh)
  }, [])

  useEffect(() => {
    if (!open) {
      setActiveCategory(null)
      setLightboxItem(null)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleKey = (e) => {
      if (e.key !== 'Escape') return
      // Close the lightbox first, then the panel, on successive Escapes
      if (lightboxItem) setLightboxItem(null)
      else onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose, lightboxItem])

  if (!open) return null

  const activeItems = activeCategory ? work.filter((item) => item.category === activeCategory) : []

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
                  <p className="text-sm text-gray-400">{counts[cat.key] || 0} items</p>
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

              {activeItems.length === 0 ? (
                <p className="text-gray-400 text-sm">Nothing here yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {activeItems.map((item) => {
                    const isVideo = item.fileType?.startsWith('video/')
                    const isImage = item.fileType?.startsWith('image/')
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setLightboxItem(item)}
                        className="group text-left rounded-2xl border border-gray-200 overflow-hidden hover:border-accent/40 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative w-full h-32 bg-gray-100">
                          {isImage && (
                            <img
                              src={item.fileData}
                              alt={item.title}
                              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                          {isVideo && (
                            <>
                              <video src={item.fileData} className="w-full h-32 object-cover" muted playsInline />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-200">
                                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-900 translate-x-[1px]">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-gray-900 px-3 py-2">{item.title}</p>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {lightboxItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fall-in p-4 sm:p-10"
          onClick={(e) => {
            e.stopPropagation()
            setLightboxItem(null)
          }}
        >
          <div className="relative max-w-5xl max-h-full w-full animate-card-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxItem(null)}
              aria-label="Close"
              className="absolute -top-4 -right-4 sm:top-2 sm:right-2 w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-accent transition-colors duration-200 shadow-lg z-10"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {lightboxItem.fileType?.startsWith('image/') && (
              <img
                src={lightboxItem.fileData}
                alt={lightboxItem.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
            {lightboxItem.fileType?.startsWith('video/') && (
              <video
                src={lightboxItem.fileData}
                controls
                autoPlay
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl bg-black"
              />
            )}

            <p className="text-white/90 text-sm font-semibold text-center mt-4">{lightboxItem.title}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreationsPanel