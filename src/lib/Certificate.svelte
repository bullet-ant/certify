<script>
  import { rootCA } from "../store/store";
  import { createCertificate } from "../helpers/node-forge";
  import Download from "./Download.svelte";

  let certificate = null;
  let privateKey = null;

  function generateCertificate() {
    const pki = createCertificate($rootCA);
    privateKey = pki.privateKey;
    certificate = pki.certificate;
  }
</script>

<div class="container">
  <button class="generate" on:click={generateCertificate}>
    <h1>Generate Certificate</h1>
  </button>
  <div class="ca">
    {#if certificate}
      <Download title="Certificate" filename="server.crt" data={certificate}
      ></Download>
    {/if}
    {#if privateKey}
      <Download title="Private Key" filename="server.key" data={privateKey}
      ></Download>
    {/if}
  </div>
</div>

<style>
  .container {
    margin-top: 50px;
    flex: 1;
    box-sizing: border-box;
    height: 30vh;
    width: 100%;
    padding: 20px;
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
    width: 100%;
    display: flex;
    justify-content: center;
    height: 6vh;
  }
</style>
