<script>
  import {
    existingCA,
    rootCA,
    ssl,
    caOptions,
    loadingCa,
  } from "../store/store";
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
    $loadingCa = true;
    const ca = await createRootCA($caOptions);
    $rootCA.privateKey = ca.privateKey;
    $rootCA.certificate = ca.certificate;
    $rootCA.privateKeyPem = ca.privateKeyPem;
    $rootCA.certificatePem = ca.certificatePem;
    $loadingCa = false;
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
    <div class="existing-certificate">
      <Dropzone
        label={certificateLabel}
        identifier={certificateIdentifier}
        on:upload={(event) => parseSslEntity(event, SSL.CERTIFICATE)}
      ></Dropzone>
    </div>
    <div class="existing-key">
      <Dropzone
        label={keyLabel}
        identifier={keyIdentifier}
        on:upload={(event) => parseSslEntity(event, SSL.PRIVATEKEY)}
      ></Dropzone>
    </div>
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
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 16px;
    width: 100%;
  }
  .existing-certificate,
  .existing-key {
    background-color: #FC3177;
    border-right: 3px solid #333;
    border-bottom: 3px solid #333;
    color: #fff;
    width: 43vw;
    padding: 0.9vw;
  }
  .new-ca {
    display: flex;
    justify-content: end;
    width: 97.5%;
    text-align: center;
    margin-top: 20px;
  }
  .new-ca button {
    /* margin-right: 3vw; */
    padding: 6px 10px;
    border: none;
    border-right: 4px solid #333;
    border-bottom: 4px solid #333;
    border-radius: 4px;
    height: 100%;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #3177fc;
    cursor: pointer;
  }
  .new-ca button:active {
    border-right: 2px solid #333;
    border-bottom: 2px solid #333;
  }
</style>
