<template>
  <div class="x-slider" ref="slider">
    <ul class="x-slider-list">
      <slot></slot>
    </ul>
    <div class="x-slider-indicator--dots" v-if="indicator === 'dots'">
      <span v-for="(item, index) in dots" :class="{ active: current === index }"></span>
    </div>
    <div class="x-slider-indicator--number" v-if="indicator === 'number'">
      {{ current + 1 }}/{{ dots.length }}
    </div>
  </div>
</template>
<script>
  import Swipe from 'swipejs'

  let init = 10
  export default {
    name: 'x-slider',
    props: ['indicator', 'length'],
    mounted () {
      this.swipe = new Swipe(this.$refs.slider, {
        callback: this.onSlide
      })
      if (this.$slots.default) {
        this.dots = this.$slots.default.filter(i => i.tag).map((i, idx) => idx)
      }
    },
    data () {
      return {
        current: 0,
        dots: []
      }
    },
    watch: {
      length () {
        console.log(this.length)
        this.$nextTick(() => {
          this.swipe.setup()
        })
        if (this.$slots.default) {
          this.dots = this.$slots.default.filter(i => i.tag).map((i, idx) => idx)
        }
      }
    },
    methods: {
      onSlide (index, elem, dir) {
        this.current = index
      }
    }
  }
</script>
<style>
  .x-slider {
    overflow: hidden;
    visibility: hidden;
    position: relative;
  }
  .x-slider-list {
    overflow: hidden;
    position: relative;
  }
  .x-slider-indicator--dots {
    position: absolute;
    bottom: 0.3733rem;
    text-align: center;
    width: 100%;
    /*line-height: 0.16rem;*/
  }
  .x-slider-indicator--dots span {
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    border: 1px solid #aaa;
    border-radius: 100%;
  }
  .x-slider-indicator--dots span:not(:last-child) {
    margin-right: 0.13rem;
  }
  .x-slider-indicator--dots span.active {
    background-color: #aaa;
  }
  .x-slider-indicator--number {
    position: absolute;
    bottom: 0.3733rem;
    right: 0.48rem;
    background: rgba(0,0,0,0.20);
    border-radius: 100px;
    font-size: 12px;
    padding: 0.107rem 0.35rem;
    line-height: 1;
    color: #ffffff;
    letter-spacing: 1px;
  }
</style>
