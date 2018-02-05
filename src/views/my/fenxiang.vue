<template>
  <div class="page fenxiang-page">
    分享
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    mounted () {
      this.initWxShare()
    },
    methods: {
      initWxShare () {
        this.$wechat.init(() => {
          return this.$http({
            url: '/api/user/share_sign',
            method: 'POST',
            data: { url: 'http://sc.shouyouhuyu.com/' }
          }).then(res => {
            this.$wechat.setShareConfig({
              title: '商城标题',
              desc: '商城描述',
              url: 'http://sc.shouyouhuyu.com/?share_sign=' + res.data.share_sign,
              imgUrl: '',
              success: this.onSharedSuccess
            })
          })
        })
      },
      onSharedSuccess () {
        this.$http.withLoading('/api/share_finish')
      }
    }
  }
</script>
