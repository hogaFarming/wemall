<template>
  <div class="page pay-status-page">
    <template v-if="status">
      <p style="text-align: center;padding-top: 1.0667rem;">
        <img src="/static/icon/ic_pay_success.png" alt="" style="margin-bottom: 0.5rem;">
        <br>
        恭喜，订单支付成功，我们将尽快处理！
      </p>
      <p style="text-align: center;padding-top: 0.5rem;">订单id：{{ order_id }}</p>
      <div style="margin: 0.5rem 0.75rem;">
        <x-button style="margin-bottom: 0.6rem;" size="full" type="primary" pill @click.native="gotoOrder">查看订单</x-button>
        <x-button size="full" type="primary" pill ghost @click.native="gotoList">再逛逛</x-button>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        order_id: this.$route.query.order_id,
        status: this.$route.query.status == '1'
      }
    },
    mounted () {

    },
    methods: {
      gotoOrder () {
        this.$router.push({ path: '/order/' + this.order_id })
      },
      gotoList () {
        this.$router.push({ path: '/product/list' })
      }
    }
  }
</script>
<style>
  html, body {
    background-color: #fff;
  }
</style>
