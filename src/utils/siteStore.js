const STORAGE_KEY = 'site_settings'
const EVENT_NAME = 'site-settings-updated'

const DEFAULTS = {
  maintenanceMode: { enabled: false, message: '' },
  shutdown: { enabled: false, message: '' },
  announcement: { active: false, message: '' },
}

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

function writeAll(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  window.dispatchEvent(new Event(EVENT_NAME))
}

export function getSiteSettings() {
  return readAll()
}

export function updateSiteSettings(patch) {
  const current = readAll()
  const next = { ...current, ...patch }
  writeAll(next)
}

export function subscribeToSiteSettings(callback) {
  window.addEventListener(EVENT_NAME, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(EVENT_NAME, callback)
    window.removeEventListener('storage', callback)
  }
}