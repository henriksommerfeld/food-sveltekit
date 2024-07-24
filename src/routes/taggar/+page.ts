import { getTags } from '$lib/database'
import { error } from '@sveltejs/kit'

export async function load() {
  try {
    const tags = await getTags()
    return { tags }
  } catch (e) {
    throw error(404, `Could not find /taggar`)
  }
}
