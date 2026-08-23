import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 20, suffix: '+', label: 'Projects Completed' },
  { value: 140, suffix: '+', label: 'Discord Members' },
  { value: 1, suffix: '+', label: 'Years Creating' },
]

function useCountUp(target, start) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame
    const duration = 1400
    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, target])

  return value
}

function Stat({ value, suffix, label, start, delay }) {
  const count = useCountUp(value, start)

  return (
    <div
      className="overflow-hidden bg-orange-50/60 border border-gray-200 rounded-2xl px-1 py-4 text-center hover:bg-orange-50 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 ease-out"
      style={{ transitionDelay: start ? `${delay}ms` : '0ms' }}
    >
      <p className="text-lg sm:text-xl font-black text-gray-900 tabular-nums whitespace-nowrap leading-tight">
        {count}
        {suffix}
      </p>
      <p className="text-[10px] text-gray-500 mt-1.5 leading-tight">
        {label}
      </p>
    </div>
  )
}

function StatsCard() {
  const cardRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      id="stats"
      ref={cardRef}
      className="w-full lg:w-[380px] bg-white border border-gray-200 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 shadow-sm animate-card-in hover:-translate-y-2 hover:scale-[1.01] hover:border-accent/40 hover:shadow-2xl hover:shadow-orange-200/60 transition-all duration-500 ease-out"
    >
      <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase mb-3">
        Statistics
      </p>
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-6">
        By the numbers
      </h2>

      <div className="grid grid-cols-3 gap-2">
        {STATS.map((stat, i) => (
          <Stat key={stat.label} {...stat} start={inView} delay={i * 150} />
        ))}
      </div>
    </div>
  )
}

export default StatsCard