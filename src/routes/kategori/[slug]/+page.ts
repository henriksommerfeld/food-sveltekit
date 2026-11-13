import { getRecipes } from '#lib/database.ts'
import { CategoryLinks } from '#lib/constants.ts'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const slug = `/${params.slug}`
  const allRecipes = await getRecipes()
  const category = CategoryLinks.find(x => x.slug === slug)!
  if (!category) error(404, `Could not find ${slug}`)
  const recipes = allRecipes.filter(x => x.category === category.title)
  return { recipes, category }
}
