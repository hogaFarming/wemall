<template>
  <div class="page fenxiang-page">
    <div class="fenxiang-bg"></div>
    <template v-if="rewards">
      <p class="fenxiang-text1">
        邀请好友注册可以 <br>
        获得{{ rewards.register_fufen }}积分
      </p>
      <p class="fenxiang-text2">
        百分之{{ rewards.recharge_share_ratio }}佣金
      </p>
      <p class="fenxiang-text3">
        每日首次分享朋友圈获得{{ rewards.invite_fufen }}积分
      </p>
    </template>
    <x-fixed-bottom>
      <x-button type="primary" size="full">邀请好友</x-button>
    </x-fixed-bottom>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        rewards: null
      }
    },
    mounted () {
      this.initWxShare()
      this.queryRewardConfig()
    },
    methods: {
      initWxShare () {
        this.$wechat.init(() => {
          return this.$http({
            url: '/api/user/share_sign',
            method: 'POST',
            data: { url: location.origin + '/' }
          }).then(res => {
            this.$wechat.setShareConfig({
              title: '商城标题',
              desc: '商城描述',
              url: location.origin + '/?share_sign=' + res.data.share_sign,
              imgUrl: '',
              success: this.onSharedSuccess
            })
          })
        })
      },
      onSharedSuccess () {
        this.$http.withLoading('/api/share_finish')
      },
      queryRewardConfig () {
        this.$http.withLoading('/api/user/capitals')
          .then(res => {
            this.rewards = res.data.reward_config
          })
      }
    }
  }
</script>
<style>
  .fenxiang-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 10rem;
    height: 16.24rem;
    background-image: url('/static/img/fenxiang.png');
    background-size: cover;
  }
  .fenxiang-page p {
    position: absolute;
    text-align: center;
  }
  .fenxiang-text1 {
    top: 6.6667rem;
    left: 1.0667rem;
  }
  .fenxiang-text2 {
    top: 6.6667rem;
    left: 6.0533rem;
  }
  .fenxiang-text3 {
    top: 12.4rem;
    left: 0;
    width: 10rem;
  }
</style>
