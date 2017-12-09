<template>
  <div>
    <div class="login-logo">
      <img src="/static/img/logo.png" alt="">
    </div>
    <form class="login-form" @submit="$event.preventDefault()">
      <x-field
        class="login-field"
        icon-label="account"
        placeholder="手机号码/邮箱/用户名"
        maxlength="50"
        v-model="account">
      </x-field>
      <x-field
        class="login-field"
        icon-label="password"
        placeholder="请输入密码"
        maxlength="50"
        v-model="password"
        type="password">
      </x-field>
      <x-button class="login-btn" @click.native="login" type="primary" size="full" pill>登录</x-button>
    </form>
  </div>
</template>
<style>
  .page {
    background-color: #fff;
    font-size: 14px;
  }
  .login-logo {
    text-align: center;
    padding: 1.28rem 0 1rem;
  }
  .login-logo img {
    width: 2.6667rem;
  }
  .login-form {
    padding: 0 0.75rem;
  }
  .login-field.x-cell {
    padding: 0 0.32rem 0.2133rem;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 0.8rem;
    background-color: #f0f0f0;
  }
  .login-btn {

  }
</style>
<script>
  import md5 from 'md5'
  export default {
    data () {
      return {
        account: 13570503483,
        password: '123456'
      }
    },
    mounted () {

    },
    methods: {
      login () {
        const md = md5
        debugger
        const data = {
          // phone: this.account,
          // password: md5(this.password)
        }
        this.$http.post('/api/logins', data).then(result => {
          this.$cache.set('isLogin', 1)
        }, err => {
          this.$toast(err.message)
        })
      }
    }
  }
</script>
