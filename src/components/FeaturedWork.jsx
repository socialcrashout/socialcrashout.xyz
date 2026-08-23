function FeaturedWork() {
  return (
    <a
      id="creations"
      href="/portfolio"
      className="group relative w-full lg:flex-1 block overflow-hidden bg-white border border-gray-200 rounded-3xl px-8 sm:px-12 py-10 sm:py-12 shadow-sm animate-card-in hover:-translate-y-2 hover:scale-[1.01] hover:border-accent/40 hover:shadow-2xl hover:shadow-orange-200/60 transition-all duration-500 ease-out"
    >
      {/* ambient glow that grows on hover */}
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
          className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out"
        >
          <path d="M7 17L17 7M17 7H8M17 7V16" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="relative text-6xl sm:text-8xl font-black tracking-tight mb-6 leading-none">
        <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent animate-shimmer">
          CREATIONS
        </span>
      </h2>

      <p className="relative text-gray-500 leading-relaxed max-w-xl mb-8">
        A showcase of the projects and creations I’ve worked on over the years.
      </p>

      <div className="relative inline-flex items-center gap-2 text-accent font-semibold text-sm tracking-wide uppercase">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ease-out"
        >
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </svg>
        Open
        <span className="inline-block group-hover:translate-x-1 transition-transform duration-300 ease-out">
          →
        </span>
      </div>
    </a>
  )
}

export default FeaturedWork