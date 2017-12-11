<template>
  <div class="page-product-detail">
    <!--轮播图-->
    <div class="top-slider-wrap bdb">
      <x-slider class="bdb" indicator="number" :length="swipeImgs.length">
        <x-slider-item v-for="url in swipeImgs" :key="url">
          <img :src="url" alt="">
        </x-slider-item>
      </x-slider>
      <x-icon v-if="goodsInfo.is_collect === 0" class="product-like-icon" @click.native="likeGoods" type="praise"></x-icon>
      <x-icon class="product-share-icon" @click.native="shareGoods" type="share"></x-icon>
    </div>

    <!--商品标题-->
    <div class="mod_pd mgb prod-info">
      <p class="title black-2 fs-lg">{{ goodsInfo.goods_title }}</p>
      <x-money class="price" :value="selectedSku.sale_price" size="large"></x-money>
      <!--<x-money v-else class="price" :value="399" size="large"></x-money>-->
    </div>

    <!--优惠套装 / sku规格-->
    <div class="mgb">
      <x-cell icon-right="more" @click.native="showProdCombo" bordered>
        <span class="black-3" style="margin-right: 1.2em;">促销</span>
        <span class="red">优惠套装</span>
        <span>| 最高省200.00元</span>
      </x-cell>
      <x-cell v-if="goodsInfo.is_sku" icon-right="more" @click.native="showSku">
        <span class="black-3">已选规格：</span>
        <span>{{ selectedSkuText }}</span>
      </x-cell>
    </div>

    <!--商品评论-->
    <comment-short-list
      v-if="comments.length"
      :comments="comments"
      :total="commentsTotal"
      :good-percent="commentsGoodPercent"
      :goods-id="id"
    ></comment-short-list>

    <!--同类推荐-->
    <!--<prod-recommend :items="recommends.concat(recommends).concat(recommends).concat(recommends)"></prod-recommend>-->
    <prod-recommend :items="recommends"></prod-recommend>
    <!--图文详情-->
    <long-detail :content="goodsInfo.desc"></long-detail>

    <!--底部按钮-->
    <x-fixed-bottom class="product-detail-bottom">
      <div class="gocart-button" :class="{'has-goods': cartCount > 0}" @click="gotoCart">
        <div class="gocart-button-inner">
          <x-icon type="cart"></x-icon>
          <br>
          <span>购物车</span>
          <i class="gocart-button-redpoint"></i>
        </div>
      </div>
      <x-button type="primary" @click.native="addCart">加入购物车</x-button>
      <x-button type="danger" @click.native="buyNow">立即购买</x-button>
    </x-fixed-bottom>

    <!--sku组件-->
    <prod-sku
      :visible="skuVisible"
      @visible-change="skuVisibleChange"
      :value="skuValue"
      @input="skuValueChange"
      :sku-model="skuModel"
      @cart="addCart"
      @buy="buyNow">
    </prod-sku>
    <!--优惠套装弹层-->
    <prod-combo
      :visible="comboVisible"
      @visible-change="comboVisible = $event"
      :options="combos"
      :value="selectedCombo"
      @input="selectedCombo = $event">
    </prod-combo>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        id: this.$route.params.id,
        swipeImgs: [], // 轮播图

        goodsInfo: {},

        skuVisible: false,
        skuModel: null,
        skuValue: null,
        comboVisible: false,
        combos: [],
        selectedCombo: 'xxx-1',
        comments: [],
        commentsTotal: 10,
        commentsGoodPercent: '',
        cartCount: 0,
        recommends: [],
        likePending: false
      }
    },
    computed: {
      selectedSku () {
        if (!this.goodsInfo.id) return {}
        if (this.goodsInfo.is_sku) {
          return this.$utils.skuTool.getSelectedSku(this.skuValue, this.skuModel) || {}
        } else {
          return this.goodsInfo.skus[0] || {}
        }
      },
      selectedSkuText () {
        return this.$utils.skuTool.getSkuText(this.selectedSku)
      }
    },
    mounted: function () {
      this.pageInit()
    },
    methods: {
      pageInit () {
        this.fetchDetails().then(this.fetchRecommends) // 获取商品详情数据
        this.fetchCombos() // 获取商品套装
        this.fetchComments() // 获取商品评论
        this.fetchCommentReport() // 获取好评率
        this.fetchCartNumbers() // 购物车数量
      },
      fetchDetails () {
        return this.$http.withLoading(`/api/goodses/${this.id}`).then(result => {
          const data = result.data
          this.goodsInfo = data
          this.initSlider(data.images)
          if (data.is_sku) {
            this.initSkuData(data)
          }
        }, err => {
          this.error = err.message
        })
      },
      // TODO 数据
      fetchCombos () {
        const params = { goods_id: this.id }
        this.$http('/api/goods/combs', { params }).then(res => {
          this.combos = res.list.map((item, i) => {
            return { ...item, show_name: '套装' + this.$utils.getChinaNum(i + 1) }
          })
        }, err => {
          this.$toast(err.message)
        })
      },
      fetchComments () {
        const params = { goods_id: this.id }
        this.$http('/api/goods/comments', { params }).then(res => {
          this.comments = res.list.data.map(item => {
            let names = []
            for (let k in item.sku_name_arr) {
              names.push(item.sku_name_arr[k])
            }
            return { ...item, sku_show_name: names.join('  ') }
          })
          this.commentsTotal = res.list.total
        })
      },
      fetchCommentReport () {
        const params = { goods_id: this.id }
        this.$http('/api/comments/data', { params }).then(res => {
          if (!res.data.count) {
            this.commentsGoodPercent = ''
          } else {
            this.commentsGoodPercent = res.data.good_colmment / res.data.count
          }
        })
      },
      fetchCartNumbers () {
        this.$http('/api/cart/nums').then(res => {
          this.cartCount = res.data.shopcart_count
        })
      },
      fetchRecommends () {
        let cat = this.goodsInfo.goods_cat_id_third ||
          this.goodsInfo.goods_cat_id_second ||
          this.goodsInfo.goods_cat_id_first
        if (!cat) {
          console.error('获取分类id失败')
          return
        }
        const params = { goods_cat_id: cat }
        this.$http('/api/goods/guesses', { params }).then(res => {
          this.recommends = res.list
        })
      },
      initSlider (images) {
        let defautImg = ''
        for (let k in images) {
          if (images[k].is_default) {
            defautImg = images[k].path
            continue
          }
          this.swipeImgs.push(images[k].path)
        }
        if (defautImg) this.swipeImgs.unshift(defautImg)
      },
      initSkuData (data) {
        this.skuModel = {
          property: data.property,
          skus: data.skus,
          goodsInfo: {
            name: data.name,
            title: data.goods_title,
            image: this.getGoodsDefaultImage(data)
          }
        }
        const skuId = this.$route.query.sku_id
        if (skuId) {
          this.skuValue = {
            skuId,
            amount: 1,
            selectedProps: this.$utils.skuTool.getSelectedProps(skuId, data.skus)
          }
        }
      },
      getGoodsDefaultImage (data) {
        let img = data.images.filter(item => item.is_default)[0] || data.images[0]
        return img ? img.path : ''
      },
      likeGoods () {
        if (this.likePending) return
        this.likePending = true
        const data = { goods_id: this.id }
        this.$http.post('/api/goods/collects', data).then(res => {
          this.likePending = false
          this.goodsInfo.is_collect = 1
          this.$toast('收藏成功')
        }, err => {
          this.likePending = false
          this.$toast(err.message)
        })
      },
      shareGoods () {

      },
      addCart () {
        let skuId = this.selectedSku.id
        let num = this.goodsInfo.is_sku ? (this.skuValue && this.skuValue.amount) : 1
        if (!skuId) return this.$toast('请选择规格')
        if (this.selectedSku.stock === 0) return this.$toast('库存不足')
        if (!num) return this.$toast({ message: '请选择商品数量' })
        // if (this.selectedSku.stock < num) return this.$toast('库存不足')

        this.$http.withLoading({
          url: '/api/goods/carts',
          method: 'post',
          data: {
            goods_id: this.id,
            num: num,
            sku_id: skuId
          }
        }).then(res => {
          this.$toast('已加入购物车')
          this.$nextTick(() => {
            this.cartCount += 1
            this.skuVisible = false
            // this.resetSku()
          })
        })
      },
      gotoCart () {
        this.$router.push({ path: '/cart' })
      },
      buyNow () {

      },
      showProdCombo () {
        this.comboVisible = true
      },
      showSku () {
        this.skuVisible = true
      },
      resetSku () {

      },
      skuVisibleChange (evt) {
        this.skuVisible = evt
      },
      skuValueChange (evt) {
        this.skuValue = evt
        console.log(evt)
      }
    }
  }
</script>
<style>
  .top-slider-wrap {
    position: relative;
  }
  .top-slider-wrap .x-slider-item img {
    height: 8.4rem;
  }
  .product-like-icon.x-icon,
  .product-share-icon.x-icon {
    position: absolute;
    top: 0.4237rem;
    width: 26px;
    height: 26px;
  }
  .product-like-icon {
    left: 0.48rem;
  }
  .product-share-icon {
    right: 0.48rem;
  }
  .gocart-button {
    position: relative;
    text-align: center;
    font-size: 12px;
    width: 2rem;
    background: #fff;
    border-top: 1px solid #e8e8e8;
  }
  .gocart-button-inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .gocart-button-redpoint {
    display: none;
    position: absolute;
    right: 5px;
    top: -2px;
    background-color: red;
    width: 6px;
    height: 6px;
    border-radius: 100%;
  }
  .gocart-button.has-goods .gocart-button-redpoint {
    display: block;
  }
  .product-detail-bottom {
    align-items: stretch;
  }
  .product-detail-bottom > * {
    flex: 1;
  }
</style>
