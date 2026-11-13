import { getTags } from '#lib/database.ts'
import { error } from '@sveltejs/kit'

export async function load() {
  try {
    const tags = await getTags()
    return { tags }
  } catch (e) {
    error(404, `Could not find /taggar`)
  }
}
