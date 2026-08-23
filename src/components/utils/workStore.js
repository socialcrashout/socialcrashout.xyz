const STORAGE_KEY = 'portfolio_work'
const EVENT_NAME = 'work-updated'

export const CATEGORIES = [
  { key: 'logos', label: 'Logo animations' },
  { key: 'graphics', label: 'Graphics' },
  { key: 'bots', label: 'Discord bots' },
  { key: 'embeds', label: 'Embeds' },
  { key: 'servers', label: 'Discord servers' },
]

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(EVENT_NAME))
}

export function getWork() {
  return readAll()
}

export function getCounts() {
  const items = readAll()
  const counts = {}
  for (const cat of CATEGORIES) counts[cat.key] = 0
  for (const item of items) {
    if (counts[item.category] !== undefined) counts[item.category]++
  }
  return counts
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function addWork({ title, category, file }) {
  const items = readAll()
  const fileData = await fileToDataUrl(file)
  items.push({
    id: crypto.randomUUID(),
    title,
    category,
    fileName: file.name,
    fileType: file.type,
    fileData,
    createdAt: Date.now(),
  })
  writeAll(items)
}

export function deleteWork(id) {
  const items = readAll().filter((item) => item.id !== id)
  writeAll(items)
}

export function subscribeToWork(callback) {
  window.addEventListener(EVENT_NAME, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(EVENT_NAME, callback)
    window.removeEventListener('storage', callback)
  }
}