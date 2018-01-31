<template>
  <!--我的福利卡-->
  <div class="page mycards-page">
    <x-media-object class="score-banner" icon="my_balance" size="1.6rem" pull="0.1rem" padding>
      <div style="color: #ffffff;">
        <span style="font-size: 16px;">我的福利卡</span>
      </div>
      <span slot="bottom-left" style="font-size: 30px;line-height: 1;">18<span style="font-size: 14px;">张</span></span>
    </x-media-object>
    <ul class="mycards-list">
      <li v-for="item in cards">
        <div class="image" style="display: inline-block;width: 0.93rem;height: 0.93rem;margin-right: 1rem;">
          <img src="/static/icon/ic_gold02.png" alt="">
        </div>
        <span style="margin-right: 1rem;">X</span>
        <span>{{ item.num }}</span>
        <x-button type="primary" pill inline>赠送</x-button>
      </li>
    </ul>
    <x-fixed-bottom>
      <x-button size="full" type="primary" @click.native="$router.push('/product/exchanges')">去兑换</x-button>
    </x-fixed-bottom>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        cards: [
          { num: 3 },
          { num: 3 },
          { num: 3 },
          { num: 3 },
          { num: 3 }
        ]
      }
    },
    mounted () {
      this.fetchCards()
    },
    methods: {
      fetchCards () {

      }
    }
  }
</script>
<style>
  html, body {
    background-color: #fff;
  }
  .page {
    font-size: 14px;
  }
  .score-banner {
    padding: 0.64rem 0.8rem;
    background-color: #FFC935!important;
    color: #ffffff;
  }
  .mycards-list {
    padding: 0.24rem 0;
  }
  .mycards-list li {
    padding: 0.4rem 0.48rem 0.4rem 1.33rem;
    position: relative;
  }
  .mycards-list li > * {
    display: inline-block;
    vertical-align: middle;
  }
  .mycards-list li > span {
    font-size: 30px;
  }
  .mycards-list li .x-button {
    position: absolute;
    right: 0.48rem;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
