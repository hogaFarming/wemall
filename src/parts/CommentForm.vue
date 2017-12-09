<template>
  <div class="comment-form">
    <x-cell bordered>
      <div class="image" style="width: 1.07rem;height: 1.07rem;display: inline-block;
        vertical-align: middle;margin-right: 0.3rem;border: 1px solid #f0f0f0;">
        <img src="/static/img/order.png" alt="order">
      </div>
      <x-praise-input v-model="grade"></x-praise-input>
    </x-cell>
    <x-textarea v-model="content" placeholder="说说宝贝的优点和美中不足的地方吧…"></x-textarea>
    <x-image-upload style="padding: 0.2rem 0.48rem 0.4267rem;"></x-image-upload>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        content: 'asdfasdf',
        grade: 4
      }
    }
  }
</script>
<style>
  .comment-form {

  }
</style>
