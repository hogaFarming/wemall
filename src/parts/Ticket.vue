<template>
  <div class="ticket">
    <div class="ticket-head">
      <div class="ticket-head-inner">
        <x-money class="ticket-money" :value="money" color="#fff"></x-money>
        <br>
        <span class="ticket-tip">全平台通用</span>
      </div>
    </div>
    <div class="ticket-body">
      <div class="ticket-type">生日券</div>
      <div class="ticket-desc">生日当月可用于全平台订单抵扣。</div>
      <time class="ticket-time">有效期 2017-06-30</time>
      <x-button class="ticket-btn" type="primary" pill inline>点击使用</x-button>
    </div>
    <div class="ticket-label">
      <img src="/static/icon/ic_used.png" alt="已使用">
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        money: 50
      }
    }
  }
</script>
<style>
  .ticket {
    position: relative;
    border: 1px solid #FFC935;
    display: -webkit-box;
    display: flex;
    align-items: stretch;
    height: 2.6666rem;
  }
  .ticket-head {
    width: 3.19rem;
    background-color: #F55B5B;
    color: #ffffff;
    position: relative;
  }
  .ticket-head-inner {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    transform: translateY(-50%);
  }
  .ticket-money {
    font-size: 18px;
  }
  .ticket-money > span {
    font-size: 2em!important;
  }
  .ticket-tip {
    font-size: 12px;
  }
  .ticket-body {
    position: relative;
    width: 5.85rem;
    padding: 0.2133rem 0.27rem;
  }
  .ticket-type {
    color: #F55B5B;
  }
  .ticket-desc {
    font-size: 12px;
    color: #333333;
  }
  .ticket-time {
    position: absolute;
    bottom: 0.2133rem;
    left: 0.27rem;
    font-size: 12px;
    color: #cccccc;
  }
  .ticket-btn {
    position: absolute;
    bottom: 0.2133rem;
    right: 0.27rem;
    font-size: 12px;
  }
  .ticket-label {
    position: absolute;
    left: 0;
    top: 0;
    width: 1.36rem;
    white-space: nowrap;
  }
  .ticket-label img {
    max-width: 100%;
  }
  .ticket-bottom > * {
    vertical-align: bottom;
  }
</style>
