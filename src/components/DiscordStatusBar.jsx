import { useState, useEffect } from 'react'

// Replace with your own Discord User ID
const DISCORD_ID = '1365696544132694026'

const STATUS_STYLES = {
  online: { label: 'ONLINE', text: 'text-emerald-600', border: 'border-emerald-200', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
  idle: { label: 'IDLE', text: 'text-amber-600', border: 'border-amber-200', bg: 'bg-amber-50', dot: 'bg-amber-400' },
  dnd: { label: 'DO NOT DISTURB', text: 'text-red-600', border: 'border-red-200', bg: 'bg-red-50', dot: 'bg-red-500' },
  offline: { label: 'OFFLINE', text: 'text-gray-500', border: 'border-gray-200', bg: 'bg-gray-50', dot: 'bg-gray-400' },
}

function DiscordStatusBar() {
  const [discordUser, setDiscordUser] = useState(null)
  const [status, setStatus] = useState('offline')
  const [customStatus, setCustomStatus] = useState(null)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) return
        setDiscordUser(data.data.discord_user)
        setStatus(data.data.discord_status || 'offline')
        const custom = data.data.activities?.find((a) => a.type === 4)
        if (custom) {
          const emoji = custom.emoji && !custom.emoji.id ? `${custom.emoji.name} ` : ''
          setCustomStatus(custom.state ? `${emoji}${custom.state}` : null)
        }
      })
      .catch((err) => console.error('Failed to fetch Discord user:', err))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const displayName = discordUser?.username || 'yourname'
  const avatarUrl = discordUser
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`
    : null
  const initials = displayName.slice(0, 2).toUpperCase()
  const s = STATUS_STYLES[status]

  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  return (
    <div className="w-full px-4 pt-24 pb-4">
      <div className="group mx-auto max-w-5xl flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm animate-card-in hover:-translate-y-2 hover:scale-[1.01] hover:border-accent/40 hover:shadow-2xl hover:shadow-orange-200/60 transition-all duration-500 ease-out">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="w-12 h-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-sm font-semibold flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {initials}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 flex">
              {status === 'online' && (
                <span className={`absolute inline-flex h-full w-full rounded-full ${s.dot} opacity-75 animate-ping`} />
              )}
              <span className={`relative inline-block w-3.5 h-3.5 rounded-full border-2 border-white ${s.dot}`} />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold text-gray-900">.{displayName}</span>
              <span className={`text-[10px] font-mono tracking-widest px-2 py-0.5 rounded-full border ${s.border} ${s.bg} ${s.text} transition-transform duration-200 group-hover:scale-105`}>
                {s.label}
              </span>
            </div>
            {customStatus && (
              <p className="text-sm text-accent truncate mt-0.5">{customStatus}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-sm text-gray-900 tabular-nums">{timeString}</span>
          <span className="text-[10px] font-mono tracking-widest text-gray-400">LOCAL</span>
        </div>
      </div>
    </div>
  )
}

export default DiscordStatusBar