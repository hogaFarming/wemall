<template>
  <div>

    <div class="like-list">
      <x-card class="like-item" pic="/static/img/order.png" pic-width="4.53rem" pic-height="4.2667rem">
        <span>2017年新款茶灵春季茶灵茶灵面膜50ml 提...</span>
        <x-money :value="158" slot="meta"></x-money>
        <div slot="extra">
          <x-icon type="delete_goods" @click.native="deleteGoods(0)" style="width: 25px;height: 25px;"></x-icon>
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
    data: function () {
      return {
      }
    },
    methods: {
      deleteGoods: function (id) {
        this.$messagebox.confirm('确认取消收藏?')
          .then(function (action) {
            console.log(action)
          })
      }
    }
  }
</script>
