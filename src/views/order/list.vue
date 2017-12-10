<template>
  <div class="page page-order-list">
    <x-navbar v-model="currentTab" class="mgb">
      <mt-tab-item v-for="tab in tabs" :key="tab.id" :id="tab.id">{{ tab.label }}</mt-tab-item>
    </x-navbar>
    <div class="order-list">
      <div class="mod order mgb" v-for="item in list">
        <x-cell bordered>
          订单编号：{{ item.order_sn }}
          <span slot="right" class="primary">{{ item.status | orderStatus }}</span>
        </x-cell>
        <x-media-object
          v-for="goods in item.goods"
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
        <div class="text-right order-btns">
          <x-button @click.native="orderAction" pill inline ghost>删除订单</x-button>
          <x-button @click.native="orderAction" pill inline ghost>查看物流</x-button>
          <x-button @click.native="orderAction" type="primary" pill inline ghost>评价</x-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        nextPage: '',
        currentTab: '1',
        queries: {},
        total: 0,
        list: [],

        tabs: [
          { label: '全部', id: '1' },
          { label: '待付款', id: '2' },
          { label: '待发货', id: '3' },
          { label: '待收货', id: '4' },
          { label: '待评价', id: '5' }
        ]
      }
    },
    mounted () {
      this.queryList()
    },
    methods: {
      queryList () {
        const params = {}
        this.$http.withLoading('/api/orders', { params }).then(res => {
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
      orderAction () {
        console.log('orderaction')
      }
    },
    filters: {
      goodsSkuName (goods) {
        let names = []
        for (let k in goods.sku_name_arr) {
          names.push(goods.sku_name_arr[k])
        }
        return names.join(' ')
      }
    }
  }
</script>
