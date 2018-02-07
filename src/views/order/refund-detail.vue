<template>
  <div class="page refund-detail-page">
    <template v-if="data">
      <x-media-object class="mgb" style="margin-top: 0.12rem;" :icon="showData.icon" size="0.69rem" pull="0.12rem" padding>
        <div>{{ showData.status }}</div>
        <div slot="secondary" class="fs-sm">{{ showData.status }}</div>
        <div slot="secondary" class="fs-sm">{{ showData.desc }}</div>
      </x-media-object>
      <div class="mgb">
        <x-field-set class="bdb">
          <x-field-item label="售后类型">{{ data.type | refundType }}</x-field-item>
          <x-field-item label="退款金额"><x-money :value="data.required_amount" size="small"></x-money></x-field-item>
          <x-field-item label="退款原因">{{ data.reason }}</x-field-item>
          <x-field-item label="备注原因">{{ data.desc }}</x-field-item>
          <x-field-item label="售后编号">{{ data.sn }}</x-field-item>
          <x-field-item label="申请时间">{{ data.created_at * 1000 | fullTime }}</x-field-item>
        </x-field-set>
        <x-cell v-if="data.images.length">
          <p class="fs-me mgb">凭证附件</p>
          <div class="picrow">
            <ul>
              <li v-for="item in data.images" @click="seeImg(item.path, data.images)">
                <img :src="item.path" alt="comemnt">
              </li>
            </ul>
          </div>
        </x-cell>
      </div>
      <x-field
        v-if="data.status === 2"
        class="refund-detail-field"
        label="退货物流单"
        v-model="expressNo"
        placeholder="请输入退货物流单号">
      </x-field>
      <x-fixed-bottom v-if="data.status === 2">
        <x-button @click.native="submit" type="primary" size="full">提交</x-button>
      </x-fixed-bottom>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        goodsId: this.$route.params.id, // TODO 不适用params
        data: null,
        expressNo: ''
      }
    },
    computed: {
      showData () {
        const data = this.data
        switch (data.status) {
          case 0:
          case 2:
          case 5:
            const amount = this.$utils.toFixedPrice(data.required_amount)
            return {
              status: '处理中',
              desc: `申请退款金额：￥${amount}`,
              icon: 'processing'
            }
          case 3:
          case 4:
            return {
              status: '退款关闭',
              desc: data.status === 3 ? `驳回原因：${data.reject_reason}` : '用户自主取消',
              icon: 'closed'
            }
          case 1:
            const time = this.$utils.timeFormat(data.success_time * 1000)
            return {
              status: '退款成功',
              desc: `退款时间：${time}`,
              icon: 'pay_success'
            }
          default:
            return {}
        }
      }
    },
    mounted () {
      this.fetchRefundData()
    },
    methods: {
      fetchRefundData () {
        const params = {
          order_goods_id: this.goodsId
        }
        this.$http.withLoading({ url: '/api/order/refund/show', params })
          .then(res => {
            this.data = res.data
          })
      },
      submit () {
        if (!this.expressNo) return this.$toast('请填写物流单号')
        this.$messagebox.confirm('确认提交吗').then(action => {
          if (action === 'cancel') return
          this.$http.withLoading({
            url: `/api/order/refunds/${this.data.id}`,
            data: { express_no: this.expressNo }
          }).then(res => {
            this.$toast('提交成功')
            this.fetchRefundData()
          })
        })
      }
    }
  }
</script>
<style>
  .refund-detail-field .x-field-label {
    color: #333;
  }
</style>
