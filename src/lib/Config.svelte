<script>
  import Input from "./Input.svelte";
  import MultiInput from "./MultiInput.svelte";
</script>

<div class="cn">
  <Input></Input>
</div>

<div class="sans">
  <MultiInput></MultiInput>
</div>

<style>
  .cn {
    display: flex;
    justify-content: baseline;
  }
  .sans {
    display: flex;
    justify-content: baseline;
  }
</style>
