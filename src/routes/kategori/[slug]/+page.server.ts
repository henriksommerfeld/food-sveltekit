import { getRecipes } from '#lib/database.ts'
import { CategoryLinks } from '#lib/constants.ts'
import { getBanner, getGridImage } from '#lib/server/images.ts'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
  const slug = `/${params.slug}`
  const allRecipes = await getRecipes()
  const category = CategoryLinks.find(x => x.slug === slug)!
  if (!category) error(404, `Could not find ${slug}`)
  const recipes = allRecipes
    .filter(x => x.category === category.title)
    .map(recipe => ({
      slug: recipe.slug,
      title: recipe.title,
      image: getGridImage(`/src${recipe.featuredimage}`)
    }))
  const banner = getBanner(category.imagePath)
  return { recipes, category, banner }
}
