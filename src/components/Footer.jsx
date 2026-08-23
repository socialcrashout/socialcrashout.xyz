import { useEffect, useState } from 'react'

const MARQUEE_WORDS = ['graphics', 'embeds', 'branding', 'community', 'logos', 'animations']

// use your real domain as the namespace so counts don't collide with other sites
const VIEWS_NAMESPACE = 'socialcrashout.xyz'
const VIEWS_KEY = 'page-views'

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-accent shrink-0">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MarqueeStrip() {
  const doubled = [...MARQUEE_WORDS, ...MARQUEE_WORDS]

  return (
    <div className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden border-y border-gray-200 bg-orange-50/40 py-4">
      <div className="flex gap-8 w-max animate-marquee-left">
        {doubled.map((word, i) => (
          <div key={`${word}-${i}`} className="flex items-center gap-8">
            <span className="text-lg sm:text-xl font-bold text-gray-800 uppercase tracking-wide whitespace-nowrap">
              {word}
            </span>
            <StarIcon />
          </div>
        ))}
      </div>
    </div>
  )
}

function ViewCounter() {
  const [views, setViews] = useState(null)

  useEffect(() => {
    // sessionStorage guard so refreshing the same tab doesn't inflate the count
    const alreadyCounted = sessionStorage.getItem('view_counted')
    const url = alreadyCounted
      ? `https://abacus.jasoncameron.dev/get/${VIEWS_NAMESPACE}/${VIEWS_KEY}`
      : `https://abacus.jasoncameron.dev/hit/${VIEWS_NAMESPACE}/${VIEWS_KEY}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setViews(data.value)
        if (!alreadyCounted) sessionStorage.setItem('view_counted', 'true')
      })
      .catch(() => setViews(null))
  }, [])

  if (views === null) return null

  return (
    <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mb-3">
      <EyeIcon />
      <span>{views.toLocaleString()} views</span>
    </div>
  )
}

function Footer() {
  return (
    <section
      id="footer"
      className="relative max-w-3xl mx-auto px-6 py-24 text-center"
    >
      <div className="mb-16">
        <MarqueeStrip />
      </div>

      <ViewCounter />

      <footer className="text-gray-400 text-sm">
        © 2026 .socialcrashout — Crafted with love
      </footer>
    </section>
  )
}

export default Footer