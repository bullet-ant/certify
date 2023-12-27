<script>
  import { caOptions } from "../store/store";
  import Input from "./Input.svelte";
</script>

<div class="config">
  <div class="column-1">
    <div class="country"></div>
    <div class="country">
      <Input
        bind:value={$caOptions.country}
        id="ca-country"
        label="Country"
        placeholder="Enter country"
      ></Input>
    </div>
    <div class="cn">
      <Input
        bind:value={$caOptions.commonName}
        id="ca-cn"
        label="Common Name"
        placeholder="Enter Common Name"
      ></Input>
    </div>
  </div>
  <div class="column-2">
    <div class="org">
      <Input
        bind:value={$caOptions.organization}
        id="ca-organization"
        label="Organization"
        placeholder="Enter organization"
      ></Input>
    </div>
    <div class="org-unit">
      <Input
        bind:value={$caOptions.unit}
        id="ca-ou"
        label="Organization Unit"
        placeholder="Enter organization unit"
      ></Input>
    </div>
  </div>
</div>

<style>
  .config {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 16px;
  }
</style>
