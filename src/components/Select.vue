<template>
  <div class="x-select">
    <x-cell class="x-select-cell" icon-right="next_page" @click.native="showOptions">
      {{ title }}
      <span slot="right" :style="{ color: selectedLabel ? '#333' : '#ccc' }">{{ selectedLabel || '请选择' }}</span>
    </x-cell>
    <mt-popup class="x-select-popup" v-model="popupVisible" position="bottom">
      <x-cell class="x-select-title">
        {{title}}
        <x-icon slot="right" @click.native="popupVisible = false" type="close"></x-icon>
      </x-cell>
      <ul class="x-select-options">
        <li v-for="opt in options" @click="onSelect(opt)">{{ opt.label }}</li>
      </ul>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    name: 'x-select',
    props: ['title', 'options', 'value'],
    computed: {
      selectedLabel () {
        if (this.value !== undefined && this.options) {
          const selected = this.options.filter(i => i.value === this.value)[0]
          if (selected) return selected.label
        }
        return ''
      }
    },
    data () {
      return {
        popupVisible: false
      }
    },
    methods: {
      showOptions () {
        this.popupVisible = true
      },
      onSelect (opt) {
        this.$emit('input', opt.value)
        this.popupVisible = false
      }
    }
  }
</script>
<style>
  .x-select {
    font-size: 14px;
  }
  .x-select-popup {
    width: 100%;
    background-color: #fff;
  }
  .x-select-title {
    background-color: #f0f0f0;
  }
  .x-select-options {

  }
  .x-select-options li {
    text-align: center;
    padding: 0.4rem 0;
    border-top: 1px solid #f0f0f0;
  }
</style>
