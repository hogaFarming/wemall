<template>
  <div class="x-image" ref="container" :style="containerStyle"></div>
</template>
<script>
  export default {
    name: 'x-image',
    props: ['width', 'height', 'src'],
    data () {
      return {
        image: null,
        loaded: false
      }
    },
    computed: {
      containerStyle () {
        return {
          width: this.width,
          height: this.height,
          backgroundColor: this.loaded ? 'transparent' : '#d8d8d8'
        }
      }
    },
    mounted () {
      this.loadImg()
    },
    watch: {
      src () {
        this.loadImg()
      }
    },
    methods: {
      loadImg () {
        let image = new Image()
        image.onload = () => {
          this.$refs.container.innerHTML = ''
          this.$refs.container.appendChild(image)
          this.loaded = true
        }
        image.src = this.src
      }
    }
  }
</script>
<style>
  .x-image {
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    position: relative;
  }
  .x-image--bordered {
    border: 1px solid #f0f0f0;
    background-color: #fff;
  }
  .x-image img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: top;
  }
</style>
