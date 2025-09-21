<script>
  import * as config from '$lib/config'
  import { page } from '$app/state'
</script>

<svelte:head>
  <title>{config.title}</title>
</svelte:head>

<h1>{page.status}</h1>
<h2>{page.error?.message}</h2>
