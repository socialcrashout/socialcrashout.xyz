import { useState, useEffect } from 'react'
import Cursor from './Cursor'
import { getWork, deleteWork, subscribeToWork, CATEGORIES } from '../utils/workStore'

const NAV_ITEMS = [
  { key: 'work', label: 'Manage work' },
  { key: 'control', label: 'Site control' },
  { key: 'updates', label: 'Site updates' },
]

function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label || key
}

function ManageWorkPanel() {
  const [work, setWork] = useState([])

  useEffect(() => {
    setWork(getWork())
    return subscribeToWork(() => setWork(getWork()))
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
                {item.fileType?.startsWith('image/') && (
                  <img src={item.fileData} alt="" className="w-10 h-10 rounded-lg object-cover" />
                )}
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

function SiteControlPanel() {
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight mb-8">Site control</h1>
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-gray-400 text-sm">
          Site-wide settings go here — Discord ID, admin password rotation, feature toggles, etc.
        </p>
      </div>
    </div>
  )
}

function SiteUpdatesPanel() {
  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight mb-8">Site updates</h1>
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <p className="text-gray-400 text-sm">
          Changelog or announcement management goes here.
        </p>
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
          {activeTab === 'control' && <SiteControlPanel />}
          {activeTab === 'updates' && <SiteUpdatesPanel />}
        </main>
      </div>
    </div>
  )
}

export default Admin