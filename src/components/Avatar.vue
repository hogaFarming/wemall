<template>
  <div class="image" :style="{ width: width, height: width }">
    <img :src="imgSrc" @error="onImgError" />
  </div>
</template>
<script>
  export default {
    name: 'x-avatar',
    props: ['src', 'size'],
    computed: {
      width () {
        const sizeMap = {
          small: '0.8rem',
          normal: '1.3333rem',
          large: '2.1333rem'
        }
        return sizeMap[this.size] || this.size || sizeMap.normal
      }
    },
    data () {
      return {
        imgSrc: this.src
      }
    },
    methods: {
      onImgError () {
        this.imgSrc = '/static/icon/ic_avatar.png'
      }
    }
  }
</script>
