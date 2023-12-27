<script>
  export let label = "Default Label";
  export let placeholder = "Default Placeholder";
  export let id = "default-id";
  export let value = "";

  const onInput = (e) => (value = e.target.value);
</script>

<label for={id}>{label}</label>
<div>
  <input type="text" bind:value {id} {placeholder} on:input={onInput} />
</div>

<style>
  label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
    color: #333;
  }

  div {
    position: relative;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }

  input:focus {
    border-color: #007bff;
  }
</style>
