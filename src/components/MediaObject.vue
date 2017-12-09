<template>
  <div class="x-media" :class="wrapClass">
    <div class="x-media-left" :style="leftStyle">
      <div v-if="icon" class="x-media-icon">
        <x-icon :type="icon" :style="{ width: size, height: size }"></x-icon>
      </div>
      <div v-if="pic" class="image" :style="{ width: size, height: size }">
        <img :src="pic" alt="">
      </div>
    </div>
    <div class="x-media-content">
      <div class="x-media-content-title" v-if="title">
        {{ title }}
      </div>
      <div class="x-media-content-title" v-else>
        <slot></slot>
      </div>
      <div class="x-media-content-desc">
        <slot name="secondary"></slot>
      </div>
      <!--<div class="x-media-content-bottom">-->
        <!--<slot name="bottom-left"></slot>-->
        <!--<div class="x-media-content-right">-->
          <!--<slot name="bottom-right"></slot>-->
        <!--</div>-->
      <!--</div>-->
      <div class="x-media-content-bl">
        <slot name="bottom-left"></slot>
      </div>
      <div class="x-media-content-br">
        <slot name="bottom-right"></slot>
      </div>
    </div>
    <slot name="right" class="x-media-right"></slot>
  </div>
</template>
<script>
  const PIC_SIZE = '2.4rem'
  export default {
    name: 'x-media-object',
    props: {
      title: String,
      padding: Boolean,
      icon: String,
      pic: String,
      size: {
        type: String,
        default: PIC_SIZE
      },
      pull: String,
      push: String,
      bordered: Boolean
    },
    computed: {
      wrapClass () {
        const prefix = name => 'x-media--' + name
        return {
          [prefix('padding')]: this.padding,
          [prefix('bordered')]: this.bordered
        }
      },
      leftStyle () {
        if (this.pull) {
          return {
            marginTop: '-' + this.pull
          }
        } else if (this.push) {
          return {
            marginTop: this.push
          }
        }
      }
    }
  }
</script>
<style>
  .x-media {
    -webkit-box-align: start;
    align-items: flex-start;
    display: -webkit-box;
    display: flex;
    text-align: left;
    background-color: #fff;
  }
  .x-media--padding {
    padding: 0.32rem 0.48rem;
  }
  .x-media--bordered {
    border-bottom: 1px solid #f0f0f0;
  }
  .x-media-left {
    margin-right: 0.32rem;
    position: relative;
  }
  .x-media-left .image {
    border: 1px solid #f0f0f0;
  }
  .x-media-left, .x-media-right {
    flex-basis: auto;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .x-media-content {
    flex-basis: auto;
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    text-align: left;
    align-self: stretch;
    position: relative;
  }
  .x-media-content-title {
    color: #333333;
    line-height: 1.41;
    margin-bottom: 0.1333rem;
  }
  .x-media-content-desc {
    color: #9b9b9b;
    line-height: 1.41;
  }
  .x-media-content-bottom {
    position: absolute;
    overflow: hidden;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 1;
    font-size: 14px;
  }
  .x-media-content-right {
    float: right;
  }
  .x-media-icon img {
    margin: 0 auto;
  }

  .x-media-content-bl,
  .x-media-content-br {
    position: absolute;
    bottom: 0;
  }
  .x-media-content-bl {
    left: 0;
  }
  .x-media-content-br {
    right: 0;
  }
</style>
