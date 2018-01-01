<template>
  <div class="page pay-status-page">
    <template v-if="status">
      <p style="text-align: center;">
        <img src="/static/icon/ic_pay_success.png" alt="">
        <br>
        恭喜，订单支付成功，我们将尽快处理！
        <br>
        订单号：xxx
      </p>
      <div style="margin: 1.0667rem 0.75rem;">
        <x-button size="full" type="primary" pill @click.native="gotoOrder">查看订单</x-button>
        <x-button size="full" type="primary" pill @click.native="gotoList">再逛逛</x-button>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        order_id: parseInt(this.$route.query.order_id),
        status: parseInt(this.$route.query.status) === 0 ? 0 : 1 | 1
      }
    },
    mounted () {

    },
    methods: {
      gotoOrder () {
        this.$router.push({ path: '/product/list' })
      },
      gotoList () {
        this.$router.push({ path: '/product/list' })
      }
    }
  }
</script>
