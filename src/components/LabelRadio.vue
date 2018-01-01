<template>
  <div class="label-radio">
    <div class="label-radio-inner">
      <x-label
        class="label-radio-label"
        v-for="item in options"
        :key="item[valueKey]"
        :active="value === item[valueKey]"
        :disabled="item.disabled"
        @click="onClick(item)">
        {{ item[labelKey] }}
      </x-label>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'x-label-radio',
    props: ['value', 'options', 'keys'],
    computed: {
      valueKey () {
        return (this.keys && this.keys[1]) || 'value'
      },
      labelKey () {
        return (this.keys && this.keys[0]) || 'label'
      }
    },
    methods: {
      onClick (item) {
        if (item.disabled) return
        const isSelected = item[this.valueKey] === this.value
        this.$emit('input', isSelected ? undefined : item[this.valueKey])
      }
    }
  }
</script>
<style>
  .label-radio {
    overflow: hidden;
  }
  .label-radio::after {
    content: '';
    display: table;
  }
  .label-radio-inner {
    margin-bottom: -0.2667rem;
  }
  .label-radio-label {
    margin-bottom: 0.2667rem;
  }
</style>
