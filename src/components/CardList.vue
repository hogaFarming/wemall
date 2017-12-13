<template>
  <div class="x-card-list" :class="cls">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'x-card-list',
    props: {
      cols: {
        type: Number,
        default: 2
      }
    },
    computed: {
      cls () {
        return {
          ['x-card-list--col-' + this.cols]: true
        }
      }
    }
  }
</script>

<style>
  .x-card-list {
    overflow: hidden;
    zoom: 1;
  }
  .x-card-list .x-card {
    float: left;
  }
  .x-card-list--col-2 {
    padding: 0 0.27rem;
  }
  .x-card-list--col-2 .x-card {
    width: 4.53rem;
    margin-right: 0.4rem;
    margin-bottom: 0.4rem;
  }
  .x-card-list--col-2 .x-card:nth-child(2n) {
    margin-right: 0;
  }
  .x-card-list--col-3 {
    padding: 0 0.48rem;
  }
  .x-card-list--col-3 .x-card {
    width: 2.6666rem;
    margin-right: 0.52rem;
    margin-bottom: 0.4rem;
  }
  .x-card-list--col-3 .x-card:nth-child(3n) {
    margin-right: 0;
  }
</style>
