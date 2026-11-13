<script lang="ts">
  import Banner from './banner.svelte'
  import { onMount } from 'svelte'
  import type { BannerImage } from '#lib/banner.ts'

  export let banner: BannerImage
  export let renderHomeLink = true

  const lqipUrl = banner.lqip
  const webpUrl = banner.src
  $: image = lqipUrl

  onMount(() => {
    const img = new Image()
    img.onload = function () {
      image = webpUrl
    }
    img.src = webpUrl
  })
</script>

<Banner imagePath={image} {renderHomeLink}>
  <slot />
</Banner>
