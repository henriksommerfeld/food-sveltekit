<script lang="ts">
  import BannerHeader from './banner-header.svelte'
  import ImageBanner from './image-banner.svelte'
  import Searchbox from './searchbox.svelte'
  import type { NavLink } from '$lib/constants'

  export let category: NavLink
  export let recipeCount: number
</script>

<ImageBanner imagePath={category.imagePath}>
  <BannerHeader>
    <h1>{category.title}</h1>
    <h2>{recipeCount} recept</h2>
  </BannerHeader>
  <Searchbox />
</ImageBanner>
