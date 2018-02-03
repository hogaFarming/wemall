<template>
  <div class="page my-score-page">
    <x-media-object class="score-banner" icon="my_balance" size="1.6rem" pull="0.1rem" padding>
      <div style="color: #ffffff;">
        <span style="font-size: 16px;">我的余额</span>
      </div>
      <span slot="bottom-left" style="font-size: 30px;line-height: 1;">{{ totalBalance }}元</span>
      <x-button @click.native="toRecharge" class="recharge-balance-button" slot="right" pill inline>充值</x-button>
    </x-media-object>
    <div class="score-month">
      <!--<x-cell class="black-3" style="background: #f0f0f0;">-->
        <!--<span>本月</span>-->
        <!--<div slot="right">-->
          <!--<span style="margin-right: 1em;">收入：2184</span>-->
          <!--<span>支出：32</span>-->
        <!--</div>-->
      <!--</x-cell>-->
      <x-cell class="bdb" v-for="item in list" :key="item.id">
        <span style="display: inline-block;width: 4em;">{{ item.created_at * 1000 | justMonthDay }}</span>
        <span>{{ item.type | balanceLogItem }}</span>
        <span slot="right" :style="{ color: item.is_plus ? '#333' : 'red' }">{{ item.is_plus ? '+' : '-' }}{{ item.amount / 100 }}</span>
      </x-cell>
    </div>
  </div>
</template>
<script>
  import { scrollListMixin } from 'core/mixins'
  export default {
    mixins: [scrollListMixin],
    data () {
      return {
        totalBalance: '--'
      }
    },
    mounted () {
      this.fetchProfile()
      this.queryList()
    },
    methods: {
      fetchProfile () {
        this.$http.withLoading('/api/users').then(res => {
          this.totalBalance = res.data.balance / 100
        })
      },
      queryList (nextPage) {
        this.$http.withLoading(nextPage || '/api/user/balance/logs').then(res => {
          this.setListData(res.list)
        })
      },
      toRecharge () {
        this.$router.push('/order/pay/balance-recharge')
      }
    }
  }
</script>
<style>
  .page {
    font-size: 14px;
  }
  .score-banner {
    padding: 0.64rem 0.8rem;
    background-color: #FFC935!important;
    color: #ffffff;
  }
  .my-score-page .recharge-balance-button {
    border: none;
    margin-top: 0.34rem;
    color: #F8BE21;
  }
</style>
