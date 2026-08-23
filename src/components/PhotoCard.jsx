import { useState, useEffect } from 'react'
import photo1 from '../assets/images/photo1.jpg'
import photo2 from '../assets/images/photo2.jpg'
import photo3 from '../assets/images/photo3.jpg'

const images = [photo1, photo2, photo3]

const ROTATE_INTERVAL = 4000 // ms between image changes

function PhotoCard() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, ROTATE_INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full lg:w-[400px] aspect-[4/3] lg:aspect-auto lg:self-stretch rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm animate-card-in hover:-translate-y-2 hover:scale-[1.01] hover:border-accent/40 hover:shadow-2xl hover:shadow-orange-200/60 transition-all duration-500 ease-out">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent" />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default PhotoCard