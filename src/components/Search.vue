<template>
  <div class="x-search">
    <x-icon class="x-search-icon" type="search" @click.native="search"></x-icon>
    <input
      class="x-search-input"
      type="text"
      :value="value"
      @input="onInput"
      @keydown.enter="search">
    <x-icon class="x-search-clear" v-if="!!value" type="clear" @click.native="clear"></x-icon>
  </div>
</template>

<script>
  export default {
    name: 'x-search',
    props: ['value'],
    methods: {
      onInput (event) {
        this.$emit('input', event.target.value)
      },
      search (event) {
        this.$emit('search', this.value)
      },
      clear () {
        this.$emit('input', '')
      }
    }
  }
</script>

<style scoped>
  .x-search {
    position: relative;
    background-color: #fff;
    border: 1px solid #E8E8E8;
    border-radius: 100px;
    padding: 4px 40px;
  }
  .x-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  .x-search-clear {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  .x-search-input {
    width: 100%;
    border: none;
    outline: none;
    line-height: 20px;
  }
</style>
