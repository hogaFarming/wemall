<template>
  <!--福利卡兑换-->
  <div class="page cardexc-page">
    <div class="cardexc-row" style="margin-top: 10px;" v-for="rule in rules" :key="rule.id">
      <div class="cardexc-main">
        <ul class="cardexc-inner-list">
          <li v-for="info in rule.prize_info">
            <x-icon :type="iconMap[info.peize_type]"></x-icon>
            <br>
            <span>{{ info.peize_num }}个</span>
          </li>
        </ul>
      </div>
      <div class="cardexc-btn" @click="exchange(rule.id)">兑换</div>
    </div>
    <lottery-canvas :visible="popupVisible" :data="detail" @cancel="popupVisible = false" width="8.67rem" height="8.67rem"></lottery-canvas>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        rules: [],
        iconMap: {
          0: 'gold02',
          1: 'big_coin1',
          2: 'big_coin2',
          3: 'big_coin3',
          4: 'big_coin4',
          5: 'big_coin5',
          6: 'big_coin6'
        },
        detail: null,
        popupVisible: false
      }
    },
    mounted () {
      this.fetchExchangeRules()
      // setTimeout(() => {
      //   this.popupVisible = true
      // }, 500)
    },
    methods: {
      fetchExchangeRules () {
        this.$http.withLoading('/api/exchange_rule').then(res => {
          this.rules = res.list.data
        })
      },
      exchange (ruleId) {
        this.$http.withLoading('/api/exchange_rule/' + ruleId).then(res => {
          this.detail = res.data
          this.popupVisible = true
        })
      }
    }
  }
</script>
<style>
  .cardexc-row {
    display: flex;
    margin-bottom: 10px;
    background-color: #fff;
  }
  .cardexc-main {
    padding: 0.4rem 0.48rem;
    display: flex;
    width: 100%;
  }
  .cardexc-inner-list {
    flex: 1;
  }
  .cardexc-inner-list:after {
    content: '';
    display: table;
    clear: both;
  }
  .cardexc-inner-list li {
    float: left;
    margin-right: 0.43rem;
    width: 0.93rem;
    text-align: center;
  }
  .cardexc-inner-list li .x-icon {
    height: 35px;
  }
  .cardexc-btn {
    background-color: #FFCD30;
    line-height: 100%;
    text-align: center;
    width: 2.67rem;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    color: #ffffff;
  }
  .lottery-popup {
    width: 9.33rem;
    height: 10.0667rem;
    padding-left: 0.32rem;
    padding-top: 0.75rem;
  }
</style>
