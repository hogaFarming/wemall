<template>
  <div>
    <x-cell class="mgb">订单总价 <x-money :value="1124" color="red" slot="right"></x-money></x-cell>
    <x-cell>还需要支付 <x-money :value="289" size="small"></x-money></x-cell>
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
      return {
        payWays: [{ label: '微信支付', value: 1 }],
        selectedPayWay: 1,
        modalVisible: false
      }
    },
    methods: {
      confirmPay: function () {
        this.modalVisible = true
      },
      onModalConfirm: function () {
        this.modalVisible = false
      },
      onModalCancel: function () {
        this.modalVisible = false
      }
    }
  }
</script>
