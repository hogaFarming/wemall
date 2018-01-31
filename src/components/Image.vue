<template>
  <div class="x-image" ref="container" :style="containerStyle"></div>
</template>
<script>
  export default {
    name: 'x-image',
    props: ['width', 'height', 'src'],
    data () {
      return {
        image: null
      }
    },
    computed: {
      containerStyle () {
        return {
          width: this.width,
          height: this.height
        }
      }
    },
    mounted () {
      this.image = new Image()
      this.image.onload = () => {
        this.$refs.container.appendChild(this.image)
      }
      this.image.src = this.src
    }
  }
</script>
<style>
  .x-image {
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    background-color: #d8d8d8;
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
