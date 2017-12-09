<template>
  <div class="x-image-upload">
    <ul class="x-image-upload-list">
      <li class="x-image-upload-trigger" @click="selectFile">
        <div class="image"><img src="/static/icon/ic_camera.png" alt="upload"></div>
      </li>
      <li v-for="item in files" class="x-image-upload-file">
        <div class="image"><img :src="item" alt="img"></div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'x-image-upload',
    props: ['value'],
    computed: {
      files () {
        // TODO
        return this.value || ['/static/img/order.png', '/static/img/order.png', '/static/img/order.png', '/static/img/order.png', '/static/img/order.png', '/static/img/order.png']
      }
    },
    methods: {
      selectFile () {

      }
    }
  }
</script>
<style>
  .x-image-upload {
    background-color: #fff;
  }
  .x-image-upload-list {
    overflow: hidden;
    /*margin-bottom: -0.2rem;*/
  }
  .x-image-upload-trigger,
  .x-image-upload-file {
    margin-right: 0.2rem;
    float: left;
    margin-bottom: 0.2rem;
  }
  .x-image-upload-trigger .image,
  .x-image-upload-file .image {
    width: 1.6rem;
    height: 1.6rem;
  }
  .x-image-upload-file .image {
    border: 1px solid #f0f0f0;
  }
</style>
