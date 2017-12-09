<template>
  <div>
    <div class="module" v-for="mod in modules">
      <div class="module-title">{{ mod.name }}</div>
      <ul class="module-pages">
        <li v-for="page in mod.pages">
          <router-link :to="{ path: page.path, query: page.search }">
            {{ page.title }}
            <span v-if="page.later" style="color: red;">(缺)</span>
            <span v-if="page.uiLater" style="color: red;">(缺ui)</span>
          </router-link>
          <!--<a @click="navigate(page)">-->
            <!--{{ page.title }}-->
            <!--<span v-if="page.later" style="color: red;">(缺)</span>-->
            <!--<span v-if="page.uiLater" style="color: red;">(缺ui)</span>-->
          <!--</a>-->
        </li>
      </ul>
    </div>
  </div>
</template>
<style>
  .module-title {
    background-color: #f0f0f0;
    padding: 0.32rem 0.48rem;
    color: #999;
  }
  .module-pages {
    background-color: #fff;
  }
  .module-pages li a {
    display: block;
    padding: 0.32rem 0.48rem;
    border-bottom: 1px solid #f0f0f0;
    color: #666;
  }
</style>
<script>
  var Modules = [
    { name: '首页',
      pages: [{ title: '首页', path: '/home', later: true }] },
    { name: '商品详情',
      pages: [
        { title: '商品详情', path: '/product-detail' },
        { title: '全部评价', path: '/product-comments' }
      ] },
    { name: '分类',
      pages: [
        { title: '分类', path: '/product-category', later: true },
        { title: '商品搜索', path: '/product-search' },
        { title: '商品列表', path: '/product-list', search: { keyword: 'hello' } }
      ] },
    { name: '精选',
      pages: [
        { title: '精选', path: '/article-entry' },
        { title: '晒单详情', path: '/article-comment', uiLater: true },
        { title: '文章详情', path: '/article-normal', search: { id: 1 } }
      ] },
    { name: '购物车',
      pages: [
        { title: '购物车', path: '/cart' },
        { title: '确认订单', path: '/cart-order' },
        { title: '付款', path: '/cart-pay' }
      ] },
    { name: '我的',
      pages: [
        { title: '我的', path: '/my-home', uiLater: true },
        { title: '个人资料', path: '/my-profile' },
        { title: '收货地址管理', path: '/my-address' },
        { title: '新增/编辑收货地址', path: '/address-form' },
        { title: '喜欢的商品', path: '/likes-product' },
        { title: '喜欢的文章', path: '/likes-article' },
        { title: '消息列表', path: '/my-message' },
        { title: '我的优惠券', path: '/my-tickets' },
        { title: '我的评价', path: '/my-comments' },
        { title: '我的足迹', path: '/my-views' },
        { title: '我的积分', path: '/my-score' }
      ] },
    { name: '订单列表',
      pages: [
        { title: '订单列表', path: '/order-list' },
        { title: '退款售后', path: '/order-refund-list' },
        { title: '物流详情', path: '/order-delivery' },
        { title: '售后详情', path: '/order-refund-detail' }
      ] },
    { name: '订单详情',
      pages: [
        { title: '订单详情', path: '/order-detail' },
        { title: '退款/退货退款', path: '/refund-form' },
        { title: '售后超时', path: '/refund-expired' }
      ] },
    { name: '注册绑定',
      pages: [
        { title: '注册绑定', path: '/login' }
      ] },
    { name: '领券中心',
      pages: [
        { title: '领券中心', path: '/ticket-center', uiLater: true }
      ] }
  ]
  export default {
    data: function () {
      return {
        modules: Modules
      }
    },
    methods: {
      navigate: function (page) {
        this.$navigateTo(page.path, page.search)
      }
    }
  }
</script>
