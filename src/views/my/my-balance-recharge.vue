<template>
  <div class="page recharge-page">
    <p style="margin-bottom: 0.48rem;">优惠充值：</p>
    <ul class="recharge-cards-list">
      <li class="recharge-cards-item" v-for="item in rechargeCards" :key="item.key">
        <div class="recharge-cards-card" @click="recharge(item.key)">
          <span style="color: #f8be21;font-size: 24px;">{{ item.key / 100 }}</span><span style="color: #f8be21;">元</span>
          <br>
          <span style="color: #c3c3c3;font-size: 12px;">送：{{ item.give }}积分</span>
        </div>
      </li>
      <li class="recharge-cards-item recharge-cards-other" v-if="rechargeCards.length" ref="cardOther">
        <div class="recharge-cards-card" @click="togglePopup">
          其他金额
        </div>
      </li>
    </ul>
    <mt-popup
      v-model="popupVisible"
      class="recharge-popup"
      popup-transition="popup-fade"
      :modal="false"
      :style="{ top: cardOtherBottom + 'px' }">
      <div class="popup-indicator" :style="{ left: indicatorLeft }"></div>
      <div class="recharge-control">
        <input v-model.trim="inputAmount" type="number" class="recharge-input" :placeholder="inputPlaceHolder">
        <div class="recharge-btn" @click="popupRecharge">立即充值</div>
      </div>
      <div style="font-size: 12px;margin-left: 0.5em;margin-top: 0.2rem;">送：{{ scoreOther }}积分</div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        rechargeCards: [],
        rechargeMin: null,
        rechargeMax: null,
        popupVisible: false,
        cardOtherBottom: 0,
        inputAmount: ''
      }
    },
    computed: {
      // cardOtherBottom () {
      //   console.log(this.$refs.cardOther)
      //   return this.$refs.cardOther && this.$refs.cardOther.$el.getBoundingClientRect().bottom
      // }
      scoreOther () {
        if (!this.inputAmount) return 0
        return Math.round(this.inputAmount / 2)
      },
      indicatorLeft () {
        const cardCount = this.rechargeCards.length + 1
        const pos = cardCount % 3
        if (pos === 1) return '12%'
        if (pos === 0) return '85%'
        return '46%'
      },
      inputPlaceHolder () {
        if (!this.rechargeMin) return ''
        return `请输入${this.rechargeMin / 100}-${this.rechargeMax / 100}的整数倍`
      }
    },
    mounted () {
      this.fetchRecharges()
    },
    methods: {
      fetchRecharges () {
        this.$http.withLoading('/api/user/recharges').then(res => {
          this.rechargeCards = res.data.recharge
          this.rechargeMin = res.data.rule.min
          this.rechargeMax = res.data.rule.max
          setTimeout(() => {
            this.cardOtherBottom = this.$refs.cardOther.getBoundingClientRect().bottom
          })
        })
      },
      recharge (amount) {
        this.$messagebox.confirm('确定充值' + (amount / 100) + '元？').then(result => {
          if (result === 'cancel') return

          this.$http.withLoading({
            url: '/api/user/recharges',
            method: 'post',
            data: {
              type: 'wechatpay',
              device: 'wap',
              amount: amount
            }
          }).then(result => {
            if (result) {
              const data = result.data.url
              window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
                appId: data.appId,           // 公众号名称，由商户传入
                timeStamp: data.timeStamp,   // 时间戳，自1970年以来的秒数
                nonceStr: data.nonceStr,     // 随机串
                package: data.package,
                signType: data.signType,     // 微信签名方式：
                paySign: data.paySign        // 微信签名
              }, res => {
                if (res.err_msg === 'get_brand_wcpay_request:ok') {
                  this.$toast('充值成功')
                  this.popupVisible = false
                  // window.location.href = '/order/paystatus?order_id=' + this.orderId + '&status=1'
                } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                  this.$toast('充值取消')
                  // window.location.href = '/order/paystatus?order_id=' + this.orderId + '&status=0'
                } else {
                  this.$toast('充值失败')
                  // window.location.href = '/order/paystatus?order_id=' + this.orderId + '&status=0'
                  // this.modalVisible = true
                }
              })
            }
          })
        })
      },
      togglePopup () {
        this.popupVisible = !this.popupVisible
      },
      popupRecharge () {
        let str = this.inputAmount
        if (!str) return
        let num = +str
        if (isNaN(num)) {
          this.$toast('请输入数字')
        } else if (/\./.test(str)) {
          this.$toast('请输入整数金额')
        } else if (num < this.rechargeMin || num > this.rechargeMax) {
          this.$toast(`充值金额须为${this.rechargeMin / 100}元至${this.rechargeMax / 100}元之间`)
        } else {
          this.recharge(num * 100)
        }
      }
    }
  }
</script>
<style>
  html, body {
    background-color: #fff;
  }
  .page {
    font-size: 14px;
  }
  .recharge-page {
    padding: 0.52rem 0.48rem;
  }
  .recharge-cards-list {

  }
  .recharge-cards-list:after {
    content: '';
    display: table;
    clear: both;
  }
  .recharge-cards-item {
    float: left;
    margin-right: 0.51rem;
    margin-bottom: 0.56rem;
  }
  .recharge-cards-item:nth-child(3n) {
    margin-right: 0;
  }
  .recharge-cards-card {
    border: 1px solid #c3c3c3;
    border-radius: 8px;
    width: 2.67rem;
    height: 1.6rem;
    text-align: center;
    padding-top: 0.2rem;
  }
  .recharge-cards-other .recharge-cards-card {
    color: #f8be21;
    font-size: 16px;
    padding-top: 0.46rem;
  }
  .recharge-popup {
    border: 1px solid #c3c3c3;
    background-color: #f0f1f2;
    width: 9.01rem;
    border-radius: 8px;
    padding: 0.5333rem 0.29rem;
    transform: translate3d(-50%, 10px, 0);
  }
  .popup-indicator {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-width: 10px;
    border-bottom-color: #f0f1f2;
    content: "";
    position: absolute;
    top: -20px;
    right: 50px;
  }
  .recharge-control {
    display: flex;
  }
  .recharge-input {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 0;
    border: 0;
    -webkit-box-flex: 1;
    flex: 1;
    outline: 0;
    font-size: inherit;
    background-color: #fff;
    padding-left: 0.5em;
  }
  .recharge-btn {
    background-color: #FFCD30;
    text-align: center;
    width: 2.67rem;
    line-height: 0.9333rem;
    height: 0.9333rem;
    color: #ffffff;
  }
</style>
