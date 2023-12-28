<script>
  import {
    existingCA,
    rootCA,
    ssl,
    landingPage,
    loadingCa,
    loadingSsl,
  } from "../store/store";
  import Ca from "./CA.svelte";
  import Certificate from "./Certificate.svelte";
  import CaConfig from "./CA-Config.svelte";
  import CertificateConfig from "./Certificate-Config.svelte";
  import Download from "./Download.svelte";
  import Options from "./Landing.svelte";

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
      <div class="ca-download">
        {#if $loadingCa}
          <img
            height="30px"
            src="images/Iphone-spinner.gif"
            alt="Loading spinner"
          />
        {:else}
          <Download
            title="Key"
            filename="rootCA.key"
            data={$rootCA.privateKeyPem}
          ></Download>
        {/if}

        {#if $loadingCa}
          <img
            height="30px"
            src="images/Iphone-spinner.gif"
            alt="Loading spinner"
          />
        {:else}
          <Download
            title="Certificate"
            filename="rootCA.crt"
            data={$rootCA.certificatePem}
          ></Download>
        {/if}
      </div>
    </div>
    <div class="ssl">
      <CertificateConfig></CertificateConfig>
      <Certificate></Certificate>
      <div class="ssl-download">
        {#if $loadingSsl}
          <img
            height="30px"
            src="images/Iphone-spinner.gif"
            alt="Loading spinner"
          />
        {:else}
          <Download title="Key" filename="server.key" data={$ssl.privateKeyPem}
          ></Download>
        {/if}
        {#if $loadingSsl}
          <img
            height="30px"
            src="images/Iphone-spinner.gif"
            alt="Loading spinner"
          />
        {:else}
          <Download
            title="Certificate"
            filename="server.crt"
            data={$ssl.certificatePem}
          ></Download>
        {/if}
        {#if $loadingSsl}
          <img
            height="30px"
            src="images/Iphone-spinner.gif"
            alt="Loading spinner"
          />
        {:else}
          <Download
            title="PKCS12"
            filename="server.p12"
            data={$ssl.pkcs12}
            binary={true}
          ></Download>
        {/if}
      </div>
    </div>
  {/if}
</main>

<style>
  .ca-choice button {
    font-size: 13px;
    margin-left: 2.2vw;
    text-align: start;
    border: none;
    background-color: white;
    cursor: pointer;
    text-decoration: underline;
    color: #333;
  }
  .ca-download,
  .ssl-download {
    display: flex;
    justify-content: end;
    width: 97.5%;
    text-align: center;
    margin-top: 2px;
    gap: 0.8vw;
  }
  .ssl-download {
    gap: 0.6vw;
  }
</style>
