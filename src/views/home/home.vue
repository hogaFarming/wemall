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
        <x-icon :type="action.icon"></x-icon>
        <br>
        <span>{{ action.label }}</span>
      </li>
    </ul>
    <ul class="cover-list">
      <li v-for="item in covers">
        <img @click="toLink(item.link)" :src="item.cover" alt="cover">
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        banners: [],
        covers: [],
        actions: [
          { icon: 'coupon01', label: '充值得积分', url: '/my/balance-recharge' },
          { icon: 'coupon01', label: '积分兑换', url: '/product/exchanges' },
          { icon: 'coupon01', label: '福利兑换', url: 'my/cards-exchange' },
          { icon: 'coupon01', label: '游戏', url: '/games' }
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
  .action-item > .x-icon {
    height: auto;
    margin-bottom: 0.32rem;
  }
  .cover-list li {

  }
  .cover-list li > img {
    max-width: 100%;
  }
</style>
