<template>
  <mt-popup
    class="sku-popup"
    :value="visible"
    @input="onVisibleChange"
    position="bottom">
    <div class="sku">
      <x-icon class="pin popup-close" type="close" @click.native="close"></x-icon>
      <x-media-object :pic="skuModel.img" pull="1rem" padding bordered>
        <p class="sku-price">
          <x-money :value="skuModel.price"></x-money>
        </p>
        <p class="sku-desc">
          库存 {{ skuModel.store }} 件
        </p>
        <p class="sku-desc">
          已选规格：15ML
        </p>
      </x-media-object>
      <!--<div class="media bdb">-->
        <!--<div class="media-left">-->
          <!--<div class="sku-img-helper">-->
            <!--<div class="image">-->
              <!--<img :src="skuModel.img" alt="">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="media-content">-->
          <!--<p class="sku-price">-->
            <!--<x-money :value="skuModel.price"></x-money>-->
          <!--</p>-->
          <!--<p class="sku-desc">-->
            <!--库存 {{ skuModel.store }} 件-->
          <!--</p>-->
          <!--<p class="sku-desc">-->
            <!--已选规格：15ML-->
          <!--</p>-->
        <!--</div>-->
      <!--</div>-->
      <div v-for="item in skuModel.prodOptions" class="sku-option bdb">
        <div class="sku-option-title">{{ item.title }}</div>
        <div class="sku-option-opts">
          <x-label-radio
            :value="value[item.key]"
            :options="item.options"
            @change="pickedChange(item.key, $event)"
            :keys="['label', 'id']">
          </x-label-radio>
        </div>
      </div>
      <div class="sku-amount bar">
        数量
        <div class="bar-right">
          <x-number-input :value="value._amount" @input="pickedChange('_amount', $event)"></x-number-input>
        </div>
      </div>
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
      value: {
        type: Object,
        default () {
          return {
            _amount: 1
          }
        }
      },
      skuModel: {
        type: Object,
        default () {
          return {
            img: '',
            prodOptions: []
          }
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      pickedChange (key, value) {
        console.log(value + ':' + key)
        const newValue = {
          ...this.value,
          [key]: value
        }
        this.$emit('input', newValue)
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
  .sku-popup {
    width: 100%;
  }
  .sku {
    background-color: #fff;
  }
  /*.sku .media {*/
    /*padding: 0.427rem 0.48rem 0.373rem;*/
  /*}*/
  /*.sku-img-helper {*/
    /*width: 2.67rem;*/
    /*height: 1.2rem;*/
  /*}*/
  /*.sku .image {*/
    /*position: relative;*/
    /*bottom: 1.2rem;*/
    /*width: 2.67rem;*/
    /*height: 2.67rem;*/
  /*}*/
  .sku-option {
    padding: 0.5333rem 0.42rem;
  }
  .sku-option:last-child {
    border-bottom: none;
  }
  .sku-option-title {
    margin-bottom: 0.3733rem;
  }
  .sku-amount {
    padding: 0.48rem;
    margin-bottom: 1.12rem;
  }
</style>
