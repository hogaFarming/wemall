<template>
  <div class="page score-sign-page">
    <div class="banner">
      <p style="margin-bottom: 0.1rem;">您的可用积分</p>
      <p><span style="font-size: 30px;">{{ totalScore }}</span>积分</p>
      <x-button @click.native="$router.push('/order/pay/balance-recharge')" type="primary" ghost pill inline>去充值</x-button>
    </div>
    <div class="sign-records">
      <div class="sign-records-line"></div>
      <ul class="sign-records-list">
        <li v-for="(item, index) in signRecords" :key="index">
          <span>{{ item.flag ? ('+' + item.score) : '&nbsp;' }}</span>
          <br>
          <x-icon :type="item.flag ? 'me_balance' : 'me_balance02'"></x-icon>
          <br>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </div>
    <p style="text-align: center;color: #9b9b9b;">
      <x-button @click.native="sign" type="primary" pill inline style="margin-bottom: 0.2rem;">签到</x-button>
      <br>
      <span>今日签到可领888积分</span>
      <br>
      <span>连续签到有更多惊喜哦</span>
    </p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        totalScore: '--',
        signDay: 0,
        scoreToday: 0,
        signRecords: [],
        isSigned: true
      }
    },
    mounted () {
      this.fetchProfile()
      this.fetchSignRecords()
    },
    methods: {
      fetchProfile () {
        this.$http.withLoading('/api/users').then(res => {
          this.totalScore = res.data.integral
        })
      },
      fetchSignRecords () {
        this.$http.withLoading('/api/checkIn/fufenConfig').then(res => {
          this.signDay = res.data.now.day || 0
          this.isSigned = !!res.data.is_checked
          let count = 7
          let records = []
          while (count) {
            records.unshift({
              label: count + '天',
              score: res.data.config[count] || 0,
              flag: count <= this.signDay
            })
            count -= 1
          }
          this.signRecords = records
        })
      },
      sign () {
        this.$http.withLoading('/api/checkIn/addLog').then(res => {
          this.$toast('签到成功')
        })
      }
    }
  }
</script>
<style>
  .page {
    font-size: 14px;
  }
  .score-sign-page .banner {
    position: relative;
    padding: 0.56rem 0.48rem;
    background-color: #fff;
  }
  .banner .x-button {
    position: absolute;
    right: 0.48rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .sign-records {
    position: relative;
    padding: 1.333rem 0.48rem;
  }
  .sign-records-line {
    position: absolute;
    height: 1px;
    left: 0.48rem;
    right: 0.48rem;
    top: 50%;
    background-color: #c3c3c3;
  }
  .sign-records-list {
    display: flex;
  }
  .sign-records-list li {
    flex: 1;
    text-align: center;
  }
  .sign-records-list li .x-icon {
    height: 26px;
    margin: 0.2rem 0;
  }
</style>
