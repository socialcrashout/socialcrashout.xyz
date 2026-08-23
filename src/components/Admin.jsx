import { useState, useEffect } from 'react'
import Cursor from './Cursor'
import { getWork, deleteWork, subscribeToWork, CATEGORIES } from '../utils/workStore'

function categoryLabel(key) {
  return CATEGORIES.find((c) => c.key === key)?.label || key
}

function Admin() {
  const [unlocked, setUnlocked] = useState(false)
  const [checked, setChecked] = useState(false)
  const [work, setWork] = useState([])

  useEffect(() => {
    setUnlocked(localStorage.getItem('is_admin') === 'true')
    setChecked(true)
  }, [])

  useEffect(() => {
    setWork(getWork())
    return subscribeToWork(() => setWork(getWork()))
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
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <Cursor />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <p className="text-accent font-mono text-xs tracking-[0.25em] uppercase">
            Admin panel
          </p>
        </div>

        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-black tracking-tight">Manage work</h1>
          <a
            href="/admin/add"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-accent-dark)] transition-colors duration-200"
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
    </div>
  )
}

export default Admin