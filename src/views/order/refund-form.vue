<template>
  <div class="page refund-form-page">
    <template v-if="data">
      <!--<div class="goods-list">-->
        <!--<x-media-object-->
          <!--v-for="goods in data.goods"-->
          <!--:key="goods.goods_id"-->
          <!--class="mgb"-->
          <!--:pic="goods.goods_cover"-->
          <!--padding>-->
          <!--<div>{{ goods.goods_name }}</div>-->
          <!--<span slot="secondary">{{ goods.sku_name.join(' ') }}</span>-->
          <!--<x-money :value="goods.sale_price" size="small" slot="bottom-left"></x-money>-->
        <!--</x-media-object>-->
      <!--</div>-->
      <x-radio-select
        class="mgb"
        title="退款类型"
        :options="refundTypes"
        v-model="refundType">
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
    </template>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        data: null,
        goodsId: +this.$route.query.goodsid,
        refundType: +this.$route.query.type, // 1仅退款 2退货退款
        refundTypes: [
          { label: '我要退款', secondary: '无需退货', value: 1 },
          { label: '我要退货', value: 2 }
        ],
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
    mounted () {
      this.fetchRefundData()
    },
    methods: {
      fetchRefundData () {
        this.$http.withLoading(`/api/order/refund/confirms/${this.goodsId}`)
          .then(res => { this.data = res.data })
      },
      submit () {

      }
    }
  }
</script>
