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
  <label for={id}>{label}</label>
  <div class="multi-add">
    <input
      type="text"
      bind:value={entry}
      {id}
      {placeholder}
      on:keydown={onEnter}
    />
    <button class="add" on:click={addItem}
      ><i class="fa-solid fa-plus"></i></button
    >
  </div>
  {#each list as item, index (index)}
    <div class="sans">
      <span>{item}</span>
      <button class="remove" on:click={() => removeItem(index)}
        ><i class="fa-solid fa-trash"></i></button
      >
    </div>
  {/each}
</div>
{#if error}
  <div class="error">
    {error}
  </div>
{/if}

<style>
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
    color: #333;
  }

  div {
    position: relative;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: #007bff;
  }

  .multi-add {
    display: flex;
    gap: 10px;
  }
  .add {
    background-color: #333;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    /* padding: 6px 8px; */
    padding: 6px 10px;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }
  .sans {
    margin-top: 4px;
    /* border: 1px solid black; */
  }
  .remove {
    background-color: #fff;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }
</style>
