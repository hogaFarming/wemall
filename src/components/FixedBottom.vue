<template>
  <div class="x-fixed-bottom" ref="container" :class="{ 'x-fixed-bottom--bordered': bordered }">
    <div class="x-fixed-bottom-content" v-if="$slots.content"><slot name="content"></slot></div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'x-fixed-bottom',
    props: {
      bordered: Boolean
    },
    mounted () {
      document.body.appendChild(this.$refs.container)
      const offsetHeight = this.$refs.container.offsetHeight
      if (offsetHeight) {
        document.body.style.paddingBottom = offsetHeight + 'px'
      }
    }
  }
</script>
<style>
  .x-fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: -webkit-box;
    display: flex;
  }
  .x-fixed-bottom-content {
    -webkit-flex: 1;
    flex: 1;
  }
  .x-fixed-bottom--bordered {
    border-top: 1px solid #e8e8e8;
  }
</style>
