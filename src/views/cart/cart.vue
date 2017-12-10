<template>
  <div class="page cart-page">
    <template v-if="loading">加载中...</template>
    <template v-else-if="error">{{ error }}</template>
    <template v-else-if="list.length">
      <x-cell class="fs-me" bordered>
        <span class="black-3">全部商品</span>
        <span @click="toggleEdit" slot="right">{{ isEdit ? '完成' : '编辑' }}</span>
      </x-cell>
      <div class="cart-item-group swipe-cell-list">
        <div class="cart-item swipe-cell-item bdb pd" v-for="item in list" :key="item.id" @touchstart="swipeGuard">
          <div class="swipe-cell-content">
            <x-checkbox v-if="isEdit || isValidGoods(item)" class="cart-item-checkbox" v-model="picked[item.id]"></x-checkbox>
            <x-media-object class="cart-item-content">
              <div @click="isEdit ? showSku(item) : gotoDetail(item)">{{ item.goods_title }}</div>
              <div class="image" style="width: 2.4rem;height: 2.4rem;" slot="left" @click="isEdit ? showSku(item) : gotoDetail(item)">
                <img :src="item.cover" alt="图片">
                <div class="image-text" v-if="!isValidGoods(item)">{{ item.goods_status | goodsStatus }}</div>
              </div>
              <span slot="secondary">{{ item.property }}</span>
              <x-money slot="bottom-left" color="red" :value="item.sale_price"></x-money>
              <x-number-input
                slot="bottom-right"
                v-if="isEdit"
                theme="light"
                :value="item.num"
                :max="item.stock"
                :disabled="!isValidGoods(item)"
                @input="numberChange(item, $event)">
              </x-number-input>
              <span slot="bottom-right" v-else>x{{ item.num }}</span>
            </x-media-object>
          </div>
          <div class="swipe-cell-right" @touchstart="onRemoveButtonTouch($event)" @click="remove(item)">
            <x-button class="cart-item-remove" type="danger">删除</x-button>
          </div>
        </div>
      </div>
      <!--底部按钮-->
      <x-fixed-bottom bordered>
        <x-cell slot="content" class="fs-me">
          <x-checkbox :value="isAllPicked" @input="togglePickAll"></x-checkbox>
          <span>全选</span>
          <div slot="right">合计：<x-money :value="totalAmount" color="red"></x-money></div>
        </x-cell>
        <x-button v-if="isEdit" type="danger" @click.native="removeAll" style="font-size: 16px;">删&nbsp;&nbsp;&nbsp;除</x-button>
        <x-button v-else type="primary" @click.native="gotoPay" style="font-size: 16px;">去结账</x-button>
      </x-fixed-bottom>
      <!--sku组件-->
      <prod-sku
        :visible="!!skuCartItem"
        @visible-change="skuVisibleChange"
        v-model="skuValue"
        :sku-model="skuModel"
        @confirm="onSkuConfirm"
        :buttons="['confirm']">
      </prod-sku>
    </template>
    <template v-else>
      <p class="cart-page-empty">
        <img src="/static/icon/img_shopping_cart.png" alt="没有商品" style="margin-bottom: 10px;">
        <br>
        <span>购物车空空的哟～您可以</span>
        <br><br>
        <x-button @click.native="$router.push({ path: '/product/list' })" type="primary" inline pill>随便逛逛</x-button>
      </p>
    </template>

    <!--<x-cell bordered>-->
      <!--<x-checkbox :checked="true" @change="togglePick('id')"></x-checkbox>-->
      <!--<span style="margin-left: 5px;">组合套装</span>-->
    <!--</x-cell>-->
    <!--<x-media-object pic="/static/img/order.png" bordered padding>-->
      <!--2017年新款茶灵春季面膜50ml 提亮肌肤快速美容透白美丽快速美容-->
      <!--<span slot="secondary">提亮肌肤50ML</span>-->
      <!--<x-money slot="bottom-left" color="red" :value="588"></x-money>-->
      <!--<x-number-input slot="bottom-right" v-if="isEdit" theme="light"></x-number-input>-->
      <!--<span slot="bottom-right" v-else>x1</span>-->
    <!--</x-media-object>-->
    <!--<x-cell>-->
      <!--<span>套装价格: &nbsp;<x-money :value="688"></x-money></span>-->
      <!--<x-number-input slot="bottom-right" v-if="isEdit" theme="light"></x-number-input>-->
    <!--</x-cell>-->

  </div>
