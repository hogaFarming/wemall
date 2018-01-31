<template>
  <!--积分兑换列表-->
  <div class="page product-list-page">
    <div v-if="!loading">
      <div v-if="list.length">
        <x-card-list
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="infiniteScrollDisabled"
          infinite-scroll-distance="10">
          <x-card
            v-for="item in list"
            :key="item.id"
            :pic="thumbnail(item.cover, 300)"
            @click.native="toProdDetail(item)"
            pic-height="4.2667rem">
            <span>{{ item.name }}</span>
            <x-money :value="item.sale_price" slot="meta" color="red"></x-money>
          </x-card>
        </x-card-list>
      </div>
      <div v-else style="text-align: center;">
        <p style="padding: 1rem 0 0.4rem"><img src="/static/icon/img_list_empty.png" alt=""></p>
        <p class="black-3">暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { scrollListMixin } from 'core/mixins'

  export default {
    mixins: [scrollListMixin],
    data: function () {
      return {
        loading: true,
        queries: {}
      }
    },
    mounted: function () {
      this.queryList()
    },
    computed: {},
    methods: {
      /**
       * 查询列表
       */
      queryList (nextPage) {
        const options = {
          url: nextPage || '/api/goodses/exchange',
          params: nextPage ? undefined : this.queries
        }
        this.$http.withLoading(options)
          .then(result => {
            this.loading = false
            this.setListData(result.list)
          })
      },
      catSelectChange (cat, val) {
        cat.next_selected = val
      },
      toProdDetail (item) {
        this.$router.push(`/product/${item.id}`)
      }
    }
  }
</script>
<style>

</style>
