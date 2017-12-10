<template>
  <x-icon class="x-checkbox" :type="value ? 'select_ele' : 'select_nor'" @click.native="$emit('input', !value)"></x-icon>
</template>

<script>
  export default {
    name: 'x-checkbox',
    props: {
      value: Boolean
    }
  }
</script>

<style>

</style>
