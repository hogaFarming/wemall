<template>
  <div class="x-praise-input">
    <x-icon
      v-for="i in 5"
      :key="i"
      class="x-praise-input-item"
      :type="i > value ? 'star_o' : 'star'"
      @click.native="$emit('input', i)">
    </x-icon>
    <span class="x-praise-input-label">{{ label }}</span>
  </div>
</template>
<script>
  function getLabel (value) {
    if (value > 4) return '非常好'
    if (value > 3) return '好'
    if (value > 2) return '一般'
    if (value > 1) return '差'
    if (value > 0) return '非常差'
  }
  export default {
    name: 'x-praise-input',
    props: ['value'],
    computed: {
      label () {
        return getLabel(this.value)
      }
    }
  }
</script>
<style>
  .x-praise-input {
    display: inline-block;
    vertical-align: middle;
  }
  .x-praise-input-item {
    margin-right: 0.48rem;
  }
  .x-praise-input-item:last-of-type {
    margin-right: 0.29rem;
  }
  .x-praise-input-label {
    vertical-align: middle;
    font-size: 14px;
  }
</style>
