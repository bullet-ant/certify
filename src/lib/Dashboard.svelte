<script>
  import { existingCA, rootCA, ssl, landingPage } from "../store/store";
  import Ca from "./CA.svelte";
  import Certificate from "./Certificate.svelte";
  import CaConfig from "./CA-Config.svelte";
  import CertificateConfig from "./Certificate-Config.svelte";
  import Download from "./Download.svelte";
  import Options from "./Options.svelte";

  function toggleCA() {
    $existingCA = !$existingCA;
    $rootCA = {
      privateKey: null,
      certificate: null,
      privateKeyPem: null,
      certificatePem: null,
    };
    $ssl = {
      privateKey: null,
      certificate: null,
      privateKeyPem: null,
      certificatePem: null,
      pkcs12: null,
    };
  }
</script>

<main>
  {#if $landingPage}
    <Options></Options>
  {:else}
    <div class="ca">
      {#if $existingCA}
        <div class="ca-choice">
          <button on:click={toggleCA}>Create a new Root CA instead?</button>
        </div>
      {:else}
        <div class="ca-choice">
          <button on:click={toggleCA}>Already have an existing CA?</button>
        </div>
        <CaConfig></CaConfig>
      {/if}
      <Ca></Ca>
      <Download
        title="CA Private Key"
        filename="rootCA.key"
        data={$rootCA.privateKeyPem}
      ></Download>
      <Download
        title="CA Certificate"
        filename="rootCA.crt"
        data={$rootCA.certificatePem}
      ></Download>
    </div>
    <div class="ssl">
      <CertificateConfig></CertificateConfig>
      <Certificate></Certificate>
      <Download
        title="SSL Private Key"
        filename="server.key"
        data={$ssl.privateKeyPem}
      ></Download>
      <Download
        title="SSL Certificate"
        filename="server.crt"
        data={$ssl.certificatePem}
      ></Download>
      <Download
        title="SSL PKCS12"
        filename="server.p12"
        data={$ssl.pkcs12}
        binary={true}
      ></Download>
    </div>
  {/if}
</main>

<style>
  .ca-choice button {
    font-size: 14px;
    text-align: start;
    border: none;
    background-color: white;
    cursor: pointer;
    text-decoration: underline;
    color: #333;
  }
</style>
