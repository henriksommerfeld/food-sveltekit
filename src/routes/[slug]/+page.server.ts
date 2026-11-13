import { error } from '@sveltejs/kit'
import { getRecipes } from '../../lib/database'
import { getImage } from '#lib/image.ts'

const lqipImages = import.meta.glob('/src/uploads/*', {
  import: 'default',
  eager: true,
  query: '?w=200&format=webp&inline&as=url&quality=10'
})
const images = import.meta.glob('/src/uploads/*', {
  import: 'default',
  eager: true,
  query: '?w=800;1500&format=webp&as=picture'
})

export async function load({ params }) {
  const allRecipes = await getRecipes()
  const recipe = allRecipes.find(recipe => recipe.slug === params.slug)
  if (!recipe) error(404, `Could not find ${params.slug}`)
  const image = getImage(images, lqipImages, `/src${recipe.featuredimage}`)
  return { image }
}
