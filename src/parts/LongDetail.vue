<template>
  <div class="long-detail" v-html="content">
    <!--<slot></slot>-->
  </div>
</template>
<script>
  export default {
    props: ['content']
  }
</script>
<style>
  .long-detail {

  }
  .long-detail img {
    margin-bottom: 0.213rem;
    width: 100%;
  }
  .long-detail img[lazy=loading] {
    height: 5rem;
  }
</style>
