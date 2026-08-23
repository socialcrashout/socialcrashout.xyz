function Hero() {
  return (
    <div id="home" className="@container w-full lg:flex-1 bg-white border border-gray-200 rounded-3xl px-6 sm:px-12 py-12 sm:py-16 shadow-sm animate-card-in hover:-translate-y-2 hover:scale-[1.01] hover:border-accent/40 hover:shadow-2xl hover:shadow-orange-200/60 transition-all duration-500 ease-out overflow-hidden">
      <p className="text-accent font-mono text-sm tracking-[0.2em] uppercase mb-6">
        Designer &amp; Developer
      </p>

      <h1 className="text-3xl @sm:text-4xl @xl:text-5xl @4xl:text-6xl font-black tracking-tight mb-6 leading-none break-words">
        <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent animate-shimmer">
          .socialcrashout
        </span>
      </h1>

      <p className="text-xl sm:text-2xl text-gray-600 mb-8">
        Designer, developer, creator, <span className="text-accent font-medium">&amp; animator.</span>
      </p>

      <hr className="border-gray-200 mb-8" />

      <p className="text-gray-500 leading-relaxed max-w-2xl">
        Building loud brands, wild interfaces, and internet-native products.
        Focused on identity systems, motion, and websites that hit different
        — made for creators, communities, and anyone with something to say.
      </p>
    </div>
  )
}

export default Hero