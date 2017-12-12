<template>
  <mt-popup
    class="sku-popup"
    :value="visible"
    @input="onVisibleChange"
    position="bottom">
    <div class="sku">
      <div class="sku-head">
        <x-media-object :pic="selectedSku.image || goodsInfo.image" pull="1rem" padding bordered>
          <p class="sku-price">
            <x-money :value="selectedSku.sale_price"></x-money>
          </p>
          <p class="sku-desc">
            库存 {{ selectedSku.stock }} 件
          </p>
          <p class="sku-desc">
            已选规格：{{ selectedPropsText }}
          </p>
          <x-icon slot="right" type="close" @click.native="close"></x-icon>
        </x-media-object>
      </div>
      <div class="sku-body">
        <div v-for="property in properties" class="sku-option bdb">
          <div class="sku-option-title">{{ property.sku_property_name }}</div>
          <div class="sku-option-opts">
            <x-label-radio
              :value="selectedProps[property.sku_property_id]"
              :options="property.sku_property_value"
              @change="onSelectedPropChange(property.sku_property_id, $event)"
              :keys="['sku_property_value_name', 'sku_property_value_id']">
            </x-label-radio>
          </div>
        </div>
        <div class="sku-amount bar">
          数量
          <div class="bar-right">
            <x-number-input :value="_value.amount" @input="onAmountChange" :max="selectedSku.stock"></x-number-input>
          </div>
        </div>
      </div>
      <div class="sku-foot">
        <x-button-group class="sku-button">
          <x-button type="primary" v-show="showingButton.cart" @click.native="$emit('cart')">加入购物车</x-button>
          <x-button type="danger" v-show="showingButton.buy" @click.native="$emit('buy')">立即购买</x-button>
          <x-button type="danger" v-show="showingButton.confirm" @click.native="$emit('confirm')">确定</x-button>
        </x-button-group>
      </div>
    </div>
  </mt-popup>
</template>
<script>
  import { popupMixin } from 'core/mixins'
  export default {
    mixins: [popupMixin],
    props: ['value', 'skuModel', 'buttons'],
    data () {
      return {}
    },
    computed: {
      _value () {
        return this.value || {
          skuId: 0,
          selectedProps: {},
          amount: 1
        }
      },
      _skuModel () {
        return this.skuModel || {
          skus: [],
          property: [],
          goodsInfo: {}
        }
      },
      showingButton () {
        const res = {}
        if (this.buttons) {
          this.buttons.forEach(key => { res[key] = true })
        } else {
          res.cart = true
          res.buy = true
        }
        return res
      },
      goodsInfo () {
        return this._skuModel.goodsInfo || {}
      },
      properties () {
        return this._skuModel.property || []
      },
      selectedProps () {
        return this._value.selectedProps || {}
      },
      selectedSku () {
        const skuId = this._value.skuId
        if (!skuId) return {}
        const sku = this.$utils.find(this._skuModel.skus, i => i.id === skuId)
        return sku || {}
      },
      // 显示当前选中规格
      selectedPropsText () {
        if (this.selectedSku.id) return this.selectedSku.value_name_array.join(',')
        return this.$utils.skuTool.getSelectedPropsText(this._value.selectedProps, this._skuModel.property)
      },
      isOk () {
        return this.selectedSku && this.selectedSku.stock > 0
      }
    },
    methods: {
      onSelectedPropChange (propId, propValue) {
        const selectedProps = {
          ...this._value.selectedProps,
          [propId]: propValue
        }
        const newValue = {
          ...this._value,
          selectedProps,
          skuId: this.$utils.skuTool.getSkuId(selectedProps, this._skuModel.skus) || 0
        }
        this.$emit('input', newValue)
      },
      onAmountChange (amount) {
        this.$emit('input', {
          ...this._value,
          amount
        })
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
    top: 32%;
    background-color: transparent;
  }
  .sku {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
  .sku-head {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
  }
  .sku-body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 48px;
    overflow: auto;
  }
  .sku-foot {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48px;
  }
  .sku-button {
    height: 100%;
  }
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
