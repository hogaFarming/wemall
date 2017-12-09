<template>
  <span :style="{ color: color || '#333' }">
    ￥<span :style="yuanStyle">{{ yuan }}</span>{{ decimals }}
  </span>
</template>
<script>
  export default {
    name: 'x-money',
    props: ['value', 'color', 'size'],
    computed: {
      yuanStyle () {
        let scale
        switch (this.size) {
          case 'small':
            scale = 1
            break
          case 'large':
            scale = 1.5
            break
          default:
            scale = 1.25
            break
        }
        return {
          fontSize: scale + 'em'
        }
      },
      yuan () {
        if (!this.value && this.value !== 0) {
          return '--'
        }
        return parseInt(this.value, 10) + ''
      },
      decimals () {
        if (!this.value && this.value !== 0) {
          return '--'
        }
        return '.' + this.value.toFixed(2).replace(/\d+\./, '')
      }
    }
  }
</script>
