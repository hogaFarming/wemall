<template>
  <div>
    <x-cell v-if="address" class="address mgb" icon-right="next_page" @click.native="toggleAddress">
      <x-media-object class="address-location" icon="address" :padding="false" size="27px" push="22px">
        <p class="address-concat">
          <span>{{ address.username }}</span>
          <span>{{ address.phone }}</span>
        </p>
        <p>{{ address.text }}</p>
      </x-media-object>
      <div class="address-border"></div>
    </x-cell>
    <x-cell v-else class="mgb bdb" @click.native="toggleAddress" icon="select_ele" icon-right="next_page">
      请填写收货地址
    </x-cell>
    <x-media-object pic="/static/img/order.png" class="bdb" padding>
      2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
      <span slot="secondary">提亮肌肤50ML</span>
      <x-money slot="bottom-left" color="red" :value="588"></x-money>
    </x-media-object>
    <x-media-object pic="/static/img/order.png" class="mgb" padding>
      2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
      <span slot="secondary">提亮肌肤50ML</span>
      <x-money slot="bottom-left" color="red" :value="588"></x-money>
    </x-media-object>
    <x-field class="mgb" label="买家留言" v-model="orderNote" placeholder="您可以给商家留言"></x-field>
    <x-cell>运费 (快递) <x-money slot="right" :value="12" size="small" style="font-size: 16px"></x-money></x-cell>
    <x-cell class="bdb" icon-right="next_page" @click.native="showTickets">
      优惠券
      <span slot="right">有可用优惠券</span>
    </x-cell>
    <x-cell class="mgb">
      <p class="black-3" style="margin-bottom: 5px;">当前积分：888000</p>
      <p>可用88000积分抵扣 <x-money :value="160"></x-money></p>
      <div slot="right"><mt-switch v-model="isUseScore"></mt-switch></div>
    </x-cell>
    <x-fixed-bottom style="font-size: 14px;">
      <x-cell slot="content">
        共2件商品
        <div slot="right">
          实付: <x-money :value="1176" color="red"></x-money>
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
<script>
  export default {
    data: function () {
      return {
        ticketsVisible: false,
        prodPopupVisible: true,
        address: {
          username: '内门摩尔',
          phone: '13800000000',
          text: '广东省广州市天河区 长兴智汇商务中心D座长福路207号 D4A03'
        },
        orderNote: '',
        isUseScore: true,
        isFormReady: false
      }
    },
    methods: {
      toggleAddress: function () {

      },
      showTickets: function () {
        this.ticketsVisible = true
      },
      submitOrder: function () {

      },
      ticketConfirm: function () {

      }
    }
  }
</script>
