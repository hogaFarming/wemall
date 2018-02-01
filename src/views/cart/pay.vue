<template>
  <div>
    <x-cell class="mgb">订单总价
      <x-money :value="orderData.actual_price" color="red" slot="right"></x-money>
    </x-cell>
    <x-cell>还需要支付
      <x-money :value="orderData.pay_amount" size="small"></x-money>
    </x-cell>
    <x-radio-select v-model="selectedPayWay" :options="payWays"></x-radio-select>
    <div style="margin: 1.0667rem 0.75rem;">
      <x-button size="full" type="primary" pill @click.native="confirmPay">确认支付</x-button>
    </div>
    <x-modal
      class="pay-result-modal"
      :value="modalVisible"
      confirm-text="继续支付"
      @confirm="onModalConfirm"
      @cancel="onModalCancel">
      <div style="text-align: center;">
        <img src="/static/icon/pay_failure.png" alt="图片">
        <br>
        <span>支付失败！</span>
      </div>
      <br>
      <p>
        可能由以下原因造成： <br>
        1、网络信号差或请求超时； <br>
        2、意外关闭支付页面； <br>
        3、其他原因 <br><br>
        建议您换个网络环境尝试重新支付，如果还是失败可咨询客服。<br><br>
        订单号：2017 0401 1010 1612 1270
      </p>
    </x-modal>
  </div>
</template>
<style>
  .page {
    font-size: 14px;
  }
</style>
<script>
  export default {
    data: function () {
      const goodsType = +(this.$route.query.goods_type || 0)
      const payWays = goodsType === 0 ? [{label: '微信支付', value: 'wechatpay'}] : [{label: '余额支付', value: 'balance'}]
      return {
        goodsType: goodsType,
        orderId: this.$route.query.order_id,
        orderData: {},
        payWays: payWays,
        selectedPayWay: '',
        isWeChat: this.$utils.isWeChat(),
        modalVisible: false
      }
    },
    mounted () {
      this.fetchOrderData()
    },
    methods: {
      fetchOrderData () {
        this.$http.withLoading(`/api/orders/${this.orderId}`).then(res => {
          this.orderData = res.data
          // TODO 哪个金额
          this.orderData.pay_amount = res.data.actual_price - res.data.paid_price
        })
      },
      confirmPay () {
        if (this.selectedPayWay === 'wechatpay') {
          this.wechatpay()
        }
      },
      wechatpay () {
        this.$http.withLoading({
          url: '/api/order/pays',
          method: 'post',
          data: {
            type: 'wechatpay',
            device: 'wap',
            order_id: this.orderId
          }
        }).then(res => {
          if (res) {
            const data = res.data
            window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
              appId: data.appId,           // 公众号名称，由商户传入
              timeStamp: data.timeStamp,   // 时间戳，自1970年以来的秒数
              nonceStr: data.nonceStr,     // 随机串
              package: data.package,
              signType: data.signType,     // 微信签名方式：
              paySign: data.paySign        // 微信签名
            }, res => {
              // alert(JSON.stringify(res))
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                window.location.href = '/order/paystatus?order_id=' + this.orderId + '&status=1'
              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                // window.location.href = '/order/paystatus?order_id=' + this.orderId + '&status=0'
              } else {
                // window.location.href = '/order/paystatus?order_id=' + this.orderId + '&status=0'
                this.modalVisible = true
              }
            })
          }
        })
      },
      balancepay () {

      },
      onModalConfirm () {
        this.modalVisible = false
      },
      onModalCancel () {
        this.modalVisible = false
      }
    }
  }
</script>
