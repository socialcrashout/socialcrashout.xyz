import { useEffect, useRef, useState } from 'react'

function Experience() {
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

  const experience = [
    {
      org: 'DesignDen',
      description:
        'The leading destination for ERLC design server orders, crafting each order to meet the unique needs of every customer. Trusted by hundreds, with the goal of becoming the largest ERLC design server out there.',
      tags: ['ERLC', 'Design Server'],
      link: 'https://discord.gg/BqxUU3Zb6',
    },
    {
      org: 'Horizon Designs',
      description:
        'A design studio built around clean, modern visuals and fast turnarounds — helping communities level up their look with custom graphics, server setups, and branding that stands out.',
      tags: ['Branding', 'Custom Design'],
      link: 'https://discord.gg/AqgMMbHn3',
    },
    {
      org: "ASB's Customs",
      description:
        "Since 2025, leading the game with the highest quality and most affordable designs out there. Explore a full range of services made to fit every budget.",
      tags: ['Custom Design', 'Affordable'],
      link: 'https://discord.gg/79yX6k7yD',
    },
    {
      org: 'Prime Designs',
      description:
        'Dedicated to bringing quality and innovation together, offering a diverse range of high-quality services tailored to meet every client\'s needs.',
      tags: ['Quality', 'Innovation'],
      link: 'https://discord.gg/GxS43h6Hq',
    },
    {
      org: "Judah's Customs",
      description:
        'Since August 23, 2025, focused on prioritizing quality over quantity — providing high-quality, efficient services tailored to every client.',
      tags: ['Quality', 'Custom Design'],
      link: 'https://discord.gg/2T5zYkKhU',
    },
    {
      org: 'Pulse Customs',
      description:
        'Founded July 2, 2024, providing high-quality, affordable products for all clients — alongside community events and giveaways.',
      tags: ['Community', 'Events'],
      link: 'https://discord.gg/DhXeV6hm5',
    },
  ]

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative max-w-5xl mx-auto px-6 pt-8 pb-24"
    >
      <h2
        className={`text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
        }`}
      >
        <span className="text-accent font-mono text-xl">04.</span>
        <span className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 hover:from-amber-400 hover:via-orange-500 hover:to-rose-500 bg-clip-text hover:text-transparent transition-all duration-500 ease-out cursor-default hover:tracking-wide">
          Experience
        </span>
      </h2>

      <div className="group relative mb-8 h-px w-full bg-gray-200 overflow-hidden rounded-full cursor-pointer">
        <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-700 ease-out group-hover:w-full" />
      </div>

      <div className="relative max-w-3xl">
        {/* vertical timeline line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />

        <div className="flex flex-col gap-6">
          {experience.map((item, i) => (
            <a
              key={item.org}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative block pl-10 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: isVisible ? `${150 + i * 100}ms` : '0ms' }}
            >
              {/* timeline dot */}
              <span className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-white border-2 border-gray-300 group-hover:border-accent group-hover:scale-110 transition-all duration-300 ease-out" />
              <span className="absolute left-[3px] top-[11px] w-[7px] h-[7px] rounded-full bg-gray-300 group-hover:bg-accent transition-colors duration-300 ease-out" />

              <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 ease-out">
                {/* gradient wash on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

                {/* soft glow */}
                <div className="pointer-events-none absolute -inset-6 bg-gradient-to-r from-amber-400/0 via-orange-400/0 to-rose-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/10 group-hover:to-rose-400/10 blur-xl transition-all duration-500 ease-out" />

                <h3 className="relative text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors duration-300 ease-out mb-2">
                  {item.org}
                </h3>

                <p className="relative text-gray-500 text-sm mb-4">
                  {item.description}
                </p>

                <div className="relative flex gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-accent bg-orange-50 px-2 py-1 rounded group-hover:bg-white/70 transition-colors duration-300 ease-out"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience