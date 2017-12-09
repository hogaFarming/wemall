<template>
  <div>

    <x-media-object class="mgb" pic="/static/img/order.png" padding>
      2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容
      <span slot="secondary">提亮肌肤50ML</span>
      <x-money :value="588" size="small" slot="bottom-left"></x-money>
    </x-media-object>
    <x-radio-select
      class="mgb"
      title="退款类型"
      :options="refundTypes"
      v-model="selectedRefundType">
    </x-radio-select>
    <x-radio-select
      class="mgb"
      title="收货状态"
      :options="goodsStatus"
      v-model="selectedGoodsStatus">
    </x-radio-select>
    <x-select
      class="mgb"
      title="退款原因"
      :options="refundReason"
      v-model="selectedRefundReason">
    </x-select>
    <x-field class="mgb" label="退款金额" :value="money" readonly></x-field>
    <x-field class="mgb" label="退款备注" placeholder="选填" v-model="remark" :attr="{ maxlength: 100 }"></x-field>
    <x-cell>
      <div class="mgb">上传凭证：</div>
      <x-image-upload :limit="3"></x-image-upload>
    </x-cell>
    <x-fixed-bottom>
      <x-button type="primary" @click.native="submit">提交</x-button>
    </x-fixed-bottom>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        refundTypes: [
          { label: '我要退款', secondary: '无需退货', value: 1 },
          { label: '我要退货', value: 2 }
        ],
        selectedRefundType: 1,
        goodsStatus: [
          { label: '未收到货', value: 0 },
          { label: '已收到货', value: 1 }
        ],
        selectedGoodsStatus: 0,
        refundReason: [
          { label: '商品质量问题', value: 0 },
          { label: '拍多了/我不想买了', value: 1 },
          { label: '信息有误，重新拍', value: 2 },
          { label: '商品质量问题', value: 3 }
        ],
        selectedRefundReason: 0,
        money: 0,
        remark: ''
      }
    },
    methods: {
      submit: function () {

      }
    }
  }
</script>
