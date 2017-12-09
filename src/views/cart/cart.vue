<template>
  <x-page :error="error">
    <x-cell class="fs-me" bordered>
      <span class="black-3">全部商品</span>
      <span @click="toggleEdit" slot="right">{{ isEdit ? '完成' : '编辑' }}</span>
    </x-cell>
    <x-media-object pic="/static/img/order.png" class="mgb" padding>
      2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
      <span slot="secondary">提亮肌肤50ML</span>
      <x-money slot="bottom-left" color="red" :value="588"></x-money>
      <x-number-input slot="bottom-right" v-if="isEdit" theme="light"></x-number-input>
      <span slot="bottom-right" v-else>x1</span>
    </x-media-object>
    <x-cell bordered>
      <x-checkbox :checked="true" @change="togglePick('id')"></x-checkbox>
      <span style="margin-left: 5px;">组合套装</span>
    </x-cell>
    <x-media-object pic="/static/img/order.png" bordered padding>
      2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
      <span slot="secondary">提亮肌肤50ML</span>
      <x-money slot="bottom-left" color="red" :value="588"></x-money>
      <x-number-input slot="bottom-right" v-if="isEdit" theme="light"></x-number-input>
      <span slot="bottom-right" v-else>x1</span>
    </x-media-object>
    <x-cell>
      <span>套装价格: &nbsp;<x-money :value="688"></x-money></span>
      <x-number-input slot="bottom-right" v-if="isEdit" theme="light"></x-number-input>
    </x-cell>
    <x-fixed-bottom bordered>
      <x-cell slot="content" class="fs-me">
        <x-checkbox :checked="true" @change="togglePickAll"></x-checkbox>
        <span>全选</span>
        <div slot="right">合计：<x-money :value="1176" color="red"></x-money></div>
      </x-cell>
      <x-button type="primary" @click.native="gotoPay" style="font-size: 16px;">去结账</x-button>
    </x-fixed-bottom>
  </x-page>
</template>
<script>
  export default {
    data () {
      return {
        error: '',
        list: [],
        isEdit: false
      }
    },
    mounted () {
      this.fetchList()
    },
    methods: {
      fetchList () {
        this.$http.withLoading('/api/goods/carts').then(result => {
          const r = result
        }, err => {
          this.error = err.message
        })
      },
      toggleEdit: function () {
        this.isEdit = !this.isEdit
      },
      togglePick: function () {

      },
      togglePickAll: function () {

      },
      gotoPay: function () {

      }
    }
  }
</script>
