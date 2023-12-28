<script>
  import { existingCA, landingPage } from "../store/store";

  function beginService(existing) {
    $landingPage = false;
    $existingCA = existing ? true : false;
  }
</script>

<div class="options">
  <div class="existing">
    <img
      src="https://placehold.co/600x400/png"
      alt="Use existing root ca"
      on:click={() => beginService(true)}
    />
  </div>
  <div class="new">
    <img
      src="https://placehold.co/600x400/png"
      alt="Create a brand new root ca"
      on:click={() => beginService(false)}
    />
  </div>
</div>

<style>
  .options {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .existing,
  .new {
    cursor: pointer;
    text-align: center;
  }
  img {
    height: 400px;
    width: 600px;
  }
</style>
