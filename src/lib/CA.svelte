<script>
  import { existingCA, rootCA, ssl, caOptions } from "../store/store";
  import { createRootCA, loadCA } from "../helpers/node-forge";
  import Dropzone from "./Dropzone.svelte";

  const certificateLabel = "Upload Existing CA's certificate";
  const certificateIdentifier = "certificate";
  const keyLabel = "Upload Existing CA's private key";
  const keyIdentifier = "key";

  const SSL = {
    CERTIFICATE: 1,
    PRIVATEKEY: 2,
  };

  async function generateCA() {
    const ca = await createRootCA($caOptions);
    $rootCA.privateKey = ca.privateKey;
    $rootCA.certificate = ca.certificate;
    $rootCA.privateKeyPem = ca.privateKeyPem;
    $rootCA.certificatePem = ca.certificatePem;
  }

  function parseSslEntity(event, type) {
    const reader = new FileReader();
    const { file } = event.detail;

    try {
      reader.readAsText(file);

      reader.onload = () => {
        const file = reader.result;
        const entity = loadCA(file, type);
        switch (type) {
          case SSL.CERTIFICATE:
            $rootCA.certificatePem = file;
            $rootCA.certificate = entity;
            break;
          case SSL.PRIVATEKEY:
            $rootCA.privateKeyPem = file;
            $rootCA.privateKey = entity;
            break;
          default:
            console.log("Are you sure, you uploaded the right file?");
        }
      };
    } catch (error) {
      console.error("Error parsing SSL entity: ", error.message);
    }
  }
</script>

{#if $existingCA}
  <div class="existing-ca">
    <Dropzone
      label={certificateLabel}
      identifier={certificateIdentifier}
      on:upload={(event) => parseSslEntity(event, SSL.CERTIFICATE)}
    ></Dropzone>
    <Dropzone
      label={keyLabel}
      identifier={keyIdentifier}
      on:upload={(event) => parseSslEntity(event, SSL.PRIVATEKEY)}
    ></Dropzone>
  </div>
{:else}
  <div class="new-ca">
    <button class="generate" on:click={generateCA}> Generate New CA </button>
  </div>
{/if}

<style>
  .existing-ca,
  .new-ca {
    width: 100%;
    height: auto;
  }
  .existing-ca {
    border: 1px solid red;
  }
  .new-ca {
    margin-top: 16px;
    width: 100%;
    height: 14vh;
    font-size: 14px;
    text-align: center;
  }
  .new-ca button {
    border: 2px solid blue;
    background-color: lightblue;
    height: 100%;
    width: 60%;
    cursor: pointer;
    color: #333;
  }
</style>
