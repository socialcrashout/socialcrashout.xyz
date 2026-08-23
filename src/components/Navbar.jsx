import { useState, useEffect } from 'react'

const DISCORD_ID = '1365696544132694026'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD
const NAV_OFFSET = 96

const STATUS_CONFIG = {
  online: { label: 'Available', dot: 'bg-green-500' },
  idle: { label: 'Away', dot: 'bg-yellow-500' },
  dnd: { label: 'Busy', dot: 'bg-red-500' },
  offline: { label: 'Offline', dot: 'bg-gray-400' },
}

function Navbar() {
  const links = ['Home', 'Creations', 'Projects', 'Experience', 'Skills', 'Reviews', 'Stats']
  const [active, setActive] = useState('Home')
  const [discordUser, setDiscordUser] = useState(null)
  const [discordStatus, setDiscordStatus] = useState('offline')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDiscordUser(data.data.discord_user)
          setDiscordStatus(data.data.discord_status || 'offline')
        }
      })
      .catch((err) => console.error('Failed to fetch Discord user:', err))
  }, [])

  useEffect(() => {
    setIsAdmin(localStorage.getItem('is_admin') === 'true')
  }, [])

  function handleLogoClick() {
    if (isAdmin) return
    const input = prompt('Password:')
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem('is_admin', 'true')
      setIsAdmin(true)
    }
  }

  function scrollToId(id) {
    const target = document.getElementById(id)
    if (!target) return
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }

  function handleLinkClick(link) {
    setActive(link)
    scrollToId(link.toLowerCase())
  }

  function handleConnectClick(e) {
    e.preventDefault()
    setActive(null)
    scrollToId('contact')
  }

  const displayName = discordUser?.global_name || discordUser?.username || 'Your Name'
  const avatarUrl = discordUser
    ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=64`
    : null
  const initials = displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  const status = STATUS_CONFIG[discordStatus] || STATUS_CONFIG.offline

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-sm px-3 py-2 w-full max-w-4xl transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5">
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 pr-4 mr-2 border-r border-gray-200 cursor-pointer select-none whitespace-nowrap"
        >
          <div className="relative">
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center">
                {initials}
              </div>
            )}
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${status.dot}`}
              title={status.label}
            />
          </div>
          <span className="text-sm font-medium text-gray-900 hidden sm:block">
            {discordUser ? `.${discordUser.username}` : '.yourname'}
          </span>
        </div>

        <ul className="flex items-center gap-0.5 flex-1 justify-center">
          {links.map((link) => (
            <li key={link}>
              <button
                onClick={() => handleLinkClick(link)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 hover:scale-105 active:scale-90 whitespace-nowrap ${
                  active === link
                    ? 'bg-gray-900 text-white font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {isAdmin && (
          <a
            href="/admin"
            className="px-4 py-1.5 text-sm font-medium rounded-full bg-gray-900 text-white hover:scale-105 active:scale-90 transition-all duration-200 whitespace-nowrap mr-2"
          >
            Admin
          </a>
        )}

        <span className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 mr-2 whitespace-nowrap">
          <span className={`w-2 h-2 rounded-full ${status.dot}`} />
          {status.label}
        </span>

        <a
          href="#contact"
          onClick={handleConnectClick}
          className="px-4 py-1.5 text-sm font-medium rounded-full border border-accent text-accent hover:bg-accent hover:text-white hover:scale-105 active:scale-90 transition-all duration-200 whitespace-nowrap"
        >
          Connect
        </a>
      </nav>
    </div>
  )
}

export default Navbar