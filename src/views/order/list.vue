<template>
  <div class="page page-order-list">
    <x-navbar v-model="orderStatus" class="mgb">
      <mt-tab-item v-for="tab in tabs" :key="tab.id" :id="tab.id">{{ tab.label }}</mt-tab-item>
    </x-navbar>
    <div
      v-if="list.length"
      class="order-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="infiniteScrollDisabled"
      infinite-scroll-distance="10">
      <div class="mod order mgb" v-for="item in list">
        <x-cell @click.native="gotoDetail(item)" bordered>
          订单编号：{{ item.order_sn }}
          <span slot="right" class="primary">{{ item.status | orderStatus }}</span>
        </x-cell>
        <x-media-object
          class="bdb"
          v-for="goods in item.goods"
          :key="goods.id"
          :pic="goods.goods_cover"
          padding>
          {{ goods.goods_name }}
          <div slot="secondary">{{ goods | goodsSkuName }}</div>
          <x-money :value="goods.sale_price" slot="bottom-left"></x-money>
          <span slot="bottom-right">x{{ goods.num }}</span>
        </x-media-object>
        <div class="mod_pd bdb order-sum">
          共 {{ item.total_num }} 件商品，合计： <x-money :value="item.total_price"></x-money>
        </div>
        <div class="text-right order-btns" v-if="item.status !== 1">
          <x-button v-if="item.status === 3 ||item.status === 5 || item.status === 7" @click.native="deleteOrder(item)" pill inline ghost>删除订单</x-button>
          <x-button v-if="item.status === 0" @click.native="cancelOrder(item)" pill inline ghost>取消订单</x-button>
          <x-button v-if="item.status === 2" @click.native="confirmOrder(item)" pill inline ghost>确认收货</x-button>
          <x-button v-if="item.status === 3 && item.comment_status === 0" @click.native="gotoComment(item)" pill inline ghost>评价订单</x-button>
          <x-button v-if="item.status === 2 || item.status === 3" @click.native="gotoDelivery(item)" pill inline ghost>查看物流</x-button>
          <x-button v-if="item.status === 0" @click.native="gotoPay(item)" type="primary" pill inline ghost>去付款</x-button>
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
      return {
        orderStatus: -1,
        nextPage: '',
        queries: {},
        total: 0,
        list: [],
        tabs: [
          { label: '全部', id: -1 },
          { label: '待付款', id: 0 },
          { label: '待发货', id: 1 },
          { label: '待收货', id: 2 },
          { label: '待评价', id: 3 }
        ]
      }
    },
    watch: {
      orderStatus (val, oldVal) {
        this.queryList()
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
        const status = this.orderStatus
        const options = nextPage || {
          url: '/api/orders',
          params: {
            status: status === -1 ? undefined : status,
            comment_status: status === 3 ? 0 : undefined
          }
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
      toggleList (key) {
        console.log(key)
      },
      gotoDetail (item) {
        this.$router.push(`/order/${item.id}`)
      },
      deleteOrder (item) {
        this.$messagebox.confirm('确认删除？').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: `/api/orders/${item.id}`,
            method: 'delete'
          }).then(res => {
            this.$toast('删除成功')
            this.list = this.list.filter(i => i !== item)
          })
        })
      },
      gotoPay (item) {
        this.$router.push({ path: '/order/pay', query: { orderid: item.id } })
      },
      cancelOrder (item) {
        this.$messagebox.confirm('确认取消？').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: `/api/order/cancel/${item.id}`,
            method: 'put'
          }).then(res => {
            this.$toast('取消成功')
            item.status = 7
            // this.list = this.list.filter(i => i !== item)
          })
        })
      },
      confirmOrder (item) {
        this.$messagebox.confirm('确认收货？').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: `/api/order/receipts`,
            data: { order_id: item.id },
            method: 'post'
          }).then(res => {
            this.$toast('收货成功')
            this.list = this.list.filter(i => i !== item)
          })
        })
      },
      gotoComment (item) {
        this.$router.push(`/order/${item.id}/comment`)
      },
      gotoDelivery (item) {
        this.$router.push(`/order/${item.id}/delivery`)
      }
    }
  }
</script>
