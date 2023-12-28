<script>
  import { loadingSsl, rootCA, ssl, sslOptions } from "../store/store";
  import {
    createCertificate,
    generatePKCS12Bundle,
  } from "../helpers/node-forge";

  let password = "catonkeyboard";

  async function generateCertificate() {
    $loadingSsl = true;
    const pki = await createCertificate($rootCA, $sslOptions);
    $ssl.certificate = pki.certificate;
    $ssl.privateKey = pki.privateKey;
    $ssl.certificatePem = pki.certificatePem;
    $ssl.privateKeyPem = pki.privateKeyPem;
    generatePkcs12();
    $loadingSsl = false;
  }

  function generatePkcs12() {
    const config = {
      privateKey: $ssl.privateKey,
      certificate: $ssl.certificatePem,
      caCertificate: $rootCA.certificatePem,
      password: password,
    };
    const pkcs12 = generatePKCS12Bundle(config);
    $ssl.pkcs12 = pkcs12;
  }
</script>

{#if $rootCA.privateKey}
  <div class="new-certificate">
    <button class="generate" on:click={generateCertificate}>
      Generate Certificate
    </button>
  </div>
{/if}

<style>
  .new-certificate {
    display: flex;
    justify-content: end;
    width: 97.5%;
    text-align: center;
    margin-top: 10px;
  }
  .new-certificate button {
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
  .new-certificate button:active {
    border-right: 2px solid #333;
    border-bottom: 2px solid #333;
  }
</style>
