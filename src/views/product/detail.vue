<template>
  <div>

    <div class="bdb">
      <x-slider class="bdb" indicator="number">
        <x-slider-item>
          <img src="/static/img/prod.png" alt="">
        </x-slider-item>
        <x-slider-item>
          <img src="/static/img/prod.png" alt="">
        </x-slider-item>
        <x-slider-item>
          <img src="/static/img/prod.png" alt="">
        </x-slider-item>
      </x-slider>
    </div>
    <div class="mod_pd mgb prod-info">
      <p class="title black-2 fs-lg">2017年新款CHA LING 茶灵春季面膜50ml 提亮肌肤</p>
      <x-money class="price" :value="399" size="large"></x-money>
    </div>
    <x-cell icon-right="more" @click.native="showProdCombo" bordered>
      <span class="black-3" style="margin-right: 1.2em;">促销</span>
      <span class="red">优惠套装</span>
      <span>| 最高省200.00元</span>
    </x-cell>
    <x-cell class="mgb" icon-right="more" @click.native="showSku">
      <span class="black-3">已选规格：</span>
      <span>提亮肌肤15ML</span>
    </x-cell>
    <comment-short-list
      :comments="comments"
      :comments-count="128"
      :comments-good-percent="90"
    ></comment-short-list>
    <prod-recommend></prod-recommend>
    <prod-sku
      :visible="skuVisible"
      @visible-change="skuVisibleChange"
      :value="skuValue"
      @input="skuValueChange"
      :sku-model="skuModel"
      @add-cart="alert('add cart')"
      @buy="alert('buy')">
    </prod-sku>
    <prod-combo
      :visible="comboVisible"
      @visible-change="comboVisible = $event"
      :options="comboOptions"
      :value="selectedCombo"
      @input="selectedCombo = $event">
    </prod-combo>
    <prod-long-pics :items="['/static/img/long.png', '/static/img/long.png']"></prod-long-pics>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        pageReady: false,
        skuVisible: false,
        skuValue: {
          _amount: 1,
          color: 'red',
          size: '35'
        },
        skuModel: {
          img: '/static/img/sku.png',
          price: 588,
          store: 1288,
          prodOptions: [
            {
              title: '颜色分类',
              key: 'color',
              options: [
                { label: '酒红色', id: 'red' },
                { label: '屎黄色', id: 'yellow' },
                { label: '卡其色', id: 'kaqi', disabled: true }
              ]
            },
            {
              title: '尺寸',
              key: 'size',
              options: [
                { label: '35', id: '35' },
                { label: '36', id: '36', disabled: true },
                { label: '37', id: '37' }
              ]
            }
          ]
        },
        comboVisible: false,
        comboOptions: [
          { title: '套餐一',
            id: 'xxx-1',
            total: 899,
            items: [{ img: '/static/img/sku.png' }, { img: '/static/img/sku.png' }] },
          { title: '套餐二',
            id: 'xxx-2',
            total: 899,
            items: [{ img: '/static/img/sku.png' }, { img: '/static/img/sku.png' }] }
        ],
        selectedCombo: 'xxx-1',
        comments: [],
        commentsCount: 10,
        commentsGoodPercent: 100
      }
    },
    mounted: function () {
      this.pageReady = true
    },
    methods: {
      showProdCombo: function () {
        this.comboVisible = true
      },
      showSku: function () {
        this.skuVisible = true
      },
      skuVisibleChange: function (evt) {
        this.skuVisible = evt
      },
      skuValueChange: function (evt) {
        this.skuValue = evt
        console.log(evt)
      }
    }
  }
</script>
