<template>
  <i class="x-icon">
    <img :src="imgSrc"/>
  </i>
</template>
<script>
  export default {
    name: 'x-icon',
    props: ['type'],
    computed: {
      imgSrc () {
        return '/static/icon/ic_' + this.type + '.png'
      }
    }
  }
</script>
<style>
  .x-icon {
    display: inline-block;
    vertical-align: middle;
    height: 16px;
  }
  .x-icon img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }
</style>
