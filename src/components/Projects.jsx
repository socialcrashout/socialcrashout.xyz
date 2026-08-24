import { useEffect, useRef, useState } from 'react'
import modeLogo from '../assets/images/mode_logo.png'
import honoluaIcon from '../assets/images/honolua_icon.png'

function Projects() {
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

  const projects = [
    {
      title: '.Mode',
      description:
        'Creativity starts here. We turn ideas into reality with clean setups and original designs made to help your community stand out.',
      tags: ['Community', 'Design Server'],
      link: 'https://discord.com/invite/mode2026',
      image: modeLogo,
    },
    {
      title: 'Honolua',
      description:
        'An upcoming Hawaiian restaurant experience on Roblox.',
      tags: ['Roblox', 'Coming Soon', 'Hawaiian Restaurant'],
      link: null,
      image: honoluaIcon,
    },
    {
      title: 'Yumi',
      description:
        'Image and video hosting with an API, dashboard, and custom domains.',
      tags: ['Hosting', 'API'],
      link: 'https://yumi.onl/',
      image: yumi.jpg,
    },
  ]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative max-w-5xl mx-auto px-6 pt-8 pb-8"
    >
      <h2
        className={`text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <span className="text-accent font-mono text-xl">03.</span>
        <span className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 hover:from-amber-400 hover:via-orange-500 hover:to-rose-500 bg-clip-text hover:text-transparent transition-all duration-500 ease-out cursor-default hover:tracking-wide">
          Projects
        </span>
      </h2>

      <div className="group relative mb-8 h-px w-full bg-gray-200 overflow-hidden rounded-full cursor-pointer">
        <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-700 ease-out group-hover:w-full" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 items-stretch max-w-3xl">
        {projects.map((project, i) => {
          const CardTag = project.link ? 'a' : 'div'

          return (
            <CardTag
              key={project.title}
              {...(project.link
                ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`group relative overflow-hidden flex flex-col bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 ease-out ${
                project.link
                  ? 'hover:border-accent hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-200/50 cursor-pointer'
                  : 'cursor-default'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: isVisible ? `${150 + i * 100}ms` : '0ms' }}
            >
              {/* gradient wash that fades in on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

              {/* soft glow blob following the card */}
              <div className="pointer-events-none absolute -inset-6 bg-gradient-to-r from-amber-400/0 via-orange-400/0 to-rose-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/10 group-hover:to-rose-400/10 blur-xl transition-all duration-500 ease-out" />

              {project.image && (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden mb-4 border border-gray-200 group-hover:border-accent/40 transition-colors duration-300 ease-out">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              )}

              <h3 className="relative text-lg font-semibold mb-2 text-gray-900 group-hover:text-accent transition-colors duration-300 ease-out">
                {project.title}
              </h3>
              <p className="relative text-gray-500 text-sm mb-4 flex-1">
                {project.description}
              </p>
              <div className="relative flex gap-2 flex-wrap">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-accent bg-orange-50 px-2 py-1 rounded group-hover:bg-white/70 transition-colors duration-300 ease-out"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardTag>
          )
        })}
      </div>
    </section>
  )
}

export default Projects