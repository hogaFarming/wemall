<template>
  <div>

    <x-navbar v-model="selectedTab" class="mgb">
      <mt-tab-item v-for="tab in tabs" :key="tab.id" :id="tab.id">{{ tab.label }}</mt-tab-item>
    </x-navbar>
    <div class="mod order">
      <x-cell bordered>
        订单编号：2017 0401 1010 1817 1780
        <span slot="right">{{ 1 | orderStatus }}</span>
      </x-cell>
      <div class="media bdb">
        <div class="media-left">
          <div class="image">
            <img src="/static/img/order.png" alt="img">
          </div>
        </div>
        <div class="media-content">
          <p>2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容</p>
          <p class="black-3">提亮肌肤50ML</p>
          <div class="price">
            <x-money :value="588" size="small"></x-money>
            <span class="count">x1</span>
          </div>
        </div>
      </div>
      <div class="mod_pd bdb order-sum">
        共 1 件商品，合计： <x-money :value="588"></x-money>
      </div>
      <div class="text-right order-btns">
        <x-button @click.native="orderAction" pill inline ghost>删除订单</x-button>
        <x-button @click.native="orderAction" pill inline ghost>查看物流</x-button>
        <x-button @click.native="orderAction" type="primary" pill inline ghost>评价</x-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        selectedTab: '1',
        tabs: [
          { label: '全部', id: '1' },
          { label: '待付款', id: '2' },
          { label: '待发货', id: '3' },
          { label: '待收货', id: '4' },
          { label: '待评价', id: '5' }
        ]
      }
    },
    methods: {
      toggleList: function(key) {
        console.log(key)
      },
      orderAction: function() {
        console.log('orderaction')
      }
    }
  }
</script>
