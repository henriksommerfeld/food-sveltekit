<script lang="ts">
  import IngredientsGroup from './ingredients-group.svelte'
  import type { RecipeFrontmatter } from '$lib/types'
  import { servingsUnitFormatted } from '$lib/servings'

  export let recipe: RecipeFrontmatter
  export let servings = recipe.servings
  const showIngredientsHeading = recipe.ingredients.ingredientsGroup.length > 1

  function decreaseServings() {
    if (servings < 2) return
    servings--
  }

  function increaseServings() {
    servings++
  }
</script>

<section>
  <h2>Ingredienser</h2>
  <div class="servings-adjuster">
    <button on:click={decreaseServings}>
      <img
        src={`/img/subtract.svg`}
        alt={`Minska antalet ${recipe.servingslabel} för beräkning av ingredienser`}
      />
    </button>
    {servings}
    {servingsUnitFormatted(servings, recipe.servingslabel)}
    <button on:click={increaseServings}>
      <img
        src={`/img/add.svg`}
        alt={`Öka antalet ${recipe.servingslabel} för beräkning av ingredienser`}
      />
    </button>
  </div>
  {#each recipe.ingredients.ingredientsGroup as ingredientsGroup}
    <IngredientsGroup
      group={ingredientsGroup}
      {showIngredientsHeading}
      defaultServings={recipe.servings}
      {servings}
    />
  {/each}
</section>

<style>
  section {
    margin-bottom: var(--spacing-section);
  }
  .servings-adjuster {
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--spacing-default);
    border: 1px solid var(--teal500);
    background-color: var(--teal100);
    border-radius: 25px;
    padding: var(--spacing-half);
  }
  button {
    background: none;
    border: none;
    padding: 0;
    display: flex;
    cursor: pointer;
    touch-action: manipulation;
  }
</style>
