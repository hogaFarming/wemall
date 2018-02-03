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
        v-model="refundType"
        :options="[
          { label: '我要退款', value: 1, secondary: '无需退货' },
          { label: '我要退货', value: 2 }
        ]">
      </x-radio-select>
      <x-radio-select
        class="mgb"
        title="收货状态"
        v-model="hasReceived"
        :options="[
          { label: '未收到货', value: 0 },
          { label: '已收到货', value: 1 }
        ]">
      </x-radio-select>
      <x-select
        class="mgb"
        title="退款原因"
        v-model="refundReason"
        :options="reasonOptions">
      </x-select>
      <x-field class="mgb" label="退款金额" v-model="refundAmount"></x-field>
      <x-field class="mgb" label="退款备注" placeholder="选填" v-model="remark" :attr="{ maxlength: 100 }"></x-field>
      <x-cell>
        <div class="mgb">上传凭证：</div>
        <x-image-upload :limit="3"></x-image-upload>
      </x-cell>
      <x-fixed-bottom>
        <x-button type="primary" @click.native="submit" size="full">提交</x-button>
      </x-fixed-bottom>
    </template>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        pageType: +this.$route.query.type, // 1仅退款 2退货退款
        data: null,
        goodsId: +this.$route.query.goodsid,
        refundType: 1,
        refundReason: 0,
        hasReceived: 0,
        refundAmount: undefined,
        remark: '',
        images: [],
        allReasons: [] // 退款原因，服务端返回
      }
    },
    computed: {
      reasonOptions () {
        const options = []
        const obj = this.allReasons[this.refundType - 1] || {}
        for (let key in obj) {
          options.push({ label: obj[key], value: +key })
        }
        return options
      }
    },
    mounted () {
      this.fetchRefundData()
      this.fetchRefundResons()
    },
    methods: {
      fetchRefundData () {
        this.$http.withLoading(`/api/order/refund/confirms/${this.goodsId}`)
          .then(res => { this.data = res.data })
      },
      fetchRefundResons () {
        this.$http('/api/order/refund/reason').then(res => {
          this.allReasons = res.list
        })
      },
      submit () {
        const msg = this.validateForm()
        if (msg) return this.$toast(msg)

        const data = {
          type: this.refundType,
          order_goods_id: this.goodsId,
          reason_id: this.refundReason,
          is_receiving: this.hasReceived,
          desc: this.remark || undefined
        }
        // 退款金额
        if (this.refundType === 2 || this.hasReceived) {
          data.required_amount = this.data.refund_amount
        } else if (this.refundAmount) {
          data.required_amount = this.refundAmount * 100
        }
        // TODO 上传图片

        this.$messagebox.confirm('确认提交申请吗？').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: '/api/order/refunds',
            data: data,
            method: 'post'
          }).then(res => {
            this.$toast('提交成功')
            // FIXME why location
            // location.href = '/refund/' + this.goodsId
            this.$router.replace('/refund/' + this.goodsId)
          })
        })
      },
      validateForm () {
        if (!this.refundReason) return '退款原因不能为空'
        if (this.refundType === 1 && !this.hasReceived && this.pageType === 2 && !this.refundAmount) {
          return '请输入退款金额'
        }
        return ''
      }
    }
  }
</script>
