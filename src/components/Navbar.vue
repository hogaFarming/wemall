<template>
  <mt-navbar class="x-navbar" :value="value" @input="$emit('input', $event)">
    <slot></slot>
  </mt-navbar>
</template>
<script>
  export default {
    name: 'x-navbar',
    props: ['fixed', 'value'],
    methods: {
    }
  }
</script>
<style>
  .x-navbar {
    padding: 0 0.64rem;
  }
  .x-navbar.mint-navbar .mint-tab-item {
    padding: 0.48rem 0 0.32rem;
    border-bottom: 1px solid transparent;
  }
  .mint-navbar .mint-tab-item.is-selected {
    margin-bottom: 0;
    border-color: #F5A623;
    color: #F5A623;
  }
</style>
