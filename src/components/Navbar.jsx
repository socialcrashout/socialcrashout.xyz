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
  const [menuOpen, setMenuOpen] = useState(false)

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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function handleLogoClick() {
    if (isAdmin) return
    const input = prompt('Password:')
    if (input === null) return
    if (!ADMIN_PASSWORD) {
      alert('Admin password not configured. Set VITE_ADMIN_PASSWORD in your .env file and restart the dev server.')
      return
    }
    if (input === ADMIN_PASSWORD) {
      localStorage.setItem('is_admin', 'true')
      setIsAdmin(true)
    } else {
      alert('Wrong password.')
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
    setMenuOpen(false)
    scrollToId(link.toLowerCase())
  }

  function handleConnectClick(e) {
    e.preventDefault()
    setActive(null)
    setMenuOpen(false)
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
      <nav className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-sm px-3 py-2 w-full max-w-4xl xl:max-w-6xl transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5">
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2 pr-3 md:pr-4 md:mr-2 md:border-r border-gray-200 cursor-pointer select-none whitespace-nowrap"
        >
          <div className="relative flex-shrink-0">
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

        {/* Desktop links - hidden below md */}
        <ul className="hidden md:flex items-center gap-0.5 flex-1 justify-center min-w-0">
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

        {/* Spacer pushes remaining items right on mobile */}
        <div className="flex-1 md:hidden" />

        {isAdmin && (
          <a
            href="/admin"
            className="hidden xl:inline-flex px-3 py-1.5 text-xs font-medium rounded-full border border-gray-300 text-gray-600 hover:border-accent hover:text-accent hover:scale-105 active:scale-90 transition-all duration-200 whitespace-nowrap mr-2"
          >
            Admin
          </a>
        )}

        <span className="hidden xl:flex items-center gap-1.5 text-xs text-gray-500 mr-2 whitespace-nowrap">
          <span className={`w-2 h-2 rounded-full ${status.dot}`} />
          {status.label}
        </span>

        <a
          href="#contact"
          onClick={handleConnectClick}
          className="hidden sm:inline-flex px-4 py-1.5 text-sm font-medium rounded-full border border-accent text-accent hover:bg-accent hover:text-white hover:scale-105 active:scale-90 transition-all duration-200 whitespace-nowrap"
        >
          Connect
        </a>

        {/* Hamburger - visible below md */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full mt-2 w-[calc(100%-2rem)] max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-lg p-3 animate-fall-in">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => handleLinkClick(link)}
                  className={`w-full text-left px-4 py-2.5 text-sm rounded-xl transition-all duration-200 ${
                    active === link
                      ? 'bg-gray-900 text-white font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-2 pt-2 border-t border-gray-200 flex items-center gap-2 flex-wrap px-1">
            {isAdmin && (
              <a
                href="/admin"
                className="px-4 py-2 text-sm font-medium rounded-full bg-gray-900 text-white whitespace-nowrap"
              >
                Admin
              </a>
            )}
            <a
              href="#contact"
              onClick={handleConnectClick}
              className="sm:hidden px-4 py-2 text-sm font-medium rounded-full border border-accent text-accent whitespace-nowrap"
            >
              Connect
            </a>
            <span className="flex items-center gap-1.5 text-xs text-gray-500 whitespace-nowrap ml-auto">
              <span className={`w-2 h-2 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar