<script>
  export let title;
</script>

<div class="navbar">
  <div class="logo">
    <img src="images/favicon.ico" alt="Logo" />
  </div>
  <div class="title">
    {title}
  </div>
</div>

<style>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 14px;
    margin-bottom: 6px;
  }
  .title {
    color: #333;
    font-size: 36px;
    font-weight: bold;
    transition: all 0.4s;
  }
  .title:hover {
    transform: skew(-16deg);
  }
</style>
