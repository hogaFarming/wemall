<template>
  <div class="page myhome-page">
    <div class="myhome-banner" :style="{ backgroundImage: 'url(\'' + background + '\')' }">
      <img style="width: 2.67rem;height: 2.67rem;border-radius: 100%;" :src="avatar" />
      <br>
      <span style="font-size: 18px;display: inline-block;margin: 0.26667rem 0;">{{ username }}</span>
      <br>
      <x-button @click.native="sign" type="primary" pill inline>签到</x-button>
    </div>
    <x-cell icon-right="next_page" @click.native="toUrl('/order/list')" padding bordered>
      我的订单
      <span slot="right">查看全部订单</span>
    </x-cell>
    <ul class="action-list">
      <li v-for="action in orderActions" :key="action.url" class="action-item" @click="toUrl(action.url)">
        <div class="image" style="width: 2rem;height: 1rem;">
          <img :src="action.icon" alt="">
        </div>
        <div>{{ action.label }}</div>
      </li>
    </ul>
    <x-cell icon-right="next_page" @click.native="toUrl('/my/assets')" padding bordered>
      我的财产
      <span slot="right">查看全部财产</span>
    </x-cell>
    <ul class="action-list" style="padding-right: 4rem;">
      <li v-for="action in assetsActions" :key="action.url" class="action-item" @click="toUrl(action.url)">
        <div class="image" style="width: 2rem;height: 1rem;">
          <img :src="action.icon" alt="">
        </div>
        <div>{{ action.label }}</div>
      </li>
    </ul>
    <!--<x-cell icon-right="next_page" @click.native="toUrl('/')">兑换记录</x-cell>-->
    <x-cell icon-right="next_page" @click.native="toUrl('/')">邀请返利</x-cell>
    <x-cell icon-right="next_page" @click.native="toUrl('/my/address')">收货地址管理</x-cell>
    <x-cell icon-right="next_page" @click.native="toUrl('/my/score-sign')">7天打卡</x-cell>
    <!--<x-cell icon-right="next_page" @click.native="toUrl('/')">联系客服</x-cell>-->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        avatar: '',
        background: '',
        username: '--',
        orderActions: [
          { icon: '/static/icon/me_payment_icon.png', label: '待付款', url: '/order/list?type=0' },
          { icon: '/static/icon/me_shipped_icon.png', label: '待发货', url: '/order/list?type=1' },
          { icon: '/static/icon/me_receiving_icon.png', label: '待收货', url: '/order/list?type=2' },
          { icon: '/static/icon/me_evaluation_icon.png', label: '待评价', url: '/order/list?type=3' },
          { icon: '/static/icon/me_refund_icon.png', label: '退款/售后', url: '/refund/list' }
        ],
        assetsActions: [
          { icon: '/static/icon/ic_me_balance.png', label: '余额', url: '/my/balance' },
          { icon: '/static/icon/ic_home_points.png', label: '积分', url: '/my/score' },
          { icon: '/static/icon/ic_home_benefits.png', label: '福利卡', url: '/my/cards' }
        ]
      }
    },
    mounted () {
      this.fetchProfile()
    },
    methods: {
      fetchProfile () {
        this.$http.withLoading('/api/users').then(res => {
          this.avatar = res.data.headimg
          this.background = res.data.background
          this.username = res.data.username || 'asdf'
        })
      },
      toUrl (path) {
        this.$router.push(path)
      },
      sign () {

      }
    }
  }
</script>
<style>
  .myhome-banner {
    padding-top: 0.5333rem;
    height: 5.3333rem;
    background-size: cover;
    text-align: center;
  }
  .action-list {
    display: flex;
    padding: 0.48rem 0;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .action-item {
    flex: 1;
    text-align: center;
  }
</style>
