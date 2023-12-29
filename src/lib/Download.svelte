<script>
  export let data;
  export let filename;
  export let title;
  export let binary = false;
  export let buttonColor = "#77FC31";

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
  <div class="download">
    <button
      style="background-color: {buttonColor};"
      class="download-button"
      on:click={() => downloadFile(data, filename)}
      ><i class="fa-solid fa-download"></i> {title}</button
    >
  </div>
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
    margin-top: 2px;
  }
  .download-button {
    font-size: 12px;
    font-weight: bold;
    color: #333;
    padding: 4px 8px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    border-right: 3px solid #333;
    border-bottom: 3px solid #333;
  }
  .download-button:active {
    border-right: 1.5px solid #333;
    border-bottom: 1.5px solid #333;
  }
</style>
