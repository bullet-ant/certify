<script>
  export let data;
  export let filename;
  export let title;

  const downloadFile = (data, filename) => {
    const blob = new Blob([data], { type: "text/plain" });
    const blobURL = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobURL;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(blobURL);
  };
</script>

<button class="download" on:click={() => downloadFile(data, filename)}
  >Download {title}</button
>

<style>
  .download {
    margin: 10px;
    border: none;
    width: 20%;
    height: 100%;
    cursor: pointer;
    background-color: gold;
  }
</style>
