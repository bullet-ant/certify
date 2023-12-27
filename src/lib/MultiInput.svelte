<script>
  export let label = "Default Label";
  export let placeholder = "Default Placeholder";
  export let id = "default-id";
  export let list = [];
  export let validate = /.*/;
  
  let entry = "";
  let error = "";

  function validateEntry(entry) {
    if (validate.test(entry)) return true;

    error = `Invalid ${label.slice(0, -1)}!`;
    return false;
  }

  function addItem() {
    if (entry.trim() !== "") {
      if (!validateEntry(entry)) return;
      list = [...list, entry.trim()];
      entry = "";
      error = "";
    }
  }
  function onEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
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
      <button on:click={() => removeItem(index)}
        ><i class="fa-solid fa-trash"></i></button
      >
    </div>
  {/each}
  <label for={id}>{label}</label>
  <div>
    <input
      type="text"
      bind:value={entry}
      {id}
      {placeholder}
      on:keydown={onEnter}
    />
    <button on:click={addItem}><i class="fa-solid fa-add"></i></button>
  </div>
</div>
{#if error}
  <div class="error">
    {error}
  </div>
{/if}

<style>
  /* Add your styles here if needed */
</style>
