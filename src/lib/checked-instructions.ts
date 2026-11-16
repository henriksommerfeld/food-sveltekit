const PREFIX = 'checked-instructions:'
const MAX_AGE = 24 * 60 * 60 * 1000

type Entry = { savedAt: number; checked: string[] }

const isExpired = (entry: Entry) => Date.now() - entry.savedAt > MAX_AGE

function read(key: string): Entry | undefined {
  const raw = localStorage.getItem(key)
  if (!raw) return undefined
  try {
    const entry = JSON.parse(raw) as Entry
    if (typeof entry.savedAt === 'number' && Array.isArray(entry.checked)) {
      return entry
    }
  } catch {
    // fall through
  }
  return undefined
}

function removeExpired() {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i)
    if (!key?.startsWith(PREFIX)) {
      continue
    }
    const entry = read(key)
    if (!entry || isExpired(entry)) {
      localStorage.removeItem(key)
    }
  }
}

export function loadChecked(slug: string): Set<string> {
  try {
    removeExpired()
    return new Set(read(PREFIX + slug)?.checked ?? [])
  } catch {
    return new Set()
  }
}

export function saveChecked(slug: string, checked: Set<string>) {
  try {
    const key = PREFIX + slug
    if (checked.size === 0) {
      localStorage.removeItem(key)
    } else localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), checked: [...checked] }))
  } catch {
    // storage unavailable
  }
}
