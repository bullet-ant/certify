<script>
  export let label = "Default Label";
  export let placeholder = "Default Placeholder";
  export let id = "default-id";
  export let list = [];
  export let validate = /.*/;
  export let tooltip = "Default message";

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
  <div class="label">
    <label for={id}>{label}</label>
    <div class="tooltip">
      <i class="fa-solid fa-info-circle"></i>
      <div class="tooltip-message">
        {tooltip}
      </div>
    </div>
  </div>
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
      <span class="sans-item">{item}</span>
      <button class="remove" on:click={() => removeItem(index)}
        ><i class="fa-solid fa-trash-can"></i></button
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
  div {
    position: relative;
  }
  .label {
    display: flex;
    align-items: center;
    gap: 1%;
    margin-bottom: 0.75%;
    font-weight: bold;
    color: #333;
  }

  .tooltip {
    cursor: pointer;
    flex: 1;
  }
  .tooltip-message {
    font-size: 12px;
    font-weight: 400;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: 0%;
    left: 5%;
    background-color: #333;
    color: #fff;
    padding: 4px 10px;
    border-radius: 4px;
    transition: opacity 0.2s ease-in-out;
    z-index: 1;
  }
  .tooltip:hover .tooltip-message {
    visibility: visible;
    opacity: 1;
  }

  input {
    width: 100%;
    padding: 6px;
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
    font-size: 14px;
    /* border: 1px solid black; */
  }
  .remove {
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
    color: #333;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }
  .remove:hover {
    color: #f65177;
  }
</style>
