import { markdownFileSchema, type Recipe, type RecipeFrontmatter, recipeSchema } from '$lib/types'
import slugify from '@sindresorhus/slugify'

const cachedRecipes = new Array<Recipe>()

export async function getRecipes() {
  if (cachedRecipes.length) return cachedRecipes

  const paths = import.meta.glob('/src/recept/*.md', { eager: true })

  for (const path in paths) {
    const mardownFile = paths[path]
    const fileSlug = path.split('/').at(-1)?.replace('.md', '')
    const markdownResult = markdownFileSchema.safeParse(mardownFile)

    if (markdownResult.success && fileSlug) {
      const file = markdownResult.data
      const fileMeta = file.metadata as RecipeFrontmatter
      const metadata = fileMeta as Omit<RecipeFrontmatter, 'url'>
      const slug = (fileMeta.url || fileSlug).replace(/\/$/, '').split('/').at(-1)

      const recipe = recipeSchema.safeParse({
        ...metadata,
        slug,
        content: file.default
      })
      if (recipe.success) {
        if (!recipe.data.hidden) {
          cachedRecipes.push(recipe.data)
        }
      } else {
        console.dir(recipe.error, { depth: 10 })
        throw new Error(`Invalid recipe /${path}`, recipe.error)
      }
    }
  }

  cachedRecipes.sort((a, b) => a.title.localeCompare(b.title, 'sv'))
  return cachedRecipes
}

const cachedTags = new Array<{ count: number; name: string; slug: string }>()

export async function getTags() {
  if (cachedTags.length) return cachedTags
  const recipes = await getRecipes()
  const allTags = recipes.flatMap((r) => r.tags.map((t) => t.toLowerCase()))
  const tagCounts = allTags.reduce(
    (tags, tag) => ({ ...tags, [tag]: (tags[tag] || 0) + 1 }),
    {} as Record<string, number>
  )
  const sortedTagNames = Object.keys(tagCounts).toSorted()
  sortedTagNames.forEach((name) => {
    cachedTags.push({
      count: tagCounts[name],
      name: name,
      slug: slugify(name)
    })
  })
  return cachedTags
}
