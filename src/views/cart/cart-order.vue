<template>
  <div class="page order-confirm-page">
    <x-cell v-if="address" class="address mgb" icon-right="next_page" @click.native="toggleAddress">
      <x-media-object class="address-location" icon="address" :padding="false" size="27px" push="22px">
        <p class="address-concat">
          <span>{{ address.consignee }}</span>
          <span>{{ address.phone }}</span>
        </p>
        <p>{{ address.text }}</p>
      </x-media-object>
      <div class="address-border"></div>
    </x-cell>
    <x-cell v-else class="mgb bdb" @click.native="toggleAddress" icon="select_ele" icon-right="next_page">
      请填写收货地址
    </x-cell>

    <!--订单商品-->
    <div class="goods-list">
      <x-media-object v-for="item in goodsList" :key="item.id" :pic="item.goods_cover" class="bdb" padding>
        {{ item.goods_title }}
        <span slot="secondary">{{ item.sku_show_name }}</span>
        <x-money slot="bottom-left" color="red" :value="item.sale_price"></x-money>
        <span slot="bottom-right">x{{ item.num }}</span>
      </x-media-object>
    </div>

    <x-field class="mgb" label="买家留言" v-model="note" placeholder="您可以给商家留言"></x-field>

    <!--快递-->
    <x-cell title="运费 (快递)">
      <x-money slot="right" :value="orderData.express_price" size="small" style="font-size: 16px"></x-money>
    </x-cell>

    <!--优惠券-->
    <x-cell class="bdb" title="优惠券" icon-right="next_page" @click.native="showTickets">
      <span v-if="loading"></span>
      <span slot="right" v-else-if="coupon.length">有可用优惠券</span>
      <span slot="right" v-else>无可用优惠券</span>
    </x-cell>

    <!--积分-->
    <x-cell class="mgb">
      <p class="black-3" style="margin-bottom: 5px;">当前积分：{{ capital.integral }}</p>
      <p>可用{{ capital.integral }}积分抵扣
        <x-money :value="capital.integral_price"></x-money>
      </p>
      <div slot="right">
        <mt-switch v-model="useIntegral"></mt-switch>
      </div>
    </x-cell>

    <!--底部按钮-->
    <x-fixed-bottom style="font-size: 14px;">
      <x-cell slot="content">
        共 {{ goodsTotalNum }} 件商品
        <div slot="right">
          实付:
          <x-money :value="orderData.actual_price" color="red"></x-money>
        </div>
      </x-cell>
      <x-button @click.native="submitOrder" type="primary" :disabled="!isFormReady">提交订单</x-button>
    </x-fixed-bottom>

    <mt-popup class="cart-popup" v-model="ticketsVisible" position="bottom">
      <x-cell class="cart-popup-title bdb">
        使用优惠券
        <x-icon type="close" @click.native="ticketsVisible = false" slot="right"></x-icon>
      </x-cell>
      <ticket style="margin: 0.48rem;"></ticket>
      <x-button style="margin-top: 0.8rem;" size="full" @click.native="ticketConfirm" type="primary">确定</x-button>
    </mt-popup>
    <mt-popup class="cart-popup" v-model="prodPopupVisible" position="bottom">
      <x-cell class="cart-popup-title bdb">
        选择生日券生效商品
        <x-icon type="close" @click.native="ticketsVisible = false" slot="right"></x-icon>
      </x-cell>
      <!--<ticket style="margin: 0.48rem;"></ticket>-->
      <x-media-object class="bdb" pic="/static/img/order.png" padding>
        2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
        <span slot="secondary">提亮肌肤50ML</span>
        <x-money :value="588" color="red" slot="bottom-left"></x-money>
      </x-media-object>
      <x-button style="margin-top: 0.8rem;" size="full" @click.native="ticketConfirm" type="primary">确定</x-button>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data: function () {
      let cart = this.$route.query.cart
      if (cart) {
        cart = cart.split(',').map(i => ({cart_id: i}))
      }
      return {
        loading: true,
        query: {
          cart: cart || undefined,
          goods_id: this.$route.query.goods_id || undefined,
          sku_id: this.$route.query.sku_id || undefined,
          num: this.$route.query.num || undefined,
          address_id: this.$route.query.address_id || undefined
        },
        addressList: [],
        coupon: [],
        capital: {},
        goodsList: [],
        goodsTotalNum: 0,
        orderData: {},

        note: '',
        ticketsVisible: false,
        prodPopupVisible: false,
        useIntegral: false
      }
    },
    computed: {
      address () {
        const addr = this.orderData && this.orderData.user_address
        if (addr) {
          const {province, city, district, address} = addr
          const text = [province, city, district, address].filter(i => !!i).join('')
          addr.text = text
        }
        return addr
      },
      isFormReady () {
        if (!this.address) return false
        return true
      }
    },
    mounted () {
      this.pageInit()
    },
    methods: {
      pageInit () {
        this.fetchOrderData().then(() => { this.loading = false })
      },
      fetchAddress () {

      },
      fetchOrderData () {
        const data = this.query
        return this.$http.withLoading({
          url: '/api/order/confirms',
          data: data,
          method: 'post'
        }).then(res => {
          this.addressList = res.data.address
          this.coupon = res.data.coupon
          this.capital = res.data.capital
          this.goodsList = res.data.goods_data.map(goods => {
            let names = []
            if (goods.sku_name_arr) {
              for (let key in goods.sku_name_arr) {
                names.push(goods.sku_name_arr[key])
              }
            }
            return {...goods, sku_show_name: names.join(' ')}
          })
          this.goodsTotalNum = res.data.goods_total_num
          this.orderData = res.data.order_data
        })
      },
      toggleAddress () {

      },
      showTickets () {
        if (!this.coupon.length) return
        this.ticketsVisible = true
      },
      submitOrder () {
        // TODO address_id, coupon_id, coupon_goods_id
        const data = {
          ...this.query,
          address_id: this.address.id,
          desc: this.note || undefined,
          is_invoice: 0 // 写死不开发票
        }
        if (this.useIntegral) {
          data.integral = this.capital.can_use_integral
        }
        this.$http.withLoading({
          url: '/api/orders',
          data: data,
          method: 'post'
        }).then(res => {
          if (res.data.pay_done) {
            // 已付款 到付款状态页
            this.$router.replace({
              path: '/order/paystatus',
              query: { orderid: res.data.order_id }
            })
          } else {
            // 未付款 到收银台
            this.$router.replace({
              path: '/cart/pay',
              query: { orderid: res.data.order_id }
            })
          }
        })
      },
      ticketConfirm () {

      }
    }
  }
</script>
<style>
  .page {
    font-size: 14px;
  }

  .address {
    position: relative;
  }

  .address-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-image: url("/static/icon/ic_mail_mark.png");
    background-repeat: repeat-x;
  }

  .cart-popup {
    width: 100%;
  }

  .cart-popup-title {
    text-align: center;
  }
</style>
