<template>
  <div class="page category-page">
    <x-cell class="bdb">
      <x-search v-model="searchText" @search="search"></x-search>
    </x-cell>
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
        <!--<div-->
          <!--class="category-sub-wrap"-->
          <!--v-for="subCat in subCategories"-->
          <!--:key="subCat.id"-->
          <!--v-show="subCat.children && subCat.children.length > 0">-->
        <div class="category-sub-wrap">
          <!--<div class="category-sub-title">-->
            <!--<span class="category-sub-title-left"></span>-->
            <!--<span class="category-sub-title-text">{{ subCat.name }}</span>-->
            <!--<span class="category-sub-title-right"></span>-->
          <!--</div>-->
          <ul class="category-sub-list">
            <li class="category-sub-item" v-for="subItem in subCategories" :key="subItem.id" @click="onClickSubItem(subItem)">
              <x-image class="category-sub-image" :src="subItem.logo" width="1.6rem" height="1.6rem"></x-image>
              <div class="category-sub-label">{{ subItem.name }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        searchText: '',
        categories: [],
        currentCat: null
      }
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
    mounted () {
      this.queryCategories()
    },
    methods: {
      search () {
        if (!this.searchText) {
          return this.$toast('请输入您要搜索的商品')
        }
        this.$router.push({ path: '/product/list', query: { goods_name: this.searchText } })
      },
      queryCategories () {
        return this.$http.withLoading('/api/goods/categorys')
          .then(res => {
            if (res && res.list) {
              for (let i in res.list) {
                res.list[i].next_selected = undefined
              }
              this.categories = res.list
              this.currentCat = this.categories[0].id
            }
          })
      },
      selectCategory (id) {
        this.currentCat = id
      },
      onClickSubItem (item) {
        this.$router.push({
          path: '/product/list',
          query: { cat_ids: item.id + '' }
        })
      }
    }
  }
</script>
<style>
  .category-page {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
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
</style>