</template>
<script>
  export default {
    data () {
      return {
        error: '',
        loading: true,
        list: [],
        isEdit: false,
        picked: {},
        numbers: {},
        skuModelCache: {},
        skuModel: null,
        skuValue: null,
        skuCartItem: null
      }
    },
    computed: {
      isAllPicked () {
        const list = this.isEdit ? this.list : this.list.filter(this.isValidGoods)
        return list.length > 0 && list.every(item => {
          return this.isValidGoods(item) ? this.picked[item.id] : true
        })
      },
      totalAmount () {
        let total = 0
        for (let key in this.picked) {
          if (this.picked[key]) {
            const item = this.list.filter(i => i.id === +key)[0]
            if (!item) continue
            total += item.num * (item.is_comb ? item.total_price : item.sale_price)
          }
        }
        return total
      }
    },
    mounted () {
      this.pageInit()
    },
    methods: {
      pageInit () {
        this.fetchCartList()
      },
      fetchCartList () {
        this.$http.withLoading('/api/goods/carts').then(res => {
          this.loading = false
          this.list = res.list
          // this.list[0].goods_status = 2
          // this.list[1].stock = 3
          this.$nextTick(() => {
            this.swiped = window.Swiped.init({
              query: '.cart-item-group .cart-item',
              list: true,
              right: 100
            })
          })
        }, err => {
          this.loading = false
          this.error = err.message
        })
      },
      toggleEdit () {
        if (this.isEdit) {
          // 去掉picked中失效商品
          this.list.forEach(item => {
            if (!this.isValidGoods(item) && this.picked[item.id]) {
              this.picked[item.id] = false
            }
          })
          if (this.swiped) {
            const swiped = Array.isArray(this.swiped) ? this.swiped : [this.swiped]
            swiped.forEach(s => s.close())
          }
        }
        this.isEdit = !this.isEdit
      },
      // togglePick (item) {
      //   if (!this.isEdit && !this.isValidGoods(item)) return
      //   this.picked = {
      //     ...this.picked,
      //     [item.id]: true
      //   }
      //   // this.picked[item.id] = true
      // },
      togglePickAll (val) {
        const picked = {}
        if (val) {
          const list = this.isEdit ? this.list : this.list.filter(this.isValidGoods)
          list.forEach(item => { picked[item.id] = true })
        }
        this.picked = picked
      },
      numberChange (item, number) {
        // item.num = number >= item.stock ? item.stock : number
        this.modifyCartNum(item, number)
      },
      swipeGuard (event) {
        if (!this.isEdit) {
          event.stopPropagation()
        }
      },
      onRemoveButtonTouch (event, item) {
        event.stopPropagation() // 阻止swiped插件默认回弹行为!!
      },
      remove (item) {
        this.$messagebox.confirm('确认删除？').then(result => {
          if (result === 'cancel') return
          this.$http.withLoading({
            url: `/api/goods/carts/${item.id}`,
            method: 'delete'
          }).then(res => {
            this.$toast('删除成功')
            this.list = this.list.filter(i => i !== item)
          })
        })
      },
      removeAll () {
        const ids = []
        for (let key in this.picked) {
          if (this.picked[key]) ids.push(+key)
        }
        if (!ids.length) {
          this.$toast('未选中商品')
          return
        }
        this.$messagebox.confirm('确认删除？').then(result => {
          if (result === 'cancel') return
          this.$http.withLoading({
            url: `/api/cart/batches`,
            data: { cart_id: ids.map(id => ({ cart_id: id })) },
            method: 'put'
          }).then(res => {
            this.$toast('删除成功')
            this.list = this.list.filter(i => ids.indexOf(i.id) === -1)
          })
        })
      },
      gotoDetail (item) {
        this.$router.push(`/product/${item.goods_id}`)
      },
      showSku (item) {
        if (!item.is_sku) return
        if (this.skuModelCache[item.goods_id]) {
          this._showSku(item)
        } else {
          this.fetchItemSkus(item).then(() => this._showSku(item))
        }
      },
      _showSku (item) {
        // 初始化skuValue,skuModel
        this.skuModel = this.skuModelCache[item.goods_id]
        this.skuValue = {
          skuId: item.sku_id,
          selectedProps: this.$utils.skuTool.getSelectedProps(item.sku_id, this.skuModel.skus),
          amount: item.num
        }
        this.skuCartItem = item
      },
      onSkuConfirm () {
        const { skuCartItem, skuValue, skuModel } = this
        if (!skuValue.skuId) return this.$toast('请选择规格')
        if (!skuValue.amount) return this.$toast('请选择数量')

        this.modifyCartSku(skuCartItem, skuValue, skuModel)
          .then(() => {
            this.modifyCartNum(skuCartItem, skuValue.amount)
          })

        this.hideSku()
      },
      modifyCartSku (cartItem, skuValue, skuModel) {
        if (cartItem.sku_id === skuValue.skuId) return Promise.resolve({ cartItem, skuValue })
        return this.$http.withLoading({
          url: `/api/goods/cart/skus/${cartItem.id}`,
          data: { sku_id: skuValue.skuId },
          method: 'put'
        }).then(res => {
          // TODO 修改cartItem图片
          cartItem.sku_id = skuValue.skuId
          const sku = this.$utils.skuTool.getSelectedSku(skuValue, skuModel)
          if (sku) {
            cartItem.property = this.$utils.skuTool.getSkuText(sku)
            cartItem.cover = sku.image
            cartItem.sale_price = sku.sale_price
            cartItem.stock = sku.stock
          }
        })
      },
      modifyCartNum (cartItem, num) {
        this.$http.withLoading({
          url: `/api/goods/carts/${cartItem.id}`,
          data: {
            num: num,
            add_or_less: num - cartItem.num < 0 ? 0 : 1
          },
          method: 'put'
        }).then(res => {
          cartItem.num = num
        })
      },
      skuVisibleChange (visible) {
        if (!visible) {
          this.hideSku()
        }
      },
      hideSku () {
        this.skuCartItem = null
        this.$nextTick(() => {
          this.skuModel = null
          this.skuValue = null
        })
      },
      fetchItemSkus (item) {
        return this.$http.withLoading(`/api/goodses/${item.goods_id}`).then(result => {
          const data = result.data
          this.goodsInfo = data
          let skuImg = data.images.filter(item => item.is_default)[0] || data.images[0]
          skuImg = skuImg ? skuImg.path : ''
          this.skuModelCache[item.goods_id] = {
            property: data.property,
            skus: data.skus,
            goodsInfo: {
              name: data.name,
              title: data.goods_title,
              image: skuImg
            }
          }
        })
      },
      gotoPay () {
        const ids = this.getPickedIds()
        if (!ids.length) {
          return this.$toast('未选中商品')
        }
        // 校验数量是否超出库存
        const items = this.getPickedItems()
        if (items.some(i => i.num > i.stock)) {
          return this.$toast('部分商品超出库存')
        }
        this.$router.push({ path: '/cart/order', query: { cart: ids.join(',') } })
      },
      getPickedItems () {
        return this.getPickedIds().map(id => {
          return this.list.filter(item => item.id === id)[0]
        }).filter(i => !!i)
      },
      getPickedIds () {
        const ids = []
        for (let k in this.picked) {
          if (this.picked[k]) {
            ids.push(+k)
          }
        }
        return ids
      },
      isValidGoods (item) {
        return item.goods_status === 1
      }
    }
  }
</script>
<style>
  .cart-page {

  }
  .cart-page .x-icon.x-checkbox {
    width: 20px;
    height: 20px;
  }
  .cart-item {
    position: relative;
    background-color: #fff;
  }
  .cart-item-content {
    margin-left: 0.86rem;
  }
  .cart-item .x-button.cart-item-remove {
    height: 100%;
    width: 100%;
  }
  .cart-item-checkbox {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .swipe-cell-list {
    overflow: hidden;
  }
  .swipe-cell-item {
    position: relative;
  }
  .swipe-cell-content {
    width: 100%;
  }
  .swipe-cell-right {
    position: absolute;
    left: 100%;
    top: 0;
    bottom: 0;
    width: 100px;
  }
  .cart-page-empty {
    text-align: center;
    font-size: 14px;
    color: #999999;
    padding-top: 120px;
  }
  .cart-page-empty .x-button {
    font-size: 16px;
    padding: 0 0.48rem;
    height: 0.8rem;
    line-height: 0.8rem;
  }
</style>
