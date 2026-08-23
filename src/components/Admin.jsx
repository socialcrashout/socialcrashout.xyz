import { useState, useEffect } from 'react'

function Admin() {
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    setUnlocked(localStorage.getItem('is_admin') === 'true')
  }, [])

  if (!unlocked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Nothing here.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-24 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black">Admin</h1>

        <a
          href="/admin/add"
          className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--color-accent-dark)] transition-colors duration-200"
        >
          + Add work
        </a>
      </div>

      {/* your existing work list / management table goes here */}
    </div>
  )
}

export default Admin