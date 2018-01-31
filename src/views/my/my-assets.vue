<template>
  <!--我的财产-->
  <div class="page myassets-page">
    <x-cell icon-right="next_page" @click.native="toMyBalance" bordered>
      <p>账户余额</p>
      <p>预存账户余额、充值及提现明细</p>
      <span slot="right">{{ balance }}</span>
    </x-cell>
    <x-cell icon-right="next_page" @click.native="toMyScore" bordered>
      <p>会员积分</p>
      <p>会员积分获取及消费日志</p>
      <span slot="right">{{ score }}</span>
    </x-cell>
    <x-cell icon-right="next_page" @click.native="toMyCards" bordered>
      <p>福利卡</p>
      <p>游戏获得的福利卡明细</p>
      <span slot="right">{{ cards }}</span>
    </x-cell>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        balance: '--元',
        score: '--分',
        cards: '--张'
      }
    },
    mounted () {
      this.fetchUserBalance()
    },
    methods: {
      fetchUserBalance () {
        this.$http.withLoading('/api/user/balance')
          .then(result => {

          })
      },
      toMyBalance () {
        this.$router.push(`/my/balance`)
      },
      toMyScore () {
        this.$router.push(`/my/score`)
      },
      toMyCards () {
        this.$router.push(`/my/cards`)
      }
    }
  }
</script>
