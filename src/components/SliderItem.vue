<template>
  <li class="x-slider-item">
    <slot></slot>
  </li>
</template>
<script>
  export default {
    name: 'x-slider-item'
  }
</script>
<style>
  .x-slider-item {
    float: left;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #fff;
  }
  .x-slider-item img {
    display: block;
    /*height: 8.4rem;*/
    margin: 0 auto;
  }
</style>
