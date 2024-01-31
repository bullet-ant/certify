<script>
  import { rootCA, sslOptions } from "../store/store";
  import Input from "./Input.svelte";
  import MultiInput from "./MultiInput.svelte";

  const sansRegex = /^(?:(?:\*\.)?[a-zA-Z0-9-]+\.){1,}(?:[a-zA-Z]{2,})$/;
</script>

{#if $rootCA.privateKey && $rootCA.certificate}
  <div class="config">
    <div class="column-1">
      <div class="input">
        <Input
          bind:value={$sslOptions.country}
          id="ssl-country"
          label="Country"
          placeholder="Enter country"
          tooltip="The two-letter code representing the country where the organization is located."
        ></Input>
      </div>
      <div class="input">
        <Input
          bind:value={$sslOptions.commonName}
          id="ssl-cn"
          label="Common Name"
          placeholder="Enter Common Name"
          tooltip="The fully qualified domain name (FQDN) for which the certificate is issued"
        ></Input>
      </div>
      <div class="multi-input">
        <MultiInput
          bind:list={$sslOptions.sans}
          id="ssl-sans"
          label="Subject Alternative Names"
          placeholder="Enter SAN domains"
          tooltip="Additional domain names that the certificate is valid for."
        ></MultiInput>
      </div>
    </div>
    <div class="column-2">
      <div class="input">
        <Input
          bind:value={$sslOptions.organization}
          id="ssl-organization"
          label="Organization"
          placeholder="Enter organization"
          tooltip="The legal name of the organization."
        ></Input>
      </div>
      <div class="input">
        <Input
          bind:value={$sslOptions.unit}
          id="ssl-ou"
          label="Organization Unit"
          placeholder="Enter organization unit"
          tooltip="The name of the specific unit or department within the organization."
        ></Input>
      </div>
      <div class="input">
        <Input
          bind:value={$sslOptions.password}
          id="ssl-password"
          label="Password"
          placeholder="Enter a password"
          tooltip="A passphrase to protect the PKCS12 file."
          type="password"
        ></Input>
      </div>
    </div>
  </div>
{/if}

<style>
  .config {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
    gap: 16px;
    width: 100%;
  }
  .column-1,
  .column-2 {
    width: 45vw;
  }
  .column-1 > div:not(:first-child) {
    margin-top: 10px;
  }
  .column-2 > div:not(:first-child) {
    margin-top: 10px;
  }
</style>
