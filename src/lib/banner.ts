import { urlSchema } from '#lib/image.ts'

export type BannerImage = {
  lqip: string
  src: string
}

export const getBanner = (
  images: Record<string, unknown>,
  lqipImages: Record<string, unknown>,
  path: string
): BannerImage => {
  if (!images[path] || !lqipImages[path]) throw new Error(`Banner image not found: ${path}`)
  return {
    lqip: urlSchema.parse(lqipImages[path]),
    src: urlSchema.parse(images[path])
  }
}

// Only the fixed banners are globbed here, since this module ends up in the client bundle
const staticLqipImages = import.meta.glob('/src/uploads/{startpage,search}-banner.jpg', {
  import: 'default',
  eager: true,
  query: '?w=16&format=webp&inline&fit=cover&blur=2&as=url&quality=1'
})
const staticImages = import.meta.glob('/src/uploads/{startpage,search}-banner.jpg', {
  import: 'default',
  eager: true,
  query: '?w=2500&format=webp&fit=cover&as=url'
})

export const startpageBanner = getBanner(
  staticImages,
  staticLqipImages,
  '/src/uploads/startpage-banner.jpg'
)
export const searchBanner = getBanner(
  staticImages,
  staticLqipImages,
  '/src/uploads/search-banner.jpg'
)
