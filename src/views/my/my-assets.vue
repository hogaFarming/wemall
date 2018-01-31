<template>
  <!--我的财产-->
  <div class="page myassets-page">
    <x-cell icon-right="next_page" @click.native="toMyBalance" bordered>
      <p class="myassets-title"><x-icon type="me_balance"></x-icon>账户余额</p>
      <p class="myassets-desc">预存账户余额、充值及提现明细</p>
      <span slot="right">{{ balance }}</span>
    </x-cell>
    <x-cell @click.native="toMyScore" bordered>
      <p class="myassets-title"><x-icon type="home_points"></x-icon>会员积分</p>
      <p class="myassets-desc">会员积分获取及消费日志</p>
      <div slot="right">{{ score }} <x-icon type="next_page"></x-icon></div>
    </x-cell>
    <x-cell icon-right="next_page" @click.native="toMyCards" bordered>
      <p class="myassets-title"><x-icon type="home_benefits"></x-icon>福利卡</p>
      <p class="myassets-desc">游戏获得的福利卡明细</p>
      <span slot="right">{{ cards }}</span>
    </x-cell>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        balance: '--元',
        score: '--积分',
        cards: '--张'
      }
    },
    mounted () {
      this.fetchUserProfile()
    },
    methods: {
      fetchUserProfile () {
        this.$http.withLoading('/api/users')
          .then(res => {
            this.balance = res.data.balance + '元'
            this.score = res.data.integral + '积分'
            this.cards = (res.data.cards || 0) + '张'
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
<style>
  .myassets-page {

  }
  .myassets-title .x-icon {
    height: 25px;
    vertical-align: bottom;
    margin-right: 0.5em;
  }
  .myassets-desc {
    color: #9b9b9b;
    font-size: 12px;
    margin-top: 0.2133rem;
  }
</style>
