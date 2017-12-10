<template>
  <div>
    <div class="login-logo">
      <img src="/static/img/logo.png" alt="">
    </div>
    <form class="login-form" @submit="$event.preventDefault()">
      <x-field
        icon-label="account"
        placeholder="手机号码"
        v-model="form.phone">
      </x-field>
      <x-field
        icon-label="password"
        placeholder="设置密码"
        v-model="form.password"
        type="password">
      </x-field>
      <x-field
        icon-label="password"
        placeholder="确认密码"
        v-model="form.confirmPassword"
        type="password">
      </x-field>
      <x-field
        icon-label="password"
        placeholder="输入验证码"
        v-model="captchaCode">
        <div slot="extra" class="image-validate-code" @click="fetchCaptchaImg" style="width: 2.2rem;height: 0.8rem;border: 1px solid #aaa;" alt="验证码">
          <img :src="captchaImg" style="max-width: 100%;max-height: 100%;">
        </div>
      </x-field>
      <x-field
        icon-label="password"
        placeholder="输入短信验证码"
        v-model="form.code">
        <x-button slot="extra" @click.native="sendCode" inline pill>发送验证码</x-button>
      </x-field>
      <x-button class="login-btn" @click.native="submit" type="primary" size="full" pill>注册</x-button>
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
  .login-form .x-field {
    padding: 0 0.32rem 0.2133rem;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 0.8rem;
    background-color: #f0f0f0;
  }
  .login-btn {

  }
</style>
<script>
  import { Verify } from 'hanzi-mobile-package'
  import auth from '../../core/authorization'
  export default {
    data () {
      return {
        form: {
          phone: '',
          password: '',
          confirmPassword: '',
          code: ''
        },
        captchaCode: '',
        captchaImg: '',
        sendCodePending: false
      }
    },
    mounted () {
      this.fetchCaptchaImg()
    },
    methods: {
      fetchCaptchaImg () {
        this.captchaImg = ''
        this.captchaImg = '/api/register/captcha?token=' + auth.getToken() + '&rand = ' + Math.random() * 22
      },
      sendCode () {
        if (this.sendCodePending) return

        this.sendCodePending = true
        // const verify = Verify.run([
        //   {
        //     type: 'mobile',
        //     value: this.form.phone,
        //     name: '手机号码',
        //     errorMsg: '手机格式错误',
        //     canEmpty: false
        //   },
        //   {
        //     type: 'notEmpty',
        //     value: this.captcha_code,
        //     name: '验证码',
        //     canEmpty: false
        //   }
        // ])
        // if (verify !== true) {
        //   setTimeout(function () {
        //     this.sendCodePending = false
        //   }, 3000)
        //   this.$toast.error(verify.msg)
        //   return
        // }

        this.form.code = ''
        this.$http.post('/api/register/sms', {
          phone: this.form.phone,
          captcha_code: this.captchaCode
        }).then(res => {
          this.countDown()
          this.$toast('短信已发送......')
        }, res => {
          // debugger
          this.sendCodePending = false
          this.captchaCode = ''
          this.fetchCaptchaImg()
          this.$toast(res.data.error_msg)
        })
      },
      submit () {

      }
    }
  }
</script>
