<template>
  <div class="label-radio">
    <div class="label-radio-inner">
      <x-label
        class="label-radio-label"
        v-for="item in options"
        :key="item[valueKey]"
        :active="isSelected(item)"
        :disabled="item.disabled"
        @click="onClick(item)">
        {{ item[labelKey] }}
      </x-label>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'x-label-check',
    props: ['value', 'options', 'keys', 'multiple'],
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
        if (item.disabled) {
          console.log('disabled')
          return
        }
        let value = this.value || []
        if (this.isSelected(item)) {
          value = value.filter(val => val !== item[this.valueKey])
        } else {
          value = [...value, item[this.valueKey]]
        }
        this.$emit('input', value)
      },
      isSelected (item) {
        const value = this.value || []
        return value.indexOf(item[this.valueKey]) !== -1
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
