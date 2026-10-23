<script lang="ts">
  import { parseLinks } from './inline-links'

  export let text: string

  $: parts = parseLinks(text)
</script>

{#each parts as part}{#if part.type === 'link'}<a
      href={part.href}
      target="_blank"
      rel="noopener noreferrer">{part.text}</a
    >{:else}{part.value}{/if}{/each}

<style>
  a {
    color: inherit;
    text-decoration: underline;
  }
</style>
