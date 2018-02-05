<template>
  <div class="page order-detail-page">
    <template v-if="order">
      <x-cell class="order-detail-banner">
        {{ order.status | orderStatus }}
        <div slot="right" class="image" style="width: 1.07rem;height: 1.07rem;background-color:transparent;">
          <img src="/static/icon/ic_change_hands_goods.png" alt="">
        </div>
      </x-cell>

      <!--物流信息-->
      <x-media-object v-if="order.express" icon="address" size="27px" padding>
        <div class="success">江西信丰县工业园公司 已签收 签收人：本人签收</div>
        <div class="success">2017-05-24 20:34:3</div>
      </x-media-object>

      <!--地址-->
      <x-media-object v-if="order.address" class="mgb" icon="address" size="27px" padding>
        <x-cell :padding="false" style="margin-bottom: 5px;">
          <p>收货人：{{ order.address.consignee }}</p>
          <span slot="right">{{ order.address.phone }}</span>
        </x-cell>
        <p>收货地址：{{ order.address | address }}</p>
      </x-media-object>

      <!--商品列表-->
      <div class="goods-list mgb">
        <div class="goods-list-item" v-for="goods in order.goods" :key="goods.id">
          <x-media-object :pic="goods.goods_cover" padding bordered>
            <div @click="gotoGoodsDetail(goods)">{{ goods.goods_name }}</div>
            <span slot="secondary">{{ goods | goodsSkuName }}</span>
            <x-money v-if="order.type == 0 || order.type == 2" :value="goods.sale_price" slot="bottom-left"></x-money>
            <span v-if="order.type == 1" slot="bottom-left">{{ order.paid_fufen }}积分</span>
            <span slot="bottom-right">x{{ goods.num }}</span>
          </x-media-object>
          <x-cell v-if="order.status > 0 && order.type == 0">
            <div slot="right">
              <x-button @click.native="applyRefund(goods, 1)" v-if="order.status === 1 && goods.status === 1" pill ghost inline>申请退款</x-button>
              <x-button @click.native="applyRefund(goods, 2)" v-if="order.status > 1 && order.status < 5 && goods.status === 1" pill ghost inline>申请售后</x-button>
              <x-button @click.native="viewRefund(goods)" v-if="goods.status > 1" pill ghost inline>售后中</x-button>
            </div>
          </x-cell>
        </div>
      </div>

      <!--订单价格-->
      <div class="order-price mgb">
        <template v-if="order.type == 0 || order.type == 2">
          <x-cell>商品总价<x-money :value="order.goods_price" slot="right" size="small"></x-money></x-cell>
          <x-cell>运费（快递）<x-money :value="order.express_price" slot="right" size="small"></x-money></x-cell>
          <!--<x-cell>优惠券<x-money :value="order.coupon_price" slot="right" size="small"></x-money></x-cell>-->
          <!--TODO <x-cell>积分<x-money :value="1764" slot="right" size="small"></x-money></x-cell>-->
          <x-cell>实付款（含运费）<x-money :value="order.actual_price" slot="right" color="red"></x-money></x-cell>
        </template>
        <template v-if="order.type == 1">
          <x-cell>实付<span slot="right" style="color: red;">{{ order.paid_fufen }}积分</span></x-cell>
        </template>
      </div>
      <x-field-set class="mgb">
        <x-field-item label="订单编号">{{ order.order_sn }}</x-field-item>
        <x-field-item label="微信交易流水号" v-if="order.pay_method >= 1">{{ order.trade_no }}</x-field-item>
        <x-field-item label="创建时间">{{ order.created_at * 1000 | fullTime }}</x-field-item>
        <x-field-item label="付款时间" v-if="order.status >= 1">{{ order.pay_time * 1000 | fullTime }}</x-field-item>
        <x-field-item label="发货时间" v-if="order.status >= 2">{{ order.deliver_time * 1000 | fullTime }}</x-field-item>
        <x-field-item label="成交时间" v-if="order.status >= 3">{{ order.confirm_time * 1000 | fullTime }}</x-field-item>
      </x-field-set>
      <x-cell>
        <div slot="right">
          <x-button @click.native="deleteOrder" v-if="order.status === 3 || order.status >= 5" pill ghost inline>删除订单</x-button>
          <x-button @click.native="cancelOrder" v-if="order.status === 0" pill ghost inline>取消订单</x-button>
          <x-button @click.native="gotoPay" v-if="order.status === 0" class="primary" pill ghost inline>付款</x-button>
          <x-button @click.native="remindDelivery" v-if="order.status === 1" class="primary" pill ghost inline>提醒发货</x-button>
          <x-button @click.native="gotoDelivery" v-if="order.status === 2 || order.status === 4" pill ghost inline>查看物流</x-button>
          <x-button @click.native="confirmOrder" v-if="order.status === 2 || order.status === 4" class="primary" pill ghost inline>确认收货</x-button>
          <x-button @click.native="gotoComment" v-if="order.status === 3 && !order.comment_status" class="primary" pill ghost inline>评价</x-button>
        </div>
      </x-cell>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        id: this.$route.params.id,
        order: null
      }
    },
    mounted () {
      this.fetchOrderDetail()
    },
    methods: {
      fetchOrderDetail () {
        this.$http.withLoading(`/api/orders/${this.id}`).then(res => {
          this.order = res.data
        })
      },
      gotoGoodsDetail (goods) {
        this.$router.push(`/product/${goods.goods_id}`)
      },
      // type: 0 退款 1 售后
      applyRefund (goods, type) {
        this.$router.push({
          path: '/refund/apply',
          query: { goodsid: goods.id, type }
        })
      },
      viewRefund (goods) {
        this.$router.push(`/refund/${goods.id}`)
      },
      deleteOrder () {
        this.$messagebox.confirm('确认删除？').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: `/api/orders/${this.id}`,
            method: 'delete'
          }).then(res => {
            this.$toast('删除成功')
            this.$router.go(-1)
          })
        })
      },
      cancelOrder (goods) {
        this.$messagebox.confirm('确认取消？').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: `/api/order/cancel/${this.id}`,
            method: 'put'
          }).then(res => {
            this.$toast('取消成功')
            this.$router.go(-1)
          })
        })
      },
      gotoPay () {
        this.$router.push({ path: '/order/pay/pay', query: { order_id: this.id } })
      },
      // TODO 提醒发货
      remindDelivery () {

      },
      gotoDelivery () {
        this.$router.push(`/order/${this.id}/delivery`)
      },
      confirmOrder () {
        this.$messagebox.confirm('确认收货？').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: `/api/order/receipts`,
            data: { order_id: this.id },
            method: 'post'
          }).then(res => {
            this.$toast('收货成功')
            this.fetchOrderDetail()
          })
        })
      },
      gotoComment () {
        this.$router.push(`/order/${this.id}/comment`)
      }
    }
  }
</script>
<style>
  .order-detail-banner.order-detail-banner {
    padding-top: 0.7467rem;
    padding-bottom: 0.7467rem;
    background-image: linear-gradient(-90deg, rgb(255, 230, 101) 0%, rgb(255, 188, 53) 100%);
    color: #fff;
    font-size: 14px;
  }
  .order-price {
    padding-top: 0.12rem;
    font-size: 14px;
    background-color: #fff;
  }
  .order-price .x-cell {
    padding-top: 0.2133rem;
    padding-bottom: 0.2133rem;
  }
  .order-price .x-cell:last-child {
    padding-top: 0.3467rem;
    padding-bottom: 0.3467rem;
    border-top: 1px solid #f0f0f0;
    margin-top: 0.12rem;
  }
</style>
