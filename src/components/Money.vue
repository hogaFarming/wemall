<template>
  <span :style="{ color: color || '#333' }">
    ￥<span :style="yuanStyle">{{ yuan }}.</span>{{ decimals }}
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
        const val = this.$utils.toFixedPrice(this.value)
        return val.replace(/\.\d+$/, '')
      },
      decimals () {
        const val = this.$utils.toFixedPrice(this.value)
        if (val === '0') return '00'
        return val.replace(/^\d+\./, '')
      }
    }
  }
</script>
