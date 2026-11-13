import { error } from '@sveltejs/kit'
import { getRecipes, getTags } from '../../lib/database'

export async function load({ params, data }) {
  try {
    const allRecipes = await getRecipes()
    const recipe = allRecipes.find(recipe => recipe.slug === params.slug)
    if (!recipe) error(404, `Could not find ${params.slug}`)
    const tags = await getTags()
    return { ...data, recipe, tags }
  } catch (e) {
    error(404, `Could not find ${params.slug}`)
  }
}
