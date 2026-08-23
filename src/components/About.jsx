import { useEffect, useRef, useState } from 'react'

function About() {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative max-w-5xl mx-auto px-6 pt-24 pb-8"
    >
      <h2
        className={`text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <span className="text-accent font-mono text-xl">01.</span>
        <span className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 hover:from-amber-400 hover:via-orange-500 hover:to-rose-500 bg-clip-text hover:text-transparent transition-all duration-500 ease-out cursor-default hover:tracking-wide">
          About Me
        </span>
      </h2>

      <div className="group relative mb-8 h-px w-full bg-gray-200 overflow-hidden rounded-full cursor-pointer">
        <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-700 ease-out group-hover:w-full" />
      </div>

      <p
        className={`text-gray-500 leading-relaxed max-w-3xl hover:text-gray-900 transition-all duration-700 ease-out cursor-default ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
        style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
      >
        Hey, I'm Krish! I've been involved in the Roblox industry for over 3
        years and started my design journey around a year ago. I'm always
        looking to learn new things, improve my skills, and continue growing
        creatively. One of my favorite parts of designing is seeing customers
        happy and satisfied with the work I create for them.
      </p>
    </section>
  )
}

export default About