<script>
  let list = [];
  let entry = "";

  function addItem() {
    if (entry.trim() !== "") {
      list = [...list, entry.trim()];
      entry = "";
    }
  }

  function removeItem(index) {
    list = list.filter((_, i) => i !== index);
  }
</script>

<div>
  {#each list as item, index (index)}
    <div>
      <span>{item}</span>
      <button on:click={() => removeItem(index)}> Delete </button>
    </div>
  {/each}

  <div>
    <input bind:value={entry} placeholder="Enter SAN" />
    <button on:click={addItem}>+</button>
  </div>
</div>

<style>
  /* Add your styles here if needed */
</style>
