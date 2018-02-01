<template>
  <!--福利卡兑换-->
  <div class="page cardexc-page">
    <div class="cardexc-row" style="margin-top: 10px;">
      <div class="cardexc-main">
        <ul class="cardexc-inner-list">
          <li>
            <x-icon type="gold02"></x-icon>
            <br>
            <span>1个</span>
          </li>
          <li>
            <x-icon type="gold02"></x-icon>
            <br>
            <span>1个</span>
          </li>
        </ul>
      </div>
      <div class="cardexc-btn">兑换</div>
    </div>
    <div class="cardexc-row">
      <div class="cardexc-main">
        <ul class="cardexc-inner-list">
          <li>
            <x-icon type="gold02"></x-icon>
            <br>
            <span>1个</span>
          </li>
          <li>
            <x-icon type="gold02"></x-icon>
            <br>
            <span>1个</span>
          </li>
        </ul>
      </div>
      <div class="cardexc-btn">兑换</div>
    </div>
    <div class="cardexc-row">
      <div class="cardexc-main">
        <ul class="cardexc-inner-list">
          <li>
            <x-icon type="gold02"></x-icon>
            <br>
            <span>1个</span>
          </li>
          <li>
            <x-icon type="gold02"></x-icon>
            <br>
            <span>1个</span>
          </li>
        </ul>
      </div>
      <div class="cardexc-btn">兑换</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    mounted () {

    },
    methods: {

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
</style>
