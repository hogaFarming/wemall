<template>
  <div class="x-image-upload">
    <ul class="x-image-upload-list">
      <li class="x-image-upload-trigger" :id="'container' + uuid" v-show="!value || value.length < limit">
        <div class="image" :id="'pickfiles' + uuid">
          <img src="/static/icon/ic_camera.png" alt="upload">
          <!--upload-->
          <div class="image-text" :id="'progress' + uuid" v-show="false"></div>
        </div>
      </li>
      <li v-for="(file, index) in value" class="x-image-upload-file">
        <div class="image">
          <img :src="file.url" alt="img">
          <div class="image-text" @click="value.splice(index, 1)">删除</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Upload } from 'hanzi-mobile-package'
  Vue.use(Upload)

  let uuid = 0
  export default {
    name: 'x-image-upload',
    props: {
      value: Array,
      limit: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {
        uuid: uuid + 1
      }
    },
    mounted () {
      new upload({
        container: 'container' + this.uuid,     // 容器ID
        browse_button: 'pickfiles' + this.uuid, // 按钮ID
        progress: 'progress' + this.uuid,        // 进度条ID
        type: 'goods_comment',       // 请求接口时的传参，upload_type
        setting: 'local',          // local：本地，cloud：云
        chunk_size: '200kb',       // 分段传输的大小
        group: ['img'],
        url: '/api/upload',   // 上传路径
        callback: (re) => {
          let newValue = [...(this.value || []), re.data]
          this.$emit('input', newValue)
        }
      })
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
