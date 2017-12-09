<template>
  <div>

    <x-cell class="order-detail-banner">
      交易关闭
      <div slot="right" class="image" style="width: 1.07rem;height: 1.07rem;font-size: 14px;">
        <img src="/static/icon/ic_change_hands_goods.png" alt="">
      </div>
    </x-cell>
    <x-media-object icon="address" size="27px" style="font-size: 14px;" padding>
      <div class="success">江西信丰县工业园公司 已签收 签收人：本人签收</div>
      <div class="success">2017-05-24 20:34:3</div>
    </x-media-object>
    <address-item class="mgb"></address-item>
    <div class="order-item mgb">
      <x-media-object pic="/static/img/order.png" padding bordered>
        2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
        <span slot="secondary">提亮肌肤50ML</span>
        <x-money :value="588" slot="bottom-left"></x-money>
        <span slot="bottom-right">x1</span>
      </x-media-object>
      <x-media-object pic="/static/img/order.png" padding bordered>
        2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
        <span slot="secondary">提亮肌肤50ML</span>
        <x-money :value="588" slot="bottom-left"></x-money>
        <span slot="bottom-right">x1</span>
      </x-media-object>
      <x-cell>
        <div slot="right">
          <x-button pill ghost inline>申请售后</x-button>
        </div>
      </x-cell>
    </div>
    <div class="order-price mgb">
      <x-cell>商品总价<x-money :value="1764" slot="right" size="small"></x-money></x-cell>
      <x-cell>运费（快递）<x-money :value="1764" slot="right" size="small"></x-money></x-cell>
      <x-cell>优惠券<x-money :value="1764" slot="right" size="small"></x-money></x-cell>
      <x-cell>积分<x-money :value="1764" slot="right" size="small"></x-money></x-cell>
      <x-cell>实付款（含运费）<x-money :value="1764" slot="right" color="red"></x-money></x-cell>
    </div>
    <x-field-set class="mgb">
      <x-field-item label="订单编号">2017 0401 1010 1234 1015</x-field-item>
      <x-field-item label="微信交易流水号">201704012100100102032215306</x-field-item>
      <x-field-item label="创建时间">2017-04-01 06:03:26</x-field-item>
      <x-field-item label="付款时间">2017-04-01 06:03:26</x-field-item>
      <x-field-item label="发货时间">2017-04-01 06:03:26</x-field-item>
      <x-field-item label="成交时间">2017-04-01 06:03:26</x-field-item>
    </x-field-set>
    <x-cell>
      <div slot="right">
        <x-button pill inline ghost>查看物流</x-button>
        <x-button type="primary" pill inline ghost>评价</x-button>
      </div>
    </x-cell>
  </div>
</template>
<style>
  .order-detail-banner {
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
