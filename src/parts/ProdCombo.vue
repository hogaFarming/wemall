<template>
  <mt-popup
    class="combo-popup"
    :value="visible"
    @input="onVisibleChange"
    position="bottom">
    <div class="prod-combo">
      <x-icon class="pin popup-close" type="close" @click.native="close"></x-icon>
      <x-cell bordered>促销</x-cell>
      <ul class="combo-list">
        <li class="combo-item bdb" v-for="opt in options">
          <div class="combo-label">
            <x-label :active="value === opt.id" @click="toggleOption(opt)">{{ opt.title }}</x-label>
          </div>
          <div class="combo-exp">
            <div class="combo-exp-item" v-for="item in opt.items">
              <div class="image image-bordered">
                <img :src="item.img" alt="img">
              </div>
            </div>
            <div class="combo-exp-result">
              <x-money class="combo-exp-money" :value="opt.total" color="red" size="large"></x-money>
            </div>
          </div>
        </li>
      </ul>
      <x-button-group class="sku-button">
        <x-button type="primary" @click.native="$emit('addCart')">加入购物车</x-button>
        <x-button type="danger" @click.native="$emit('buy')">立即购买</x-button>
      </x-button-group>
    </div>
  </mt-popup>
</template>
<script>
  import popupMixin from '../mixins/popupMixin'

  export default {
    mixins: [popupMixin],
    props: {
      value: [String, Number],
      options: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      toggleOption (opt) {
        const isSelected = opt.id === this.value
        this.$emit('input', isSelected ? undefined : opt.id)
      }
    }
  }
</script>
<style>
  .popup-close {
    z-index: 10;
    top: 0.427rem;
    right: 0.48rem;
  }
  .combo-popup {
    width: 100%;
  }
  .prod-combo {
    position: relative;
  }
  .combo-list {

  }
  .combo-item {
    padding: 0.4rem 0.48rem;
  }
  .combo-label {
    margin-bottom: 0.3733rem;
  }
  .combo-exp {
    overflow: hidden;
  }
  .combo-exp-item {
    position: relative;
    float: left;
    width: 2.67rem;
    height: 2.67rem;
  }
  .combo-exp-item:not(:first-child) {
    width: 3.6rem;
    padding-left: 0.93rem;
  }
  .combo-exp-item:not(:first-child)::after {
    content: '+';
    position: absolute;
    top: 50%;
    left: 0.27rem;
    transform: translateY(-50%);
    font-size: 20px;
  }
  .combo-exp-item .image {
    width: 2.67rem;
    height: 2.67rem;
  }
  .combo-exp-result {
    position: relative;
    float: left;
    height: 2.67rem;
    padding-left: 0.75rem;
  }
  .combo-exp-result::after {
    content: '=';
    position: absolute;
    top: 50%;
    left: 0.27rem;
    transform: translateY(-50%);
    font-size: 20px;
  }
  .combo-exp-money {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
