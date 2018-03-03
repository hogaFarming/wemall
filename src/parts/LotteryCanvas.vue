<template>
  <mt-popup :value="visible" :closeOnClickModal="false" class="lottery-popup">
    <div style="position: absolute;right: 10px;top: 10px;z-index: 100;" @touchstart="handleCancel">关闭</div>
    <div class="canvas-wrap" :style="{ width: width, height: width }" ref="wrap">
      <div class="canvas-panel-bg"></div>
      <div class="canvas-panels">
        <!--<div class="canvas-panels-item" :style="panelItemStyles">-->
          <!--<div class="canvas-panels-title">一等奖</div>-->
        <!--</div>-->
        <div class="canvas-panels-line" v-for="(item, i) in items" :style="{ transform: 'rotate(' + (i * turnNum + turnNum / 2) + 'turn)' }"></div>
        <div class="canvas-panels-item" v-for="(item, i) in items" :style="{ transform: 'rotate(' + (i * turnNum) + 'turn)' }">
          <div class="canvas-panels-content">{{ item.name }}</div>
        </div>
      </div>
      <div class="canvas-bg"></div>
      <div class="canvas-inner-bg"></div>
    </div>
    <div class="canvas-pointer">
      <div class="canvas-pointer-bg"></div>
      <div class="canvas-pointer-arrow"></div>
      <div class="canvas-pointer-btn" @click="startLottery">
        <div style="position: absolute;bottom: 50%;width: 100%;">抽奖</div>
        <div style="position: absolute;top: 50%;width: 100%;">开始</div>
      </div>
    </div>
  </mt-popup>
</template>
<script>
  export default {
    props: {
      width: String,
      visible: Boolean,
      lotteryRuleId: Number,
      data: Object
    },
    data () {
      return {
        w: null
      }
    },
    computed: {
      turnNum () {
        return 1 / this.items.length
      },
      items () {
        return this.data && this.data.goods_info
      }
    },
    watch: {
      visible (val) {
        if (val) {
          this.$nextTick(() => {
            this.w = this.$refs.wrap.offsetWidth
          })
        }
      }
    },
    mounted () {

    },
    methods: {
      handleCancel () {
        this.$emit('cancel')
      },
      startLottery () {
        this.$http({
          url: '/api/exchange_rule',
          data: { exchange_rule_id: this.data.id },
          method: 'post'
        }).then(res => {
          const goodsType = res.data.good_type
          const typeName = ['普通商品', '积分卡', '推币机游戏道具'][goodsType]
          const resultGoods = this.items.find(item => item.id === res.data.good_id)
          const resultIndex = this.items.indexOf(resultGoods)

          const rotateDeg = 360 / this.items.length * resultIndex + 3600
          this.$refs.wrap.style.transform = 'rotate(' + rotateDeg + 'deg)'

          setTimeout(() => {
            // this.$messagebox.alert('恭喜您获得奖品：' + resultGoods.name).then(action => {
            //   this.$emit('result')
            //   this.$refs.wrap.style.transform = ''
            // })
            alert('恭喜您获得：' + resultGoods.name)
            this.$emit('result')
            this.$refs.wrap.style.transform = ''
          }, 6000)

          // if (goodsType === 0) {
          //   this.$http.withLoading('/api/user/address').then(res => {
          //     if (res.list.length) {
          //       this.$http.withLoading({
          //         url: '/api/exchange_update',
          //         data: {
          //           address_id: res.list[0].id,
          //           rule_realize_id: res.data.rule_realize_id
          //         },
          //         method: 'post'
          //       })
          //     }
          //   })
          // }
        }, err => {
          this.$toast(err.message || '抽奖失败')
        })
      }
    }
  }
</script>
<style>
  .canvas-wrap {
    position: relative;
    transition: transform 6s ease;
  }
  .canvas-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*border: 5px solid red;*/
    /*background-color: #ff810f;*/
    /*border-radius: 100%;*/
    background-image: url('/static/img/canvas-circle.png');
    -webkit-background-size: cover;
    background-size: cover;
  }
  .canvas-panel-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #dddddd;
    background-color: #ffbe04;
    border-radius: 100%;
  }
  .canvas-inner-bg {
    position: absolute;
    left: 32%;
    top: 32%;
    width: 36%;
    height: 36%;
    background-color: #ffe300;
    border-radius: 100%;
  }
  .canvas-pointer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .canvas-pointer-bg {
    position: absolute;
    left: 40%;
    top: 40%;
    width: 20%;
    height: 20%;
    background-color: #ffffff;
    border-radius: 100%;
  }
  .canvas-pointer-arrow {
    position: absolute;
    bottom: 50%;
    left: 48.5%;
    width: 3%;
    height: 22%;
    border: 1px solid #dddddd;
    background-color: #fff;
  }
  .canvas-pointer-btn {
    position: absolute;
    left: 42.5%;
    top: 42.5%;
    width: 15%;
    height: 15%;
    background-color: red;
    border-radius: 100%;
    text-align: center;
    color: #ffffff;
    line-height: 1;
  }
  .canvas-panels {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .canvas-panels-line {
    position: absolute;
    left: 50%;
    top: 0;
    width: 1px;
    height: 50%;
    background-color: #ffffff;
    overflow: hidden;
    transform-origin: 50% 100%;
  }
  .canvas-panels-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .canvas-panels-content {
    position: relative;
    padding-top: 15%;
    margin: 0 auto;
    text-align: center;
    transform-origin: 50% 50%;
  }
  .canvas-panels-title {
    position: absolute;
  }
</style>

