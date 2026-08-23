import { useEffect, useRef, useState } from 'react'

function Skills() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const skills = [
    'Photopea',
    'Canva',
    'Photoshop',
    'After Effects',
    'VS Code',
    'Roblox Studio',
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative max-w-5xl mx-auto px-6 pt-8 pb-8"
    >
      <h2
        className={`text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <span className="text-accent font-mono text-xl">02.</span>
        <span className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 hover:from-amber-400 hover:via-orange-500 hover:to-rose-500 bg-clip-text hover:text-transparent transition-all duration-500 ease-out cursor-default hover:tracking-wide">
          Skills
        </span>
      </h2>

      <div className="group relative mb-8 h-px w-full bg-gray-200 overflow-hidden rounded-full cursor-pointer">
        <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-700 ease-out group-hover:w-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl">
        {skills.map((name, i) => (
          <div
            key={name}
            className={`group relative overflow-hidden bg-white border border-gray-200 rounded-lg px-4 py-5 flex items-center justify-center text-center text-gray-700 shadow-sm hover:border-accent hover:-translate-y-1 hover:scale-[1.03] hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 ease-out select-none ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: isVisible ? `${150 + i * 100}ms` : '0ms' }}
          >
            {/* gradient wash that fades in on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

            {/* soft glow blob following the tile */}
            <div className="pointer-events-none absolute -inset-4 bg-gradient-to-r from-amber-400/0 via-orange-400/0 to-rose-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/10 group-hover:to-rose-400/10 blur-xl transition-all duration-500 ease-out" />

            <span className="relative text-sm font-medium text-gray-700 group-hover:text-accent group-hover:font-semibold transition-all duration-300 ease-out">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills