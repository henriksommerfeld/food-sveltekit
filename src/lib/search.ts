import type { ImageType } from '#lib/image.ts'
import MiniSearch, { type SearchResult } from 'minisearch'

export type SearchDocument = {
  id: number
  title: string
  slug: string
  ingredients: string[]
  tags: string[]
  image: ImageType
}

export type RecipeSearchResult = {
  id: SearchResult['id']
  terms: SearchResult['terms']
  queryTerms: SearchResult['queryTerms']
  score: SearchResult['score']
  match: SearchResult['match']
  // storeFields
  title: string
  slug: string
  image: ImageType
}

let miniSearch: MiniSearch | undefined
const stopWords = new Set(['med', 'och', 'eller', 'i'])

const ensureIndex = async () => {
  if (miniSearch) return miniSearch
  const index = new MiniSearch({
    fields: ['title', 'tags', 'ingredients'],
    storeFields: ['title', 'slug', 'image'],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.1,
      prefix: true
    },
    processTerm: (term, _fieldName) => (stopWords.has(term) ? null : term.toLowerCase())
  })
  const response = await fetch('/search.json')
  if (!response.ok) throw new Error(`Failed to load search index: ${response.status}`)
  const documents: SearchDocument[] = await response.json()
  index.addAll(documents)
  miniSearch = index
  return index
}

export const searchAgainstIndex = async (query: string) => {
  const index = await ensureIndex()
  return index.search(query) as RecipeSearchResult[]
}
