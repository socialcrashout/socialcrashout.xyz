import { useState, useEffect } from 'react'
import Cursor from './Cursor'

const CATEGORIES = [
  { key: 'logos', label: 'Logo animations' },
  { key: 'graphics', label: 'Graphics' },
  { key: 'bots', label: 'Discord bots' },
  { key: 'embeds', label: 'Embeds' },
  { key: 'servers', label: 'Discord servers' },
]

function AdminAddWork() {
  const [unlocked, setUnlocked] = useState(false)
  const [checked, setChecked] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].key)
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

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

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!title.trim()) {
      setError('Enter a title')
      return
    }
    if (!file) {
      setError('Choose a file to upload')
      return
    }

    setSubmitting(true)
    try {
      // wire this to wherever uploads actually go — API route, storage bucket, etc.
      // const formData = new FormData()
      // formData.append('title', title)
      // formData.append('category', category)
      // formData.append('file', file)
      // await fetch('/api/work', { method: 'POST', body: formData })

      window.location.href = '/admin'
    } catch (err) {
      setError('Upload failed. Try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <Cursor />
      <div className="max-w-xl mx-auto">
        <a href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors duration-200 mb-8">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to admin
        </a>

        <h1 className="text-3xl font-black mb-8">Add work</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 rounded-2xl p-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Neon logo intro"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-accent"
            >
              {CATEGORIES.map((c) => (
                <option key={c.key} value={c.key}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-gray-500"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent text-white font-semibold py-3 rounded-xl hover:bg-[var(--color-accent-dark)] transition-colors duration-200 disabled:opacity-50"
          >
            {submitting ? 'Uploading…' : 'Upload work'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminAddWork