<template>
  <span class="x-label" :class="{ active: active, disabled: disabled }" @click="onClick"><slot></slot></span>
</template>
<script>
  export default {
    name: 'x-label',
    props: ['active', 'disabled'],
    methods: {
      onClick (event) {
        if (this.disabled) return
        this.$emit('click', event)
      }
    }
  }
</script>
<style>
  .x-label {
    display: inline-block;
    font-size: 12px;
    line-height: 16px;
    padding: 0.14rem 0.32rem;
    border-radius: 0.2133rem;
    background-color: #eaeaea;
    color: #666;
    margin-right: 0.53rem;
  }
  .x-label.active {
    background-color: #FFC935;
    color: #ffffff;
  }
  .x-label.disabled {
    background-color: #f4f4f4;
    color: #cccccc;
  }
</style>
