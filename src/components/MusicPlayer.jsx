import { useState } from 'react'
import { Music, SkipBack, SkipForward, Minus } from 'lucide-react'

const TRACKS = [
  {
    title: "God's Plan",
    artist: 'Drake',
    cover: 'https://picsum.photos/seed/godsplan/200/200',
    spotifyId: '2XW4DbS6NddZxRPm5rMCeY',
  },
  {
    title: 'Hotline Bling',
    artist: 'Drake',
    cover: 'https://picsum.photos/seed/hotlinebling/200/200',
    spotifyId: '0wwPcA6wtMf6HUMpIRdeP7',
  },
  {
    title: 'thank u, next',
    artist: 'Ariana Grande',
    cover: 'https://picsum.photos/seed/thankunext/200/200',
    spotifyId: '2rPE9A1vEgShuZxxzR2tZH',
  },
  {
    title: '7 rings',
    artist: 'Ariana Grande',
    cover: 'https://picsum.photos/seed/7rings/200/200',
    spotifyId: '6ocbgoVGwYJhOv1GgI9NsF',
  },
]

function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)

  const track = TRACKS[trackIndex]

  const changeTrack = (newIndex) => {
    setTrackIndex((newIndex + TRACKS.length) % TRACKS.length)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-80 bg-white border border-gray-200 rounded-3xl shadow-xl p-5 animate-card-in">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={track.cover}
              alt={track.title}
              className="w-11 h-11 rounded-xl object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.15em] text-gray-400 uppercase">
                Now Playing
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {track.title}
              </p>
              <p className="text-xs text-gray-400 truncate">{track.artist}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Minimize player"
            >
              <Minus size={18} />
            </button>
          </div>

          {/* Real, licensed playback via Spotify's own embed */}
          <div className="rounded-2xl overflow-hidden">
            <iframe
              key={track.spotifyId}
              src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`${track.title} — Spotify player`}
            />
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={() => changeTrack(trackIndex - 1)}
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={18} fill="currentColor" />
            </button>
            <span className="text-[11px] text-gray-400">
              {trackIndex + 1} / {TRACKS.length}
            </span>
            <button
              onClick={() => changeTrack(trackIndex + 1)}
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={18} fill="currentColor" />
            </button>
          </div>

          {/* Track picker */}
          <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-gray-100">
            {TRACKS.map((t, i) => (
              <button
                key={t.title}
                onClick={() => changeTrack(i)}
                className={`relative rounded-lg overflow-hidden transition-all ${
                  i === trackIndex
                    ? 'w-9 h-9 ring-2 ring-accent'
                    : 'w-7 h-7 opacity-60 hover:opacity-100'
                }`}
                aria-label={`Play ${t.title}`}
              >
                <img
                  src={t.cover}
                  alt={t.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((o) => !o)}
        className="relative w-14 h-14 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform overflow-hidden"
        aria-label="Toggle music player"
      >
        {isOpen ? (
          <img
            src={track.cover}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Music size={20} className="relative text-gray-900" />
        )}
      </button>
    </div>
  )
}

export default MusicPlayer