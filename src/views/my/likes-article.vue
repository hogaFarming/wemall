<template>
  <div>

    <div class="like-list">
      <x-card class="like-item" pic="/static/img/order.png" pic-width="4.53rem" pic-height="4.2667rem">
        <p class="black-3 mgb">原来你们家的鞋子可以跑跑跳跳的，太好了。我会召集我的小伙伴们的...</p>
        <div>
          <x-icon type="praise"></x-icon>
          <span style="vertical-align: middle">588</span>
        </div>
        <div slot="extra">
          <x-icon type="delete_goods" @click.native="deleteLike(0)" style="width: 25px;height: 25px;"></x-icon>
        </div>
      </x-card>
      <x-card class="like-item" pic="/static/img/order.png" pic-width="4.53rem" pic-height="4.2667rem">
        <p class="black-3 mgb">原来你们家的鞋子可以跑跑跳跳的，太好了。我会召集我的小伙伴们的...</p>
        <div>
          <x-icon type="praise"></x-icon>
          <span style="vertical-align: middle">588</span>
        </div>
        <div slot="extra">
          <x-icon type="delete_goods" @click.native="deleteLike(0)" style="width: 25px;height: 25px;"></x-icon>
        </div>
      </x-card>
    </div>
  </div>
</template>
<style>
  .page {
    font-size: 14px;
    padding-top: 0.38rem;
  }
  .like-list {
    overflow: hidden;
    padding: 0 0.27rem;
    /*margin-bottom: -0.25rem;*/
  }
  .like-item {
    float: left;
    margin-right: 0.4rem;
    margin-bottom: 0.25rem;
  }
  .like-item:nth-child(2n) {
    margin-right: 0;
  }
</style>
<script>
  export default {
    el: '#root',
    data: function () {
      return {
      }
    },
    methods: {
      deleteLike: function (id) {
        this.$messagebox.confirm('确认取消收藏?')
          .then(function (action) {
            console.log(action)
          })
      }
    }
  }
</script>
