<template>
  <!--<mt-cell-->
    <!--class="x-cell"-->
    <!--:icon="icon"-->
    <!--:title="title"-->
    <!--:to="to"-->
    <!--:value="value"-->
    <!--:label="label"-->
    <!--:is-link="isLink">-->
    <!--<slot></slot>-->
    <!--<slot name="title" slot="title"></slot>-->
    <!--<slot name="icon" slot="icon"></slot>-->
  <!--</mt-cell>-->
  <div class="x-cell" :class="cls">
    <x-icon v-if="icon" :type="icon"></x-icon>
    <div v-if="title">{{ title }}</div>
    <slot v-else>&nbsp;</slot>
    <div class="x-cell-right">
      <slot name="right"></slot>
      <x-icon v-if="iconRight" :type="iconRight"></x-icon>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'x-cell',
//    props: ['icon', 'title', 'to', 'value', 'label', 'isLink']
    props: {
      padding: {
        type: Boolean,
        default: true
      },
      title: String,
      bordered: Boolean,
      icon: String,
      iconRight: String
    },
    computed: {
      cls () {
        const prefix = i => ('x-cell--' + i)
        return {
          [prefix('bordered')]: this.bordered,
          [prefix('padding')]: this.padding
        }
      }
    }
  }
</script>
<style>
  .x-cell {
    position: relative;
    line-height: 1;
    background-color: #fff;
    color: inherit;
  }
  .x-cell--padding {
    padding: 0.4267rem 0.48rem;
  }
  .x-cell--bordered {
    border-bottom: 1px solid #f0f0f0;
  }
  .x-cell-right {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
  .x-cell--padding .x-cell-right {
    right: 0.48rem;
  }
</style>
