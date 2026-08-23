import { useEffect } from 'react'

// Same Discord ID used elsewhere (Navbar / DiscordStatusBar)
const DISCORD_ID = '1365696544132694026'

// How often to re-check for an avatar change (ms). Lanyard itself updates
// in real time for status, but avatar URL only needs an occasional refresh.
const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

function setFavicon(href) {
  // Reuse an existing <link rel="icon">, or create one if none exists
  let link = document.querySelector("link[rel~='icon']")
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  link.type = 'image/png'
  link.href = href
}

function DynamicFavicon() {
  useEffect(() => {
    let cancelled = false

    function updateFavicon() {
      fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
        .then((res) => res.json())
        .then((data) => {
          if (cancelled || !data.success) return
          const user = data.data.discord_user
          if (!user?.avatar) return
          const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`
          setFavicon(avatarUrl)
        })
        .catch((err) => console.error('Failed to update favicon from Discord:', err))
    }

    updateFavicon()
    const interval = setInterval(updateFavicon, REFRESH_INTERVAL)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return null
}

export default DynamicFavicon