<template>
  <div class="page likes-product-page">
    <div
      class="like-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="infiniteScrollDisabled"
      infinite-scroll-distance="10">
      <x-card
        v-for="item in list"
        :key="item.id"
        class="like-item"
        :pic="item.cover"
        pic-width="4.53rem"
        pic-height="4.2667rem">
        <span @click="gotoDetail(item)">{{ item.name }}</span>
        <x-money :value="item.market_price" slot="meta"></x-money>
        <div slot="extra">
          <x-icon type="delete_goods" @click.native="remove(item)" style="width: 25px;height: 25px;"></x-icon>
        </div>
      </x-card>
    </div>
  </div>
</template>
<script>
  import { scrollListMixin } from 'core/mixins'
  export default {
    mixins: [scrollListMixin],
    data: function () {
      return {
      }
    },
    mounted () {
      this.queryList()
    },
    methods: {
      queryList () {
        this.$http.withLoading('/api/goods/collects').then(res => {
          this.setListData(res.list)
        })
      },
      remove (item) {
        this.$messagebox.confirm('确认取消收藏?').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: `/api/goods/collects/${item.goods_id}`,
            method: 'delete'
          }).then(res => {
            this.$toast('取消收藏成功')
            this.list = this.list.filter(i => i !== item)
          })
        })
      },
      gotoDetail (item) {
        this.$router.push(`/product/${item.goods_id}`)
      }
    }
  }
</script>
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
