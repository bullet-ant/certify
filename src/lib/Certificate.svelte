<script>
  import { rootCA, ssl, sslOptions } from "../store/store";
  import {
    createCertificate,
    generatePKCS12Bundle,
  } from "../helpers/node-forge";

  let password = "catonkeyboard";

  function generateCertificate() {
    const pki = createCertificate($rootCA, $sslOptions);
    $ssl.certificate = pki.certificate;
    $ssl.privateKey = pki.privateKey;
    $ssl.certificatePem = pki.certificatePem;
    $ssl.privateKeyPem = pki.privateKeyPem;
    generatePkcs12();
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
    margin-top: 10px;
    width: 100%;
    height: auto;
    border: 1px solid red;
  }
</style>
