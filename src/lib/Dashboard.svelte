<script>
  import { rootCA } from "../store/store";
  import Certificate from "./Certificate.svelte";

  import { createRootCA } from "../helpers/node-forge";
  import Download from "./Download.svelte";

  const label = "Upload Existing CA";
  const identifier = "key";

  function parseFile(event) {
    const reader = new FileReader();
    const { file } = event.detail;

    try {
      reader.readAsText(file);

      reader.onload = () => {
        const file = reader.result;
      };
    } catch (error) {
      console.error("Error parsing private key: ", error.message);
    }
  }

  async function generateCA() {
    const ca = await createRootCA();
    $rootCA.privateKey = ca.privateKey;
    $rootCA.certificate = ca.certificate;
    $rootCA.privateKeyPem = ca.privateKeyPem;
    $rootCA.certificatePem = ca.certificatePem;
  }
</script>

<div class="section">
  <!-- <div class="container">
    <div class="dropzone-container">
      <Dropzone {label} {identifier} on:upload={parseFile}></Dropzone>
    </div>
  </div> -->
  <div class="container">
    <button class="generate" on:click={generateCA}>
      <h1>Generate New CA</h1>
    </button>
    <div class="ca">
      {#if $rootCA.privateKeyPem}
        <Download
          data={$rootCA.privateKeyPem}
          filename="rootCA.key"
          title="Private Key"
        ></Download>
      {/if}
      {#if $rootCA.certificatePem}
        <Download
          data={$rootCA.certificatePem}
          filename="rootCA.crt"
          title="Certificate"
        ></Download>
      {/if}
    </div>
  </div>
</div>
{#if $rootCA.privateKey}
  <Certificate></Certificate>
{/if}

<style>
  /* Apply styles to the parent div */
  .section {
    display: flex;
    justify-content: space-around;
    padding: 20px;
    height: 30vh;
  }

  .container {
    flex: 1;
    box-sizing: border-box;
    height: 100%;
  }

  .generate {
    background-color: skyblue;
    border: none;
    text-decoration: none;
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  .generate:hover {
    background-color: blue;
    color: white;
  }

  .ca {
    display: flex;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 6vh;
  }
</style>
