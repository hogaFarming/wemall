<template>
  <div class="page recharge-page">
    <p style="margin-bottom: 0.48rem;">优惠充值：</p>
    <ul class="recharge-cards-list">
      <li class="recharge-cards-item" v-for="item in rechargeCards">
        <div class="recharge-cards-card" @click="recharge(item)">
          <span style="color: #f8be21;font-size: 24px;">{{ item.amount / 100 }}</span><span style="color: #f8be21;">元</span>
          <br>
          <span style="color: #c3c3c3;font-size: 12px;">送：{{ item.score }}积分</span>
        </div>
      </li>
      <li class="recharge-cards-item recharge-cards-other" ref="cardOther">
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
        <input v-model="inputAmount" type="number" class="recharge-input" placeholder="请输入10-1000的整数倍">
        <div class="recharge-btn">立即充值</div>
      </div>
      <div style="font-size: 12px;margin-left: 0.5em;margin-top: 0.2rem;">送：{{ scoreOther }}积分</div>
    </mt-popup>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        rechargeCards: [
          { amount: 1000, score: 100 },
          { amount: 1000, score: 100 },
          { amount: 1000, score: 100 },
          { amount: 1000, score: 100 },
          { amount: 1000, score: 100 }
        ],
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
      }
    },
    mounted () {
      this.cardOtherBottom = this.$refs.cardOther.getBoundingClientRect().bottom;
    },
    methods: {
      recharge (item) {

      },
      togglePopup () {
        this.popupVisible = !this.popupVisible
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
