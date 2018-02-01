<template>
  <div class="page home-page">
    <!--<x-cell class="bdb" @click.native="gotoSearch">-->
      <!--<x-icon type="search"></x-icon> 搜索-->
    <!--</x-cell>-->
    <!--轮播图-->
    <div class="top-slider-wrap bdb">
      <x-slider class="bdb" indicator="dots" :length="banners.length">
        <x-slider-item v-for="item in banners" :key="item.id">
          <img :src="item.cover" alt="item.title" @click="toLink(item.link)">
        </x-slider-item>
      </x-slider>
    </div>
    <ul class="action-list">
      <li v-for="action in actions" :key="action.url" class="action-item" @click="toActionUrl(action.url)">
        <div class="image" style="width: 2.5rem;height: 1rem;">
          <img :src="action.icon" alt="">
        </div>
        <div>{{ action.label }}</div>
      </li>
    </ul>
    <ul class="cover-list">
      <li v-for="item in covers">
        <img @click="toLink(item.link)" :src="item.cover" alt="cover">
      </li>
    </ul>
    <x-fixed-bottom>
      <div class="bottom-nav">
        <div class="bottom-nav-item" @click="$router.push('/')">
          <x-icon type="cart"></x-icon>
          <br>
          首页
        </div>
        <div class="bottom-nav-item" @click="$router.push('/product/category')">
          <x-icon type="cart"></x-icon>
          <br>
          分类
        </div>
        <div class="bottom-nav-item" @click="$router.push('/cart')">
          <x-icon type="cart"></x-icon>
          <br>
          购物车
        </div>
        <div class="bottom-nav-item" @click="$router.push('/my/home')">
          <x-icon type="cart"></x-icon>
          <br>
          我的
        </div>
      </div>
    </x-fixed-bottom>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        banners: [],
        covers: [],
        actions: [
          { icon: '/static/icon/ic_home_points.png', label: '充值得积分', url: '/order/pay/balance-recharge' },
          { icon: '/static/icon/ic_home_exchange.png', label: '积分兑换', url: '/product/exchanges' },
          { icon: '/static/icon/ic_home_benefits.png', label: '福利兑换', url: 'my/cards-exchange' },
          { icon: '/static/icon/ic_home_game.png', label: '游戏', url: '/games' }
        ]
      }
    },
    mounted () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$http.withLoading('/api/indexs?device_platform=2').then(res => {
          this.banners = res.list.banner_list
          this.covers = res.list.cover_list
        })
      },
      gotoSearch () {
        this.$router.push('/product/search')
      },
      toActionUrl (path) {
        if (path) this.$router.push(path)
      },
      toLink (link) {
        if (link) location.href = link
      }
    }
  }
</script>
<style>
  .top-slider-wrap {
    position: relative;
  }
  .top-slider-wrap .x-slider-item img {
    height: 5.3333rem;
  }
  .action-list {
    display: flex;
    padding: 0.48rem 0;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .action-item {
    flex: 1;
    text-align: center;
  }
  .cover-list li {

  }
  .cover-list li > img {
    max-width: 100%;
  }
</style>
