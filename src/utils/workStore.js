const DB_NAME = 'portfolio_db'
const DB_VERSION = 1
const STORE_NAME = 'work'
const EVENT_NAME = 'work-updated'

export const CATEGORIES = [
  { key: 'logos', label: 'Logo animations' },
  { key: 'graphics', label: 'Graphics' },
  { key: 'bots', label: 'Discord bots' },
  { key: 'embeds', label: 'Embeds' },
  { key: 'servers', label: 'Discord servers' },
]

let dbPromise = null

function openDB() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('createdAt', 'createdAt')
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

async function withStore(mode, callback) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, mode)
    const store = tx.objectStore(STORE_NAME)
    const result = callback(store)
    tx.oncomplete = () => resolve(result)
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error)
  })
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function notify() {
  window.dispatchEvent(new Event(EVENT_NAME))
}

// Returns metadata only (no fileData) — cheap to call often for lists/counts.
export async function getWork() {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const items = await requestToPromise(store.getAll())
  items.sort((a, b) => b.createdAt - a.createdAt)
  return items.map(({ fileBlob, ...meta }) => meta)
}

export async function getCounts() {
  const items = await getWork()
  const counts = {}
  for (const cat of CATEGORIES) counts[cat.key] = 0
  for (const item of items) {
    if (counts[item.category] !== undefined) counts[item.category]++
  }
  return counts
}

// Fetches the actual file blob for one item and returns an object URL.
// Caller is responsible for calling URL.revokeObjectURL(url) when done
// (e.g. in a useEffect cleanup) to avoid leaking memory.
export async function getWorkFileUrl(id) {
  const db = await openDB()
  const tx = db.transaction(STORE_NAME, 'readonly')
  const store = tx.objectStore(STORE_NAME)
  const item = await requestToPromise(store.get(id))
  if (!item || !item.fileBlob) return null
  return URL.createObjectURL(item.fileBlob)
}

export async function addWork({ title, category, file }) {
  const item = {
    id: crypto.randomUUID(),
    title,
    category,
    fileName: file.name,
    fileType: file.type,
    fileBlob: file, // File is a Blob subclass — stored natively, no base64
    createdAt: Date.now(),
  }
  await withStore('readwrite', (store) => store.put(item))
  notify()
}

export async function deleteWork(id) {
  await withStore('readwrite', (store) => store.delete(id))
  notify()
}

export function subscribeToWork(callback) {
  window.addEventListener(EVENT_NAME, callback)
  return () => {
    window.removeEventListener(EVENT_NAME, callback)
  }
}