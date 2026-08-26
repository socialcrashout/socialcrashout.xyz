import { useState, useEffect } from 'react'
import Cursor from './Cursor'
import { getWork, deleteWork, subscribeToWork, getWorkFileUrl, CATEGORIES } from '../utils/workStore'
import { getSiteSettings, updateSiteSettings, subscribeToSiteSettings } from '../utils/siteStore'

const NAV_ITEMS = [
  { key: 'work', label: 'Manage work' },
  { key: 'management', label: 'Site management' },
]

function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label || key
}

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={`w-11 h-6 rounded-full transition-colors duration-200 relative flex-shrink-0 ${
        checked ? 'bg-gray-900' : 'bg-gray-200'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  )
}

function WorkThumbnail({ item }) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (!item.fileType?.startsWith('image/')) return

    let objectUrl = null
    let cancelled = false

    getWorkFileUrl(item.id).then((u) => {
      if (cancelled) return
      objectUrl = u
      setUrl(u)
    })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [item.id, item.fileType])

  if (!item.fileType?.startsWith('image/') || !url) return null

  return <img src={url} alt="" className="w-10 h-10 rounded-lg object-cover" />
}

function ManageWorkPanel() {
  const [work, setWork] = useState([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      const items = await getWork()
      if (!cancelled) setWork(items)
    }

    load()

    const unsubscribe = subscribeToWork(load)
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black tracking-tight">Manage work</h1>
        <a
          href="/admin/add"
          className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accent-dark transition-colors duration-200"
        >
          + Add work
        </a>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100 overflow-hidden">
        {work.length === 0 ? (
          <p className="text-gray-400 text-sm px-6 py-8 text-center">
            No work uploaded yet.
          </p>
        ) : (
          work.map((item) => (
            <div key={item.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <WorkThumbnail item={item} />
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-400">{categoryLabel(item.category)}</p>
                </div>
              </div>
              <button
                onClick={() => deleteWork(item.id)}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SiteManagementPanel() {
  const [settings, setSettings] = useState(getSiteSettings())

  useEffect(() => {
    return subscribeToSiteSettings(() => setSettings(getSiteSettings()))
  }, [])

  function patch(key, value) {
    const next = { ...settings[key], ...value }
    updateSiteSettings({ [key]: next })
  }

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight mb-1">Site management</h1>
      <p className="text-gray-400 text-sm mb-8">
        Maintenance mode, shutdown, and site-wide announcements.
      </p>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Maintenance mode</p>
              <p className="text-sm text-gray-400">Blocks regular visitors while you retain access.</p>
            </div>
            <Toggle
              checked={settings.maintenanceMode.enabled}
              onChange={(enabled) => patch('maintenanceMode', { enabled })}
            />
          </div>
          <textarea
            value={settings.maintenanceMode.message}
            onChange={(e) => patch('maintenanceMode', { message: e.target.value })}
            placeholder="Message shown to visitors while in maintenance..."
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent resize-none"
          />
          <p className="text-xs text-gray-400 mt-3">
            {settings.maintenanceMode.enabled ? 'Blocking visitors' : 'Currently allowing all visitors'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Shutdown</p>
              <p className="text-sm text-gray-400">Takes the site fully offline for everyone but you.</p>
            </div>
            <Toggle
              checked={settings.shutdown.enabled}
              onChange={(enabled) => patch('shutdown', { enabled })}
            />
          </div>
          <textarea
            value={settings.shutdown.message}
            onChange={(e) => patch('shutdown', { message: e.target.value })}
            placeholder="Message shown to visitors while offline..."
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent resize-none"
          />
          <p className="text-xs text-gray-400 mt-3">
            {settings.shutdown.enabled ? 'Site is offline' : 'Site is live'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-900 mb-1">Site-wide announcement</p>
              <p className="text-sm text-gray-400">Shown as a banner across the site.</p>
            </div>
            <Toggle
              checked={settings.announcement.active}
              onChange={(active) => patch('announcement', { active })}
            />
          </div>
          <textarea
            value={settings.announcement.message}
            onChange={(e) => patch('announcement', { message: e.target.value })}
            placeholder="Announcement text..."
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent resize-none"
          />
          {settings.announcement.active && settings.announcement.message && (
            <div className="mt-3 bg-orange-50 border border-orange-100 text-accent-dark text-sm rounded-xl px-4 py-2.5">
              {settings.announcement.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Admin() {
  const [unlocked, setUnlocked] = useState(false)
  const [checked, setChecked] = useState(false)
  const [activeTab, setActiveTab] = useState('work')

  useEffect(() => {
    setUnlocked(localStorage.getItem('is_admin') === 'true')
    setChecked(true)
  }, [])

  if (!checked) return null

  if (!unlocked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Cursor />
        <p className="text-gray-400">Nothing here.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Cursor />
      <div className="max-w-5xl mx-auto flex gap-8 px-6 py-16">
        <aside className="w-56 flex-shrink-0">
          <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase mb-4 px-4">
            Admin panel
          </p>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  activeTab === item.key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          {activeTab === 'work' && <ManageWorkPanel />}
          {activeTab === 'management' && <SiteManagementPanel />}
        </main>
      </div>
    </div>
  )
}

export default Admin