import { getBanner as getBannerFrom } from '#lib/banner.ts'
import { getImage as getImageFrom } from '#lib/image.ts'

const bannerLqipImages = import.meta.glob('/src/uploads/*', {
  import: 'default',
  eager: true,
  query: '?w=16&format=webp&inline&fit=cover&blur=2&as=url&quality=1'
})
const bannerImages = import.meta.glob('/src/uploads/*', {
  import: 'default',
  eager: true,
  query: '?w=2500&format=webp&fit=cover&as=url'
})

const gridLqipImages = import.meta.glob('/src/uploads/*', {
  import: 'default',
  eager: true,
  query: '?w=128&h=96&format=webp&inline&as=url&quality=10'
})
const gridImages = import.meta.glob('/src/uploads/*', {
  import: 'default',
  eager: true,
  query: '?w=640;800&h=480;600&fit=cover&format=webp&as=picture'
})

export const getBanner = (path: string) => getBannerFrom(bannerImages, bannerLqipImages, path)

export const getGridImage = (path: string) => getImageFrom(gridImages, gridLqipImages, path)
