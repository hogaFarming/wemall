<template>
  <ul class="tab">
    <li v-for="item in items" @click="toggleTab(item)" :class="{ active: item.key === current }">{{ item.label }}</li>
  </ul>
</template>
<script>
  export default {
    name: 'x-tab',
    props: ['items'],
    data () {
      return {
        current: '1'
      }
    },
    methods: {
      toggleTab (item) {
        this.current = item.key
        this.$emit('toggle', item.key)
      }
    }
  }
</script>
