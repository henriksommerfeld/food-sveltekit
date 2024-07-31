import { getRecipes, getTags } from '$lib/database'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const allTags = await getTags()
  const tag = allTags.find((x) => x.slug === params.slug.toLowerCase())
  if (!tag) throw error(404, `Could not find tag with slug ${params.slug}`)
  const allRecipes = await getRecipes()
  const recipes = allRecipes.filter(x =>
    x.tags.some(t =>
      !t.localeCompare(tag.name, 'sv', { sensitivity: 'base' })
    )
  )
  return { tag, recipes }
}
