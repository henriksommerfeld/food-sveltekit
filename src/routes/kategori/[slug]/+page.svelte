<script lang="ts">
  import BannerMainContainer from '../../banner-main-container.svelte'
  import CategoryBanner from '../../category-banner.svelte'
  import MenuGrid from '../../menu-grid.svelte'
  import MenuGridImageLink from '../../menu-grid-image-link.svelte'
  import PageWrapper from '../../page-wrapper.svelte'
  import type { PageData } from './$types'

  export let data: PageData
  const recipes = data.recipes
</script>

<svelte:head>
  <title>{data.category.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.category.title} />
</svelte:head>

<PageWrapper>
  <BannerMainContainer>
    <CategoryBanner category={data.category} banner={data.banner} recipeCount={recipes.length} />
    <MenuGrid>
      {#each recipes as recept}
        <MenuGridImageLink href="/{recept.slug}" title={recept.title} image={recept.image} />
      {/each}
    </MenuGrid>
  </BannerMainContainer>
</PageWrapper>
