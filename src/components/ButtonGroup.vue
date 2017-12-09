<template>
  <div class="x-button-group">
    <slot></slot>
  </div>
</template>
<style>
  .x-button-group {
    display: -webkit-box;
    display: flex;
  }
  .x-button-group .x-button {
    flex: 1;
  }
</style>
<script>
  export default {
    name: 'x-button-group'
  }
</script>
