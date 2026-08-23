import { useState, useEffect } from 'react'
import CreationsPanel from './CreationsPanel'

const ROTATING_WORDS = ['LOGO ANIMATIONS', 'GRAPHICS', 'DISCORD BOTS', 'EMBEDS', 'DISCORD SERVERS']

function FeaturedWork() {
  const [open, setOpen] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <button
        id="creations"
        onClick={() => setOpen(true)}
        className="@container group relative w-full lg:flex-1 block overflow-hidden bg-white border border-gray-200 rounded-3xl px-6 sm:px-12 py-10 sm:py-12 shadow-sm animate-card-in hover:-translate-y-2 hover:scale-[1.01] hover:border-accent/40 hover:shadow-2xl hover:shadow-orange-200/60 transition-all duration-500 ease-out text-left"
      >
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl group-hover:bg-orange-200/50 group-hover:scale-125 transition-all duration-700 ease-out" />

        <div className="relative flex items-start justify-between">
          <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase mb-4">
            Featured Work
          </p>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out flex-shrink-0"
          >
            <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h2 className="relative text-3xl @sm:text-4xl @md:text-5xl @lg:text-6xl @2xl:text-7xl @4xl:text-8xl font-black tracking-tight mb-6 leading-none break-words">
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent animate-shimmer">
            CREATIONS
          </span>
        </h2>

        <p className="relative text-gray-500 leading-relaxed max-w-xl mb-8 h-6 overflow-hidden">
          <span key={wordIndex} className="inline-block animate-fall-in font-mono text-sm tracking-wide">
            {ROTATING_WORDS[wordIndex]}
          </span>
        </p>

        <div className="relative inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wide uppercase">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ease-out">
            <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
          </svg>
          Open
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-300 ease-out">→</span>
        </div>
      </button>

      <CreationsPanel open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default FeaturedWork