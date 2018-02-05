<template>
  <div class="page page-refund-list">
    <div
      v-if="list.length"
      class="refund-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="infiniteScrollDisabled"
      infinite-scroll-distance="10">
      <div class="mod order mgb" v-for="item in list">
        <x-cell @click.native="gotoDetail(item)" bordered>
          <x-icon type="refund"></x-icon>
          <span>{{ item.type | refundType }}</span>
          <span slot="right" class="primary">{{ item.status | refundStatus }}</span>
        </x-cell>
        <x-media-object
          class="bdb"
          v-for="goods in item.goods"
          :key="goods.id"
          :pic="goods.goods_cover"
          padding>
          {{ goods.goods_name }}
          <div slot="secondary">{{ goods | goodsSkuName }}</div>
          <!--<x-money :value="goods.sale_price" slot="bottom-left"></x-money>-->
          <x-money :value="goods.sale_price" slot="bottom-left"></x-money>
          <div slot="bottom-right">
            <span>退款金额: </span>
            <x-money :value="item.required_amount" slot="bottom-left" color="red" size="small"></x-money>
          </div>
        </x-media-object>
        <!--<div class="mod_pd bdb order-sum">-->
          <!--共 {{ item.total_num }} 件商品，合计：-->
          <!--<x-money :value="item.total_price"></x-money>-->
        <!--</div>-->
        <div class="text-right order-btns" v-if="item.status !== 1">
          <x-button @click.native="gotoDetail(item)" pill inline ghost>查看详情</x-button>
        </div>
      </div>
    </div>
    <div class="order-list--empty" v-else>
      <p style="color: #999999;padding-left: 0.48rem;padding-bottom: 0.3rem;">暂无数据</p>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      let orderStatus = this.$route.query.type
      if (orderStatus) orderStatus = +orderStatus
      return {
        orderStatus: orderStatus || -1,
        nextPage: '',
        queries: {},
        total: 0,
        list: []
      }
    },
    computed: {
      infiniteScrollDisabled () {
        return !this.nextPage
      }
    },
    mounted () {
      this.queryList()
    },
    methods: {
      loadMore () {
        this.queryList(this.nextPage)
      },
      queryList (nextPage) {
        const options = nextPage || {
          url: '/api/order/refunds'
        }
        this.$http.withLoading(options).then(res => {
          if (res.list.current_page === 1) {
            this.list = res.list.data
          } else {
            this.list = this.list.concat(res.list.data)
          }
          this.total = res.list.total
          this.nextPage = res.list.next_page_url
        })
      },
      gotoDetail (item) {
        this.$router.push(`/refund/${item.goods[0].id}`)
      }
    }
  }
</script>
