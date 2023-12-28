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
          bind:value={$sslOptions.commonName}
          id="ssl-cn"
          label="Common Name"
          placeholder="Enter Common Name"
        ></Input>
      </div>
      <div class="input">
        <Input
          bind:value={$sslOptions.country}
          id="ssl-country"
          label="Country"
          placeholder="Enter country"
        ></Input>
      </div>
      <div class="multi-input">
        <MultiInput
          bind:list={$sslOptions.sans}
          id="ssl-sans"
          label="Subject Alternative Names"
          placeholder="Enter SAN domains"
          validate={sansRegex}
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
        ></Input>
      </div>
      <div class="input">
        <Input
          bind:value={$sslOptions.unit}
          id="ssl-ou"
          label="Organization Unit"
          placeholder="Enter organization unit"
        ></Input>
      </div>
      <div></div>
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
