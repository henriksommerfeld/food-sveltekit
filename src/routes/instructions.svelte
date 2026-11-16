<script lang="ts">
  import { onMount } from 'svelte'
  import type { Recipe } from '#lib/types.ts'
  import { loadChecked, saveChecked } from '#lib/checked-instructions.ts'
  import CheckableInstruction from './checkable-instruction.svelte'

  export let instructions: Recipe['instructions']
  export let slug: string
  const instructionsCount = instructions?.instructionsGroup?.length || 0
  const showHeading = instructionsCount > 1

  let checked = new Set<string>()
  onMount(() => (checked = loadChecked(slug)))

  const toggle = (id: string) => {
    if (checked.has(id)) checked.delete(id)
    else checked.add(id)
    checked = checked
    saveChecked(slug, checked)
  }
</script>

{#if instructionsCount > 0}
  <section>
    <h2>Gör så här</h2>
    {#each instructions.instructionsGroup as group, groupIndex}
      {#if showHeading}<h3>{group.name}</h3>{/if}
      <ol>
        {#each group.instructions as instruction, instructionIndex}
          {@const id = `${groupIndex}-${instructionIndex}`}
          <CheckableInstruction
            {instruction}
            isChecked={checked.has(id)}
            onToggle={() => toggle(id)}
          />
        {/each}
      </ol>
    {/each}
  </section>
{/if}

<style>
  section {
    margin-bottom: var(--spacing-section);
  }
  ol {
    margin-left: 0;
  }
</style>
