import { json } from '@sveltejs/kit'
import { getRecipes } from '#lib/database.ts'
import { getGridImage } from '#lib/server/images.ts'
import { stripLinks } from '#lib/inline-links.ts'
import type { SearchDocument } from '#lib/search.ts'

export const prerender = true

export async function GET() {
  const allRecipes = await getRecipes()
  const documents: SearchDocument[] = allRecipes.map((recipe, index) => ({
    id: index,
    title: recipe.title,
    slug: recipe.slug,
    ingredients: recipe.ingredients.ingredientsGroup.flatMap(x =>
      x.ingredients.map(y => stripLinks(y.name))
    ),
    tags: recipe.tags,
    image: getGridImage(`/src${recipe.featuredimage}`)
  }))
  return json(documents)
}
