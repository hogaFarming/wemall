<template>
  <!--积分兑换列表-->
  <div class="page product-list-page">
    <div v-if="!loading">
      <div style="padding: 0.32rem 0.48rem;background-color:#fff;margin-bottom: 0.32rem;position: relative;">
        您的可用积分 <span style="font-size: 30px;vertical-align: middle;">{{ myScore }}</span>
        <span @click="onPopupVisibleChange(!popupVisible)" style="color: #FFCD30;position: absolute;right: 0.48rem;top: 0.32rem;">筛选</span>
      </div>
      <div v-if="list.length">
        <div style="text-align: center;margin-bottom: 0.32rem;">
          <span style="display: inline-block;vertical-align: middle;height: 1px;width: 0.4rem;background-color:#c3c3c3;"></span>
          <span style="display: inline-block;vertical-align: middle;margin: 0 5px;">推荐换购</span>
          <span style="display: inline-block;vertical-align: middle;height: 1px;width: 0.4rem;background-color:#c3c3c3;"></span>
        </div>
        <x-card-list
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="infiniteScrollDisabled"
          infinite-scroll-distance="10">
          <x-card
            v-for="item in list"
            :key="item.id"
            :pic="thumbnail(item.cover, 300)"
            @click.native="toProdDetail(item)"
            pic-height="4.2667rem">
            <span>{{ item.name }}</span>
            <span slot="meta" style="color: #F55B5B;">{{ item.sale_price }}分</span>
          </x-card>
        </x-card-list>
      </div>
      <div v-else style="text-align: center;">
        <p style="padding: 1rem 0 0.4rem"><img src="/static/icon/img_list_empty.png" alt=""></p>
        <p class="black-3">暂无数据</p>
      </div>
    </div>
    <mt-popup class="cat-popup" position="top" :value="popupVisible" @input="onPopupVisibleChange">
      <div style="padding: 0.32rem 0.48rem;background-color:#fff;position: relative;border-bottom: 1px solid #f0f0f0;">
        您的可用积分 <span style="font-size: 30px;vertical-align: middle;">{{ myScore }}</span>
        <span @click="onPopupVisibleChange(!popupVisible)" style="color: #FFCD30;position: absolute;right: 0.48rem;top: 0.32rem;">筛选</span>
      </div>
      <div class="category-main">
        <div class="category-nav-container">
          <ul class="category-nav">
            <li
              class="category-nav-item"
              :class="{ active: cat.id === currentCat }"
              v-for="cat in categories"
              @click="selectCategory(cat.id)"
              :key="cat.id">
              <span>{{ cat.name }}</span>
            </li>
          </ul>
        </div>
        <div class="category-content">
          <div class="category-sub-wrap">
            <ul class="category-sub-list">
              <li class="category-sub-item" v-for="subItem in subCategories" :key="subItem.id" @click="onClickSubItem(subItem)">
                <x-image class="category-sub-image" :src="subItem.logo" width="1.6rem" height="1.6rem"></x-image>
                <div class="category-sub-label" :style="{ color: subItem.id === queries.goods_cat_id_second ? '#FFCD30' : '#333' }">{{ subItem.name }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { scrollListMixin } from 'core/mixins'

  export default {
    mixins: [scrollListMixin],
    data: function () {
      return {
        loading: true,
        queries: {},
        myScore: '--',
        popupVisible: false,
        categories: [],
        currentCat: null
      }
    },
    mounted: function () {
      this.queryList()
      this.queryMyScore()
    },
    computed: {
      subCategories () {
        const currentCatObj = this.categories.filter(item => item.id === this.currentCat)[0]
        if (currentCatObj) {
          return currentCatObj.children
        }
        return []
      }
    },
    methods: {
      queryMyScore () {
        this.$http('/api/user/capitals')
          .then(res => {
            this.myScore = res.data.user_capital.fufen
          })
      },
      /**
       * 查询列表
       */
      queryList (nextPage) {
        const options = {
          url: nextPage || '/api/goodses/exchange',
          params: nextPage ? undefined : this.queries
        }
        this.$http.withLoading(options)
          .then(result => {
            this.loading = false
            this.setListData(result.list)
          })
      },
      toProdDetail (item) {
        this.$router.push(`/product/${item.id}`)
      },
      queryCategories () {
        return this.$http.withLoading('/api/goods/categorys')
          .then(res => {
            if (res && res.list) {
              this.categories = res.list
              this.currentCat = this.categories[0].id
            }
          })
      },
      onPopupVisibleChange (visible) {
        if (visible) {
          if (this.categories.length) {
            this.popupVisible = true
          } else {
            this.queryCategories().then(() => {
              this.popupVisible = true
            })
          }
        } else {
          this.popupVisible = false
        }
      },
      selectCategory (id) {
        this.currentCat = id
      },
      onClickSubItem (item) {
        this.queries.goods_cat_id_second = item.id
        this.popupVisible = false
        this.queryList()
      }
    }
  }
</script>
<style>
  .category-main {
    position: relative;
    flex: 1;
    display: flex;
  }
  .category-nav-container {
    overflow: auto;
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    /*bottom: 0;*/
    width: 2.15rem;
    background-color: #f0f0f0;
  }
  .category-nav {
    width: 100%;
  }
  .category-nav-item {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0.2rem;
    line-height: 3;
    text-align: center;
  }
  .category-nav-item.active {
    background: #fff;
    border-left: 0.1rem solid #FFCD30;
    padding-left: 0.1rem;
  }
  .category-nav-item > span {

  }
  .category-content {
    flex: 1;
    background-color: #fff;
    overflow: auto;
    padding-top: 0.5333rem;
  }
  .category-sub-wrap {
  }
  .category-sub-wrap:after {
    content: '';
    display: table;
    clear: both;
  }
  .category-sub-title {
    text-align: center;
    margin-bottom: 0.5333rem;
    font-size: 12px;
  }
  .category-sub-title > span {
    display: inline-block;
    vertical-align: middle;
  }
  .category-sub-title-text {
    margin: 0 5px;
  }
  .category-sub-title > .category-sub-title-left,
  .category-sub-title > .category-sub-title-right {
    height: 1px;
    width: 0.4rem;
    background-color: #c3c3c3;
  }
  .category-sub-item {
    width: 2.616rem;
    float: left;
    margin-bottom: 0.8533rem;
  }
  .category-sub-image {
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 0.51rem;
    margin-bottom: 0.2667rem;
  }
  .category-sub-label {
    font-size: 12px;
    text-align: center;
  }
  .cat-popup {
    top: 0;
    width: 100%;
    bottom: 10%;
    display: flex;
    flex-direction: column;
  }
</style>
