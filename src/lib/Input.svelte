<script>
  export let label = "Default Label";
  export let placeholder = "Default Placeholder";
  export let id = "default-id";
  export let value = "";
  export let type = "text";
  export let tooltip = "Default message";

  let showPassword = false;

  const onInput = (e) => (value = e.target.value);
  const toggleVisibility = () => {
    showPassword = !showPassword;
  };
</script>

<div class="label">
  <label for={id}>{label}</label>
  <div class="tooltip">
    <i class="fa-solid fa-circle-info"></i>
    <div class="tooltip-message">
      {tooltip}
    </div>
  </div>
</div>
<div class="input">
  {#if type === "password" && !showPassword}
    <input type="password" bind:value {id} {placeholder} on:input={onInput} />
  {:else}
    <input type="text" bind:value {id} {placeholder} on:input={onInput} />
  {/if}
  {#if type === "password"}
    <i class="fa-solid fa-eye" id="toggleVisibility" on:click={toggleVisibility}
    ></i>
  {/if}
</div>

<style>
  div {
    position: relative;
  }
  .label {
    display: flex;
    align-items: center;
    gap: 1%;
    margin-bottom: 0.75%;
    font-weight: bold;
    color: #333;
  }

  .tooltip {
    cursor: pointer;
    flex: 1;
  }
  .tooltip-message {
    font-size: 12px;
    font-weight: 400;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    bottom: 0%;
    left: 4%;
    background-color: #333;
    color: #fff;
    padding: 4px 10px;
    border-radius: 4px;
    transition: opacity 0.2s ease-in-out;
    z-index: 1;
  }
  .tooltip:hover .tooltip-message {
    visibility: visible;
    opacity: 1;
  }

  input {
    width: 100%;
    padding: 6px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: #007bff;
  }
  #toggleVisibility {
    cursor: pointer;
    position: absolute;
    top: 9px;
    right: 8px;
  }
  .input {
    display: flex;
    align-items: center;
  }
</style>
