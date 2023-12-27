<script>
  import { createEventDispatcher } from "svelte";

  export let label = "Upload File";
  export let identifier = "file-identifier";

  const dispatch = createEventDispatcher();
  let uploaded = null;

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
  {label}
  <br />
  {#if uploaded}
    <p>Use "{uploaded.name}" as Root CA</p>
  {:else}
    <input type="file" on:change={handleFileInput} />
    <p>Drag and drop a file here</p>
  {/if}
</div>

<style>
</style>
