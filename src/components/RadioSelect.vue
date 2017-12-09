<template>
  <div class="x-radio-select">
    <x-cell style="color: #9b9b9b;" v-if="title">{{ title }}</x-cell>
    <x-cell
      class="x-radio-select-option"
      v-for="opt in options"
      :key="opt.value"
      :icon-right="opt.value === value ? 'select_ele' : 'select_nor'"
      @click.native="$emit('input', opt.value)">
      <span>{{ opt.label }}</span>
      <span style="color: #ccc;" v-if="opt.secondary">({{ opt.secondary }})</span>
    </x-cell>
  </div>
</template>

<script>
  export default {
    name: 'x-radio-select',
    props: ['value', 'options', 'title']
  }
</script>

<style>
  .x-radio-select {
    background-color: #fff;
    font-size: 14px;
  }
  .x-radio-select-option {
    border-top: 1px solid #f0f0f0;
  }
</style>
