import { getRecipes } from '$lib/database'
import MiniSearch, { type SearchResult } from 'minisearch'

export type RecipeSearchResult = {
  id: SearchResult['id']
  terms: SearchResult['terms']
  queryTerms: SearchResult['queryTerms']
  score: SearchResult['score']
  match: SearchResult['match']
  // storeFields
  title: string
  slug: string
  featuredimage: string
}

let miniSearch: MiniSearch
const stopWords = new Set(['med', 'och', 'eller', 'i'])

const ensureIndex = async () => {
  if (miniSearch) return
  miniSearch = new MiniSearch({
    fields: ['title', 'tags', 'ingredients'],
    storeFields: ['title', 'slug', 'featuredimage'],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.1,
      prefix: true
    },
    processTerm: (term, _fieldName) => (stopWords.has(term) ? null : term.toLowerCase())
  })
  const allRecipes = await getRecipes()
  const searchableProps = allRecipes.map((file, index) => ({
    id: index,
    title: file.title,
    slug: file.slug,
    ingredients: file.ingredients.ingredientsGroup.flatMap(x => x.ingredients.map(y => y.name)),
    tags: file.tags,
    featuredimage: file.featuredimage
  }))
  miniSearch.addAll(searchableProps)
}

export const searchAgainstIndex = async (query: string) => {
  await ensureIndex()
  return miniSearch.search(query) as RecipeSearchResult[]
}
