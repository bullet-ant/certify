<script>
  export let data;
  export let filename;
  export let title;
  export let binary = false;

  const downloadFile = (data, filename) => {
    if (binary) {
      const uint8Array = new Uint8Array(data.length);
      for (let i = 0; i < data.length; ++i) {
        uint8Array[i] = data.charCodeAt(i);
      }
      data = uint8Array.buffer;
    }
    const blob = new Blob([data], { type: "text/plain" });
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobURL;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(blobURL);
  };
</script>

{#if data && data.length}
  <button class="download" on:click={() => downloadFile(data, filename)}
    >Download {title}</button
  >
{/if}

<style>
  /* .download {
    margin: 10px;
    border: none;
    width: 20%;
    height: 100%;
    cursor: pointer;
    background-color: gold;
  } */
  .download {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    text-decoration: none;
  }
</style>
