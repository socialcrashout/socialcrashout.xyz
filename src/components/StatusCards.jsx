import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Copy, Check } from 'lucide-react'

function StatusCards() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

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

  const handleCopy = () => {
    navigator.clipboard.writeText('.socialcrashout')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative flex justify-center px-6 pb-8">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">
        {/* Connect card */}
        <div
          className={`bg-white border border-gray-200 rounded-3xl px-8 py-10 shadow-sm hover:-translate-y-2 hover:scale-[1.01] hover:border-accent/40 hover:shadow-2xl hover:shadow-orange-200/60 transition-all duration-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-accent font-mono text-sm tracking-[0.2em] uppercase mb-4">
            Connect
          </p>
          <h3 className="text-3xl font-black tracking-tight text-gray-900 mb-4">
            DM me on Discord
          </h3>
          <p className="text-gray-500 leading-relaxed max-w-sm mb-8">
            Only place I answer. Slide into DMs — briefs, collabs, chaos.
          </p>

          <hr className="border-gray-200 mb-6" />

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-orange-50/40 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0 h-10 w-10 rounded-full bg-white border border-accent/30 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                  Discord
                </div>
                <div className="text-gray-900 font-semibold truncate">
                  .socialcrashout
                </div>
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1.5 rounded-full border border-accent/40 text-accent hover:bg-accent/10 px-4 py-2 text-sm font-semibold transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Work status card */}
        <div
          className={`bg-white border border-gray-200 rounded-3xl px-8 py-10 shadow-sm hover:-translate-y-2 hover:scale-[1.01] hover:border-accent/40 hover:shadow-2xl hover:shadow-orange-200/60 transition-all duration-500 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: isVisible ? '120ms' : '0ms' }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-accent font-mono text-sm tracking-[0.2em] uppercase">
              Work Status
            </p>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-mono tracking-wide text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              OPEN
            </span>
          </div>

          <h3 className="text-3xl font-black tracking-tight text-gray-900 mb-6">
            Taking on{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              new work
            </span>
          </h3>

          <hr className="border-gray-200 mb-2" />

          <div className="divide-y divide-gray-200">
            {[
              ['Response time', 'under 4 hours'],
              ['Experience', '1 yr+'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-3.5">
                <span className="text-gray-500">{label}</span>
                <span className="font-mono text-sm text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatusCards