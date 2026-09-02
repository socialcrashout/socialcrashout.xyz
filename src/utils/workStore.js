import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const TABLE_NAME = 'work'
const BUCKET_NAME = 'work-files'
const EVENT_NAME = 'work-updated'

export const CATEGORIES = [
  { key: 'logos', label: 'Logo animations' },
  { key: 'graphics', label: 'Graphics' },
  { key: 'bots', label: 'Discord bots' },
  { key: 'embeds', label: 'Embeds' },
  { key: 'servers', label: 'Discord servers' },
]

function notify() {
  window.dispatchEvent(new Event(EVENT_NAME))
}

// Returns metadata only — cheap to call often for lists/counts.
export async function getWork() {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('id, title, category, file_name, file_type, file_url, created_at')
    .order('created_at', { ascending: false })

  if (error) throw error

  // Map snake_case DB columns -> camelCase to match the old shape
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    fileName: row.file_name,
    fileType: row.file_type,
    fileUrl: row.file_url,
    createdAt: new Date(row.created_at).getTime(),
  }))
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

// Files live in Supabase Storage with a public URL, so there's no blob
// to fetch and no object URL to revoke. Kept as an async function (and the
// same name) so existing callers (CreationThumb, Lightbox) don't need to
// change how they call it — it just resolves immediately with the public URL.
export async function getWorkFileUrl(id) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('file_url')
    .eq('id', id)
    .single()

  if (error) throw error
  return data?.file_url ?? null
}

export async function addWork({ title, category, file }) {
  const ext = file.name.split('.').pop()
  const path = `${category}/${crypto.randomUUID()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, { contentType: file.type })

  if (uploadError) throw uploadError

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path)

  const { error: insertError } = await supabase.from(TABLE_NAME).insert({
    title,
    category,
    file_name: file.name,
    file_type: file.type,
    file_url: publicUrlData.publicUrl,
    storage_path: path,
  })

  if (insertError) throw insertError

  notify()
}

export async function deleteWork(id) {
  // Look up the storage path so we can clean up the file too.
  const { data, error: fetchError } = await supabase
    .from(TABLE_NAME)
    .select('storage_path')
    .eq('id', id)
    .single()

  if (fetchError) throw fetchError

  if (data?.storage_path) {
    await supabase.storage.from(BUCKET_NAME).remove([data.storage_path])
  }

  const { error: deleteError } = await supabase.from(TABLE_NAME).delete().eq('id', id)
  if (deleteError) throw deleteError

  notify()
}

export function subscribeToWork(callback) {
  window.addEventListener(EVENT_NAME, callback)
  return () => {
    window.removeEventListener(EVENT_NAME, callback)
  }
}