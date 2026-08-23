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
    <div className="min-h-screen px-6 py-24">
      <h1 className="text-3xl font-black">Admin</h1>
      {/* your actual admin content goes here */}
    </div>
  )
}

export default Admin