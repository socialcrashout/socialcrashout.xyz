import { useEffect, useRef, useState } from 'react'

const REVIEWS = [
  { id: '1233753753279266858', name: 'uptown034', text: 'He does very good designs in like one day, complex GFX finished in a day.' },
  { id: '1509730922159931523', name: 'veereshgamer', text: 'Good designer, fast and precise. Must recommend.' },
  { id: '969608986838052936', name: 'hiangelome', text: 'Really kind designer, good quality banner.' },
  { id: '1098041704826818644', name: 'aujukli', text: 'Good designer, great design!' },
  { id: '1223409620891209851', name: 'beefarino_28', text: 'Good watermark, got it done fast.' },
  { id: '1223409620891209851-2', name: 'beefarino_28', text: 'Finished in like an hour, very high quality, very easy to work with.' },
  { id: '945366263633432646', name: 'shahzeb', text: 'Opened the ticket, claimed within 10 minutes. Order done really quick, cheap price, and the banner and footer were both quality work. Thanks!' },
  { id: '1537920913796894872', name: 'theworldgreatestgamer', text: 'Really good. Did the best he could in less time. 10/10.' },
  { id: '702216979108462633', name: '.f1zq4', text: 'Clean and done fast, great guy — helps as much as he can. Highly recommend!' },
  { id: '1405920243620118658', name: 'velxriia', text: 'Amazing, took only 3-4 days to finish a whole Discord.' },
  { id: '900795456429379664', name: 'friesinlove', text: 'Great design, fast response, quickly made, great designer all in all.' },
  { id: '1195335947944996968', name: 'vaultrisks', text: 'Quick and easy, best design server.' },
]

function splitRows(arr) {
  const mid = Math.ceil(arr.length / 2)
  return [arr.slice(0, mid), arr.slice(mid)]
}

const AVATAR_COLORS = [
  'from-amber-400 to-orange-500',
  'from-orange-500 to-rose-500',
  'from-rose-400 to-pink-500',
  'from-amber-300 to-orange-400',
  'from-orange-400 to-red-500',
]

// in-memory cache so we don't re-fetch the same user
// every time a card is duplicated for the marquee loop
const avatarCache = new Map()

function Stars() {
  return (
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-3.5 h-3.5 text-accent fill-current">
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ id, name, colorClass }) {
  const cleanId = id.split('-')[0] // strip -2 suffix used for dedupe keys
  const [avatarUrl, setAvatarUrl] = useState(avatarCache.get(cleanId) || null)
  const [failed, setFailed] = useState(false)
  const initial = name.replace(/^\./, '').charAt(0).toUpperCase()

  useEffect(() => {
    if (avatarCache.has(cleanId)) {
      setAvatarUrl(avatarCache.get(cleanId))
      return
    }

    let cancelled = false

    // goes through the Vite dev-server proxy (see vite.config.js)
    // so the browser never talks to discordlookup.com directly
    fetch(`/api/discord/user/${cleanId}`)
      .then((res) => {
        if (!res.ok) throw new Error('lookup failed')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const url = data?.avatar?.link || null
        avatarCache.set(cleanId, url)
        if (url) {
          setAvatarUrl(url)
        } else {
          setFailed(true)
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })

    return () => {
      cancelled = true
    }
  }, [cleanId])

  if (failed || !avatarUrl) {
    return (
      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
        {initial}
      </div>
    )
  }

  return (
    <img
      src={avatarUrl}
      alt={name}
      draggable={false}
      onError={() => setFailed(true)}
      className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-100"
    />
  )
}

function ReviewCard({ review, index }) {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length]

  return (
    <div className="group relative overflow-hidden w-72 sm:w-80 shrink-0 bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 ease-out cursor-default">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
      <div className="pointer-events-none absolute -inset-6 bg-gradient-to-r from-amber-400/0 via-orange-400/0 to-rose-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/10 group-hover:to-rose-400/10 blur-xl transition-all duration-500 ease-out" />

      <div className="relative flex items-center gap-3 mb-3">
        <Avatar id={review.id} name={review.name} colorClass={colorClass} />
        <p className="text-sm font-semibold text-gray-900 truncate">{review.name}</p>
      </div>

      <Stars />

      <p className="relative text-gray-500 text-sm leading-relaxed">{review.text}</p>
    </div>
  )
}

function MarqueeRow({ reviews, direction, startIndex }) {
  const doubled = [...reviews, ...reviews]
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className="overflow-hidden">
      <div className={`flex gap-4 w-max ${animClass}`}>
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} index={startIndex + i} />
        ))}
      </div>
    </div>
  )
}

function Reviews() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [rowA, rowB] = splitRows(REVIEWS)

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
    <section id="reviews" ref={sectionRef} className="relative pt-8 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        <h2
          className={`text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          <span className="text-accent font-mono text-xl">05.</span>
          <span className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900 hover:from-amber-400 hover:via-orange-500 hover:to-rose-500 bg-clip-text hover:text-transparent transition-all duration-500 ease-out cursor-default hover:tracking-wide">
            Reviews
          </span>
        </h2>

        <div className="group relative mb-8 h-px w-full bg-gray-200 overflow-hidden rounded-full cursor-pointer">
          <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-700 ease-out group-hover:w-full" />
        </div>
      </div>

      <div
        className={`marquee-paused flex flex-col gap-4 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
        style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
      >
        <MarqueeRow reviews={rowA} direction="left" startIndex={0} />
        <MarqueeRow reviews={rowB} direction="right" startIndex={rowA.length} />
      </div>
    </section>
  )
}

export default Reviews