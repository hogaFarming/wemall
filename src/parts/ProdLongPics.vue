<template>
  <ul class="prod-long-pics">
    <li v-for="item in items">
      <img v-lazy="item">
    </li>
  </ul>
</template>
<script>
  export default {
    props: ['items']
  }
</script>
<style>
  .prod-long-pics {

  }
  .prod-long-pics img {
    margin-bottom: 0.213rem;
    width: 100%;
  }
  .prod-long-pics img[lazy=loading] {
    height: 5rem;
  }
</style>
