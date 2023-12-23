<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let uploaded = null;
  export let label;
  export let identifier;

  function sendFile(file) {
    dispatch("upload", { file: file, identifier: identifier });
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      uploaded = file;
      sendFile(file);
    }
  }

  function handleFileInput(event) {
    const file = event.target.files[0];
    if (file) {
      uploaded = file;
      sendFile(file);
    }
  }
</script>

<div
  class="file-uploader"
  role="button"
  aria-label="File Uploader"
  tabindex="0"
  on:drop={handleDrop}
  on:dragover={(e) => e.preventDefault()}
>
  <h1>{label}</h1>
  {#if uploaded}
    <p>Successfully uploaded "{uploaded.name}"!</p>
  {:else}
    <!-- Add the input element here -->
    <input type="file" on:change={handleFileInput} />
    <p>Drag and drop a file here</p>
    <!-- <input type="file" on:change={handleFileInput} /> -->
  {/if}
</div>

<style>
  /* Add this style to make the container clickable */
  .file-uploader {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    height: 100%;
  }

  /* Add this style to position and stretch the file input to cover the container */
  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
</style>
